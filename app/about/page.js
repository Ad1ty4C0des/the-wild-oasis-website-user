import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import Image from "next/image";
import Link from "next/link";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="pt-24 pb-section-padding">
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center px-gutter py-section-padding overflow-hidden mb-0">
        <div className="absolute inset-0 z-0">
          <Image
            src={image1}
            placeholder="blur"
            quality={80}
            fill
            alt="Misty forest at dawn"
            className="object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-element-gap">
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-ds-primary tracking-tight">
            Return to Nature.
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            We believe in the profound power of stillness. The Wild Oasis was
            born from a desire to create sanctuaries where the modern world
            falls away, leaving only the raw beauty of the wilderness and the
            space to breathe.
          </p>
        </div>
      </section>

      {/* Philosophy Section (Bento Grid) */}
      <section className="max-w-container-max mx-auto px-gutter py-section-padding">
        <div className="mb-unit-xl text-center">
          <h2 className="font-display text-headline-xl text-ds-primary mb-unit-sm">
            Our Philosophy
          </h2>
          <p className="font-body text-body-md text-on-surface-variant max-w-xl mx-auto">
            Luxury is not found in excess, but in the perfection of the
            essential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-element-gap auto-rows-[400px]">
          {/* Bento Item 1: Large Image */}
          <div className="md:col-span-8 rounded-xl overflow-hidden relative group">
            <Image
              src={image1}
              placeholder="blur"
              quality={80}
              fill
              alt="The Wild Oasis cabin in the forest"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-unit-lg">
              <h3 className="font-display text-headline-md text-ds-primary mb-unit-xs">
                Architectural Harmony
              </h3>
              <p className="font-body text-body-md text-on-surface-variant max-w-md">
                Every cabin is designed to whisper, not shout, sitting lightly
                upon the earth.
              </p>
            </div>
          </div>

          {/* Bento Item 2: Glass Text Box */}
          <div className="md:col-span-4 bg-surface-container/40 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-unit-lg flex flex-col justify-center">
            <div className="text-secondary text-4xl mb-unit-md">🌿</div>
            <h3 className="font-display text-headline-md text-on-surface mb-unit-sm">
              Digital Detox
            </h3>
            <p className="font-body text-body-md text-on-surface-variant">
              We deliberately design our spaces to encourage disconnection from
              screens and reconnection with the rhythms of the natural world.
            </p>
          </div>

          {/* Bento Item 3: Glass Text Box */}
          <div className="md:col-span-5 bg-surface-container/40 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-unit-lg flex flex-col justify-center">
            <div className="text-secondary text-4xl mb-unit-md">♻️</div>
            <h3 className="font-display text-headline-md text-on-surface mb-unit-sm">
              Radical Sustainability
            </h3>
            <p className="font-body text-body-md text-on-surface-variant">
              Operating entirely off-grid, utilizing solar power, rainwater
              harvesting, and composting systems. We aim to leave the land
              better than we found it.
            </p>
          </div>

          {/* Bento Item 4: Medium Image */}
          <div className="md:col-span-7 rounded-xl overflow-hidden relative group">
            <Image
              src={image2}
              fill
              alt="Wild Oasis team"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-unit-lg">
              <h3 className="font-display text-headline-md text-ds-primary mb-unit-xs">
                Family Heritage Since 1962
              </h3>
              <p className="font-body text-body-md text-on-surface-variant max-w-md">
                Managed by our family for over 60 years — where tradition meets
                tranquility.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/cabins"
            className="inline-flex items-center gap-3 bg-secondary text-on-secondary px-10 py-4 rounded font-body text-label-md hover:scale-[1.02] transition-transform duration-300 shadow-[0_4px_14px_rgba(198,153,99,0.3)]"
          >
            Explore our luxury cabins
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
      </section>
    </div>
  );
}
