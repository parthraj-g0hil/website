import { motion } from "framer-motion";
import { timeline } from "@/lib/portfolio-data";
import { SectionHeader } from "./Terminal.jsx";

export function Timeline() {
  return (
    <section id="timeline" className="py-16">
      <div className="mx-auto w-[min(1000px,94vw)]">
        <SectionHeader eyebrow="/history" title="Journey" sub="From CS student to DevOps engineer." />
        <div className="relative pl-6 sm:pl-10">
          <div
            className="absolute top-0 bottom-0 left-2 w-px sm:left-4"
            style={{ background: "var(--gradient-primary)" }}
          />
          {timeline.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.05 }}
              className="relative mb-6"
            >
              <div className="absolute top-2 -left-4 h-3 w-3 rounded-full bg-[var(--cloud-cyan)] ring-4 ring-background sm:-left-6" />
              <div className="glass rounded-2xl p-4">
                <div className="font-mono text-[11px] text-[var(--cloud-cyan)]">{t.year}</div>
                <div className="mt-0.5 font-semibold">{t.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
