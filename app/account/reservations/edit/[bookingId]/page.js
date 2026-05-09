import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;
  const { numGuests, observations, cabinId } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="font-display text-headline-lg text-on-surface mb-2">
        Edit Reservation #{bookingId}
      </h2>
      <p className="font-body text-body-md text-on-surface-variant mb-8">
        Update details for your upcoming stay.
      </p>

      <form
        action={updateBooking}
        className="glass-panel-subtle rounded-xl py-8 px-8 flex gap-6 flex-col"
      >
        <input type="hidden" value={bookingId} name="bookingId" />
        <div className="space-y-2">
          <label
            htmlFor="numGuests"
            className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider"
          >
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-4 py-3 bg-surface-container-high border border-outline-variant/50 text-on-surface w-full rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="observations"
            className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider"
          >
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-4 py-3 bg-surface-container-high border border-outline-variant/50 text-on-surface w-full rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors min-h-[100px] resize-none"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel={"Updating..."}>
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
