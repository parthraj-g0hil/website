import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return <button
    type="button"
    onClick={toggle}
    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    aria-pressed={isDark}
    title={isDark ? "Light mode" : "Dark mode"}
    className={`relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-secondary/60 text-foreground transition hover:bg-secondary ${className}`}
  >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
    key={theme}
    initial={{ y: 12, opacity: 0, rotate: -45 }}
    animate={{ y: 0, opacity: 1, rotate: 0 }}
    exit={{ y: -12, opacity: 0, rotate: 45 }}
    transition={{ duration: 0.2 }}
    className="grid place-items-center"
  >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>;
}
export {
  ThemeToggle
};
