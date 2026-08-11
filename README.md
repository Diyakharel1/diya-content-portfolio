# Diya Kharel Portfolio

Personal portfolio site for **[Diya Kharel](https://www.instagram.com/diyk12/)**, a freelance content creator, video presenter, model, and digital marketing strategist based in **Bhaktapur, Nepal**.

The site is a single-page showcase of collaborations, services, and contact details, built to look sharp on mobile and desktop, and ready to host on Vercel.

---

## About Diya

Diya works with brands on-camera and behind the strategy:

- Video presenting & on-camera performance  
- Content creation / UGC and modelling  
- Social media strategy & management  
- Digital marketing, SEO, and creative consulting  

**Highlights featured on the site**

- 4+ years freelancing  
- 50+ brands collaborated with  
- 6M+ views generated across platforms  

Find her online:

- [Instagram](https://www.instagram.com/diyk12/)  
- [TikTok](https://www.tiktok.com/@diyaaak1)  
- [LinkedIn](https://www.linkedin.com/in/diyakharel/)  
- [Facebook](https://www.facebook.com/diya.kharel.560)  
- Email: **diyakharel4@gmail.com**

---

## About this website

A modern portfolio built with **Next.js** and **Tailwind CSS**. It includes:

| Section | What it does |
| --- | --- |
| **Hero & About** | Intro, portrait, and quick stats |
| **Brand marquee** | Brands Diya has worked with |
| **Work in Reels** | Filterable Instagram / TikTok / Facebook reel grid with muted autoplay in the grid, sound in a lightbox on tap |
| **Full roster** | Searchable brand list by category |
| **Services & Pricing** | What she offers and package overview |
| **Experience** | Roles and freelance timeline |
| **Contact** | Email, phone, and social links |

Work clips are organized by category: Video Presenting, Content Creation, Modelling, Ambience Video, and PR/Collab.

---

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript  
- [Tailwind CSS](https://tailwindcss.com/) v4  
- [Framer Motion](https://www.framer.com/motion/)  
- `next/font`: **Fraunces** (display) + **Manrope** (body)

No database or auth. Contact is mailto / tel / external social links. Instagram previews are resolved through a small `/api/ig-media` route at runtime.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm start
```

---

## Deploy on Vercel

1. Push this repo to GitHub.  
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.  
3. Framework preset: **Next.js** (leave defaults).  
4. Deploy.

**Environment variables:** none required for the current site.

After deploy, open the live URL and spot-check Contact (TikTok / Instagram), the Work in Reels grid, and mobile layout.

---

## Project layout

```
src/
  app/              # App Router pages + API routes
  components/       # UI sections (Hero, Reels, Contact, …)
  data/             # site copy, roster, services, pricing, experience
  lib/              # video helpers + Instagram media cache
public/images/      # portraits and gallery photos
```

### Updating content

| What | Where |
| --- | --- |
| Name, bio, socials, hero photo | `src/data/site.ts` |
| Brand reels / roster | `src/data/roster.ts` |
| Services | `src/data/services.ts` |
| Pricing | `src/data/pricing.ts` |
| Experience | `src/data/experience.ts` |
| Photos | drop files in `public/images/`, then point paths in `site.ts` |

---

## License

© Diya Kharel. All rights reserved. Personal portfolio. Not open-sourced for reuse as a commercial template without permission.
