import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen pt-24 px-gutter">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="font-display text-headline-xl text-on-surface">
          Welcome back
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant">
          Sign in to access your guest area, manage reservations, and plan your
          next escape.
        </p>
      </div>
      <SignInButton />
    </div>
  );
}
