"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <p className="mb-4 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-accent">
            <span className="block h-px w-6 bg-accent" />
            Professional History
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-tight">
            Work <em className="text-accent not-italic">Experience</em>
          </h2>
          <div className="mt-4 h-px w-14 bg-accent" />
        </motion.div>

        <ol className="mt-14 space-y-0">
          {experience.map((item, i) => (
            <motion.li
              key={`${item.company}-${item.period}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="grid gap-4 border-t border-line py-8 md:grid-cols-[200px_1fr]"
            >
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
                  {item.period}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted-soft">
                  {item.type}
                </p>
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink">{item.company}</h3>
                <p className="mt-1 text-sm font-medium text-muted">{item.title}</p>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {item.desc}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
