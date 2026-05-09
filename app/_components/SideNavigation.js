"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-on-surface-variant" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-on-surface-variant" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-on-surface-variant" />,
  },
];

function SideNavigation() {
  const pathName = usePathname();

  return (
    <aside>
      <div className="glass-panel-subtle rounded-xl p-unit-md sticky top-[120px]">
        <nav className="flex flex-col gap-unit-xs">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-label-md transition-colors duration-300 ${
                pathName === link.href
                  ? "bg-ds-primary/10 text-ds-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          <div className="mt-4 pt-4 border-t border-white/10">
            <SignOutButton />
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default SideNavigation;
