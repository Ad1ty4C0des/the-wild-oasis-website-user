"use client";

import { useMemo } from "react";
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

function DateSelector({ cabin, bookedDates, settings, dailyDemand = null }) {
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

  // Build heatmap modifiers from dailyDemand
  const { demandModifiers, demandModifiersClassNames } = useMemo(() => {
    if (!dailyDemand || Object.keys(dailyDemand).length === 0) {
      return { demandModifiers: {}, demandModifiersClassNames: {} };
    }

    const groups = {
      low: [],
      moderate: [],
      high: [],
      peak: [],
    };

    for (const [dateStr, level] of Object.entries(dailyDemand)) {
      if (groups[level]) {
        // Construct date using UTC or local parts to avoid timezone shift
        const [year, month, day] = dateStr.split("-").map(Number);
        groups[level].push(new Date(year, month - 1, day));
      }
    }

    const modifiers = {};
    const modifiersClassNames = {};

    if (groups.low.length) {
      modifiers.demandLow = groups.low;
      modifiersClassNames.demandLow = "demand-low";
    }
    if (groups.moderate.length) {
      modifiers.demandModerate = groups.moderate;
      modifiersClassNames.demandModerate = "demand-moderate";
    }
    if (groups.high.length) {
      modifiers.demandHigh = groups.high;
      modifiersClassNames.demandHigh = "demand-high";
    }
    if (groups.peak.length) {
      modifiers.demandPeak = groups.peak;
      modifiersClassNames.demandPeak = "demand-peak";
    }

    return {
      demandModifiers: modifiers,
      demandModifiersClassNames: modifiersClassNames,
    };
  }, [dailyDemand]);

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
        modifiers={demandModifiers}
        modifiersClassNames={demandModifiersClassNames}
      />

      {/* Demand Heatmap Legend */}
      {dailyDemand && (
        <div className="flex items-center justify-center gap-3.5 pb-3 px-unit-lg flex-wrap border-b border-outline-variant/20 mx-4 mb-2">
          <span className="flex items-center gap-1.5 text-xs font-body text-on-surface-variant">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Low
          </span>
          <span className="flex items-center gap-1.5 text-xs font-body text-on-surface-variant">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Moderate
          </span>
          <span className="flex items-center gap-1.5 text-xs font-body text-on-surface-variant">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span> High
          </span>
          <span className="flex items-center gap-1.5 text-xs font-body text-on-surface-variant">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> Peak
          </span>
        </div>
      )}

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
