"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6 min-h-screen pt-24 px-gutter">
      <div className="text-center space-y-6">
        <div className="font-display text-display-lg-mobile text-ds-primary opacity-50">
          Oops
        </div>
        <h1 className="font-display text-headline-xl text-on-surface">
          Something went wrong!
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-md mx-auto">
          {error.message}
        </p>
        <button
          className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-body text-label-md hover:bg-bronze-hover transition-all duration-300 shadow-[0_4px_14px_rgba(198,153,99,0.2)]"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
