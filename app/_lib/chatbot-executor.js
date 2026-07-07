import {
  getCabins,
  getCabin,
  getBookedDatesByCabinId,
  getSettings,
} from "./data-service";

export async function executeFunctionCall(functionCall) {
  const { name, args = {} } = functionCall;

  try {
    switch (name) {
      case "searchCabins": {
        const allCabins = await getCabins();
        let filtered = allCabins;

        if (args.minCapacity) {
          filtered = filtered.filter((c) => c.maxCapacity >= Number(args.minCapacity));
        }
        if (args.maxPrice) {
          filtered = filtered.filter((c) => {
            const effectivePrice = c.regularPrice - (c.discount || 0);
            return effectivePrice <= Number(args.maxPrice);
          });
        }

        return {
          cabins: filtered.map((c) => ({
            id: c.id,
            name: c.name,
            maxCapacity: c.maxCapacity,
            pricePerNight: c.regularPrice - (c.discount || 0),
            originalPrice: c.regularPrice,
            discount: c.discount,
          })),
          totalFound: filtered.length,
        };
      }

      case "getCabinDetails": {
        if (args.cabinId) {
          const cabin = await getCabin(args.cabinId);
          return {
            id: cabin.id,
            name: cabin.name,
            maxCapacity: cabin.maxCapacity,
            pricePerNight: cabin.regularPrice - (cabin.discount || 0),
            originalPrice: cabin.regularPrice,
            discount: cabin.discount,
            description: cabin.description,
          };
        }

        if (args.cabinName) {
          const allCabins = await getCabins();
          const target = String(args.cabinName).trim().toLowerCase();
          const found = allCabins.find(
            (c) =>
              String(c.name).toLowerCase() === target ||
              String(c.name).toLowerCase().includes(target)
          );

          if (found) {
            const fullCabin = await getCabin(found.id);
            return {
              id: fullCabin.id,
              name: fullCabin.name,
              maxCapacity: fullCabin.maxCapacity,
              pricePerNight: fullCabin.regularPrice - (fullCabin.discount || 0),
              originalPrice: fullCabin.regularPrice,
              discount: fullCabin.discount,
              description: fullCabin.description,
            };
          }

          return { error: `No cabin found matching "${args.cabinName}".` };
        }

        return { error: "Please provide either cabinId or cabinName." };
      }

      case "checkAvailability": {
        if (!args.cabinId) {
          return { error: "cabinId is required to check availability." };
        }

        const bookedDates = await getBookedDatesByCabinId(args.cabinId);
        const bookedDateStrings = bookedDates.map((d) =>
          d instanceof Date
            ? d.toISOString().split("T")[0]
            : new Date(d).toISOString().split("T")[0]
        );

        // Remove duplicates
        const uniqueBookedDates = [...new Set(bookedDateStrings)].sort();

        return {
          cabinId: args.cabinId,
          unavailableDates: uniqueBookedDates,
          totalUnavailableDays: uniqueBookedDates.length,
        };
      }

      case "getBookingSettings": {
        const settings = await getSettings();
        return {
          minBookingLength: settings.minBookingLength,
          maxBookingLength: settings.maxBookingLength,
          breakfastPrice: settings.breakfastPrice,
        };
      }

      case "getAllCabins": {
        const cabins = await getCabins();
        return cabins.map((c) => ({
          id: c.id,
          name: c.name,
          maxCapacity: c.maxCapacity,
          pricePerNight: c.regularPrice - (c.discount || 0),
          originalPrice: c.regularPrice,
          discount: c.discount,
        }));
      }

      default:
        return { error: `Unknown tool function "${name}"` };
    }
  } catch (error) {
    console.error(`Error executing chatbot tool ${name}:`, error);
    return { error: `Failed to fetch data for ${name}: ${error.message}` };
  }
}

