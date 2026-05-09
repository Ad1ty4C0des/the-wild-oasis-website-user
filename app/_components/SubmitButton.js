"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-full bg-secondary text-on-secondary px-8 py-4 rounded-lg font-body text-label-md hover:bg-bronze-hover transition-all duration-300 disabled:cursor-not-allowed disabled:bg-surface-container-high disabled:text-on-surface-variant shadow-[0_4px_14px_rgba(198,153,99,0.2)]"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
