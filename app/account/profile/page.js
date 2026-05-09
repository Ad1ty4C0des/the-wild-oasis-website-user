import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-display text-headline-lg text-on-surface mb-2">
        Update your guest profile
      </h2>

      <p className="font-body text-body-md text-on-surface-variant mb-8">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-4 py-3 bg-surface-container-high border border-outline-variant/50 text-on-surface w-full rounded-lg focus:ring-1 focus:ring-secondary focus:border-secondary transition-colors"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
