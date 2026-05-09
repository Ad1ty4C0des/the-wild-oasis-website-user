"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ cabin, bookedDates, settings }) {
  const { range, setRange, resetRange } = useReservation();

  // In react-day-picker v9, onSelect can pass undefined when deselecting
  function handleSelect(selectedRange) {
    setRange(selectedRange ?? { from: undefined, to: undefined });
  }

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? {}
    : range ?? {};

  const { regularPrice, discount } = cabin;
  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col">
      <DayPicker
        className="pt-4 pb-2 place-self-center rdp-dark cabin-detail-rdp"
        mode="range"
        onSelect={handleSelect}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date(2025, 7)}
        endMonth={new Date(2030, 11)}
        captionLayout="dropdown"
        numberOfMonths={1}
        animate
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      {/* Price Breakdown */}
      {numNights > 0 && (
        <div className="mx-unit-lg mb-unit-md pt-unit-md border-t border-outline-variant/30 space-y-3">
          <div className="flex justify-between font-body text-body-md text-on-surface-variant">
            <span>
              ${regularPrice - discount} × {numNights} nights
            </span>
            <span>${cabinPrice}</span>
          </div>
          <div className="flex justify-between font-display text-body-md text-ds-primary pt-3 border-t border-outline-variant/30">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${cabinPrice}</span>
          </div>
        </div>
      )}

      {range?.from || range?.to ? (
        <div className="px-unit-lg pb-unit-sm">
          <button
            className="w-full border border-outline-variant/50 py-2 px-4 text-sm font-body font-semibold text-on-surface-variant rounded-lg hover:bg-surface-container-high/50 transition-colors"
            onClick={resetRange}
          >
            Clear dates
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default DateSelector;
