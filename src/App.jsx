import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BootLoader } from "@/components/portfolio/BootLoader.jsx";
import { Nav } from "@/components/portfolio/Nav.jsx";
import { HeroDashboard } from "@/components/portfolio/HeroDashboard.jsx";
import { InteractiveTerminal } from "@/components/portfolio/Terminal.jsx";
import { Pipeline } from "@/components/portfolio/Pipeline.jsx";
import { KubernetesViz } from "@/components/portfolio/Kubernetes.jsx";
import { ArchitectureBuilder } from "@/components/portfolio/ArchitectureBuilder.jsx";
import { Projects } from "@/components/portfolio/Projects.jsx";
import { Skills } from "@/components/portfolio/Skills.jsx";
import { Certifications } from "@/components/portfolio/Certifications.jsx";
import { Timeline } from "@/components/portfolio/Timeline.jsx";
import { Contact } from "@/components/portfolio/Contact.jsx";
import { ParticleBg } from "@/components/portfolio/ParticleBg.jsx";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen">
      {mounted && <ParticleBg />}
      <AnimatePresence>
        {!booted && <BootLoader onDone={() => setBooted(true)} />}
      </AnimatePresence>
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
