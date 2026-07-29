import { motion } from "framer-motion";
import { Cloud, Download } from "lucide-react";
import { RESUME_URL } from "@/lib/portfolio-data";

const links = [
  { id: "dashboard", label: "Dashboard" },
  { id: "terminal", label: "Terminal" },
  { id: "pipeline", label: "CI/CD" },
  { id: "k8s", label: "Kubernetes" },
  { id: "builder", label: "Architecture" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certs", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="fixed top-4 left-1/2 z-40 w-[min(1100px,94vw)] -translate-x-1/2 rounded-2xl glass-strong px-4 py-2.5"
    >
      <nav className="flex items-center justify-between gap-4">
        <button
          onClick={() => go("dashboard")}
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Cloud className="h-4 w-4 text-white" />
          </span>
          <span className="hidden sm:inline">
            parthraj<span className="text-gradient">.cloud</span>
          </span>
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
        </div>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Download className="h-3.5 w-3.5" /> Resume
        </a>
      </nav>
    </motion.header>
  );
}
