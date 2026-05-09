import Link from "next/link";

function NotFound() {
  return (
    <main className="flex justify-center items-center flex-col gap-6 min-h-screen pt-24 px-gutter text-center">
      <div className="font-display text-display-lg text-ds-primary opacity-30">
        404
      </div>
      <h1 className="font-display text-headline-xl text-on-surface">
        This page could not be found
      </h1>
      <p className="font-body text-body-lg text-on-surface-variant max-w-md">
        The trail you&apos;re looking for doesn&apos;t exist. Perhaps it leads
        back to the oasis.
      </p>
      <Link
        href="/"
        className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-body text-label-md hover:bg-bronze-hover transition-all duration-300 shadow-[0_4px_14px_rgba(198,153,99,0.2)]"
      >
        Return home
      </Link>
    </main>
  );
}

export default NotFound;
