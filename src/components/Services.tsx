"use client";

import { motion } from "framer-motion";
import { serviceGroups } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="max-w-xl"
        >
          <p className="mb-4 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-accent">
            <span className="block h-px w-6 bg-accent" />
            What I Do
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-tight">
            Full Stack <em className="text-accent not-italic">Content &amp; Marketing</em>
          </h2>
          <div className="mt-4 h-px w-14 bg-accent" />
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            From standing in front of the camera to running the strategy, SEO and
            website behind it. One point of contact for the whole content
            pipeline.
          </p>
        </motion.div>

        <div className="mt-16 space-y-14">
          {serviceGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: gi * 0.05 }}
            >
              <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-soft">
                {group.label}
              </h3>
              <ul className="divide-y divide-line border-y border-line">
                {group.items.map((item) => (
                  <li
                    key={item.title}
                    className="grid gap-2 py-5 transition-colors hover:bg-accent-soft/40 md:grid-cols-[280px_1fr] md:gap-8 md:px-2"
                  >
                    <span className="font-display text-xl text-ink">
                      {item.title}
                    </span>
                    <span className="text-[15px] leading-relaxed text-muted">
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
