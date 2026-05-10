import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";
import { getCabins } from "./_lib/data-service";
import FeaturedCabinCard from "./_components/FeaturedCabinCard";

export default async function Home() {
  const cabins = await getCabins();
  const featuredCabins = cabins?.slice(0, 3) || [];

  return (
    <main>
      {/* Hero Section (Cinematic) */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-section-padding overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={bg}
            fill
            placeholder="blur"
            quality={80}
            className="object-cover object-center scale-105"
            alt="Mountains and forests with luxury cabins"
            priority
          />
          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-container-max mx-auto px-gutter text-center w-full">
          <span className="font-body text-label-md text-secondary tracking-[0.2em] uppercase mb-6 block drop-shadow-md">
            Welcome to Seclusion
          </span>
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface mb-8 max-w-4xl mx-auto drop-shadow-lg">
            Escape the Noise. <br className="hidden md:block" /> Reconnect with
            Nature.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12 drop-shadow">
            Experience modern organic luxury in our secluded cabins. A sanctuary
            where raw nature meets sophisticated design.
          </p>

          {/* CTA */}
          <Link
            href="/cabins"
            className="inline-flex items-center gap-3 bg-secondary text-on-secondary px-10 py-4 rounded font-body text-label-md hover:scale-[1.02] transition-transform duration-300 shadow-[0_4px_14px_rgba(198,153,99,0.3)]"
          >
            Explore Cabins
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 opacity-60 animate-bounce">
            <span className="font-body text-label-sm text-on-surface tracking-widest uppercase">
              Scroll
            </span>
            <svg
              className="w-5 h-5 text-on-surface"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Cabins Section */}
      {featuredCabins.length > 0 && (
        <section className="py-section-padding px-gutter max-w-container-max mx-auto relative z-20 bg-background">
          <div className="mb-16 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-headline-xl text-on-surface mb-4">
                Curated Sanctuaries
              </h2>
              <p className="font-body text-body-lg text-on-surface-variant">
                Each cabin is uniquely designed to harmonize with its
                surroundings, offering uncompromised comfort in the wild.
              </p>
            </div>
            <Link
              className="hidden md:inline-flex items-center gap-2 font-body text-label-md text-secondary hover:text-secondary-fixed transition-colors border-b border-transparent hover:border-secondary pb-1 mt-6 md:mt-0"
              href="/cabins"
            >
              View All Cabins
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Bento Grid — 8/4 split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-element-gap">
            {/* Featured Large Cabin */}
            <div className="md:col-span-8">
              <FeaturedCabinCard cabin={featuredCabins[0]} large={true} />
            </div>
            {/* Secondary Cabin */}
            {featuredCabins[1] && (
              <div className="md:col-span-4">
                <FeaturedCabinCard cabin={featuredCabins[1]} />
              </div>
            )}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link
              className="inline-flex items-center justify-center w-full glass-panel text-on-surface py-3 px-6 rounded font-body text-label-md"
              href="/cabins"
            >
              View All Cabins
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
