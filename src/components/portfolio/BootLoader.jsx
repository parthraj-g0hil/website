import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const steps = [
  "Initializing Cloud Environment...",
  "Connecting to AWS us-east-1...",
  "Allocating EC2 t3.medium instance...",
  "Assigning Public IP 52.14.***.***...",
  "Loading Infrastructure modules...",
  "Deploying Portfolio v2.0...",
  "Ready."
];
function BootLoader({ onDone }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= steps.length) {
      const t2 = setTimeout(onDone, 350);
      return () => clearTimeout(t2);
    }
    const t = setTimeout(() => setI((v) => v + 1), i === 0 ? 350 : 380);
    return () => clearTimeout(t);
  }, [i, onDone]);
  return <motion.div
    className="fixed inset-0 z-[100] grid place-items-center bg-background"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
      <div className="w-[min(560px,90vw)] font-mono text-sm">
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-destructive" />
          <span className="h-2 w-2 rounded-full bg-[var(--cloud-amber)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--cloud-green)]" />
          <span className="ml-2">parthraj@cloud-console: ~/portfolio</span>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <div className="mb-3 text-[var(--cloud-cyan)]">
            $ ./bootstrap.sh --profile parthraj
          </div>
          <div className="space-y-1.5">
            <AnimatePresence>
              {steps.slice(0, i + 1).map((s, idx) => <motion.div
    key={s}
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-2"
  >
                  <span
    className={idx < i ? "text-[var(--cloud-green)]" : "text-[var(--cloud-cyan)] blink-caret"}
  >
                    {idx < i ? "\u2713" : "\u25B8"}
                  </span>
                  <span
    className={idx < i ? "text-foreground/80" : "text-foreground"}
  >
                    {s}
                  </span>
                </motion.div>)}
            </AnimatePresence>
          </div>
          <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
    className="h-full rounded-full"
    style={{ background: "var(--gradient-primary)" }}
    initial={{ width: 0 }}
    animate={{ width: `${(i + 1) / steps.length * 100}%` }}
    transition={{ duration: 0.35 }}
  />
          </div>
        </div>
      </div>
    </motion.div>;
}
export {
  BootLoader
};
