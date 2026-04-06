export type Project = {
  title: string;
  description: string;
  tags: string[];
  url: string;
  internal?: boolean;
};

export const portfolio: {
  name: string;
  role: string;
  bio: string;
  email: string;
  projects: Project[];
  skills: string[];
  socials: { github: string; linkedin: string };
} = {
  name: "Anish Chaudhary",
  role: "Full Stack Developer",
  bio: "I build clean, fast web products — from design systems to distributed APIs. Passionate about solving real-world problems through code.",
  email: "anishchaudhary.dev@gmail.com",

  projects: [
    {
      title: "Nepali English Date Converter",
      description:
        "A simple utility to convert dates between Nepali (Bikram Sambat) and English (Gregorian) calendars.",
      tags: ["JavaScript", "Date Manipulation", "TypeScript"],
      url: "https://github.com/anix001/Nepali-English-Date-Converter",
    },
    {
      title: "Cognito Integration with Node.js",
      description:
        "Integrate AWS Cognito authentication with a Node.js backend.",
      tags: ["Node.js", "AWS", "Authentication"],
      url: "https://github.com/anix001/cognito-integration-with-node",
    },
    {
      title: "SES Integration with Node.js",
      description:
        "Integrate AWS SES with a Node.js backend.",
      tags: ["Node.js", "AWS", "Email", "Nodemailer"],
      url: "https://github.com/anix001/node-ses-integration",
    },
    {
      title: "Tech Feed",
      description:
        "Aggregated tech news from Hacker News, Dev.to, Reddit, TLDR and GitHub Trending — no API keys, fully free.",
      tags: ["Next.js", "RSS", "Web Scraping", "ISR"],
      url: "/tech-news",
      internal: true,
    },
     {
      title: "Birthday Reminder",
      description:
        "Never forget family birthdays — visual countdown avatars with zodiac signs and age tracking.",
      tags: ["Next.js", "TypeScript", "date-fns"],
      url: "/birthdays",
      internal: true,
    }
  ],

  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "GraphQL",
    "Tailwind CSS",
    "Git/GitHub",
    "Postman",
    "MySQL",
    "MongoDB",
  ],

  socials: {
    github: "https://github.com/anix001",
    linkedin: "https://www.linkedin.com/in/anish-chaudhary-9a5401205/",
  },
};

export const experience = [
  {
    title: "Full Stack Engineer",
    company: "PMsquare Nepal",
    type: "Full-time",
    start: "Sep 2024",
    end: "Present",
    location: "Thapathali, Kathmandu",
    mode: "On-site",
  },
  {
    title: "Junior Full Stack Engineer",
    company: "PMsquare",
    type: "Full-time",
    start: "Sep 2023",
    end: "Sep 2024",
    location: "Thapathali, Kathmandu",
    mode: "On-site",
  },
  {
    title: "Frontend Developer",
    company: "Krafters Technology",
    type: "Full-time",
    start: "Mar 2022",
    end: "Sep 2023",
    location: "Tripureswor, Kathmandu",
    mode: "Hybrid",
  },
  {
    title: "Javascript Developer",
    company: "ITGlance",
    type: "Internship",
    start: "Dec 2021",
    end: "Mar 2022",
    location: "Tripureswor, Kathmandu",
    mode: "On-site",
  },
] as const;
