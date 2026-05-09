import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-6 pt-32 px-gutter max-w-md mx-auto">
      <div className="text-6xl mb-4">🌿</div>
      <h1 className="font-display text-headline-xl text-ds-primary">
        Thank you for your reservation!
      </h1>
      <p className="font-body text-body-lg text-on-surface-variant">
        Your escape into nature awaits. We&apos;ll prepare everything for your
        arrival.
      </p>
      <Link
        href="/account/reservations"
        className="inline-flex items-center gap-2 text-secondary hover:text-secondary-fixed font-body text-label-md underline transition-colors"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
