import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Rocket,
  Box,
  Boxes,
  Activity,
  Cpu,
  MemoryStick,
  Users,
  CheckCircle2,
  RefreshCw,
  TrendingUp
} from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { ProfilePhoto } from "./ProfilePhoto";
const initial = [
  { icon: Server, label: "Running Servers", value: "24", sub: "us-east-1 \xB7 ap-south-1", color: "cloud-blue" },
  { icon: Rocket, label: "Deployments (30d)", value: "312", sub: "success 99.4%", color: "cloud-purple" },
  { icon: Box, label: "Containers", value: "148", sub: "ECS + Docker", color: "cloud-cyan" },
  { icon: Boxes, label: "K8s Pods", value: "62", sub: "3 clusters", color: "cloud-green" },
  { icon: Users, label: "Visitors Online", value: "1", sub: "you \u{1F44B}", color: "cloud-amber" },
  { icon: Activity, label: "Cloud Status", value: "Operational", sub: "all systems green", color: "cloud-green" }
];
function useCounter(target, active = true) {
  const [v, setV] = useState(active ? target : 0);
  useEffect(() => {
    if (!active) return;
    let raf = 0, start = 0;
    const from = 0, dur = 1200;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setV(Math.floor(from + (target - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return v;
}
function Sparkline({ color }) {
  const [pts] = useState(
    () => Array.from({ length: 20 }, () => 20 + Math.random() * 40)
  );
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1200);
    return () => clearInterval(t);
  }, []);
  const data = pts.map((p, i) => p + Math.sin(tick + i) * 6);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const path = data.map((v, i) => {
    const x = i / (data.length - 1) * 100;
    const y = 100 - (v - min) / (max - min || 1) * 90 - 5;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");
  return <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-10 w-full">
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
      <path d={`${path} L100,100 L0,100 Z`} fill={color} opacity="0.15" />
    </svg>;
}
const deploySteps = [
  "Uploading source...",
  "Building Docker image...",
  "Running tests...",
  "Pushing to ECR...",
  "Deploying to ECS...",
  "Success \u2713"
];
function HeroDashboard() {
  const cpu = useCounter(42);
  const mem = useCounter(68);
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);
  const runAction = (label) => {
    if (running) return;
    setRunning(true);
    const steps = label === "Deploy App" ? deploySteps : label === "Scale Cluster" ? ["Fetching HPA metrics...", "Adding 2 nodes...", "Warming pods...", "Cluster scaled \u2713"] : ["Draining connections...", "Stopping service...", "Starting service...", "Health check OK \u2713"];
    setLog(steps.map((s) => ({ label: s, done: false, active: false })));
    steps.forEach((_, i) => {
      setTimeout(() => {
        setLog(
          (prev) => prev.map((s, idx) => ({
            ...s,
            active: idx === i,
            done: idx < i
          }))
        );
      }, 600 * (i + 1));
    });
    setTimeout(() => {
      setLog((prev) => prev.map((s) => ({ ...s, done: true, active: false })));
      setRunning(false);
    }, 600 * (steps.length + 1));
  };
  return <section id="dashboard" className="relative pt-28 pb-16 grid-bg sm:pt-32">
      <div className="mx-auto w-[min(1200px,94vw)]">
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-6 flex flex-wrap items-end justify-between gap-4"
  >
          <div className="flex items-center gap-4 sm:gap-6">
            <ProfilePhoto />
            <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] text-[var(--cloud-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--cloud-green)] pulse-ring" />
              region: ap-south-1 · console live
            </div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {profile.name.split(" ")[0]}{" "}
              <span className="text-gradient">{profile.name.split(" ")[1]}</span>
            </h1>
            <p className="mt-2 text-base text-muted-foreground sm:text-lg lg:text-xl">
              {profile.role} · <span className="text-foreground/80">{profile.tagline}</span>
            </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Deploy App", "Scale Cluster", "Restart Service"].map((a, i) => <button
    key={a}
    onClick={() => runAction(a)}
    disabled={running}
    className="rounded-xl border border-border glass px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] disabled:opacity-50"
    style={i === 0 ? { background: "var(--gradient-primary)", color: "white", borderColor: "transparent" } : void 0}
  >
                {i === 0 ? <Rocket className="mr-1 inline h-4 w-4" /> : i === 1 ? <TrendingUp className="mr-1 inline h-4 w-4" /> : <RefreshCw className="mr-1 inline h-4 w-4" />}
                {a}
              </button>)}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {initial.map((s, i) => <motion.div
    key={s.label}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15 + i * 0.05 }}
    whileHover={{ y: -4 }}
    className="glass rounded-2xl p-4"
  >
              <div className="flex items-center justify-between">
                <s.icon className={`h-4 w-4`} style={{ color: `var(--${s.color})` }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--cloud-green)] pulse-ring" />
              </div>
              <div className="mt-3 text-xs text-muted-foreground">{s.label}</div>
              <div className="mt-1 text-2xl font-bold">{s.value}</div>
              <div className="mt-0.5 font-mono text-[10px] text-muted-foreground/80">{s.sub}</div>
            </motion.div>)}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold"><Cpu className="h-4 w-4" /> CPU Usage</div>
              <div className="font-mono text-xs text-[var(--cloud-cyan)]">{cpu}%</div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${cpu}%` }}
    transition={{ duration: 1.2 }}
    className="h-full rounded-full"
    style={{ background: "var(--gradient-cyan)" }}
  />
            </div>
            <Sparkline color="oklch(0.8 0.15 200)" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold"><MemoryStick className="h-4 w-4" /> Memory</div>
              <div className="font-mono text-xs text-[var(--cloud-purple)]">{mem}%</div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${mem}%` }}
    transition={{ duration: 1.2 }}
    className="h-full rounded-full"
    style={{ background: "linear-gradient(90deg, oklch(0.72 0.2 300), oklch(0.72 0.22 340))" }}
  />
            </div>
            <Sparkline color="oklch(0.72 0.2 300)" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass rounded-2xl p-5">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold">
              <span>Action Log</span>
              <span className="font-mono text-[10px] text-muted-foreground">/var/log/deploy</span>
            </div>
            <div className="scrollbar-thin h-[112px] space-y-1 overflow-auto font-mono text-xs">
              {log.length === 0 && <div className="text-muted-foreground">▸ Click an action button to trigger a workflow.</div>}
              <AnimatePresence>
                {log.map((s, i) => <motion.div
    key={i}
    initial={{ opacity: 0, x: -6 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-2"
  >
                    {s.done ? <CheckCircle2 className="h-3 w-3 text-[var(--cloud-green)]" /> : s.active ? <RefreshCw className="h-3 w-3 animate-spin text-[var(--cloud-cyan)]" /> : <span className="h-3 w-3 rounded-full border border-border" />}
                    <span className={s.done ? "text-foreground/70" : "text-foreground"}>{s.label}</span>
                  </motion.div>)}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}
export {
  HeroDashboard
};
