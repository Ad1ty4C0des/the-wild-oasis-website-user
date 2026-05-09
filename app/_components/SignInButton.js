import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-4 font-body text-label-md glass-panel px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-on-surface group">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
          className="group-hover:scale-110 transition-transform"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
