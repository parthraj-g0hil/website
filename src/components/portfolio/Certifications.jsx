import { motion } from "framer-motion";
import { certifications } from "@/lib/portfolio-data";
import { SectionHeader } from "./Terminal.jsx";

export function Certifications() {
  return (
    <section id="certs" className="py-16">
      <div className="mx-auto w-[min(1200px,94vw)]">
        <SectionHeader eyebrow="/badges" title="Certifications" sub="Validated cloud & Linux credentials." />
        <div className="grid gap-5 md:grid-cols-3">
          {certifications.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-strong group relative overflow-hidden rounded-2xl p-6 text-center transition-shadow hover:shadow-[var(--shadow-glow)]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
                style={{ background: `radial-gradient(circle, var(--cloud-${c.color}) 0%, transparent 60%)` }}
              />
              <div className="relative mx-auto grid h-28 w-28 place-items-center rounded-2xl bg-white/95 p-3 shadow-lg ring-1 ring-white/10">
                <img
                  src={c.logo}
                  alt={`${c.name} badge`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="relative mt-5 text-base font-semibold">{c.name}</div>
              <div className="relative text-xs text-muted-foreground">{c.issuer}</div>
              <div className="relative mt-4 flex flex-wrap justify-center gap-1.5">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[10px] text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
