export type PricingTier = {
  tier: string;
  title: string;
  price: string;
  per: string;
  features: { text: string; included: boolean }[];
  featured?: boolean;
};

export const pricing: PricingTier[] = [
  {
    tier: "01",
    title: "Teleprompter Presentation",
    price: "Rs 1,000",
    per: "On camera delivery from provided script",
    features: [
      { text: "On-camera teleprompter delivery", included: true },
      { text: "Script writing", included: false },
      { text: "Shooting", included: false },
      { text: "Editing", included: false },
    ],
  },
  {
    tier: "02",
    title: "Script + Presentation",
    price: "Rs 2,000",
    per: "Custom script written and delivered on camera",
    features: [
      { text: "Script writing", included: true },
      { text: "On-camera presentation", included: true },
      { text: "Shooting", included: false },
      { text: "Editing", included: false },
    ],
  },
  {
    tier: "03",
    title: "Script + Shoot + Presentation",
    price: "Rs 3,000",
    per: "Full production without editing",
    features: [
      { text: "Script writing", included: true },
      { text: "Video shooting", included: true },
      { text: "On-camera presentation", included: true },
      { text: "Editing", included: false },
    ],
  },
  {
    tier: "04",
    title: "Full Production Package",
    price: "Rs 4,000+",
    per: "End to end content, edited and ready to post",
    featured: true,
    features: [
      { text: "Script writing", included: true },
      { text: "Video shooting", included: true },
      { text: "On-camera presentation", included: true },
      { text: "Full video editing", included: true },
      { text: "Price varies by scope & brand needs", included: true },
    ],
  },
];
