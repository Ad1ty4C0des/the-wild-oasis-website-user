export const chatbotTools = [
  {
    functionDeclarations: [
      {
        name: "searchCabins",
        description:
          "Search for cabins by capacity or price limit. Returns matching cabins with id, name, maxCapacity, pricePerNight, and discount.",
        parameters: {
          type: "OBJECT",
          properties: {
            minCapacity: {
              type: "NUMBER",
              description: "Minimum guest capacity needed",
            },
            maxPrice: {
              type: "NUMBER",
              description: "Maximum budget per night in USD",
            },
          },
        },
      },
      {
        name: "getCabinDetails",
        description:
          "Get complete information about a specific cabin including description, max capacity, pricing, and discount by id or name.",
        parameters: {
          type: "OBJECT",
          properties: {
            cabinId: {
              type: "NUMBER",
              description: "Numeric ID of the cabin",
            },
            cabinName: {
              type: "STRING",
              description: "Name of the cabin (e.g., '001', '002', 'The King', 'The Meadow')",
            },
          },
        },
      },
      {
        name: "checkAvailability",
        description:
          "Check availability of a specific cabin. Returns the dates that are already booked and unavailable.",
        parameters: {
          type: "OBJECT",
          properties: {
            cabinId: {
              type: "NUMBER",
              description: "Numeric ID of the cabin",
            },
          },
          required: ["cabinId"],
        },
      },
      {
        name: "getBookingSettings",
        description:
          "Get hotel policies and booking constraints like minimum stay nights, maximum stay nights, and breakfast price per night.",
        parameters: {
          type: "OBJECT",
          properties: {},
        },
      },
      {
        name: "getAllCabins",
        description:
          "List all cabins with their names, capacity, and current rates.",
        parameters: {
          type: "OBJECT",
          properties: {},
        },
      },
    ],
  },
];

