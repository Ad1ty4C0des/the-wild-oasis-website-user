import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const firstName = session.user.name?.split(" ").at(0) || "Guest";

  return (
    <div className="space-y-unit-xl">
      <header>
        <h1 className="font-display text-headline-xl text-on-surface mb-unit-sm">
          Welcome back, {firstName}.
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-2xl">
          Manage your upcoming stays, review past escapes, and update your
          preferences for your next retreat into nature.
        </p>
      </header>
    </div>
  );
}
