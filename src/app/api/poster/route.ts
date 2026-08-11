import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Resolves a poster/thumbnail for IG or TikTok so grid cards can show
 * video-only covers without Instagram embed chrome.
 */
export async function GET(req: NextRequest) {
  const platform = req.nextUrl.searchParams.get("platform");
  const code = req.nextUrl.searchParams.get("code");
  const url = req.nextUrl.searchParams.get("url");

  try {
    if (platform === "tiktok" && url) {
      const oembed = await fetch(
        `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
        { next: { revalidate: 86400 } },
      );
      if (oembed.ok) {
        const data = (await oembed.json()) as { thumbnail_url?: string };
        if (data.thumbnail_url) {
          return NextResponse.redirect(data.thumbnail_url, 302);
        }
      }
    }

    if (platform === "ig" && code) {
      // Instagram media redirect (works for many public posts)
      const media = await fetch(
        `https://www.instagram.com/p/${code}/media/?size=l`,
        {
          redirect: "manual",
          headers: { "User-Agent": "Mozilla/5.0" },
          next: { revalidate: 86400 },
        },
      );
      const location = media.headers.get("location");
      if (location) {
        return NextResponse.redirect(location, 302);
      }

      // Fallback: parse embed page for poster image
      const embed = await fetch(
        `https://www.instagram.com/reel/${code}/embed/`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
          next: { revalidate: 86400 },
        },
      );
      if (embed.ok) {
        const html = await embed.text();
        const og =
          html.match(
            /property="og:image"\s+content="([^"]+)"/,
          )?.[1] ||
          html.match(/content="([^"]+)"\s+property="og:image"/)?.[1] ||
          html.match(/"display_url":"([^"]+)"/)?.[1]?.replace(/\\u0026/g, "&");
        if (og) {
          return NextResponse.redirect(og.replace(/\\u0026/g, "&"), 302);
        }
      }
    }
  } catch {
    // fall through
  }

  return new NextResponse(null, { status: 404 });
}
