"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const stats = [
  { value: "4+", label: "Years" },
  { value: "50+", label: "Brands" },
  { value: "6M+", label: "Views" },
];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % site.roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="pointer-events-none absolute -right-24 top-16 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(42,122,114,0.12),transparent_68%)]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-8rem)] max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-muted"
          >
            <span className="block h-px w-7 bg-accent" />
            <span className="relative inline-block min-h-[1.2em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={site.roles[roleIdx]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="inline-block text-accent"
                >
                  {site.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3.2rem,8vw,5.8rem)] font-light leading-[0.92] tracking-[-0.03em] text-ink"
          >
            Diya
            <br />
            <em className="not-italic text-accent">Kharel</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-muted"
          >
            {site.heroLine}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={`mailto:${site.email}`}
              className="bg-accent px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-accent-strong"
            >
              Work With Me
            </a>
            <a
              href="#work"
              className="border border-line px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-accent hover:text-accent"
            >
              See My Work
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.36 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-light text-ink md:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-soft">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md md:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-bg-deep shadow-[var(--shadow)]">
            <Image
              src={site.heroImage}
              alt="Diya Kharel"
              fill
              priority
              className="object-cover object-[center_36%]"
              sizes="(max-width: 768px) 90vw, 42vw"
            />
          </div>
          <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-muted-soft">
            Bhaktapur, Nepal · Available for brand collaborations
          </p>
        </motion.div>
      </div>
    </section>
  );
}
