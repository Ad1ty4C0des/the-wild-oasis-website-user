import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 z-10 group"
    >
      <Image
        src={logo}
        quality={100}
        height="44"
        width="44"
        alt="The Wild Oasis logo"
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <span className="font-display text-headline-md font-bold text-ds-primary tracking-tight">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
