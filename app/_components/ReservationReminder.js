"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-4 px-8 rounded-2xl bg-secondary text-on-secondary font-body text-label-md shadow-[0_8px_32px_rgba(198,153,99,0.3)] flex gap-6 items-center z-50">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button className="rounded-full p-1 hover:bg-on-secondary/10 transition-all">
        <XMarkIcon className="h-5 w-5" onClick={resetRange} />
      </button>
    </div>
  );
}

export default ReservationReminder;
