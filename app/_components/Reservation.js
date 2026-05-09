import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className="rounded-xl bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(26,46,38,0.2)] overflow-hidden">
      {/* Price Header */}
      <div className="px-unit-lg pt-unit-lg pb-unit-md">
        <span className="font-display text-headline-lg text-ds-primary">
          {cabin.discount > 0 ? (
            <>
              ${cabin.regularPrice - cabin.discount}
              <span className="text-body-md text-on-surface-variant line-through ml-2">
                ${cabin.regularPrice}
              </span>
            </>
          ) : (
            <>${cabin.regularPrice}</>
          )}
        </span>
        <span className="font-body text-body-md text-on-surface-variant">
          {" "}
          / night
        </span>
      </div>

      {/* Date Selector */}
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />

      {/* Reservation Form or Login */}
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
