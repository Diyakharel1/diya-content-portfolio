import type { Platform } from "@/data/roster";

export function getTikTokVideoId(url: string): string | null {
  const match = url.match(/\/video\/(\d+)/);
  return match?.[1] ?? null;
}

export function getInstagramShortcode(url: string): string | null {
  const match = url.match(/\/(?:reel|p|tv)\/([^/?#]+)/);
  return match?.[1] ?? null;
}

/** TikTok IDs that return “Video currently unavailable” in embeds. */
const BLOCKED_TIKTOK_IDS = new Set([
  "7660870004753091860",
  "7661622867242667284",
]);

/** TikTok official player; clean video frame (no caption chrome). */
export function getTikTokPlayerSrc(
  url: string,
  opts: { muted?: boolean; autoplay?: boolean } = {},
): string | null {
  const videoId = getTikTokVideoId(url);
  if (!videoId || BLOCKED_TIKTOK_IDS.has(videoId)) return null;
  const muted = opts.muted ?? false;
  const autoplay = opts.autoplay ?? false;
  const params = new URLSearchParams({
    music_info: "0",
    description: "0",
    autoplay: autoplay ? "1" : "0",
    loop: "1",
    native_context_menu: "0",
    closed_caption: "0",
  });
  if (muted) params.set("muted", "1");
  return `https://www.tiktok.com/player/v1/${videoId}?${params.toString()}`;
}

export function getEmbedSrc(platform: Platform, url: string): string | null {
  if (platform === "ig") {
    return `${url.replace(/\/$/, "")}/embed`;
  }
  if (platform === "tiktok") {
    return getTikTokPlayerSrc(url, { muted: false, autoplay: false });
  }
  if (platform === "fb") {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=320&height=580`;
  }
  return null;
}

export function posterApiUrl(platform: Platform, url: string): string | null {
  if (platform === "ig") {
    const code = getInstagramShortcode(url);
    return code ? `/api/poster?platform=ig&code=${encodeURIComponent(code)}` : null;
  }
  if (platform === "tiktok") {
    return `/api/poster?platform=tiktok&url=${encodeURIComponent(url)}`;
  }
  return null;
}
