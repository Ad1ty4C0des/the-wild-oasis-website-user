import Image from "next/image";
import Link from "next/link";

function FeaturedCabinCard({ cabin, large = false }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <Link href={`/cabins/${id}`} className="block h-full">
      <article
        className={`group relative rounded-xl overflow-hidden cursor-pointer h-full ${
          large ? "min-h-[500px]" : "min-h-[500px]"
        }`}
      >
        {/* Full-bleed Image */}
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80" />

        {/* Bottom Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end">
          <div
            className={`${
              large
                ? "glass-panel-light p-6 rounded-lg max-w-md backdrop-blur-md"
                : ""
            } transform transition-all duration-500 group-hover:translate-y-[-8px]`}
          >
            <h3
              className={`font-display ${
                large ? "text-headline-lg" : "text-headline-md"
              } text-on-surface mb-1`}
            >
              Cabin {name}
            </h3>

            {large && (
              <p className="font-body text-body-md text-on-surface-variant mb-4 line-clamp-2">
                A luxurious retreat designed to blend with its natural
                surroundings, offering uncompromised comfort for up to{" "}
                {maxCapacity} guests.
              </p>
            )}

            {!large && (
              <p className="font-body text-label-sm text-on-surface-variant mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">
                  landscape
                </span>
                Nature Retreat • Sleeps {maxCapacity}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="font-body text-body-lg text-on-surface font-semibold">
                {discount > 0 ? (
                  <>
                    ${regularPrice - discount}
                    <span className="text-on-surface-variant font-normal text-sm line-through ml-2">
                      ${regularPrice}
                    </span>
                  </>
                ) : (
                  <>${regularPrice}</>
                )}
                <span className="text-on-surface-variant font-normal text-sm">
                  {" "}
                  / night
                </span>
              </span>

              {large && (
                <span className="w-8 h-8 rounded-full border border-outline flex items-center justify-center text-on-surface group-hover:bg-secondary group-hover:text-on-secondary group-hover:border-secondary transition-colors">
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
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default FeaturedCabinCard;
