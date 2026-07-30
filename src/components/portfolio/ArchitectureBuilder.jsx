import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Route, Server, Database, HardDrive, Zap, Shield, ShieldCheck, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { SectionHeader } from "./Terminal";
const services = [
  { id: "cloudfront", label: "CloudFront", icon: Globe, color: "cloud-purple", tier: "edge" },
  { id: "route53", label: "Route53", icon: Route, color: "cloud-pink", tier: "dns" },
  { id: "alb", label: "ALB", icon: ShieldCheck, color: "cloud-cyan", tier: "web" },
  { id: "ec2", label: "EC2", icon: Server, color: "cloud-amber", tier: "web" },
  { id: "lambda", label: "Lambda", icon: Zap, color: "cloud-amber", tier: "app" },
  { id: "s3", label: "S3", icon: HardDrive, color: "cloud-green", tier: "storage" },
  { id: "rds", label: "RDS", icon: Database, color: "cloud-blue", tier: "data" },
  { id: "iam", label: "IAM", icon: Shield, color: "cloud-pink", tier: "security" }
];
const required = ["cloudfront", "alb", "ec2", "rds"];
function ArchitectureBuilder() {
  const [placed, setPlaced] = useState([]);
  const [result, setResult] = useState(null);
  const [reason, setReason] = useState("");
  const toggle = (id) => setPlaced((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const validate = () => {
    const missing = required.filter((r) => !placed.includes(r));
    if (placed.length < 3) {
      setResult("bad");
      setReason("Too few components. A production web app needs at least edge, compute and data tiers.");
      return;
    }
    if (missing.length === 0) {
      setResult("ok");
      setReason("CloudFront \u2192 ALB \u2192 EC2 \u2192 RDS with S3/IAM support. Solid three-tier baseline \u2713");
    } else {
      setResult("bad");
      setReason(`Missing critical component${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}. Traffic can't reach a resilient data tier.`);
    }
  };
  const reset = () => {
    setPlaced([]);
    setResult(null);
    setReason("");
  };
  const onDrag = (e, id) => e.dataTransfer.setData("text/plain", id);
  const onDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id && !placed.includes(id)) setPlaced((p) => [...p, id]);
  };
  return <section id="builder" className="py-16">
      <div className="mx-auto w-[min(1200px,94vw)]">
        <SectionHeader eyebrow="/challenge" title="AWS Architecture Builder" sub="Drag services onto the canvas (or tap to add). Design a resilient stack, then validate." />

        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="glass rounded-2xl p-4">
            <div className="mb-3 text-xs font-semibold text-muted-foreground">Palette</div>
            <div className="grid grid-cols-2 gap-2">
              {services.map((s) => <div
    key={s.id}
    draggable
    onDragStart={(e) => onDrag(e, s.id)}
    onClick={() => toggle(s.id)}
    className={`cursor-grab rounded-xl border p-3 transition hover:-translate-y-0.5 active:cursor-grabbing ${placed.includes(s.id) ? "border-[var(--cloud-blue)]/50 bg-[var(--cloud-blue)]/10" : "border-border bg-secondary/40"}`}
  >
                  <s.icon className="h-4 w-4" style={{ color: `var(--${s.color})` }} />
                  <div className="mt-1.5 text-xs font-semibold">{s.label}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{s.tier}</div>
                </div>)}
            </div>
          </div>

          <div
    onDragOver={(e) => e.preventDefault()}
    onDrop={onDrop}
    className="glass grid-bg relative min-h-[360px] rounded-2xl p-6"
  >
            {placed.length === 0 ? <div className="grid h-full min-h-[300px] place-items-center text-center text-sm text-muted-foreground">
                Drop services here to compose your architecture.
              </div> : <div className="flex flex-wrap items-center gap-3">
                {placed.map((id, i) => {
    const s = services.find((x) => x.id === id);
    return <motion.div
      key={id}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      layout
      className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2"
    >
                      <s.icon className="h-4 w-4" style={{ color: `var(--${s.color})` }} />
                      <div>
                        <div className="text-xs font-semibold">{s.label}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{s.tier}</div>
                      </div>
                      <button onClick={() => toggle(id)} className="ml-1 text-muted-foreground hover:text-destructive" aria-label={`Remove ${s.label}`}>×</button>
                      {i < placed.length - 1 && <span className="mx-1 text-muted-foreground">→</span>}
                    </motion.div>;
  })}
              </div>}

            <div className="mt-6 flex items-center gap-2">
              <button onClick={validate} className="rounded-xl px-4 py-2 text-sm font-semibold text-white" style={{ background: "var(--gradient-primary)" }}>
                Validate Architecture
              </button>
              <button onClick={reset} className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary/60 px-3 py-2 text-sm">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>

            {result && <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className={`mt-4 flex items-start gap-2 rounded-xl border p-3 text-sm ${result === "ok" ? "border-[var(--cloud-green)]/40 bg-[var(--cloud-green)]/10 text-[var(--cloud-green)]" : "border-destructive/40 bg-destructive/10 text-destructive"}`}
  >
                {result === "ok" ? <CheckCircle2 className="mt-0.5 h-4 w-4" /> : <XCircle className="mt-0.5 h-4 w-4" />}
                <div>
                  <div className="font-semibold">{result === "ok" ? "Architecture Valid" : "Needs work"}</div>
                  <div className="opacity-90">{reason}</div>
                </div>
              </motion.div>}
          </div>
        </div>
      </div>
    </section>;
}
export {
  ArchitectureBuilder
};
