const RESUME_URL = "/parthraj_resume.pdf";
const profile = {
  name: "Parthraj Gohil",
  role: "Cloud & DevOps Engineer",
  tagline: "Architecting resilient cloud infrastructure on AWS.",
  email: "parthrajgohilwork@gmail.com",
  phone: "+91 8238149090",
  linkedin: "https://www.linkedin.com/in/parthrajgohil",
  medium: "https://parth-raj.medium.com/",
  website: "https://parthrajdevops.cloud/",
  location: "Ahmedabad, India",
  summary: "Results-driven DevOps Engineer with 2+ years designing, deploying and managing scalable AWS infrastructure. Focused on automation, high availability, security and cost efficiency."
};
const skills = [
  {
    name: "AWS",
    category: "Cloud",
    years: 2,
    color: "amber",
    icon: "aws",
    description: "EC2, VPC, RDS, S3, Lambda, WAF, SSO, Transit Gateway,  Route53.",
    projects: ["Online Public Loans 3-tier", "DigiGold", "AgMetalX"]
  },
  {
    name: "Docker",
    category: "Containers",
    years: 2,
    color: "cyan",
    icon: "docker",
    description: "Container images, multi-stage builds, Compose, private registries.",
    projects: ["GitLab CI images", "App deployments"]
  },
  {
    name: "Kubernetes",
    category: "Orchestration",
    years: 1,
    color: "blue",
    icon: "kubernetes",
    description: "Pods, deployments, services, autoscaling on EKS.",
    projects: ["Microservices platform"]
  },
  {
    name: "Terraform",
    category: "IaC",
    years: 1,
    color: "purple",
    icon: "terraform",
    description: "Reusable modules for AWS infra provisioning.",
    projects: ["Multi-account baselines"]
  },
  {
    name: "Linux",
    category: "OS",
    years: 3,
    color: "green",
    icon: "linux",
    description: "RHEL/Ubuntu administration, shell scripting, systemd, networking.",
    projects: ["RHCSA-certified workflows"]
  },
  {
    name: "Jenkins",
    category: "CI/CD",
    years: 2,
    color: "pink",
    icon: "jenkins",
    description: "Pipelines, shared libraries, blue/green deployments.",
    projects: ["Build/test/deploy automation"]
  },
  {
    name: "GitLab CI",
    category: "CI/CD",
    years: 2,
    color: "amber",
    icon: "gitlab",
    description: "Self-hosted GitLab runners, YAML pipelines, environments.",
    projects: ["In-house GitLab server"]
  },
  {
    name: "Ansible",
    category: "Config Mgmt",
    years: 1,
    color: "cyan",
    icon: "ansible",
    description: "Playbooks and roles for provisioning and configuration.",
    projects: ["Server baselines"]
  },
  {
    name: "Nginx",
    category: "Web",
    years: 2,
    color: "green",
    icon: "nginx",
    description: "Reverse proxy, load balancing, TLS termination.",
    projects: ["App fronting for PHP/Node/Next.js"]
  },
  {
    name: "Prometheus",
    category: "Observability",
    years: 1,
    color: "purple",
    icon: "prometheus",
    description: "Metrics collection, alerting rules, exporters.",
    projects: ["Infra & app monitoring"]
  },
  {
    name: "Grafana",
    category: "Observability",
    years: 1,
    color: "amber",
    icon: "grafana",
    description: "Dashboards for infrastructure and app health.",
    projects: ["Executive dashboards"]
  },
  {
    name: "Packer",
    category: "IaC",
    years: 1,
    color: "blue",
    icon: "packer",
    description: "Immutable AMIs baked with dependencies pre-installed.",
    projects: ["Golden AMI pipeline"]
  },
  {
    name: "Git",
    category: "VCS",
    years: 3,
    color: "amber",
    icon: "git",
    description: "Branching strategies, rebasing, tagging, hooks.",
    projects: ["All projects"]
  },
  {
    name: "GitHub",
    category: "VCS",
    years: 3,
    color: "cyan",
    icon: "github",
    description: "Actions workflows, PR automation, project hosting.",
    projects: ["OSS + personal"]
  },
  // {
  //   name: "CloudFormation",
  //   category: "IaC",
  //   years: 2,
  //   color: "amber",
  //   icon: "aws",
  //   description: "Declarative AWS stacks for repeatable environments.",
  //   projects: ["Client 3-tier deployments"]
  // },
  // {
  //   name: "CloudFront",
  //   category: "Edge",
  //   years: 2,
  //   color: "purple",
  //   icon: "aws",
  //   description: "Global CDN with WAF, custom origins, SSL.",
  //   projects: ["Multi-client migrations"]
  // },
  // {
  //   name: "ECS",
  //   category: "Containers",
  //   years: 2,
  //   color: "amber",
  //   icon: "aws",
  //   description: "Fargate & EC2 launch types behind ALB.",
  //   projects: ["DigiGold", "Migrations"]
  // }
];
const projects = [
  {
    id: "public-loans",
    name: "Online Public Loans \u2014 3-Tier",
    problem: "A fintech client needed a secure, scalable 3-tier architecture on AWS with strict network isolation and compliance.",
    solution: "Designed VPC with public/private subnets, Transit Gateway peering, ALB + EC2 web tier, Lambda + RDS app tier, CloudWatch IaC.",
    stack: ["VPC", "Transit Gateway", "EC2", "Lambda", "RDS",  "Route53", "S3", "CloudWatch"],
    metrics: [
      { label: "Uptime", value: "99.98%" },
      { label: "Deploy time", value: "-70%" },
      { label: "Environments", value: "3" }
    ],
    timeline: "Jan 2024 \u2013 Sep 2024"
  },
  {
    id: "digigold",
    name: "DigiGold + PlusGold Platform",
    problem: "Multiple gold-trading platforms required unified AWS infra with centralized SSO and consistent CI/CD.",
    solution: "Multi-account AWS with SAML SSO, RBAC via IAM Identity Center, in-house GitLab + runners, Grafana/Prometheus observability.",
    stack: ["AWS Organizations", "IAM Identity Center", "GitLab CI", "Grafana", "Prometheus", "ECS"],
    metrics: [
      { label: "Accounts", value: "4" },
      { label: "MTTR", value: "-55%" },
      { label: "Cost", value: "-30%" }
    ],
    timeline: "Dec 2025 \u2013 Present"
  },
  {
    id: "migration",
    name: "Multi-Client Migration & DR",
    problem: "Legacy PHP / Node.js / Next.js stacks needed migration to AWS with disaster recovery guarantees.",
    solution: "AWS Migration Services, ECS deployments behind + WAF, cross-region DR runbooks, blue/green deploys.",
    stack: ["AWS MGN",  "WAF", "Route53", "S3"],
    metrics: [
      { label: "RPO", value: "< 5 min" },
      { label: "RTO", value: "< 30 min" },
      { label: "Clients", value: "6+" }
    ],
    timeline: "2024 \u2013 2025"
  }
];
const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    color: "cyan",
    logo: "cert-ccp",
    skills: ["Core AWS services", "Billing", "Support plans", "Cloud concepts"]
  },
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    color: "amber",
    logo: "cert-saa",
    skills: ["VPC design", "HA architectures", "Cost optimization", "Security"]
  },
  {
    name: "RHCSA \u2014 Red Hat Certified System Administrator",
    issuer: "Red Hat",
    color: "pink",
    logo: "redhat",
    skills: ["Linux admin", "systemd", "SELinux", "Storage & networking"]
  }
];
const timeline = [
  { year: "2020", title: "B.Tech", body: "Computer Engineering at Silver Oak, Ahmedabad." },
  { year: "2022", title: "Linux Deep Dive", body: "RHCSA journey and shell/automation foundations." },
  { year: "2024", title: "Cloud Engineer @ Electromech", body: "AWS 3-tier client project + AWS SSO onboarding." },
  { year: "2024", title: "AWS Certifications", body: "Cloud Practitioner + Solutions Architect Associate." },
  { year: "2025", title: "DevOps @ Amrapali", body: "Architected 4 platforms, SSO/RBAC, GitLab CI, observability." }
];
export {
  RESUME_URL,
  certifications,
  profile,
  projects,
  skills,
  timeline
};
