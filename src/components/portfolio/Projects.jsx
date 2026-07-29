import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { projects } from "@/lib/portfolio-data";
import { SectionHeader } from "./Terminal.jsx";

export function Projects() {
  const [active, setActive] = useState(projects[0].id);
  const p = projects.find((x) => x.id === active);

  return (
    <section id="projects" className="py-16">
      <div className="mx-auto w-[min(1200px,94vw)]">
        <SectionHeader eyebrow="/deployments" title="Projects" sub="Each project opens like a deployment dashboard — problem, solution, stack, metrics." />
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col gap-2">
            {projects.map((x) => (
              <button
                key={x.id}
                onClick={() => setActive(x.id)}
                className={`glass flex items-start justify-between gap-2 rounded-2xl p-4 text-left transition hover:-translate-y-0.5 ${
                  active === x.id ? "ring-1 ring-[var(--cloud-blue)]/50" : ""
                }`}
              >
                <div>
                  <div className="font-mono text-[10px] text-muted-foreground">{x.timeline}</div>
                  <div className="mt-0.5 font-semibold">{x.name}</div>
                </div>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition ${
                    active === x.id ? "text-[var(--cloud-cyan)]" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-xs text-[var(--cloud-cyan)]">deployment/{p.id}</div>
                  <h3 className="mt-1 text-2xl font-bold">{p.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold">
                    <Github className="h-3.5 w-3.5" /> Case study
                  </button>
                  <button
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Problem</div>
                  <p className="text-sm text-foreground/85">{p.problem}</p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Solution</div>
                  <p className="text-sm text-foreground/85">{p.solution}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {p.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-border bg-secondary/40 p-3 text-center">
                    <div className="text-lg font-bold text-gradient-cyan">{m.value}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
