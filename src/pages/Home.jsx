import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BootLoader } from "@/components/portfolio/BootLoader";
import { Nav } from "@/components/portfolio/Nav";
import { HeroDashboard } from "@/components/portfolio/HeroDashboard";
import { InteractiveTerminal } from "@/components/portfolio/Terminal";
import { Pipeline } from "@/components/portfolio/Pipeline";
import { KubernetesViz } from "@/components/portfolio/Kubernetes";
import { ArchitectureBuilder } from "@/components/portfolio/ArchitectureBuilder";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Certifications } from "@/components/portfolio/Certifications";
import { Timeline } from "@/components/portfolio/Timeline";
import { Contact } from "@/components/portfolio/Contact";
import { ParticleBg } from "@/components/portfolio/ParticleBg";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen">
      {mounted && <ParticleBg />}
      <AnimatePresence>{!booted && <BootLoader onDone={() => setBooted(true)} />}</AnimatePresence>
      <Nav />
      <main>
        <HeroDashboard />
        <InteractiveTerminal />
        <Pipeline />
        <KubernetesViz />
        <ArchitectureBuilder />
        <Projects />
        <Skills />
        <Certifications />
        <Timeline />
        <Contact />
      </main>
    </div>
  );
}
