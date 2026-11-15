/*
  All of the site's career content lives here so it can be edited in one place.
  Keep it aligned with LinkedIn: same employers, dates, and numbers.
*/

export type WorkItem = {
  where: string;
  when: string;
  title: string;
  body: string;
};

export const selectedWork: WorkItem[] = [
  {
    where: 'ThoughtExchange',
    when: '2021 to 2026',
    title: 'AI survey analytics used by 500+ school districts',
    body: 'I architected the AI analytics that turn thousands of survey responses into insights for more than 500 school districts. The natural-language insight tools I delivered supported a 72% increase in enterprise renewals.'
  },
  {
    where: 'ThoughtExchange',
    when: '2021 to 2026',
    title: 'LLM services built for production',
    body: 'I built the Python services that connect the product to OpenAI and Anthropic models, with the retry logic, rate limiting, and privacy controls that production use needs. I also took on-call rotations, handling hundreds of production alerts and incidents.'
  },
  {
    where: 'Freelance',
    when: '2026',
    title: 'An AI agent that runs a coffee shop’s day-to-day operations',
    body: 'For a coffee shop with no engineers of its own, I built and deployed an AI agent to handle day-to-day operations, along with a customer-facing website and a restructured menu.'
  },
  {
    where: 'Workday',
    when: '2019 to 2021',
    title: '70+ APIs behind HR systems used by millions',
    body: 'I developed more than 70 APIs for Workday’s People Experience platform and wrote the OpenAPI documentation for them. Query optimization and indexing in OracleDB improved API performance by 86%.'
  }
];

export type Step = {
  label: string;
  body: string;
};

export const approach: Step[] = [
  {
    label: 'Find the use case',
    body: 'I start with the work people already do and look for the steps where AI saves real time. Data entry, intake, and reporting are the usual places.'
  },
  {
    label: 'Build it',
    body: 'I design and build the workflow end to end, from the interface to the backend services and model integrations, and I build it to run in production.'
  },
  {
    label: 'Teach it',
    body: 'I run workshops and write materials for the people who will use the tool, most of whom aren’t technical.'
  }
];

export type Role = {
  when: string;
  title: string;
  company: string;
  note?: string;
  /* Team or specialty, shown beside the company on the About page. */
  focus?: string;
  current?: boolean;
  /* Shown on the home page timeline as well as the About page. */
  featured?: boolean;
  body?: string;
};

export const roles: Role[] = [
  {
    when: '2026 to now',
    title: 'AI Enablement Specialist',
    company: 'ConeTec',
    current: true,
    featured: true
  },
  {
    when: '2026',
    title: 'AI Solutions Consultant',
    company: 'Freelance',
    featured: true,
    body: 'AI and software for small businesses and teams without in-house engineers, from choosing the use case to deploying the result. I built custom AI workflows that automated data entry, intake, and reporting, and trained non-technical teams through workshops.'
  },
  {
    when: '2021 to 2026',
    title: 'Application Engineer',
    company: 'ThoughtExchange',
    focus: 'AI, Systems and Integration',
    featured: true,
    body: 'Architected AI survey analytics used by 500+ school districts. Built Python services on the OpenAI and Anthropic APIs, integrated Gainsight and BI platforms for customer analytics, and shipped full-stack product features. Handled hundreds of production alerts and incidents on call.'
  },
  {
    when: '2019 to 2021',
    title: 'Software Development Engineer',
    company: 'Workday',
    featured: true,
    body: 'Developed 70+ APIs for the People Experience platform and improved API performance by 86%. Enabled Slack and Microsoft Teams integrations for querying HR data. Served as Co-Scrum Master.'
  },
  {
    when: '2017',
    title: 'Software Developer',
    company: 'SaaSquatch',
    note: 'Co-op',
    body: 'Full-stack features for a referral marketing platform, plus iOS and Android SDKs for customer integrations.'
  },
  {
    when: '2016',
    title: 'Cloud Computing Developer',
    company: 'University of Victoria, High Energy Physics Research Computing',
    note: 'Co-op',
    body: 'Multi-cloud monitoring dashboards and centralized logging for the computing behind CERN’s ATLAS experiment and Belle II at KEK.'
  },
  {
    when: '2015',
    title: 'IT Support Analyst, Infrastructure',
    company: 'VertiGIS',
    note: 'Co-op',
    body: 'IT infrastructure and access management for 130+ employees. Automated onboarding with PowerShell, which cut provisioning time in half.'
  },
  {
    when: '2015',
    title: 'Software Test Specialist',
    company: 'IBM',
    note: 'Co-op',
    body: 'Built 100+ automated tests with JUnit and Selenium.'
  }
];

export const tools =
  'Python, TypeScript, React, PostgreSQL, AWS, Docker, Kubernetes, and the OpenAI and Anthropic APIs.';

export const education = {
  school: 'University of Victoria',
  degree: 'Bachelor of Engineering, Software Engineering'
};
