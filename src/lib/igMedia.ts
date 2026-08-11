export type IgMedia = {
  videoUrl?: string;
  posterUrl?: string;
};

const cache = new Map<string, Promise<IgMedia | null>>();

/** Shared client cache so grid cards + lightbox don't re-fetch the same reel. */
export function fetchIgMedia(code: string): Promise<IgMedia | null> {
  const existing = cache.get(code);
  if (existing) return existing;

  const request = fetch(`/api/ig-media?code=${encodeURIComponent(code)}`)
    .then((r) => (r.ok ? (r.json() as Promise<IgMedia>) : null))
    .then((data) => {
      if (!data?.videoUrl && !data?.posterUrl) return null;
      return data;
    })
    .catch(() => null);

  cache.set(code, request);
  return request;
}

export function prefetchIgMedia(codes: string[]) {
  for (const code of codes) {
    if (code) void fetchIgMedia(code);
  }
}
