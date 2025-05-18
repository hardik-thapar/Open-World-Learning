
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  videoUrl: string;
  ipfsLink: string;
  videoCID: string;
  isPaid: boolean;
  duration: string;
  instructor: string;
  category: string;
  icon: string;
  topics: string[];
  certificateTemplate:string;
  signLanguage:string;
  subtitles:boolean;
  specialFeatures: string[];
}
export const courses: Course[] = [
  {
    id: "python-ai",
    title: "Python for AI",
    description: "Master Python programming for AI and machine learning with hands-on projects.",
    price: 0,
    videoUrl: `https://bafybeifpo7pkihxsjkiti6ykhysu7l7xnptyhxs3y3arseulmuwkru64p4.ipfs.flk-ipfs.xyz`,
    ipfsLink: "ipfs://bafybeifpo7pkihxsjkiti6ykhysu7l7xnptyhxs3y3arseulmuwkru64p4",
    videoCID: "bafybeifpo7pkihxsjkiti6ykhysu7l7xnptyhxs3y3arseulmuwkru64p4",
    isPaid: false,
    duration: "6 hours",
    instructor: "Dr. James Wilson",
    category: "regular",
    icon: "PythonIcon",
    certificateTemplate: "",
    subtitles: false,
    specialFeatures: [],
    signLanguage: "",
    topics: ["AI", "Machine Learning", "Technology", "Programming"]
  },
  {
    id: "environmental-impact",
    title: "Environmental Studies & Impact",
    description: "Discover the critical relationship between human activities and environmental change.",
    price: 0,
    videoUrl: `https://bafybeihik7ybnqm4kmn3xvejrn3pux4by6sqokot5iuxcbyxxzvcj3w7wu.ipfs.flk-ipfs.xyz`,
    ipfsLink: "ipfs://bafybeihik7ybnqm4kmn3xvejrn3pux4by6sqokot5iuxcbyxxzvcj3w7wu",
    videoCID: "bafybeihik7ybnqm4kmn3xvejrn3pux4by6sqokot5iuxcbyxxzvcj3w7wu",
    isPaid: false,
    specialFeatures: [],
    subtitles: false,
    duration: "5 hours",
    instructor: "Dr. Emma Green",
    category: "regular",
    certificateTemplate: "",
    signLanguage: "",
    icon: "EnvironmentIcon",
    topics: ["Environmental Science", "Conservation", "Sustainability"]
  },
  {
    id: "ai-mastery",
    title: "AI Mastery",
    description: "Deep dive into artificial intelligence, machine learning, and neural networks.",
    price: 0.01,
    videoUrl: `https://bafybeih7gaeiriwekuz3r6faobza25mcstubuh4qynintyj72pakrtazzu.ipfs.flk-ipfs.xyz`,
    ipfsLink: "ipfs://bafybeih7gaeiriwekuz3r6faobza25mcstubuh4qynintyj72pakrtazzu",
    videoCID: "bafybeih7gaeiriwekuz3r6faobza25mcstubuh4qynintyj72pakrtazzu",
    isPaid: true,
    specialFeatures: [],
    subtitles: false,
    signLanguage: "",
    duration: "8 hours",
    instructor: "Dr. Alan Zhang",
    certificateTemplate: "https://example.com/ai-certificate-template.png",
    category: "regular",
    icon: "AiIcon",
    topics: ["AI", "Machine Learning", "Technology", "Programming"]
  },
  {
    id: "exploring-history",
    title: "Exploring World History",
    description: "Journey through pivotal moments in world history, from ancient civilizations to modern times.",
    price: 0.01,
    videoUrl: `https://bafybeiff6vjow24sm4hyam34pdz5iy73cgms67ano7nt7gnkkgv54rlnkm.ipfs.flk-ipfs.xyz`,
    ipfsLink: "ipfs://bafybeiff6vjow24sm4hyam34pdz5iy73cgms67ano7nt7gnkkgv54rlnkm",
    videoCID: "bafybeiff6vjow24sm4hyam34pdz5iy73cgms67ano7nt7gnkkgv54rlnkm",
    isPaid: true,
    subtitles: false,
    specialFeatures: [],
    
    signLanguage: "",
    duration: "10 hours",
    instructor: "Prof. Maria Rodriguez",
    certificateTemplate: "https://example.com/history-certificate-template.png",
    category: "regular",
    icon: "HistoryIcon",
    topics: ["History", "Cultural Studies", "Global Issues"]
  },
  {
    id: "ai-assistance",
    title: "AI for Special Assistance",
    description: "Learn how to leverage AI tools and technologies for accessibility and special assistance.",
    price: 0,
    videoUrl: `https://bafybeiefp4pxt7tmtydkyh2tctz4pmn6m2rsnpmvrvtt7k4doj2crrca4m.ipfs.flk-ipfs.xyz`,
    ipfsLink: "ipfs://bafybeiefp4pxt7tmtydkyh2tctz4pmn6m2rsnpmvrvtt7k4doj2crrca4m",
    videoCID: "bafybeiefp4pxt7tmtydkyh2tctz4pmn6m2rsnpmvrvtt7k4doj2crrca4m",
    isPaid: false,
    duration: "6 hours",
    instructor: "Emma Chen",
    category: "deaf",
    signLanguage: "ASL",
    certificateTemplate: "",
    subtitles: true,
    specialFeatures: ["Visual Demonstrations", "Interactive Exercises", "Closed Captions"],
    icon: "AccessibilityIcon",
    topics: ["Accessibility", "AI", "Technology", "Programming"]
  },
  {
    id: "sign-language",
    title: "Complete Sign Language Course",
    description: "Comprehensive guide to American Sign Language (ASL) with interactive lessons.",
    price: 0,
    videoUrl: `https://bafybeibjznhftx74luzcdd36zr5p4ampdezsfaxgwedm4gsqvuhsk7qzee.ipfs.flk-ipfs.xyz`,
    ipfsLink: "ipfs://bafybeibjznhftx74luzcdd36zr5p4ampdezsfaxgwedm4gsqvuhsk7qzee",
    videoCID: "bafybeibjznhftx74luzcdd36zr5p4ampdezsfaxgwedm4gsqvuhsk7qzee",
    isPaid: false,
    certificateTemplate: "",
    duration: "12 hours",
    instructor: "Michael Thompson",
    category: "deaf",
    signLanguage: "ASL",
    subtitles: true,
    specialFeatures: ["Practice Exercises", "Cultural Insights", "Visual Dictionary"],
    icon: "SignLanguageIcon",
    topics: ["Sign Language", "Deaf Culture", "Communication Skills"]
  }
]; 