export type Platform = "ig" | "tiktok" | "fb";

export type VideoLink = {
  platform: Platform;
  url: string;
  label: string;
  /** Optional self-hosted file for clean muted autoplay + lightbox with sound */
  mp4?: string;
  /** Optional custom poster image */
  poster?: string;
  /** Show media without heavy crop/zoom (better for photo posts). */
  naturalFit?: boolean;
  /** Skip embed; show a click-to-open message (for unavailable embeds). */
  linkOnly?: boolean;
  /** Custom message when linkOnly is true. */
  linkPrompt?: string;
};

export type BrandEntry = {
  brand: string;
  role: string;
  videos: VideoLink[];
  /** Hide from the Work in Reels grid; still listed in full roster. */
  hideFromReelGrid?: boolean;
};

export type RosterCategory = {
  category: string;
  brands: BrandEntry[];
};

export const platformMeta: Record<
  Platform,
  { label: string; short: string; color: string }
> = {
  ig: { label: "Instagram", short: "IG", color: "#e1306c" },
  tiktok: { label: "TikTok", short: "TT", color: "#1fb6ae" },
  fb: { label: "Facebook", short: "FB", color: "#4267b2" },
};

function v(
  platform: Platform,
  url: string,
  label: string,
  extras?: Pick<
    VideoLink,
    "mp4" | "poster" | "naturalFit" | "linkOnly" | "linkPrompt"
  >,
): VideoLink {
  return { platform, url, label, ...extras };
}

export const roster: RosterCategory[] = [
  {
    category: "Video Presenting",
    brands: [
      {
        brand: "Radha Krishna Jewellers",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/C13wWHzvTig/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C01EeMds2pl/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/C37Pt-aNcyo/", "Reel 03"),
          v("ig", "https://www.instagram.com/reel/C11oVRnvxhl/", "Reel 04"),
          v("ig", "https://www.instagram.com/reel/CzlibITvUiV/", "Reel 05"),
          v("tiktok", "https://vt.tiktok.com/ZSYfnRu5d/", "TT 01"),
          v("tiktok", "https://vt.tiktok.com/ZSYfnDgaf/", "TT 02"),
          v("tiktok", "https://vt.tiktok.com/ZSYfnrbLD/", "TT 03"),
          v("tiktok", "https://vt.tiktok.com/ZSYfnhPFN/", "TT 04"),
          v("tiktok", "https://vt.tiktok.com/ZSYfnMWWJ/", "TT 05"),
        ],
      },
      {
        brand: "Globancy Australia",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/C2lwdduIg0c/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C2rR4HHiJm6/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/C3UGuQ8pwuG/", "Reel 03"),
          v("ig", "https://www.instagram.com/reel/C2zEvoNv_hR/", "Reel 04"),
          v("ig", "https://www.instagram.com/reel/C3O9LL_pOE2/", "Reel 05"),
        ],
      },
      {
        brand: "Abhusan Jewellers",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/DGVPlxHz5LH/", "Reel 01"),
          v(
            "tiktok",
            "https://www.tiktok.com/@abhushanjewellers/video/7463442278900632850",
            "TikTok 01",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@abhushanjewellers/video/7470381757603335440",
            "TikTok 02",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@abhushanjewellers/video/7477526951054380295",
            "TikTok 03",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@abhushanjewellers/video/7468202073176247559",
            "TikTok 04",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@abhushanjewellers/video/7473081126773345552",
            "TikTok 05",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@abhushanjewellers/video/7464150289885449480",
            "TikTok 06",
          ),
        ],
      },
      {
        brand: "Paisa Experience Software",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/DXgX3eVgRjn/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/DX-gtu6lFqk/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/DXt08ZDgsiH/", "Reel 03"),
          v("ig", "https://www.instagram.com/reel/DYMEdbNEvRZ/", "Reel 04"),
        ],
      },
      {
        brand: "Digital Rodhi",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/C9mBfBZPc--/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C7dmonWvqYA/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/C76H7-bBl_g/", "Reel 03"),
          v("ig", "https://www.instagram.com/reel/C8Gl58OBGn6/", "Reel 04"),
          v("ig", "https://www.instagram.com/reel/C-CQvL_qKR7/", "Reel 05"),
          v("ig", "https://www.instagram.com/reel/C-HW0oQBwvv/", "Reel 06"),
        ],
      },
      {
        brand: "SR Unisex Salon",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/Da4x7R6GiQ2/", "Reel 02"),
        ],
      },
      {
        brand: "Vaultskin.co",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/DbUw6uLDIoV/", "Reel 01"),
        ],
      },
      {
        brand: "Nest SMS Nepal",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/DbFeaJGDZ-G/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/DbFeujbAbJ8/", "Reel 02"),
        ],
      },
      {
        brand: "Eplanet Kathmandu",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/DSjg9MYgMhG/", "Reel 01"),
        ],
      },
      {
        brand: "FitFashion Academy",
        role: "Video Presenter",
        hideFromReelGrid: true,
        videos: [
          v("ig", "https://www.instagram.com/p/C6KteakILv5/", "Post 01"),
          v("ig", "https://www.instagram.com/p/C54r5uQtd_J/", "Post 02"),
          v("ig", "https://www.instagram.com/p/C6C_DritLiM/", "Post 03"),
        ],
      },
      {
        brand: "Rodhi Source",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/C-Keb-yCFBV/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C-cjtLGoVjw/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/C2gm03xsy1l/", "Reel 03"),
        ],
      },
      {
        brand: "FootBalance Nepal",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/C8NLcxeygqf/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C8UN9cwqffS/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/C8ZLRVVK8CF/", "Reel 03"),
          v("ig", "https://www.instagram.com/reel/C_K7cEzvhaQ/", "Reel 04"),
        ],
      },
      {
        brand: "Kashyap Advisors",
        role: "Video Presenter",
        videos: [
          v(
            "tiktok",
            "https://www.tiktok.com/@kashyapbaneshwor/video/7573282617731091730",
            "TikTok 01",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@kashyapbaneshwor/video/7573333186185383176",
            "TikTok 02",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@kashyapbaneshwor/video/7573920677011442952",
            "TikTok 03",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@kashyapbaneshwor/video/7574080194458307847",
            "TikTok 04",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@kashyapbaneshwor/video/7575844720061058311",
            "TikTok 05",
          ),
        ],
      },
      {
        brand: "Prime Trade",
        role: "Video Presenter",
        hideFromReelGrid: true,
        videos: [
          v(
            "tiktok",
            "https://www.tiktok.com/@primetraders7/video/7523252331811458322",
            "TikTok 01",
          ),
        ],
      },
      {
        brand: "Synapse Technology",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/DVYJhzwiKI-/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/DVYzSjYiFpU/", "Reel 02"),
        ],
      },
      {
        brand: "SR Unisex Salon",
        role: "Video Presenter",
        videos: [
          v("ig", "https://www.instagram.com/reel/Db3CtOqEnRc/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/Da4x7R6GiQ2/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/DbanpWDjj8M/", "Reel 03"),
          v("ig", "https://www.instagram.com/reel/Dakuh5BDhqy/", "Reel 04"),
          v("ig", "https://www.instagram.com/reel/DbvT9jaAc9k/", "Reel 05"),
        ],
      },
    ],
  },
  {
    category: "Content Creation",
    brands: [
      {
        brand: "Cafe Boh",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/C-uLaJotZay/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C_acRCHu_L1/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/C-AWx69JyxU/", "Reel 03"),
          v("ig", "https://www.instagram.com/reel/C_X1skOyXri/", "Reel 04"),
          v("ig", "https://www.instagram.com/reel/C-mPwabhGDp/", "Reel 05"),
          v("ig", "https://www.instagram.com/reel/C-4QtGPtwcE/", "Reel 06"),
        ],
      },
      {
        brand: "Radha Krishna Jewellers",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/C01EeMds2pl/", "Reel 01"),
        ],
      },
      {
        brand: "SR Unisex Salon",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/DbvT9jaAc9k/", "Reel 01"),
        ],
      },
      {
        brand: "Biraj Dental",
        role: "Content Creator",
        // TikTok returns "Video currently unavailable" for embeds; keep in roster only
        hideFromReelGrid: true,
        videos: [
          v(
            "tiktok",
            "https://www.tiktok.com/@biraj_dental7/video/7660870004753091860",
            "Video 01",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@biraj_dental7/video/7661622867242667284",
            "Video 02",
          ),
        ],
      },
      {
        brand: "Saisa Dental Clinic",
        role: "Content Creator",
        hideFromReelGrid: true,
        videos: [
          v("fb", "https://www.facebook.com/share/v/1BbJgaiTsq/", "Video 01"),
        ],
      },
      {
        brand: "KTM Bhaktapur",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/C_C7bi3i07I/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C92FY-DS1JB/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/C_C7l7MgJFb/", "Reel 03"),
          v("ig", "https://www.instagram.com/reel/C-mgteAyxmx/", "Reel 04"),
          v("ig", "https://www.instagram.com/reel/C-mgr-_SFCO/", "Reel 05"),
        ],
      },
      {
        brand: "AITC International",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/C96oPMpscSZ/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C91-9c7vgNm/", "Reel 02"),
          v(
            "fb",
            "https://www.facebook.com/reel/302926989512571",
            "Facebook Reel",
          ),
        ],
      },
      {
        brand: "Haadi Biryani",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/C3kECFJu6EI/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C27DRLsPnyR/", "Reel 02"),
        ],
      },
      {
        brand: "PY Collection",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/p/DbeGjaagv1v/", "Reel 01"),
          v("ig", "https://www.instagram.com/p/Dbckp6ylLr-/", "Reel 02"),
          v(
            "tiktok",
            "https://www.tiktok.com/@py_collection_/video/7671295808242797842",
            "TikTok 01",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@py_collection_/video/7671525816274128146",
            "TikTok 02",
          ),
        ],
      },
      {
        brand: "Dream Skin Nepal",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/C2t0nltvN7t/", "Reel 01"),
        ],
      },
      {
        brand: "Interior Points Nepal",
        role: "Content Creator",
        videos: [
          v(
            "tiktok",
            "https://www.tiktok.com/@interiorpoints2010/video/7590664238016761108",
            "TikTok 01",
          ),
          v(
            "tiktok",
            "https://www.tiktok.com/@interiorpoints2010/video/7589991235457420565",
            "TikTok 02",
          ),
        ],
      },
      {
        brand: "Makeup Maina",
        role: "Content Creator / Voiceovers",
        hideFromReelGrid: true,
        videos: [
          v("tiktok", "https://vt.tiktok.com/ZSFcYqrqb/", "TikTok 01"),
          v("tiktok", "https://vt.tiktok.com/ZSFc2hFSf/", "TikTok 02"),
          v("tiktok", "https://vt.tiktok.com/ZSFcYHG7x/", "TikTok 03"),
          v("tiktok", "https://vt.tiktok.com/ZSFcYCNTS/", "TikTok 04"),
          v("tiktok", "https://vt.tiktok.com/ZSFc21qoh/", "TikTok 05"),
          v("tiktok", "https://vt.tiktok.com/ZSFc2jBFP/", "TikTok 06"),
        ],
      },
      {
        brand: "CityEscape Garden Grill",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/C3M10OnOzZC/", "Reel 01"),
        ],
      },
      {
        brand: "Arksh Food",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/C08edH2iUdc/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/C0qc246OgPh/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/C0wYlbLpbe9/", "Reel 03"),
        ],
      },
      {
        brand: "Lali Bloom",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/DbbbL73Ahui/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/DbffrZMkZyA/", "Reel 02"),
          v("ig", "https://www.instagram.com/reel/DbfVYhaDfDD/", "Reel 03"),
          v("ig", "https://www.instagram.com/reel/DbfOxCMGj1x/", "Reel 04"),
        ],
      },
      {
        brand: "Nirvana Wellness & Physiotherapy",
        role: "Content Creator",
        videos: [
          v("ig", "https://www.instagram.com/reel/C1BrKHGPRVQ/", "Reel 01", {
            linkOnly: true,
            linkPrompt: "Open Instagram to see the video",
          }),
          v("ig", "https://www.instagram.com/reel/C1EWDI_ueoS/", "Reel 02"),
        ],
      },
    ],
  },
  {
    category: "Modelling",
    brands: [
      {
        brand: "CityEscape Garden Grill",
        role: "Model",
        videos: [
          v("ig", "https://www.instagram.com/reel/C3M2C9QOwsS/", "Reel 01"),
        ],
      },
      {
        brand: "Radha Krishna Jewellers",
        role: "Model",
        videos: [
          v("ig", "https://www.instagram.com/reel/C11oVRnvxhl/", "Reel 01"),
        ],
      },
      {
        brand: "Radha Krishna Jewellers",
        role: "Model",
        videos: [
          v("ig", "https://www.instagram.com/reel/CzlibITvUiV/", "Reel 02"),
        ],
      },
      {
        brand: "Budanilkantha Camping",
        role: "Model",
        videos: [
          v("ig", "https://www.instagram.com/p/C2-BhfUNLij/", "Post 01"),
          v("ig", "https://www.instagram.com/p/C3M2sLKOX0q/", "Post 02"),
        ],
      },
      {
        brand: "Humto Nepal",
        role: "Model",
        videos: [
          v("ig", "https://www.instagram.com/p/C6tJgK4oD9Z/", "Post 01", {
            naturalFit: true,
          }),
          v("ig", "https://www.instagram.com/p/C8J2HhwhjUU/", "Post 03", {
            naturalFit: true,
          }),
        ],
      },
      {
        brand: "PY Collection",
        role: "Model",
        videos: [
          v("ig", "https://www.instagram.com/p/Dbckp6ylLr-/", "Reel 01"),
        ],
      },
    ],
  },
  {
    category: "Ambience Video",
    brands: [
      {
        brand: "Cafe Boh",
        role: "Ambience Video",
        videos: [
          v("ig", "https://www.instagram.com/reel/C_X1skOyXri/", "Reel 01"),
        ],
      },
      {
        brand: "SR Unisex Salon",
        role: "Ambience Video",
        videos: [
          v("ig", "https://www.instagram.com/reel/Dakuh5BDhqy/", "Reel 01"),
        ],
      },
      {
        brand: "Garden Project NP",
        role: "Ambience Video",
        videos: [
          v("ig", "https://www.instagram.com/reel/DbLZhIopojB/", "Reel 01"),
        ],
      },
      {
        brand: "Aqua by Karma",
        role: "Ambience Video",
        videos: [
          v("ig", "https://www.instagram.com/reel/Dbibb-sprhf/", "Reel 01"),
        ],
      },
    ],
  },
  {
    category: "PR/Collab",
    brands: [
      {
        brand: "Wonderland KTM",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/C61AP9rNIYc/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/DGx1-i4MyBf/", "Reel 02"),
        ],
      },
      {
        brand: "Dream Skin Nepal",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/DAbB_z6t1OZ/", "Reel 01"),
        ],
      },
      {
        brand: "Foreveryng",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/DDWySwIIY1o/", "Reel 01"),
          v("ig", "https://www.instagram.com/reel/DATFUmDN63A/", "Reel 02"),
        ],
      },
      {
        brand: "Girls Select Nepal",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/C9CjmW8NoWM/", "Reel 01"),
        ],
      },
      {
        brand: "Zuwa Cosmetics",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/C9MzgQiNvJM/", "Reel 01"),
        ],
      },
      {
        brand: "Himalayan Bubble Tea",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/C_2vUKVzuTp/", "Reel 01"),
        ],
      },
      {
        brand: "Celestia Skincare",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/C9AWAYZNlHt/", "Reel 01"),
        ],
      },
      {
        brand: "DHC Beauty Nepal",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/DECy1qozA46/", "Reel 01"),
        ],
      },
      {
        brand: "Brillare Nepal",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/DEF1tVlzcdL/", "Reel 01"),
        ],
      },
      {
        brand: "Pari Cosmetics",
        role: "PR / Collab",
        videos: [
          v("ig", "https://www.instagram.com/reel/C7l4cSKvgLj/", "Reel 01"),
        ],
      },
    ],
  },
];

/** Flattened reel cards for the Work in Reels grid (first video per brand). */
export function getReelCards(category?: string) {
  const cats = category
    ? roster.filter((r) => r.category === category)
    : roster;
  return cats.flatMap((cat) =>
    cat.brands
      .filter((b) => !b.hideFromReelGrid)
      .map((b) => ({
        ...b,
        category: cat.category,
        featured: b.videos[0],
      })),
  );
}

/** Merge duplicate brand entries so each brand appears once with all links. */
export function mergeBrandEntries(entries: BrandEntry[]): BrandEntry[] {
  const byName = new Map<string, BrandEntry>();

  for (const entry of entries) {
    const key = entry.brand.trim().toLowerCase();
    const existing = byName.get(key);
    if (!existing) {
      byName.set(key, {
        brand: entry.brand,
        role: entry.role,
        videos: [...entry.videos],
        hideFromReelGrid: entry.hideFromReelGrid,
      });
      continue;
    }

    const roles = new Set(
      existing.role
        .split(" · ")
        .map((r) => r.trim())
        .filter(Boolean),
    );
    roles.add(entry.role);
    existing.role = Array.from(roles).join(" · ");

    const seen = new Set(existing.videos.map((video) => video.url));
    for (const video of entry.videos) {
      if (!seen.has(video.url)) {
        existing.videos.push(video);
        seen.add(video.url);
      }
    }
  }

  return Array.from(byName.values());
}

export const rosterCategories = roster.map((r) => r.category);
