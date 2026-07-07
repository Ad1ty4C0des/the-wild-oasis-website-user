import { supabase } from "./supabase";
import {
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  addMonths,
  format,
  eachDayOfInterval,
} from "date-fns";

/**
 * Calculates demand data and occupancy statistics for a given cabin.
 */
export async function getCabinDemandData(cabinId) {
  try {
    const { data: allBookings, error } = await supabase
      .from("bookings")
      .select("startDate, endDate, status")
      .eq("cabinId", cabinId);

    if (error) {
      console.error("Error fetching bookings for demand calculation:", error);
      return null;
    }

    const bookings = allBookings || [];
    const now = new Date();
    const analysisStart = addMonths(now, -2);
    const analysisEnd = addMonths(now, 6);

    const months = eachMonthOfInterval({
      start: analysisStart,
      end: analysisEnd,
    });

    const monthlyDemand = {};

    for (const month of months) {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      const monthKey = format(month, "yyyy-MM");
      const daysInMonth = monthEnd.getDate();

      // Find bookings overlapping with this month
      const overlappingBookings = bookings.filter((b) => {
        const bStart = new Date(b.startDate);
        const bEnd = new Date(b.endDate);
        return bStart <= monthEnd && bEnd >= monthStart;
      });

      let occupiedDays = 0;
      for (const b of overlappingBookings) {
        const bStart = new Date(b.startDate);
        const bEnd = new Date(b.endDate);
        const overlapStart = new Date(Math.max(bStart.getTime(), monthStart.getTime()));
        const overlapEnd = new Date(Math.min(bEnd.getTime(), monthEnd.getTime()));

        if (overlapEnd >= overlapStart) {
          const days = eachDayOfInterval({ start: overlapStart, end: overlapEnd });
          occupiedDays += days.length;
        }
      }

      const occupancyRate = Math.min(
        100,
        Math.round((occupiedDays / daysInMonth) * 100)
      );

      let demandLevel = "low";
      if (occupancyRate >= 60 || overlappingBookings.length >= 4) {
        demandLevel = "peak";
      } else if (occupancyRate >= 35 || overlappingBookings.length >= 3) {
        demandLevel = "high";
      } else if (occupancyRate >= 15 || overlappingBookings.length >= 1) {
        demandLevel = "moderate";
      }

      monthlyDemand[monthKey] = {
        monthName: format(month, "MMMM yyyy"),
        bookingCount: overlappingBookings.length,
        occupiedDays,
        totalDays: daysInMonth,
        occupancyRate,
        demandLevel,
      };
    }

    // Daily demand for next 6 months (calendar heatmap)
    const dailyDemand = {};
    const futureDays = eachDayOfInterval({
      start: now,
      end: addMonths(now, 6),
    });

    for (const day of futureDays) {
      const dayStr = format(day, "yyyy-MM-dd");
      const monthKey = format(day, "yyyy-MM");
      dailyDemand[dayStr] = monthlyDemand[monthKey]?.demandLevel || "low";
    }

    // Identify best month and peak month in future
    const currentMonthKey = format(now, "yyyy-MM");
    const futureMonthEntries = Object.entries(monthlyDemand).filter(
      ([key]) => key >= currentMonthKey
    );

    const bestMonthEntry = futureMonthEntries.reduce(
      (best, [key, val]) =>
        val.occupancyRate < best.rate ? { key, val, rate: val.occupancyRate } : best,
      {
        key: currentMonthKey,
        val: monthlyDemand[currentMonthKey] || { demandLevel: "low", monthName: "Current Month" },
        rate: Infinity,
      }
    );

    const peakMonthEntry = futureMonthEntries.reduce(
      (peak, [key, val]) =>
        val.occupancyRate > peak.rate ? { key, val, rate: val.occupancyRate } : peak,
      {
        key: currentMonthKey,
        val: monthlyDemand[currentMonthKey] || { demandLevel: "moderate", monthName: "Current Month" },
        rate: -1,
      }
    );

    return {
      monthlyDemand,
      dailyDemand,
      currentDemandLevel: monthlyDemand[currentMonthKey]?.demandLevel || "low",
      bestMonth: bestMonthEntry.val,
      peakMonth: peakMonthEntry.val,
    };
  } catch (err) {
    console.error("Demand computation failed:", err);
    return null;
  }
}

