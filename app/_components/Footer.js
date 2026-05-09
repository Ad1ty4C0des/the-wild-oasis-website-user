import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-16 border-t border-outline-variant mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-element-gap max-w-container-max mx-auto px-gutter">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <div className="font-display text-headline-lg text-ds-primary">
            The Wild Oasis
          </div>
          <p className="font-body text-label-md text-on-surface-variant opacity-80">
            Modern organic luxury escapes. Disconnect to reconnect.
          </p>
          <p className="font-body text-label-sm text-on-surface-variant opacity-60">
            © {new Date().getFullYear()} The Wild Oasis. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-3 flex flex-wrap gap-8 md:justify-end items-start">
          <Link
            href="/about"
            className="font-body text-label-md text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100"
          >
            About
          </Link>
          <Link
            href="/cabins"
            className="font-body text-label-md text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100"
          >
            Cabins
          </Link>
          <Link
            href="/account"
            className="font-body text-label-md text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100"
          >
            Guest Area
          </Link>
          <a
            href="#"
            className="font-body text-label-md text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-body text-label-md text-on-surface-variant hover:text-secondary transition-colors opacity-80 hover:opacity-100"
          >
            Sustainability
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
