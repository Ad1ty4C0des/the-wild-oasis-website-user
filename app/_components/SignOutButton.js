import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex items-center gap-3 px-4 py-3 rounded-lg font-body text-label-md text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors w-full">
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-on-surface-variant" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
