import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Download, Menu, X } from "lucide-react";
import { RESUME_URL } from "@/lib/portfolio-data";
import { ThemeToggle } from "./ThemeToggle";
const links = [
  { id: "dashboard", label: "Dashboard" },
  { id: "terminal", label: "Terminal" },
  { id: "pipeline", label: "CI/CD" },
  { id: "k8s", label: "Kubernetes" },
  { id: "builder", label: "Architecture" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certs", label: "Certs" },
  { id: "contact", label: "Contact" }
];
function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("dashboard");
  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 160;
      let current = links[0].id;
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return <motion.header
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.1 }}
    className="fixed top-3 right-0 left-0 z-40 mx-auto w-[min(1140px,94vw)] rounded-2xl glass-strong px-3 py-2 sm:top-4 sm:px-4 sm:py-2.5"
  >
      <nav aria-label="Main navigation" className="flex items-center justify-between gap-2 sm:gap-3">
        <button
    onClick={() => go("dashboard")}
    className="flex shrink-0 items-center gap-2 text-sm font-semibold"
    aria-label="Back to top"
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

        {
    /* Desktop links */
  }
        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {links.map((l) => <button
    key={l.id}
    onClick={() => go(l.id)}
    aria-current={active === l.id ? "true" : void 0}
    className={`relative rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition xl:px-3 ${active === l.id ? "text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
  >
              {active === l.id && <motion.span
    layoutId="nav-active"
    className="absolute inset-0 -z-10 rounded-lg bg-secondary"
    transition={{ type: "spring", stiffness: 400, damping: 34 }}
  />}
              {l.label}
            </button>)}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a
    href={RESUME_URL}
    target="_blank"
    rel="noreferrer"
    className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 sm:flex"
    style={{ background: "var(--gradient-primary)" }}
  >
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
          <button
    onClick={() => setOpen((v) => !v)}
    aria-label={open ? "Close menu" : "Open menu"}
    aria-expanded={open}
    aria-controls="mobile-menu"
    className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-secondary/60 text-foreground transition hover:bg-secondary lg:hidden"
  >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
    key={open ? "close" : "menu"}
    initial={{ rotate: -90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    exit={{ rotate: 90, opacity: 0 }}
    transition={{ duration: 0.15 }}
  >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {
    /* Mobile / tablet menu */
  }
      <AnimatePresence>
        {open && <motion.div
    id="mobile-menu"
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    className="overflow-hidden lg:hidden"
  >
            <div className="mt-2 grid max-h-[70vh] grid-cols-2 gap-1.5 overflow-y-auto border-t border-border pt-3 sm:grid-cols-3">
              {links.map((l, i) => <motion.button
    key={l.id}
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.03 * i }}
    onClick={() => go(l.id)}
    aria-current={active === l.id ? "true" : void 0}
    className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${active === l.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"}`}
  >
                  {l.label}
                </motion.button>)}
              <a
    href={RESUME_URL}
    target="_blank"
    rel="noreferrer"
    onClick={() => setOpen(false)}
    className="col-span-2 mt-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-white sm:hidden"
    style={{ background: "var(--gradient-primary)" }}
  >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.header>;
}
export {
  Nav
};
