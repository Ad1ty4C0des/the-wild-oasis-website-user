import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10">
      <ul className="flex items-center gap-unit-lg">
        <li>
          <Link
            href="/cabins"
            className="font-body text-label-md text-on-surface-variant hover:text-ds-primary transition-colors duration-300 hover:bg-white/5 px-3 py-2 rounded-lg"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="font-body text-label-md text-on-surface-variant hover:text-ds-primary transition-colors duration-300 hover:bg-white/5 px-3 py-2 rounded-lg"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="font-body text-label-md text-on-surface-variant hover:text-ds-primary transition-colors duration-300 flex items-center gap-3 hover:bg-white/5 px-3 py-2 rounded-lg"
            >
              <img
                className="h-8 w-8 rounded-full ring-2 ring-outline-variant"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="font-body text-label-md text-on-surface-variant hover:text-ds-primary transition-colors duration-300 hover:bg-white/5 px-3 py-2 rounded-lg"
            >
              Guest area
            </Link>
          )}
        </li>
        <li>
          <Link
            href="/cabins"
            className="bg-secondary text-on-secondary px-6 py-2.5 rounded-full font-body text-label-md hover:opacity-90 transition-opacity duration-300 shadow-[0_0_15px_rgba(198,153,99,0.2)]"
          >
            Book Now
          </Link>
        </li>
      </ul>
    </nav>
  );
}
