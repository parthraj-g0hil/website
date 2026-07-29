import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Boxes, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { SectionHeader } from "./Terminal.jsx";

const NODES = 3;
let podSeq = 1;
const mkPod = () => ({
  id: `web-${Math.random().toString(36).slice(2, 7)}-${podSeq++}`,
  node: Math.floor(Math.random() * NODES),
  status: "Pending",
});

export function KubernetesViz() {
  const [pods, setPods] = useState(() =>
    Array.from({ length: 6 }, () => ({ ...mkPod(), status: "Running" }))
  );
  const [replicas, setReplicas] = useState(6);

  const scaleTo = (n) => {
    const target = Math.max(0, Math.min(18, n));
    setReplicas(target);
    setPods((prev) => {
      if (target > prev.length) {
        const add = Array.from({ length: target - prev.length }, mkPod);
        add.forEach((p, i) =>
          setTimeout(
            () =>
              setPods((cur) => cur.map((x) => (x.id === p.id ? { ...x, status: "Running" } : x))),
            300 + i * 150
          )
        );
        return [...prev, ...add];
      }
      return prev.slice(0, target);
    });
  };

  return (
    <section id="k8s" className="py-16">
      <div className="mx-auto w-[min(1200px,94vw)]">
        <SectionHeader eyebrow="kubectl cluster-info" title="Kubernetes Cluster" sub="Live pod scheduling across 3 nodes. Scale up, scale down, autoscale." />
        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
          <div className="glass rounded-2xl p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <button onClick={() => scaleTo(replicas + 2)} className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
                <TrendingUp className="h-3.5 w-3.5 text-[var(--cloud-green)]" /> Scale Up
              </button>
              <button onClick={() => scaleTo(replicas - 2)} className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
                <TrendingDown className="h-3.5 w-3.5 text-[var(--cloud-pink)]" /> Scale Down
              </button>
              <button onClick={() => scaleTo(12)} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white" style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="h-3.5 w-3.5" /> Auto Scale
              </button>
              <div className="ml-auto font-mono text-xs text-muted-foreground">
                replicas: <span className="text-foreground">{pods.length}</span> · desired: {replicas}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {Array.from({ length: NODES }).map((_, n) => {
                const nodePods = pods.filter((p) => p.node === n);
                return (
                  <div key={n} className="rounded-xl border border-border bg-secondary/30 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="h-2 w-2 rounded-full bg-[var(--cloud-green)] pulse-ring" />
                        node-{n + 1}
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">{nodePods.length} pods</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <AnimatePresence>
                        {nodePods.map((p) => (
                          <motion.div
                            key={p.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className={`aspect-square rounded-lg border ${
                              p.status === "Running"
                                ? "border-[var(--cloud-blue)]/40 bg-[var(--cloud-blue)]/15"
                                : "border-[var(--cloud-amber)]/40 bg-[var(--cloud-amber)]/15"
                            } grid place-items-center`}
                            title={p.id}
                          >
                            <Boxes className="h-4 w-4 opacity-80" />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    {nodePods.length === 0 && (
                      <div className="py-3 text-center font-mono text-[10px] text-muted-foreground">idle</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass rounded-2xl p-5 font-mono text-xs">
            <div className="mb-3 text-sm font-semibold">kubectl get all</div>
            <div className="space-y-1 text-muted-foreground">
              <div>NAME             READY   STATUS</div>
              <div className="text-foreground">
                deploy/web       {pods.filter((p) => p.status === "Running").length}/{replicas}{" "}
                <span className="text-[var(--cloud-green)]">Healthy</span>
              </div>
              <div className="text-foreground">
                svc/web-lb       LoadBalancer   <span className="text-[var(--cloud-cyan)]">EXTERNAL</span>
              </div>
              <div className="text-foreground">hpa/web          min=2 max=18</div>
              <div className="mt-3 text-[var(--cloud-cyan)]">Events</div>
              <div>· Scheduled pods across {NODES} nodes</div>
              <div>· HPA target CPU 60%</div>
              <div>· Rolling update strategy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
