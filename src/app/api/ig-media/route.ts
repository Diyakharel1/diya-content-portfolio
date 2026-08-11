import { NextRequest, NextResponse } from "next/server";
import { getInstagramShortcode } from "@/lib/video";

export const runtime = "nodejs";

type MediaPayload = {
  videoUrl?: string;
  posterUrl?: string;
};

function decodeIg(str: string) {
  let out = str;
  let prev = "";
  // Instagram double-escapes URLs in embed HTML (\\\/ → \/ → /)
  while (out !== prev) {
    prev = out;
    out = out
      .replace(/\\u0026/gi, "&")
      .replace(/\\u00253D/gi, "=")
      .replace(/\\u0025/gi, "%")
      .replace(/\\(.)/g, "$1");
  }
  return out;
}

function extractMedia(html: string): MediaPayload {
  // Instagram embed HTML escapes quotes as \\" and slashes as \\/
  const videoMatchers = [
    /video_url\\":\\"(.*?)\\"/,
    /"video_url":"(.*?)"/,
    /contentUrl\\":\\"(.*?)\\"/,
    /"contentUrl":"(.*?)"/,
  ];
  const posterMatchers = [
    /display_url\\":\\"(.*?)\\"/,
    /"display_url":"(.*?)"/,
    /thumbnail_src\\":\\"(.*?)\\"/,
    /"thumbnail_src":"(.*?)"/,
  ];

  let videoUrl: string | undefined;
  let posterUrl: string | undefined;

  for (const re of videoMatchers) {
    const m = html.match(re);
    if (m?.[1]) {
      videoUrl = decodeIg(m[1]);
      break;
    }
  }
  for (const re of posterMatchers) {
    const m = html.match(re);
    if (m?.[1]) {
      posterUrl = decodeIg(m[1]);
      break;
    }
  }

  return { videoUrl, posterUrl };
}

export async function GET(req: NextRequest) {
  const codeParam = req.nextUrl.searchParams.get("code");
  const urlParam = req.nextUrl.searchParams.get("url");
  const code =
    codeParam || (urlParam ? getInstagramShortcode(urlParam) : null);

  if (!code) {
    return NextResponse.json({ error: "missing code" }, { status: 400 });
  }

  const endpoints = [
    `https://www.instagram.com/reel/${code}/embed/captioned/`,
    `https://www.instagram.com/reel/${code}/embed/`,
    `https://www.instagram.com/p/${code}/embed/`,
  ];

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    Accept: "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
  };

  const cacheHeaders = {
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  };

  // Race endpoints; first usable media wins (faster cold loads for the grid)
  const controllers = endpoints.map(() => new AbortController());
  const attempts = endpoints.map(async (endpoint, i) => {
    const res = await fetch(endpoint, {
      headers,
      signal: controllers[i].signal,
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const html = await res.text();
    const media = extractMedia(html);
    if (!media.videoUrl && !media.posterUrl) throw new Error("empty");
    return media;
  });

  // Prevent unhandled rejections from losers after the race settles
  for (const attempt of attempts) {
    void attempt.catch(() => {});
  }

  try {
    const media = await Promise.any(attempts);
    controllers.forEach((c) => c.abort());
    return NextResponse.json(media, { headers: cacheHeaders });
  } catch {
    // all endpoints failed
  }

  return NextResponse.json({ error: "unavailable" }, { status: 404 });
}
