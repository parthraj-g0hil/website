import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/portfolio-data";
import { getLogo } from "@/lib/logos";
import { SectionHeader } from "./Terminal";
import { X } from "lucide-react";
function Skills() {
  const [open, setOpen] = useState(null);
  const active = skills.find((s) => s.name === open);
  return (
    <section id="skills" className="py-16">
      <div className="mx-auto w-[min(1200px,94vw)]">
        <SectionHeader
          eyebrow="/services"
          title="Skills & Services"
          sub="Click a card to inspect experience and related projects."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {skills.map((s, i) => (
            <motion.button
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -4, rotateX: 4, rotateY: -4 }}
              onClick={() => setOpen(s.name)}
              aria-label={`${s.name} details`}
              className="glass group relative flex aspect-square flex-col items-center justify-between rounded-2xl p-4 pb-6 text-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="grid h-14 w-14 place-items-center rounded-xl border p-2.5 transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: "var(--logo-tile)",
                  borderColor: "var(--logo-tile-ring)",
                  boxShadow: "0 2px 10px -6px oklch(0 0 0 / 0.4)",
                }}
              >
                <img
                  src={getLogo(s.icon)}
                  alt={`${s.name} logo`}
                  loading="lazy"
                  decoding="async"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="w-full">
                <div className="truncate text-sm font-semibold">{s.name}</div>
                <div className="truncate font-mono text-[10px] text-muted-foreground">
                  {s.category} · {s.years}y
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-3 h-1 overflow-hidden rounded-full bg-secondary/60">
                <div
                  className="h-full transition-all group-hover:brightness-125"
                  style={{
                    width: `${Math.min(100, s.years * 33)}%`,
                    background: `var(--cloud-${s.color})`,
                  }}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur"
            style={{ background: "var(--overlay)" }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-[min(520px,94vw)] rounded-2xl p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-xs text-[var(--cloud-cyan)]">
                    service_info
                  </div>
                  <h3 className="mt-1 text-2xl font-bold">{active.name}</h3>
                  <div className="text-xs text-muted-foreground">
                    {active.category} · {active.years} years
                  </div>
                </div>
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="rounded-lg p-1 hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 text-sm text-foreground/85">
                {active.description}
              </p>
              <div className="mt-4">
                <div className="mb-1 text-xs font-semibold text-muted-foreground">
                  Used in
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.projects.map((p) => (
                    <span
                      key={p}
                      className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[11px]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export { Skills };
