import { auth } from "@/app/_lib/auth";
import ReservationList from "@/app/_components/ResevationList";
import { getBookings } from "@/app/_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <h2 className="font-display text-headline-lg text-on-surface mb-2">
        Your reservations
      </h2>
      <p className="font-body text-body-md text-on-surface-variant mb-8">
        Manage your upcoming stays and review past escapes.
      </p>

      {bookings.length === 0 ? (
        <div className="glass-panel-subtle rounded-xl py-12 px-8 text-center">
          <p className="font-body text-body-lg text-on-surface-variant mb-4">
            You have no reservations yet.
          </p>
          <Link
            className="text-secondary hover:text-secondary-fixed underline font-body text-label-md transition-colors"
            href="/cabins"
          >
            Explore our luxury cabins &rarr;
          </Link>
        </div>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
