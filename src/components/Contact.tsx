"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-film py-28 text-cream md:py-36"
    >
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(42,122,114,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(247,243,236,0.08),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-3xl px-5 text-center md:px-8"
      >
        <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-accent">
          Let&apos;s Create Together
        </p>
        <h2 className="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-light leading-tight">
          Ready to <em className="text-accent not-italic">Work?</em>
        </h2>
        <div className="mx-auto mt-5 h-px w-14 bg-accent" />
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[rgba(247,243,236,0.68)]">
          Open to brand collaborations, UGC projects and long term creative
          partnerships.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="bg-accent px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream transition hover:bg-accent-strong"
          >
            {site.email}
          </a>
          <a
            href={`tel:${site.phone}`}
            className="border border-[rgba(247,243,236,0.25)] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream transition hover:border-accent"
          >
            {site.phoneDisplay}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[rgba(247,243,236,0.7)] transition hover:text-cream"
            >
              <span
                className="inline-block h-1.5 w-1.5"
                style={{ background: s.color }}
              />
              {s.label}
            </a>
          ))}
        </div>

        <p className="mt-14 font-display text-lg italic text-[rgba(247,243,236,0.45)]">
          Diya Kharel · Bhaktapur, Nepal
        </p>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[rgba(247,243,236,0.08)] bg-film px-5 py-5 text-center text-[12px] tracking-wide text-[rgba(247,243,236,0.4)] md:px-8">
      © {new Date().getFullYear()} Diya Kharel. All rights reserved.
    </footer>
  );
}
