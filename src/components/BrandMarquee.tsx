import { site } from "@/data/site";

export function BrandMarquee() {
  const items = [...site.tickerBrands, ...site.tickerBrands];

  return (
    <section
      aria-label="Brands worked with"
      className="relative overflow-hidden border-y border-white/10 bg-film py-2.5 md:py-3"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-film to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-film to-transparent md:w-28" />
      <div className="marquee-track gap-12 px-4 md:gap-16">
        {items.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="inline-flex items-center gap-12 whitespace-nowrap md:gap-16"
          >
            <span className="font-display text-[1.05rem] font-medium tracking-[0.04em] text-cream md:text-[1.25rem]">
              {brand}
            </span>
            <span className="text-[0.7rem] text-accent md:text-[0.85rem]" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
