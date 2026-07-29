import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Github, Package, TestTube2, Layers3, Cloud, Globe, Play, CheckCircle2, RefreshCw } from "lucide-react";
import { SectionHeader } from "./Terminal.jsx";

const stages = [
  { icon: GitBranch, label: "git push", detail: "main @ a1b2c3d" },
  { icon: Github, label: "GitHub", detail: "webhook triggered" },
  { icon: Package, label: "Docker Build", detail: "layers cached" },
  { icon: TestTube2, label: "Run Tests", detail: "84 passed" },
  { icon: Layers3, label: "Terraform", detail: "plan → apply" },
  { icon: Cloud, label: "AWS Deploy", detail: "ECS rolling" },
  { icon: Globe, label: "Live", detail: "parthrajdevops.cloud" },
];

export function Pipeline() {
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);

  const run = () => {
    if (running) return;
    setRunning(true);
    setActive(-1);
    stages.forEach((_, i) => {
      setTimeout(() => setActive(i), 700 * (i + 1));
    });
    setTimeout(() => {
      setActive(stages.length);
      setRunning(false);
    }, 700 * (stages.length + 1));
  };

  return (
    <section id="pipeline" className="py-16">
      <div className="mx-auto w-[min(1200px,94vw)]">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader eyebrow=".gitlab-ci.yml" title="CI/CD Pipeline" sub="From git push to production in seven animated stages." />
          <button
            onClick={run}
            disabled={running}
            className="mb-6 flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5 disabled:opacity-50"
            style={{ background: "var(--gradient-primary)" }}
          >
            {running ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Run Deployment
          </button>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {stages.map((s, i) => {
              const done = active > i;
              const isActive = active === i;
              const Icon = s.icon;
              return (
                <div key={s.label} className="relative">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.04 : 1,
                      boxShadow: isActive ? "0 0 0 2px oklch(0.72 0.18 240 / 0.6)" : "0 0 0 1px transparent",
                    }}
                    className={`rounded-xl border p-3 transition ${
                      done
                        ? "border-[var(--cloud-green)]/40 bg-[var(--cloud-green)]/10"
                        : isActive
                        ? "border-[var(--cloud-blue)]/50 bg-[var(--cloud-blue)]/10"
                        : "border-border bg-secondary/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {done ? (
                        <CheckCircle2 className="h-4 w-4 text-[var(--cloud-green)]" />
                      ) : isActive ? (
                        <RefreshCw className="h-4 w-4 animate-spin text-[var(--cloud-blue)]" />
                      ) : (
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-xs font-semibold">{s.label}</span>
                    </div>
                    <div className="mt-2 font-mono text-[10px] text-muted-foreground">{s.detail}</div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: done ? "100%" : isActive ? "60%" : "0%" }}
                        transition={{ duration: isActive ? 0.7 : 0.3 }}
                        className="h-full"
                        style={{ background: done ? "var(--cloud-green)" : "var(--gradient-primary)" }}
                      />
                    </div>
                  </motion.div>
                  {i < stages.length - 1 && (
                    <div className="pointer-events-none absolute top-1/2 -right-2 hidden h-px w-4 bg-border lg:block" />
                  )}
                </div>
              );
            })}
          </div>
          {active >= stages.length && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-[var(--cloud-green)]/40 bg-[var(--cloud-green)]/10 p-4 text-center font-mono text-sm text-[var(--cloud-green)]"
            >
              <div className="text-base font-bold">✓ Deployment Successful</div>
              <div className="mt-1 text-foreground/80">
                Live URL:{" "}
                <a
                  href="https://parthrajdevops.cloud"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--cloud-cyan)] underline underline-offset-2"
                >
                  https://parthrajdevops.cloud
                </a>
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">completed in 42s</div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
