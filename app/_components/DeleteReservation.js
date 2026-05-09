"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-label-sm font-bold text-on-surface-variant flex-grow px-3 hover:bg-ds-error/10 transition-colors"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-on-surface-variant group-hover:text-ds-error transition-colors" />
          <span className="mt-1 group-hover:text-ds-error transition-colors">
            Delete
          </span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
