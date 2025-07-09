// Job source data model
export interface JobSource {
  id: string;
  name: string;
  url: string;
  logo: string;
  description: string;
  active: boolean;
  offersCount: number;
}

// Job offer data model
export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  description: string;
  sourceId: string;
  url: string;
  isSaved: boolean;
  appliedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Dashboard metrics
export interface DashboardMetrics {
  totalSavedOffers: number;
  totalSources: number;
  activeSourcesCount: number;
  applicationStatusCounts: {
    applied: number;
    notApplied: number;
  };
}

// Mock job sources data
export const jobSources: JobSource[] = [
  {
    id: '1',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/jobs',
    logo: 'logos:linkedin-icon',
    description: 'Professional networking platform with job listings',
    active: true,
    offersCount: 124
  },
  {
    id: '2',
    name: 'Indeed',
    url: 'https://www.indeed.com',
    logo: 'logos:indeed',
    description: 'Job search engine for job listings',
    active: true,
    offersCount: 87
  },
  {
    id: '3',
    name: 'Glassdoor',
    url: 'https://www.glassdoor.com',
    logo: 'logos:glassdoor',
    description: 'Company reviews and job listings',
    active: false,
    offersCount: 42
  },
  {
    id: '4',
    name: 'AngelList',
    url: 'https://angel.co',
    logo: 'logos:angellist',
    description: 'Startup jobs and recruiting platform',
    active: true,
    offersCount: 35
  },
  {
    id: '5',
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/jobs',
    logo: 'logos:stackoverflow-icon',
    description: 'Developer jobs and careers',
    active: true,
    offersCount: 18
  }
];

// Mock job offers data
export const jobOffers: JobOffer[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA (Remote)',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a skilled Senior Frontend Developer...',
    sourceId: '1', // LinkedIn
    url: 'https://example.com/job/1',
    isSaved: true,
    appliedAt: '2023-11-15T10:30:00Z',
    createdAt: '2023-11-10T08:20:00Z',
    updatedAt: '2023-11-15T10:35:00Z'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'Data Systems LLC',
    location: 'New York, NY',
    salary: '$130,000 - $160,000',
    description: 'Join our team as a Backend Engineer working on...',
    sourceId: '2', // Indeed
    url: 'https://example.com/job/2',
    isSaved: true,
    appliedAt: '2023-11-18T14:45:00Z',
    createdAt: '2023-11-05T11:15:00Z',
    updatedAt: '2023-11-18T14:50:00Z'
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'WebSolutions Co.',
    location: 'Austin, TX (Hybrid)',
    salary: '$100,000 - $130,000',
    description: 'Looking for a Full Stack Developer with experience in...',
    sourceId: '1', // LinkedIn
    url: 'https://example.com/job/3',
    isSaved: true,
    appliedAt: null,
    createdAt: '2023-11-12T09:40:00Z',
    updatedAt: '2023-11-12T09:40:00Z'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Cloud Services Inc.',
    location: 'Remote',
    salary: '$110,000 - $140,000',
    description: 'We are seeking a DevOps Engineer to join our team...',
    sourceId: '4', // AngelList
    url: 'https://example.com/job/4',
    isSaved: true,
    appliedAt: null,
    createdAt: '2023-11-08T13:20:00Z',
    updatedAt: '2023-11-08T13:20:00Z'
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'Creative Design Studio',
    location: 'Los Angeles, CA',
    salary: '$90,000 - $120,000',
    description: 'Join our creative team as a UI/UX Designer...',
    sourceId: '2', // Indeed
    url: 'https://example.com/job/5',
    isSaved: true,
    appliedAt: '2023-11-20T11:10:00Z',
    createdAt: '2023-11-14T10:30:00Z',
    updatedAt: '2023-11-20T11:15:00Z'
  },
  {
    id: '6',
    title: 'Product Manager',
    company: 'Tech Solutions Ltd.',
    location: 'Chicago, IL (Hybrid)',
    salary: '$130,000 - $160,000',
    description: 'We are looking for an experienced Product Manager...',
    sourceId: '3', // Glassdoor
    url: 'https://example.com/job/6',
    isSaved: true,
    appliedAt: null,
    createdAt: '2023-11-16T15:45:00Z',
    updatedAt: '2023-11-16T15:45:00Z'
  },
  {
    id: '7',
    title: 'Data Scientist',
    company: 'Analytics Innovations',
    location: 'Remote',
    salary: '$120,000 - $150,000',
    description: 'Seeking a Data Scientist with strong analytical skills...',
    sourceId: '5', // Stack Overflow
    url: 'https://example.com/job/7',
    isSaved: true,
    appliedAt: '2023-11-22T09:30:00Z',
    createdAt: '2023-11-17T14:20:00Z',
    updatedAt: '2023-11-22T09:35:00Z'
  },
  {
    id: '8',
    title: 'Mobile Developer (iOS)',
    company: 'App Creations Inc.',
    location: 'Seattle, WA',
    salary: '$115,000 - $145,000',
    description: 'Join our mobile development team as an iOS Developer...',
    sourceId: '1', // LinkedIn
    url: 'https://example.com/job/8',
    isSaved: true,
    appliedAt: null,
    createdAt: '2023-11-18T11:10:00Z',
    updatedAt: '2023-11-18T11:10:00Z'
  },
  {
    id: '9',
    title: 'QA Engineer',
    company: 'Software Testing Ltd.',
    location: 'Denver, CO (Remote)',
    salary: '$90,000 - $110,000',
    description: 'We are seeking a detail-oriented QA Engineer...',
    sourceId: '2', // Indeed
    url: 'https://example.com/job/9',
    isSaved: true,
    appliedAt: '2023-11-19T13:40:00Z',
    createdAt: '2023-11-15T10:30:00Z',
    updatedAt: '2023-11-19T13:45:00Z'
  },
  {
    id: '10',
    title: 'Cybersecurity Specialist',
    company: 'SecureTech Systems',
    location: 'Washington, DC',
    salary: '$130,000 - $160,000',
    description: 'Join our security team as a Cybersecurity Specialist...',
    sourceId: '4', // AngelList
    url: 'https://example.com/job/10',
    isSaved: true,
    appliedAt: null,
    createdAt: '2023-11-20T09:15:00Z',
    updatedAt: '2023-11-20T09:15:00Z'
  },
  {
    id: '11',
    title: 'Cloud Architect',
    company: 'Infrastructure Solutions',
    location: 'Remote',
    salary: '$140,000 - $170,000',
    description: 'We are looking for an experienced Cloud Architect...',
    sourceId: '5', // Stack Overflow
    url: 'https://example.com/job/11',
    isSaved: true,
    appliedAt: '2023-11-21T14:30:00Z',
    createdAt: '2023-11-16T11:20:00Z',
    updatedAt: '2023-11-21T14:35:00Z'
  },
  {
    id: '12',
    title: 'Technical Writer',
    company: 'Documentation Services',
    location: 'Portland, OR (Hybrid)',
    salary: '$80,000 - $100,000',
    description: 'Seeking a skilled Technical Writer to create documentation...',
    sourceId: '3', // Glassdoor
    url: 'https://example.com/job/12',
    isSaved: true,
    appliedAt: null,
    createdAt: '2023-11-19T10:45:00Z',
    updatedAt: '2023-11-19T10:45:00Z'
  }
];

// Generate dashboard metrics
export const dashboardMetrics: DashboardMetrics = {
  totalSavedOffers: jobOffers.filter(offer => offer.isSaved).length,
  totalSources: jobSources.length,
  activeSourcesCount: jobSources.filter(source => source.active).length,
  applicationStatusCounts: {
    applied: jobOffers.filter(offer => offer.appliedAt !== null).length,
    notApplied: jobOffers.filter(offer => offer.appliedAt === null).length
  }
};

// Generate data for charts
export const getOffersPerSourceData = () => {
  return jobSources.map(source => ({
    name: source.name,
    value: jobOffers.filter(offer => offer.sourceId === source.id).length
  }));
};

export const getApplicationStatusData = () => {
  const applied = jobOffers.filter(offer => offer.appliedAt !== null).length;
  const notApplied = jobOffers.filter(offer => offer.appliedAt === null).length;
  
  return [
    { name: 'Applied', value: applied },
    { name: 'Not Applied', value: notApplied }
  ];
};

export const getOffersPerWeekData = () => {
  return [
    { name: 'Week 1', saved: 3, applied: 1 },
    { name: 'Week 2', saved: 5, applied: 2 },
    { name: 'Week 3', saved: 2, applied: 2 },
    { name: 'Week 4', saved: 4, applied: 3 }
  ];
};
