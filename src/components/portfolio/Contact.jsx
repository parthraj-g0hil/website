import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Globe, Download } from "lucide-react";
import { profile, RESUME_URL } from "@/lib/portfolio-data";
import { SectionHeader } from "./Terminal.jsx";

export function Contact() {
  const items = [
    { icon: Mail, label: "email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: Linkedin, label: "linkedin", value: "linkedin.com/in/parthrajgohil", href: profile.linkedin },
    { logo: "https://cdn.simpleicons.org/medium/ffffff", label: "medium", value: "parth-raj.medium.com", href: profile.medium },
    { icon: Globe, label: "web", value: "parthrajdevops.cloud", href: profile.website },
  ];
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto w-[min(1000px,94vw)]">
        <SectionHeader eyebrow="/connect" title="Open a Connection" sub="Let's ship something scalable together." />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong overflow-hidden rounded-3xl p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="font-mono text-xs text-[var(--cloud-cyan)]">$ ssh parthraj@cloud</div>
              <h3 className="mt-2 text-3xl font-bold">Let's build reliable infrastructure.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Available for DevOps / SRE / Cloud Engineering roles. Currently building AWS platforms at Amrapali.
              </p>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow)]"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
            <div className="space-y-2">
              {items.map((it) => {
                const Icon = it.icon;
                return (
                  <a
                    key={it.label}
                    href={it.href}
                    target={it.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3 transition hover:-translate-y-0.5 hover:border-[var(--cloud-blue)]/50"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
                      {Icon ? (
                        <Icon className="h-4 w-4 text-white" />
                      ) : (
                        <img src={it.logo} alt={`${it.label} logo`} className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase text-muted-foreground">{it.label}</div>
                      <div className="text-sm font-semibold">{it.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
        <div className="mt-6 text-center font-mono text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Parthraj Gohil · built with React, Vite, Framer Motion
        </div>
      </div>
    </section>
  );
}
