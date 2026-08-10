export const projects = [
  {
    number: '01',
    slug: 'ai-multi-agent-platform',
    title: 'AI Multi-Agent Platform',
    subtitle: 'Production AI Agent System',
  },
  {
    number: '02',
    slug: 'ai-automation-system',
    title: 'AI Automation System',
    subtitle: 'Intelligent Workflow Automation',
  },
  {
    number: '03',
    slug: 'ai-decision-engine',
    title: 'AI Decision Engine',
    subtitle: 'Data-Driven Intelligence',
  },
  {
    number: '04',
    slug: 'data-engineering-platform',
    title: 'Data Engineering Platform',
    subtitle: 'AI-Ready Data Infrastructure',
  },
  {
    number: '05',
    slug: 'full-stack-saas-application',
    title: 'Full-Stack SaaS Application',
    subtitle: 'End-to-End Product Engineering',
  },
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));
