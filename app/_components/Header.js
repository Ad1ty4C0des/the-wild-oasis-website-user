import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center px-4 md:px-gutter py-3 md:py-unit-md max-w-container-max mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
