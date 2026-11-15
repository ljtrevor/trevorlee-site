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
    title: 'AI analytics in production for 500+ school districts',
    body: 'I architected the AI analytics that turn thousands of survey responses into insights for school districts, with the retry logic, rate limiting, and privacy controls that production use needs. The insight tools supported a 72% increase in enterprise renewals.'
  },
  {
    where: 'ThoughtExchange',
    when: '2021 to 2026',
    title: 'Hundreds of production incidents, handled on call',
    body: 'I took on-call rotations for the platform and handled hundreds of production alerts and incidents, investigating the reliability and security issues behind them.'
  },
  {
    where: 'Freelance',
    when: '2026',
    title: 'AI for small businesses with no technical staff',
    body: 'I worked with small businesses and teams to find where AI would help, set up workflows that automated data entry, intake, and reporting, and trained their staff through workshops. For a coffee shop, that meant an AI agent to run day-to-day operations.'
  },
  {
    where: 'Workday',
    when: '2019 to 2021',
    title: 'Faster, documented APIs for HR systems used by millions',
    body: 'On Workday’s People Experience platform I improved API performance by 86% and documented 70+ endpoints so other teams could integrate reliably. I also served as Co-Scrum Master for my team, coordinating our sprints.'
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
    label: 'Get it running',
    body: 'I turn the idea into a working tool that the team uses every day. Before anyone depends on it, I make sure it is reliable and keeps private data protected.'
  },
  {
    label: 'Train the team',
    body: 'I run workshops and write materials for the people who will use it, most of whom are not technical.'
  },
  {
    label: 'Keep it running',
    body: 'I document how it works, set up monitoring and alerts, and investigate what breaks.'
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
    body: 'AI for small businesses and teams without technical staff, from choosing the use case to putting the result into daily use. Set up custom AI workflows that automated data entry, intake, and reporting, and trained non-technical teams through workshops.'
  },
  {
    when: '2021 to 2026',
    title: 'Application Engineer',
    company: 'ThoughtExchange',
    focus: 'AI, Systems and Integration',
    featured: true,
    body: 'Architected AI survey analytics used by 500+ school districts and integrated OpenAI, Anthropic, Gainsight, and BI platforms for customer analytics and reporting. Took on-call rotations, handling hundreds of production alerts and incidents and investigating reliability and security issues.'
  },
  {
    when: '2019 to 2021',
    title: 'Software Development Engineer',
    company: 'Workday',
    featured: true,
    body: 'Worked on 70+ APIs for the People Experience platform, improved API performance by 86%, and documented 70+ endpoints for internal integrations. Served as Co-Scrum Master for my team, coordinating sprints.'
  },
  {
    when: '2017',
    title: 'Software Developer',
    company: 'SaaSquatch',
    note: 'Co-op',
    body: 'Full-stack features and mobile SDKs for a referral marketing platform. Supported AWS deployments and production release monitoring.'
  },
  {
    when: '2016',
    title: 'Cloud Computing Developer',
    company: 'University of Victoria, High Energy Physics Research Computing',
    note: 'Co-op',
    body: 'Monitoring dashboards across AWS, Azure, and GCP, centralized logging and alerting, and incident runbooks for the computing behind CERN’s ATLAS experiment and Belle II at KEK.'
  },
  {
    when: '2015',
    title: 'IT Support Analyst, Infrastructure',
    company: 'VertiGIS',
    note: 'Co-op',
    body: 'IT infrastructure and procurement for 130+ employees. Managed identity and access for 300 users, ran access reviews, and automated onboarding with PowerShell, which cut provisioning time in half.'
  },
  {
    when: '2015',
    title: 'Software Test Specialist',
    company: 'IBM',
    note: 'Co-op',
    body: 'Built 100+ automated tests to catch defects and security issues before release.'
  }
];
