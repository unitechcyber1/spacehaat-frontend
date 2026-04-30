import Image from "next/image";
import Link from "next/link";

const BANNER_IMAGE =
  "https://img.spacehaat.com/images/f227d40da784346e41e08805ae8b5cfb5507e195.webp";

/**
 * Giggster-style host CTA: crisp 50/50 split (black | photo).
 * Width follows SectionWrapper Container; desktop height 40rem.
 */
export function HostListingCtaBanner() {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-[1.75rem] shadow-[0_28px_90px_rgba(15,23,42,0.26)] sm:rounded-[1.9rem] md:rounded-[2rem] lg:rounded-[2.1rem]">
        <div className="grid min-h-0 grid-cols-1 md:grid-cols-2 md:min-h-[40rem]">
          {/* Left: solid black — half width, flush seam */}
          <div className="order-2 flex flex-col justify-center bg-black px-8 py-12 sm:px-10 sm:py-14 md:order-1 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-14">
            <BannerCopy />
          </div>

          {/* Right: full-height image */}
          <div className="relative order-1 min-h-[16rem] w-full sm:min-h-[18rem] md:order-2 md:min-h-0 md:h-full">
            <Image
              src={BANNER_IMAGE}
              alt="Professional host in a bright workspace"
              fill
              className="object-cover object-[center_22%] md:object-[center_26%]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerCopy() {
  return (
    <>
      <h2 className="font-display text-[1.85rem] font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] xl:text-[2.65rem] xl:leading-[1.05]">
        <span className="block">Earn as a</span>
        <span className="block">SpaceHaat Host</span>
      </h2>
      <p className="mt-4 text-base font-normal leading-relaxed text-white/95 md:mt-5 md:text-lg lg:text-xl">
        Host what works for you
      </p>
      <div className="mt-8 md:mt-9">
        <Link
          href="/list-your-space"
          className="inline-flex items-center justify-center rounded-xl bg-[color:var(--color-brand)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(76,175,80,0.45)] transition duration-200 hover:bg-[color:var(--color-accent)] hover:shadow-[0_16px_44px_rgba(46,125,50,0.5)] md:px-9 md:py-4 md:text-base"
        >
          List your Space
        </Link>
      </div>
    </>
  );
}
