import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RESUME_URL, profile, skills, projects } from "@/lib/portfolio-data";
const helpText = [
  "Available commands:",
  "  help           show this menu",
  "  about          who is parthraj",
  "  skills         list technical skills",
  "  projects       show featured projects",
  "  experience     work history",
  "  resume         download resume PDF",
  "  contact        show contact info",
  "  aws            regions & services",
  "  docker         container info",
  "  kubernetes     cluster status",
  "  terraform      IaC modules",
  "  clear          clear terminal"
];
const banner = [
  "  ____              _   _                 _ ",
  " |  _ \\ __ _ _ __| |_| |__  _ __ __ _ (_)",
  " | |_) / _` | '__| __| '_ \\| '__/ _` || |",
  " |  __/ (_| | |  | |_| | | | | | (_| || |",
  " |_|   \\__,_|_|   \\__|_| |_|_|  \\__,_|/ |",
  "                                    |__/  ",
  "  Type `help` to explore. `resume` to download."
];
function InteractiveTerminal() {
  const [lines, setLines] = useState(
    banner.map((t) => ({ text: t, color: "cyan" }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const out = [{ prompt: true, text: raw }];
    const add = (...ls) => ls.forEach((l) => out.push(typeof l === "string" ? { text: l } : l));
    switch (cmd) {
      case "":
        break;
      case "help":
        helpText.forEach((t) => add(t));
        break;
      case "about":
        add(`> ${profile.name}`, `> ${profile.role} \xB7 ${profile.location}`, "", profile.summary);
        break;
      case "skills":
        add("\u2192 Navigating to skills...");
        skills.slice(0, 6).forEach(
          (s) => add({ text: `  \u2022 ${s.name.padEnd(14)} ${s.category} (${s.years}y)`, color: "green" })
        );
        setTimeout(() => scroll("skills"), 300);
        break;
      case "projects":
        add("\u2192 Navigating to projects...");
        projects.forEach((p) => add({ text: `  \u2022 ${p.name} \u2014 ${p.timeline}`, color: "cyan" }));
        setTimeout(() => scroll("projects"), 300);
        break;
      case "experience":
        add(
          "Dec 2025 \u2013 Present  DevOps Engineer @ Amrapali Online Venture",
          "Jan 2024 \u2013 Dec 2025  Cloud Engineer @ Electromech CloudTech",
          "2020 \u2013 2024         B.Tech CE @ Silver Oak, Ahmedabad"
        );
        setTimeout(() => scroll("timeline"), 300);
        break;
      case "resume":
        add({ text: "\u2193 Downloading parthraj_resume.pdf ...", color: "cyan" });
        window.open(RESUME_URL, "_blank");
        break;
      case "contact":
        add(
          `email:    ${profile.email}`,
          `phone:    ${profile.phone}`,
          `linkedin: ${profile.linkedin}`,
          `web:      ${profile.website}`
        );
        setTimeout(() => scroll("contact"), 300);
        break;
      case "aws":
        add(
          "AWS profile: parthraj-sa",
          "Regions:    us-east-1, ap-south-1, eu-west-1",
          "Services:   EC2 \xB7 VPC \xB7 RDS \xB7 S3 \xB7 Lambda \xB7 ECS \xB7 CloudFront \xB7 WAF \xB7 Route53 \xB7 IAM Identity Center"
        );
        break;
      case "docker":
        add(
          "CONTAINER ID   IMAGE                 STATUS",
          "a1b2c3d4       portfolio-web:2.0     Up 32d (healthy)",
          "e5f6a7b8       gitlab-runner:latest  Up 12d",
          "9c0d1e2f       prometheus:2.51       Up 46d"
        );
        break;
      case "kubernetes":
      case "kubectl get pods":
        add(
          "NAMESPACE    NAME                      READY   STATUS",
          "prod         web-abc12                 1/1     Running",
          "prod         web-def34                 1/1     Running",
          "prod         api-gh567                 1/1     Running",
          "monitoring   grafana-0                 1/1     Running"
        );
        setTimeout(() => scroll("k8s"), 300);
        break;
      case "terraform":
        add(
          "modules/",
          "  \u251C\u2500\u2500 vpc/            reusable multi-AZ VPC",
          "  \u251C\u2500\u2500 ecs-service/    Fargate service + ALB",
          "  \u251C\u2500\u2500 rds-postgres/   encrypted, multi-AZ",
          "  \u2514\u2500\u2500 iam-sso/        Identity Center perms"
        );
        break;
      case "clear":
        setLines([]);
        return;
      case "sudo rm -rf /":
        add({ text: "nice try \u{1F604}", color: "cyan" });
        break;
      default:
        add({ text: `command not found: ${cmd}. type 'help'.`, color: "red" });
    }
    setLines((prev) => [...prev, ...out]);
  };
  const submit = (e) => {
    e.preventDefault();
    run(input);
    if (input.trim()) setHistory((h) => [input, ...h]);
    setInput("");
    setHIdx(-1);
  };
  const onKey = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(history.length - 1, hIdx + 1);
      if (history[next]) {
        setHIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIdx - 1;
      if (next < 0) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(next);
        setInput(history[next]);
      }
    }
  };
  const colorClass = (c) => c === "green" ? "text-[var(--cloud-green)]" : c === "cyan" ? "text-[var(--cloud-cyan)]" : c === "red" ? "text-destructive" : "text-foreground/85";
  return <section id="terminal" className="py-16">
      <div className="mx-auto w-[min(1000px,94vw)]">
        <SectionHeader eyebrow="/dev/tty" title="Interactive Terminal" sub="Type commands to explore. Try help, skills, resume." />
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="glass-strong overflow-hidden rounded-2xl"
    onClick={() => inputRef.current?.focus()}
  >
          <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive" />
              <span className="h-3 w-3 rounded-full bg-[var(--cloud-amber)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--cloud-green)]" />
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">visitor@portfolio: ~</div>
            <div className="w-12" />
          </div>
          <div ref={bodyRef} className="scrollbar-thin h-[380px] overflow-auto p-4 font-mono text-[13px] leading-6">
            {lines.map((l, i) => <div key={i} className={colorClass(l.color)}>
                {l.prompt && <span className="mr-2 text-[var(--cloud-green)]">visitor@portfolio:~$</span>}
                <span className="whitespace-pre-wrap">{l.text}</span>
              </div>)}
            <form onSubmit={submit} className="mt-1 flex items-center gap-2">
              <span className="text-[var(--cloud-green)]">visitor@portfolio:~$</span>
              <input
    ref={inputRef}
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={onKey}
    autoFocus
    spellCheck={false}
    className="flex-1 bg-transparent font-mono text-[13px] text-foreground outline-none"
    aria-label="Terminal input"
  />
            </form>
          </div>
        </motion.div>
      </div>
    </section>;
}
function SectionHeader({
  eyebrow,
  title,
  sub
}) {
  return <div className="mb-8">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] text-[var(--cloud-cyan)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--cloud-cyan)]" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}
    </div>;
}
export {
  InteractiveTerminal,
  SectionHeader
};
