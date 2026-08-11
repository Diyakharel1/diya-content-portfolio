"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { platformMeta, type VideoLink } from "@/data/roster";
import { fetchIgMedia } from "@/lib/igMedia";
import {
  getEmbedSrc,
  getInstagramShortcode,
  getTikTokPlayerSrc,
} from "@/lib/video";

type Props = {
  open: boolean;
  brand: string;
  role: string;
  video: VideoLink | null;
  onClose: () => void;
};

export function VideoLightbox({ open, brand, role, video, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [remote, setRemote] = useState<{ url: string; mp4: string } | null>(
    null,
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !video) return;
    if (video.mp4 || video.linkOnly || video.platform !== "ig") return;
    const code = getInstagramShortcode(video.url);
    if (!code) return;
    let cancelled = false;
    fetchIgMedia(code).then((data) => {
      if (!cancelled && data?.videoUrl) {
        setRemote({ url: video.url, mp4: data.videoUrl });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [open, video]);

  const mp4 =
    video?.mp4 ||
    (video && remote?.url === video.url ? remote.mp4 : null) ||
    null;

  useEffect(() => {
    if (!open || !mp4 || !videoRef.current) return;
    const el = videoRef.current;
    el.setAttribute("referrerpolicy", "no-referrer");
    el.muted = false;
    el.volume = 1;
    void el.play().catch(() => {});
  }, [open, mp4]);

  const meta = video ? platformMeta[video.platform] : null;
  const embed =
    video && !video.linkOnly
      ? video.platform === "tiktok"
        ? getTikTokPlayerSrc(video.url, { muted: false, autoplay: true })
        : getEmbedSrc(video.platform, video.url)
      : null;

  return (
    <AnimatePresence>
      {open && video && meta && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${brand} video`}
            initial={{ opacity: 0, scale: 0.86, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative z-10 w-[min(100%,min(380px,56vh*9/16))]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -right-2 -top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-cream ring-1 ring-white/20 backdrop-blur-md transition hover:bg-accent"
              aria-label="Close video"
            >
              ✕
            </button>

            <div className="overflow-hidden rounded-2xl bg-black shadow-[0_30px_80px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
              <div className="relative aspect-[9/16] w-full max-h-[80vh] bg-black">
                {mp4 ? (
                  <video
                    ref={videoRef}
                    src={mp4}
                    className={`absolute inset-0 h-full w-full ${
                      video.naturalFit ? "object-contain" : "object-cover"
                    }`}
                    controls
                    playsInline
                    autoPlay
                    loop
                    preload="auto"
                  />
                ) : embed && video.platform === "ig" ? (
                  <iframe
                    src={embed}
                    title={`${brand} · ${video.label}`}
                    className={`absolute border-0 ${
                      video.naturalFit ? "reel-ig-natural" : "reel-ig-cover"
                    }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : embed ? (
                  <iframe
                    src={embed}
                    title={`${brand} · ${video.label}`}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-cream"
                  >
                    <span className="font-display text-2xl">{brand}</span>
                    <span className="max-w-[14rem] text-[13px] leading-relaxed text-white/70">
                      {video.linkPrompt ?? "Click the link to watch this video"}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-accent">
                      Open on {meta.label} ↗
                    </span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="font-display text-xl text-cream">{brand}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/45">
                {role} · {video.label}
              </p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[11px] uppercase tracking-[0.14em] text-accent"
              >
                Open on {meta.label} ↗
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
