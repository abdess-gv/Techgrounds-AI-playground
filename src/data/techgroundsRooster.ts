
export type LocationType = 'Online' | 'Op locatie' | 'Hybride';

export interface SessionTemplate {
  dayOfWeek: number; // 0 = Monday, 1 = Tuesday, etc.
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
  location: LocationType;
  address?: string;
  trainer?: string;
}

export interface DayTemplate {
  sessions: SessionTemplate[];
}

export interface WeekTemplate {
  days: DayTemplate[];
}

export interface ProgramTemplate {
  id: string;
  name: string;
  weeks: WeekTemplate[];
}

export interface AgendaEntry {
  id: string;
  title: string;
  time: string;
  date: Date;
  dateString: string;
  description?: string;
  location: LocationType;
  address?: string;
  trainer?: string;
  week: number;
  dayOfWeek: number;
}

// Sample program templates
export const programTemplates: ProgramTemplate[] = [
  {
    id: 'pathways',
    name: 'Pathways',
    weeks: [
      {
        days: [
          {
            sessions: [
              {
                dayOfWeek: 0, // Monday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Cloud Fundamentals',
                description: 'Introductie tot cloud computing concepten en AWS basics',
                location: 'Online',
                trainer: 'Jan Jansen'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 2, // Wednesday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Linux & Networking',
                description: 'Linux command line en netwerk fundamentals',
                location: 'Op locatie',
                address: 'Techgrounds Amsterdam, Nieuwezijds Voorburgwal 120',
                trainer: 'Marie de Vries'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 4, // Friday
                startTime: '09:00',
                endTime: '12:00',
                title: 'Weekly Review',
                description: 'Terugblik op de week en Q&A sessie',
                location: 'Hybride',
                trainer: 'Jan Jansen'
              }
            ]
          }
        ]
      },
      {
        days: [
          {
            sessions: [
              {
                dayOfWeek: 0, // Monday
                startTime: '09:00',
                endTime: '17:00',
                title: 'AWS Core Services',
                description: 'EC2, S3, VPC en andere core AWS services',
                location: 'Online',
                trainer: 'Peter van Dam'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 2, // Wednesday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Security Fundamentals',
                description: 'Cybersecurity basics en best practices',
                location: 'Op locatie',
                address: 'Techgrounds Amsterdam, Nieuwezijds Voorburgwal 120',
                trainer: 'Sarah Johnson'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 4, // Friday
                startTime: '13:00',
                endTime: '17:00',
                title: 'Hands-on Lab',
                description: 'Praktische oefeningen met AWS services',
                location: 'Hybride',
                trainer: 'Peter van Dam'
              }
            ]
          }
        ]
      },
      {
        days: [
          {
            sessions: [
              {
                dayOfWeek: 0, // Monday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Infrastructure as Code',
                description: 'Terraform en CloudFormation introductie',
                location: 'Online',
                trainer: 'Lisa Chen'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 2, // Wednesday
                startTime: '09:00',
                endTime: '17:00',
                title: 'DevOps Practices',
                description: 'CI/CD pipelines en automation',
                location: 'Op locatie',
                address: 'Techgrounds Amsterdam, Nieuwezijds Voorburgwal 120',
                trainer: 'Mike Roberts'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 4, // Friday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Project Work',
                description: 'Werken aan individuele projecten',
                location: 'Hybride',
                trainer: 'Lisa Chen'
              }
            ]
          }
        ]
      },
      {
        days: [
          {
            sessions: [
              {
                dayOfWeek: 0, // Monday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Final Project',
                description: 'Afronden van eindproject en presentaties',
                location: 'Op locatie',
                address: 'Techgrounds Amsterdam, Nieuwezijds Voorburgwal 120',
                trainer: 'Alle trainers'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 4, // Friday
                startTime: '14:00',
                endTime: '17:00',
                title: 'Graduation Ceremony',
                description: 'Diploma uitreiking en afsluiting',
                location: 'Op locatie',
                address: 'Techgrounds Amsterdam, Nieuwezijds Voorburgwal 120',
                trainer: 'Alle trainers'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'workready',
    name: 'Workready',
    weeks: [
      {
        days: [
          {
            sessions: [
              {
                dayOfWeek: 0, // Monday
                startTime: '09:00',
                endTime: '17:00',
                title: 'IT Fundamentals',
                description: 'Basis IT kennis en computer skills',
                location: 'Op locatie',
                address: 'Techgrounds Rotterdam, Coolsingel 42',
                trainer: 'Anna Bakker'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 3, // Thursday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Communication Skills',
                description: 'Professionele communicatie en samenwerking',
                location: 'Op locatie',
                address: 'Techgrounds Rotterdam, Coolsingel 42',
                trainer: 'Tom de Wit'
              }
            ]
          }
        ]
      },
      {
        days: [
          {
            sessions: [
              {
                dayOfWeek: 0, // Monday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Problem Solving',
                description: 'Analytisch denken en probleemoplossing',
                location: 'Hybride',
                trainer: 'Emma Groot'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 3, // Thursday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Team Projects',
                description: 'Samenwerken in projectteams',
                location: 'Op locatie',
                address: 'Techgrounds Rotterdam, Coolsingel 42',
                trainer: 'Tom de Wit'
              }
            ]
          }
        ]
      },
      {
        days: [
          {
            sessions: [
              {
                dayOfWeek: 0, // Monday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Job Preparation',
                description: 'CV schrijven en sollicitatievaardigheden',
                location: 'Op locatie',
                address: 'Techgrounds Rotterdam, Coolsingel 42',
                trainer: 'Sophie van der Berg'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 3, // Thursday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Mock Interviews',
                description: 'Oefenen met sollicitatiegesprekken',
                location: 'Op locatie',
                address: 'Techgrounds Rotterdam, Coolsingel 42',
                trainer: 'Sophie van der Berg'
              }
            ]
          }
        ]
      },
      {
        days: [
          {
            sessions: [
              {
                dayOfWeek: 0, // Monday
                startTime: '09:00',
                endTime: '17:00',
                title: 'Internship Preparation',
                description: 'Voorbereiding op stage periode',
                location: 'Op locatie',
                address: 'Techgrounds Rotterdam, Coolsingel 42',
                trainer: 'Alle trainers'
              }
            ]
          },
          {
            sessions: [
              {
                dayOfWeek: 4, // Friday
                startTime: '14:00',
                endTime: '17:00',
                title: 'Program Completion',
                description: 'Afsluiting programma en certificering',
                location: 'Op locatie',
                address: 'Techgrounds Rotterdam, Coolsingel 42',
                trainer: 'Alle trainers'
              }
            ]
          }
        ]
      }
    ]
  }
];
