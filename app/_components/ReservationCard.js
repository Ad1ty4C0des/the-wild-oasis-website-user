import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "@/app/_components/DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="glass-panel-subtle rounded-xl overflow-hidden flex group hover:scale-[1.005] transition-transform duration-500">
      {/* Image */}
      <div className="relative h-auto w-36 flex-shrink-0">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Content */}
      <div className="flex-grow px-6 py-4 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-headline-md text-on-surface">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-secondary-container text-on-secondary-container h-7 px-3 uppercase text-label-sm font-bold flex items-center rounded-full">
              past
            </span>
          ) : (
            <span className="bg-primary-container text-on-primary-container h-7 px-3 uppercase text-label-sm font-bold flex items-center rounded-full">
              upcoming
            </span>
          )}
        </div>

        <p className="font-body text-body-md text-on-surface-variant">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline pt-3">
          <p className="font-display text-headline-md text-secondary">
            ${totalPrice}
          </p>
          <p className="text-on-surface-variant">&bull;</p>
          <p className="font-body text-body-md text-on-surface-variant">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto font-body text-label-sm text-on-surface-variant opacity-60">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col border-l border-white/10 w-[100px]">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group/btn flex items-center gap-2 uppercase text-label-sm font-bold text-on-surface-variant border-b border-white/10 flex-grow px-3 hover:bg-secondary/20 transition-colors"
            >
              <PencilSquareIcon className="h-5 w-5 text-on-surface-variant group-hover/btn:text-secondary transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>

            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
