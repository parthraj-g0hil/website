import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/portfolio-data";
import profileImage from "@/assets/profile.jpg";

const initials = profile.name
  .split(" ")
  .map((n) => n[0])
  .join("");

function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="group relative shrink-0"
    >
      <div
        className="absolute -inset-1 rounded-full opacity-50 blur-lg transition-opacity duration-300 group-hover:opacity-90"
        style={{ background: "var(--gradient-primary)" }}
      />

      <div
        className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-full p-[2px] sm:h-32 sm:w-32"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-background">
          {failed ? (
            <span className="text-2xl font-extrabold text-gradient sm:text-3xl">
              {initials}
            </span>
          ) : (
            <img
              src={profileImage}
              alt={`${profile.name}, ${profile.role}`}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      </div>

      <span className="absolute right-1 bottom-1 h-4 w-4 rounded-full bg-[var(--cloud-green)] ring-4 ring-background pulse-ring" />
    </motion.div>
  );
}

export { ProfilePhoto };