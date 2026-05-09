import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div className="pt-32 pb-section-padding">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Page Header */}
        <div className="mb-unit-xl text-center md:text-left max-w-2xl">
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface mb-unit-sm">
            Our Cabins
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant">
            Discover your perfect sanctuary. Each of our cabins is uniquely
            designed to blend luxurious comfort with the raw beauty of the
            surrounding wilderness.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-start mb-unit-xl">
          <Filter />
        </div>

        {/* Cabins Grid */}
        <Suspense fallback={<Spinner />} key={filter}>
          <CabinList filter={filter} />
          <ReservationReminder />
        </Suspense>
      </div>
    </div>
  );
}
