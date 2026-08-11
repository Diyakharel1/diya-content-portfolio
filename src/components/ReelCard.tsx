"use client";

import { useEffect, useRef, useState } from "react";
import { platformMeta, type VideoLink } from "@/data/roster";
import { fetchIgMedia, type IgMedia } from "@/lib/igMedia";
import {
  getEmbedSrc,
  getInstagramShortcode,
  getTikTokPlayerSrc,
} from "@/lib/video";

type Props = {
  video: VideoLink;
  brand: string;
  role: string;
  onOpen: () => void;
};

export function ReelCard({ video, brand, role, onOpen }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [igMedia, setIgMedia] = useState<IgMedia | null>(null);
  const [igFetchDone, setIgFetchDone] = useState(false);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const meta = platformMeta[video.platform];
  const linkOnly = Boolean(video.linkOnly);
  const shortcode =
    video.platform === "ig" ? getInstagramShortcode(video.url) : null;
  const candidateMp4 = linkOnly ? undefined : video.mp4 || igMedia?.videoUrl;
  const mp4 =
    candidateMp4 && candidateMp4 !== failedSrc ? candidateMp4 : undefined;
  const poster = linkOnly ? undefined : video.poster || igMedia?.posterUrl;
  const mediaFit = video.naturalFit ? "object-contain" : "object-cover";
  const igResolved =
    video.platform !== "ig" ||
    Boolean(video.mp4) ||
    linkOnly ||
    !shortcode ||
    igFetchDone;

  const tiktokSrc =
    !linkOnly && video.platform === "tiktok"
      ? getTikTokPlayerSrc(video.url, { muted: true, autoplay: true })
      : null;

  const fbSrc =
    !linkOnly && video.platform === "fb" ? getEmbedSrc("fb", video.url) : null;

  // Instagram iframe embeds do not muted-autoplay reliably; only use as last resort
  const igEmbedFallback =
    !linkOnly &&
    video.platform === "ig" &&
    igResolved &&
    !mp4 &&
    !poster
      ? getEmbedSrc("ig", video.url)
      : null;

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "480px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || linkOnly || video.platform !== "ig" || video.mp4) return;
    if (!shortcode) return;
    let cancelled = false;
    fetchIgMedia(shortcode).then((data) => {
      if (cancelled) return;
      if (data) setIgMedia(data);
      setIgFetchDone(true);
    });
    return () => {
      cancelled = true;
    };
  }, [visible, linkOnly, video.platform, video.mp4, shortcode]);

  useEffect(() => {
    if (!visible || !mp4 || !videoRef.current) return;
    const el = videoRef.current;
    el.setAttribute("referrerpolicy", "no-referrer");
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    const tryPlay = () => {
      void el.play().catch(() => {});
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    return () => el.removeEventListener("loadeddata", tryPlay);
  }, [visible, mp4]);

  const showSkeleton =
    !linkOnly &&
    (!visible || (video.platform === "ig" && !igResolved && !mp4 && !poster));

  return (
    <article className="flex flex-col">
      <button
        ref={shellRef}
        type="button"
        onClick={onOpen}
        className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black text-left shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:ring-accent/50"
        aria-label={
          linkOnly
            ? `Open ${brand} video on ${meta.label}`
            : `Play ${brand} video`
        }
      >
        {linkOnly ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#1c2a28] to-black px-5 text-center">
            <span className="font-display text-xl text-cream">{brand}</span>
            <span className="max-w-[12rem] text-[12px] leading-relaxed text-white/70">
              {video.linkPrompt ?? "Click the link to watch this video"}
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-accent">
              Open on {meta.label} →
            </span>
          </div>
        ) : null}

        {/* Poster under video; shows immediately while mp4 buffers */}
        {visible && poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            referrerPolicy="no-referrer"
            className={`absolute inset-0 h-full w-full ${mediaFit}`}
          />
        ) : null}

        {/* Native muted autoplay; no-referrer required for Instagram CDN */}
        {visible && mp4 ? (
          <video
            ref={videoRef}
            src={mp4}
            poster={poster}
            className={`absolute inset-0 h-full w-full ${mediaFit}`}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onError={() => setFailedSrc(mp4)}
          />
        ) : null}

        {/* TikTok muted autoplay player */}
        {visible && !mp4 && tiktokSrc ? (
          <iframe
            src={tiktokSrc}
            title={`${brand} preview`}
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
            tabIndex={-1}
          />
        ) : null}

        {visible && !mp4 && fbSrc ? (
          <iframe
            src={fbSrc}
            title={`${brand} preview`}
            className="reel-ig-cover pointer-events-none absolute border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
            tabIndex={-1}
          />
        ) : null}

        {visible && igEmbedFallback ? (
          <iframe
            src={igEmbedFallback}
            title={`${brand} preview`}
            className={
              video.naturalFit
                ? "reel-ig-natural pointer-events-none absolute border-0"
                : "reel-ig-cover pointer-events-none absolute border-0"
            }
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
            tabIndex={-1}
          />
        ) : null}

        {visible &&
        !linkOnly &&
        igResolved &&
        !mp4 &&
        !tiktokSrc &&
        !igEmbedFallback &&
        !fbSrc &&
        !poster ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#1c2a28] to-black px-3 text-center">
            <span className="font-display text-xl text-cream">{brand}</span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-accent">
              Tap to watch
            </span>
          </div>
        ) : null}

        {showSkeleton ? (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-[#1a2220] to-black" />
        ) : null}

        <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-sm bg-black/50 px-2 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5" style={{ background: meta.color }} />
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/90">
            {meta.short}
          </span>
        </div>

        {!linkOnly ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-base text-cream ring-1 ring-white/35 backdrop-blur-md">
              ▶
            </span>
          </div>
        ) : null}
      </button>

      <div className="mt-3 px-0.5">
        <h3 className="font-display text-lg leading-tight text-cream line-clamp-2">
          {brand}
        </h3>
        <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/45">
          {role} · {video.label}
        </p>
      </div>
    </article>
  );
}
