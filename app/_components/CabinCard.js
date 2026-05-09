import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <Link href={`/cabins/${id}`} className="block h-full">
      <article className="group relative rounded-xl overflow-hidden bg-surface-container border border-outline-variant/20 flex flex-col h-full transition-transform duration-500 hover:scale-[1.01]">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            fill
            alt={`Cabin ${name}`}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
            <span className="font-body text-label-sm text-on-surface uppercase tracking-wider">
              Up to {maxCapacity} guests
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow bg-surface-container relative z-10 border-t border-white/5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display text-headline-md text-on-surface">
              Cabin {name}
            </h3>
          </div>

          <p className="font-body text-body-md text-on-surface-variant mb-6 line-clamp-2">
            A luxurious retreat designed to blend with its natural surroundings,
            offering uncompromised comfort for up to {maxCapacity} guests.
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div>
              {discount > 0 ? (
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-headline-md text-ds-primary">
                    ${regularPrice - discount}
                  </span>
                  <span className="font-body text-body-md text-on-surface-variant line-through">
                    ${regularPrice}
                  </span>
                  <span className="font-body text-body-md text-on-surface-variant">
                    / night
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-headline-md text-ds-primary">
                    ${regularPrice}
                  </span>
                  <span className="font-body text-body-md text-on-surface-variant">
                    / night
                  </span>
                </div>
              )}
            </div>

            <span className="w-10 h-10 rounded-full border border-outline flex items-center justify-center text-on-surface group-hover:bg-secondary group-hover:text-on-secondary group-hover:border-secondary transition-colors duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default CabinCard;
