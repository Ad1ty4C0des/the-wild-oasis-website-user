import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid bg-surface-container/60 backdrop-blur-sm">
      <p className="text-center text-body-lg py-12 self-center text-on-surface-variant">
        Please{" "}
        <Link
          href="/login"
          className="underline text-secondary hover:text-secondary-fixed transition-colors"
        >
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
