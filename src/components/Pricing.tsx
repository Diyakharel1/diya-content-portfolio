"use client";

import { motion } from "framer-motion";
import { pricing } from "@/data/pricing";
import { site } from "@/data/site";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <p className="mb-4 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] text-accent">
            <span className="block h-px w-6 bg-accent" />
            Services &amp; Rates
          </p>
          <h2 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-tight">
            Content Creation <em className="text-accent not-italic">Pricing</em>
          </h2>
          <div className="mt-4 h-px w-14 bg-accent" />
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            All rates are per video unless otherwise agreed. UGC rates for paid
            brand collaborations fall within the same range. Reach out for
            custom packages.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col bg-bg p-6 md:p-7 ${
                tier.featured ? "bg-film text-cream" : ""
              }`}
            >
              <p
                className={`text-[11px] uppercase tracking-[0.2em] ${
                  tier.featured ? "text-accent" : "text-muted-soft"
                }`}
              >
                Tier {tier.tier}
                {tier.featured ? " · Preferred" : ""}
              </p>
              <h3
                className={`font-display mt-4 text-2xl leading-snug ${
                  tier.featured ? "text-cream" : "text-ink"
                }`}
              >
                {tier.title}
              </h3>
              <p
                className={`mt-5 font-display text-3xl ${
                  tier.featured ? "text-accent" : "text-ink"
                }`}
              >
                {tier.price}
                <span
                  className={`ml-1 text-sm font-sans font-normal ${
                    tier.featured
                      ? "text-[rgba(247,243,236,0.55)]"
                      : "text-muted-soft"
                  }`}
                >
                  / video
                </span>
              </p>
              <p
                className={`mt-2 text-sm ${
                  tier.featured
                    ? "text-[rgba(247,243,236,0.65)]"
                    : "text-muted"
                }`}
              >
                {tier.per}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li
                    key={f.text}
                    className={`text-sm ${
                      f.included
                        ? tier.featured
                          ? "text-cream"
                          : "text-ink"
                        : tier.featured
                          ? "text-[rgba(247,243,236,0.35)] line-through"
                          : "text-muted-soft line-through"
                    }`}
                  >
                    {f.included ? "•" : "×"} {f.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Final pricing may vary based on deliverables, usage rights and brand
          requirements.{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Discuss a custom package →
          </a>
        </p>
      </div>
    </section>
  );
}
