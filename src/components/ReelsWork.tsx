"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  getReelCards,
  mergeBrandEntries,
  platformMeta,
  roster,
  rosterCategories,
  type BrandEntry,
  type VideoLink,
} from "@/data/roster";
import { prefetchIgMedia } from "@/lib/igMedia";
import { getInstagramShortcode } from "@/lib/video";
import { ReelCard } from "./ReelCard";
import { VideoLightbox } from "./VideoLightbox";

/** Desktop grid is 4 columns → 2 rows = 8 cards initially */
const INITIAL_LIMIT = 8;

export function ReelsWork() {
  const [reelCategory, setReelCategory] = useState<string>("All");
  const [rosterCategory, setRosterCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<{
    brand: string;
    role: string;
    video: VideoLink;
  } | null>(null);

  const reels = useMemo(() => {
    const cards =
      reelCategory === "All" ? getReelCards() : getReelCards(reelCategory);
    return cards.filter((reel) => reel.brand !== "Biraj Dental");
  }, [reelCategory]);

  const visibleReels = expanded ? reels : reels.slice(0, INITIAL_LIMIT);
  const canToggle = reels.length > INITIAL_LIMIT;

  // Warm Instagram media for the cards about to show (shared client cache)
  useEffect(() => {
    const codes = visibleReels
      .map((reel) => {
        const v = reel.featured;
        if (v.platform !== "ig" || v.mp4 || v.linkOnly) return null;
        return getInstagramShortcode(v.url);
      })
      .filter((code): code is string => Boolean(code));
    prefetchIgMedia(codes);
  }, [visibleReels]);

  const filteredRoster = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cats =
      rosterCategory === "All"
        ? roster
        : roster.filter((cat) => cat.category === rosterCategory);

    const matchesQuery = (brand: BrandEntry) =>
      !q || brand.brand.toLowerCase().includes(q);

    if (rosterCategory === "All") {
      const merged = mergeBrandEntries(
        cats.flatMap((cat) => cat.brands).filter(matchesQuery),
      );
      return merged.length
        ? [{ category: "All brands", brands: merged }]
        : [];
    }

    return cats
      .map((cat) => ({
        ...cat,
        brands: mergeBrandEntries(cat.brands.filter(matchesQuery)),
      }))
      .filter((cat) => cat.brands.length > 0);
  }, [query, rosterCategory]);

  return (
    <section id="work" className="scroll-mt-24">
      <div className="bg-film py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="mb-4 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-accent">
              <span className="block h-px w-6 bg-accent" />
              Selected Collaborations
            </p>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-tight text-cream">
              Work in <em className="text-accent not-italic">Reels</em>
            </h2>
            <div className="mt-4 h-px w-14 bg-accent" />
            <p className="mt-5 text-[15px] leading-relaxed text-white/55">
              Selected brand videos from past and recent collaborations. Tap any
              clip to watch with sound.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            {["All", ...rosterCategories].map((cat) => {
              const activeCat = reelCategory === cat;
              return (
                <button
                  key={`reel-${cat}`}
                  type="button"
                  onClick={() => {
                    setReelCategory(cat);
                    setExpanded(false);
                  }}
                  className={`border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition ${
                    activeCat
                      ? "border-accent bg-accent text-cream"
                      : "border-white/15 text-white/55 hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {visibleReels.map((reel, i) => (
              <motion.div
                key={`${reel.brand}-${reel.featured.url}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: Math.min(i * 0.03, 0.24), duration: 0.5 }}
              >
                <ReelCard
                  video={reel.featured}
                  brand={reel.brand}
                  role={reel.role}
                  onOpen={() => {
                    if (reel.featured.linkOnly) {
                      window.open(
                        reel.featured.url,
                        "_blank",
                        "noopener,noreferrer",
                      );
                      return;
                    }
                    setActive({
                      brand: reel.brand,
                      role: reel.role,
                      video: reel.featured,
                    });
                  }}
                />
              </motion.div>
            ))}
          </div>

          {canToggle && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="border border-white/20 px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition hover:border-accent hover:text-accent"
              >
                {expanded
                  ? "View Less"
                  : `View More (${reels.length - INITIAL_LIMIT} more)`}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-2xl text-ink">Full brand roster</h3>
              <p className="mt-1 text-sm text-muted">
                Click a platform button to watch more videos from each brand.
              </p>
            </div>
            <label className="block w-full sm:max-w-xs">
              <span className="sr-only">Filter brands</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by brand…"
                className="w-full border border-line bg-bg px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted-soft focus:border-accent"
              />
            </label>
          </div>

          {/* Independent filter; does not affect the reels grid above */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {["All", ...rosterCategories].map((cat) => {
              const activeCat = rosterCategory === cat;
              return (
                <button
                  key={`roster-${cat}`}
                  type="button"
                  onClick={() => setRosterCategory(cat)}
                  className={`border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition ${
                    activeCat
                      ? "border-accent bg-accent text-cream"
                      : "border-line text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="mt-10 space-y-12">
            {filteredRoster.map((cat) => (
              <div key={cat.category}>
                {rosterCategory !== "All" ? (
                  <div className="mb-5 flex items-center gap-4">
                    <div className="h-px flex-1 bg-line" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-soft">
                      {cat.category}
                    </p>
                    <div className="h-px flex-1 bg-line" />
                  </div>
                ) : null}
                <ul className="space-y-6">
                  {cat.brands.map((brand) => (
                    <li
                      key={brand.brand}
                      className="border-b border-line pb-6 last:border-0"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-display text-xl text-ink">
                          {brand.brand}
                        </h4>
                        <span className="text-[11px] uppercase tracking-[0.14em] text-muted-soft">
                          {brand.role}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {brand.videos.map((video) => {
                          const meta = platformMeta[video.platform];
                          return (
                            <a
                              key={video.url}
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 border border-line px-3 py-1.5 text-[12px] text-muted transition hover:border-accent hover:text-accent"
                            >
                              <span
                                className="h-1.5 w-1.5"
                                style={{ background: meta.color }}
                              />
                              {video.label}
                            </a>
                          );
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {filteredRoster.length === 0 && (
              <p className="text-sm text-muted">No brands match that filter.</p>
            )}
          </div>
        </div>
      </div>

      <VideoLightbox
        open={Boolean(active)}
        brand={active?.brand ?? ""}
        role={active?.role ?? ""}
        video={active?.video ?? null}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
