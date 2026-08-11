export type Service = {
  title: string;
  desc: string;
};

export type ServiceGroup = {
  label: string;
  items: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    label: "On Camera & Production",
    items: [
      {
        title: "Video Presenter",
        desc: "On camera hosting and delivery for brand videos, ads and explainers in Nepali and English.",
      },
      {
        title: "UGC & Content Creation",
        desc: "Concept, script, shoot and edit. Most videos are produced start to finish by me.",
      },
      {
        title: "Model",
        desc: "Print and video modeling for fashion, jewelry, hospitality and lifestyle brands.",
      },
      {
        title: "Interviews & Talking Shoots",
        desc: "Sit-down interviews and outdoor talking-head shoots built around real conversation.",
      },
    ],
  },
  {
    label: "Strategy & Management",
    items: [
      {
        title: "Content Strategy & Lead",
        desc: "Plans content calendars and leads creative direction across a brand's accounts.",
      },
      {
        title: "Digital Marketing & Consulting",
        desc: "Advises brands on digital marketing plans, positioning and channel strategy.",
      },
      {
        title: "Social Media Management",
        desc: "Full profile management, posting schedule, captions, community response and reporting.",
      },
      {
        title: "Competitor Analysis",
        desc: "Researches competitor content and positioning to sharpen a brand's own strategy.",
      },
    ],
  },
  {
    label: "Technical & Growth",
    items: [
      {
        title: "AI Video Production",
        desc: "Produces AI-generated video content for brands exploring new formats and speed.",
      },
      {
        title: "SEO Management",
        desc: "Manages on-page and off-page SEO to improve a brand's search visibility over time.",
      },
      {
        title: "Ad Campaign Management",
        desc: "Plans, launches and boosts paid ad campaigns across Meta and TikTok.",
      },
      {
        title: "Website Design",
        desc: "Builds and designs websites for brands, from layout and content to launch.",
      },
    ],
  },
];
