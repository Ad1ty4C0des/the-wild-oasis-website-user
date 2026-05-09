import TextExpander from "./TextExpander";
import Image from "next/image";
import Reservation from "./Reservation";
import { Suspense } from "react";
import Spinner from "./Spinner";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="space-y-unit-xl">
      {/* Cabin Image */}
      <section className="max-w-container-max mx-auto">
        <div className="rounded-xl overflow-hidden relative aspect-[21/9]">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>
      </section>

      {/* Content Area — Details Left + Booking Widget Right */}
      <section className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-3 gap-element-gap">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-unit-xl">
          {/* Header */}
          <div>
            <h1 className="font-display text-headline-xl text-ds-primary mb-unit-sm">
              Cabin {name}
            </h1>
            <div className="flex gap-unit-lg mt-unit-md py-unit-md border-y border-outline-variant/30">
              <div className="flex flex-col">
                <span className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Guests
                </span>
                <span className="font-body text-body-md text-on-surface">
                  Up to {maxCapacity}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Bedrooms
                </span>
                <span className="font-body text-body-md text-on-surface">
                  {maxCapacity <= 2 ? "1 Bed" : maxCapacity <= 4 ? "2 Beds" : "3 Beds"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Bathrooms
                </span>
                <span className="font-body text-body-md text-on-surface">
                  {maxCapacity <= 2 ? "1 Bath" : "2 Baths"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Price
                </span>
                <span className="font-body text-body-md text-on-surface">
                  {discount > 0 ? (
                    <>
                      ${regularPrice - discount}
                      <span className="line-through text-on-surface-variant ml-2">
                        ${regularPrice}
                      </span>
                    </>
                  ) : (
                    <>${regularPrice}</>
                  )}
                  <span className="text-on-surface-variant"> / night</span>
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-display text-headline-md text-ds-primary mb-unit-md">
              About this space
            </h2>
            <div className="font-body text-body-md text-on-surface-variant leading-relaxed">
              <TextExpander>{description}</TextExpander>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-display text-headline-md text-ds-primary mb-unit-md">
              Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-unit-md">
              <AmenityItem icon="wifi" label="High-speed WiFi" />
              <AmenityItem icon="hot_tub" label="Private Hot Tub" />
              <AmenityItem icon="kitchen" label="Chef's Kitchen" />
              <AmenityItem icon="fireplace" label="Indoor Fireplace" />
              <AmenityItem icon="local_parking" label="Free Parking" />
              <AmenityItem icon="pets" label="Pet Friendly" />
              <AmenityItem icon="ac_unit" label="Air Conditioning" />
              <AmenityItem icon="landscape" label="Mountain View" />
              <AmenityItem icon="deck" label="Private Deck" />
            </div>
          </div>
        </div>

        {/* Right: Booking Widget (Sticky) */}
        <div className="lg:col-span-1 relative">
          <div className="sticky top-28">
            <Suspense fallback={<Spinner />}>
              <Reservation cabin={cabin} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}

function AmenityItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-surface-container/30 border border-outline-variant/20 hover:bg-surface-container/50 transition-colors duration-200">
      <span className="material-symbols-outlined text-secondary text-xl">
        {icon}
      </span>
      <span className="font-body text-body-md text-on-surface">{label}</span>
    </div>
  );
}

export default Cabin;
