import { Suspense } from "react";
import RealtimeReservation from "./RealtimeReservation";
import DemandBadge from "./DemandBadge";
import PricingInsight from "./PricingInsight";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { getCabinDemandData } from "../_lib/demand-service";
import { auth } from "../_lib/auth";

async function Reservation({ cabin }) {
  const [settings, bookedDates, demandData] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
    getCabinDemandData(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className="rounded-xl bg-surface-container/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(26,46,38,0.2)] overflow-hidden">
      {/* Price Header + Dynamic Demand Badge */}
      <div className="px-unit-lg pt-unit-lg pb-unit-md space-y-3">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <span className="font-display text-headline-lg text-ds-primary">
              {cabin.discount > 0 ? (
                <>
                  ${cabin.regularPrice - cabin.discount}
                  <span className="text-body-md text-on-surface-variant line-through ml-2">
                    ${cabin.regularPrice}
                  </span>
                </>
              ) : (
                <>${cabin.regularPrice}</>
              )}
            </span>
            <span className="font-body text-body-md text-on-surface-variant">
              {" "}
              / night
            </span>
          </div>

          {demandData && (
            <DemandBadge demandLevel={demandData.currentDemandLevel} />
          )}
        </div>

        {/* AI-Powered Pricing Insight */}
        {demandData && (
          <Suspense
            fallback={
              <div className="h-12 bg-surface-container-high/40 rounded-xl animate-pulse" />
            }
          >
            <PricingInsight cabin={cabin} demandData={demandData} />
          </Suspense>
        )}
      </div>

      {/* Realtime Date Selector + Reservation Form */}
      <RealtimeReservation
        cabin={cabin}
        settings={settings}
        initialBookedDates={bookedDates}
        user={session?.user ?? null}
        dailyDemand={demandData?.dailyDemand ?? null}
      />
    </div>
  );
}

export default Reservation;
