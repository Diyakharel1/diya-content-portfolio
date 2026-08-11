"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";

const meta = [
  { label: "Based In", value: "Bhaktapur, Nepal" },
  { label: "Studying", value: "BSc (Hons) CS with AI, Sunway College" },
  { label: "Languages On Camera", value: "Nepali & English" },
  { label: "Available For", value: "Freelance & long term partnerships" },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative self-start"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-bg-deep shadow-[var(--shadow)]">
            <Image
              src={site.aboutImage}
              alt="Diya Kharel portrait"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,22,26,0.35)] to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="mb-4 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-accent">
            <span className="block h-px w-6 bg-accent" />
            The Person Behind The Camera
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-tight text-ink">
            About <em className="text-accent not-italic">Me</em>
          </h2>
          <div className="mt-4 h-px w-14 bg-accent" />

          <div className="mt-8 space-y-5 text-[15.5px] leading-relaxed text-muted">
            <p>
              I&apos;m a freelance content creator, video presenter, and model
              based in Bhaktapur, Nepal, with four years of experience turning
              brand briefs into content that makes people stop scrolling.
            </p>
            <blockquote className="border-l-2 border-accent bg-accent-soft px-5 py-4 font-display text-xl italic leading-snug text-ink">
              &ldquo;Four years, 50+ brands, 20+ PR and collaborations, and one
              person behind the camera, the script, and the strategy.&rdquo;
            </blockquote>
            <p>
              Brands work with me for a face and voice that connects on camera,
              and a creative strategist who knows what makes content perform. I
              concept, script, shoot, and edit most of my own work, alongside
              content strategy, social media management, influencer outreach,
              and digital marketing.
            </p>
            <p>
              I also support brands with SEO, paid ads, website design, and
              AI-generated video across food, jewelry, tech, beauty, dental,
              wellness, education, and lifestyle on Instagram, TikTok, and
              Facebook.
            </p>
            <p>
              I&apos;m pursuing a BSc (Hons) in Computer Science with AI at
              Sunway College Kathmandu, bringing creative storytelling and
              technical understanding together. Whether I&apos;m on camera or
              building a brand&apos;s digital presence, I aim for work that
              feels authentic and delivers results.
            </p>
          </div>

          <dl className="mt-10 grid gap-5 sm:grid-cols-2">
            {meta.map((item) => (
              <div key={item.label} className="border-t border-line pt-3">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-soft">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {site.gallery.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden bg-bg-deep ${
                i === 0
                  ? "aspect-[3/4] sm:col-span-2 sm:row-span-2"
                  : "aspect-[4/5]"
              }`}
            >
              <Image
                src={src}
                alt={`Diya Kharel gallery ${i + 1}`}
                fill
                className="object-cover transition duration-700 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
