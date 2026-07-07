"use client";

import { useState, useEffect } from "react";
import { supabaseClient } from "../_lib/supabase-client";
import { eachDayOfInterval } from "date-fns";

export function useRealtimeBookedDates(initialBookedDates = [], cabinId) {
  const [bookedDates, setBookedDates] = useState(() =>
    initialBookedDates.map((d) => (d instanceof Date ? d : new Date(d)))
  );

  // Sync if initialBookedDates changes from server
  useEffect(() => {
    setBookedDates(
      initialBookedDates.map((d) => (d instanceof Date ? d : new Date(d)))
    );
  }, [initialBookedDates]);

  useEffect(() => {
    if (!cabinId) return;

    const channel = supabaseClient
      .channel(`bookings-cabin-${cabinId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookings",
          filter: `cabinId=eq.${cabinId}`,
        },
        (payload) => {
          const newBooking = payload.new;
          if (newBooking?.startDate && newBooking?.endDate) {
            const newDates = eachDayOfInterval({
              start: new Date(newBooking.startDate),
              end: new Date(newBooking.endDate),
            });
            setBookedDates((prev) => [...prev, ...newDates]);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "bookings",
          filter: `cabinId=eq.${cabinId}`,
        },
        async () => {
          let today = new Date();
          today.setUTCHours(0, 0, 0, 0);

          const { data, error } = await supabaseClient
            .from("bookings")
            .select("startDate, endDate")
            .eq("cabinId", cabinId)
            .or(`startDate.gte.${today.toISOString()},status.eq.checked-in`);

          if (!error && data) {
            const allDates = data.flatMap((booking) =>
              eachDayOfInterval({
                start: new Date(booking.startDate),
                end: new Date(booking.endDate),
              })
            );
            setBookedDates(allDates);
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [cabinId]);

  return bookedDates;
}

