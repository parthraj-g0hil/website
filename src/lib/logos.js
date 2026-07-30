import ansible from "@/assets/logos/ansible.png";
import aws from "@/assets/logos/aws.png";
import docker from "@/assets/logos/docker.png";
import git from "@/assets/logos/git.png";
import github from "@/assets/logos/github.png";
import gitlab from "@/assets/logos/gitlab.png";
import grafana from "@/assets/logos/grafana.png";
import jenkins from "@/assets/logos/jenkins.png";
import kubernetes from "@/assets/logos/kubernetes.png";
import linux from "@/assets/logos/linux.png";
import medium from "@/assets/logos/medium.png";
import nginx from "@/assets/logos/nginx.png";
import packer from "@/assets/logos/packer.png";
import prometheus from "@/assets/logos/prometheus.png";
import redhat from "@/assets/logos/redhat.png";
import terraform from "@/assets/logos/terraform.png";
import certCcp from "@/assets/logos/cert-ccp.png";
import certSaa from "@/assets/logos/cert-saa.png";
const logos = {
  ansible,
  aws,
  docker,
  git,
  github,
  gitlab,
  grafana,
  jenkins,
  kubernetes,
  linux,
  medium,
  nginx,
  packer,
  prometheus,
  redhat,
  terraform,
  "cert-ccp": certCcp,
  "cert-saa": certSaa
};
const getLogo = (key) => logos[key] ?? logos.aws;
export {
  getLogo,
  logos
};
