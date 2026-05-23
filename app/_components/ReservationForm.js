"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="flex flex-col">
      {/* Form */}
      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="px-unit-lg pb-unit-lg flex gap-4 flex-col"
      >
        {/* Guests */}
        <div className="bg-surface-container-high pt-3 pb-2 rounded-lg border border-outline-variant/50 form-select-container">
          <label
            htmlFor="numGuests"
            className="block font-body text-label-sm text-on-surface-variant uppercase tracking-wider mb-1 px-3"
          >
            Guests
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full bg-transparent border-none text-on-surface focus:ring-0 px-3 pb-1 pt-0.5 font-body text-body-md"
            required
          >
            <option value="" key="" className="bg-surface-container">
              Select guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x} className="bg-surface-container">
                {x} {x === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Observations */}
        <div className="space-y-1">
          <label
            htmlFor="observations"
            className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider"
          >
            Special requests
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-3 py-2 bg-surface-container-high border border-outline-variant/50 text-on-surface w-full rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors min-h-[70px] resize-none text-sm"
            placeholder="Any pets, allergies, etc.?"
          />
        </div>

        {/* Reserve button */}
        <div className="flex flex-col gap-3">
          {!(startDate && endDate) ? (
            <p className="font-body text-body-md text-on-surface-variant italic text-center py-2">
              Select dates to reserve
            </p>
          ) : (
            <SubmitButton pendingLabel={"Reserving..."}>
              Reserve
            </SubmitButton>
          )}
        </div>
      </form>

      {/* Logged-in User Bar */}
      <div className="bg-surface-container-high/60 backdrop-blur-sm text-on-surface-variant px-unit-lg py-3 flex justify-between items-center border-t border-white/5">
        <p className="font-body text-label-sm">Logged in as</p>
        <div className="flex gap-2 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-6 w-6 rounded-full ring-1 ring-outline-variant"
            src={user.image}
            alt={user.name}
          />
          <p className="font-body text-label-sm text-on-surface">
            {user.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReservationForm;
