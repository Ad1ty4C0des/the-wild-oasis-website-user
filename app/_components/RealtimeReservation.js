"use client";

import { useRealtimeBookedDates } from "../_hooks/useRealtimeBookedDates";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import LiveIndicator from "./LiveIndicator";

function RealtimeReservation({
  cabin,
  settings,
  initialBookedDates,
  user,
  dailyDemand = null,
}) {
  const bookedDates = useRealtimeBookedDates(initialBookedDates, cabin.id);

  return (
    <>
      <div className="px-unit-lg pb-1 flex justify-end">
        <LiveIndicator />
      </div>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
        dailyDemand={dailyDemand}
      />
      {user ? (
        <ReservationForm cabin={cabin} user={user} />
      ) : (
        <LoginMessage />
      )}
    </>
  );
}

export default RealtimeReservation;

