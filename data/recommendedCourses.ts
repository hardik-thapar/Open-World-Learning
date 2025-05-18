export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  isForDisabled: boolean;
  image: string;
  duration: string;
  instructor: string;
  level: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Web3 Fundamentals eBook",
    description: "Master the core concepts of Web3, blockchain technology, and decentralized applications with this comprehensive guide. Perfect for beginners looking to enter the world of blockchain.",
    category: "Web3",
    isForDisabled: false,
    image: "/images/web3.jpg",
    duration: "6 weeks",
    instructor: "Alex Rivera",
    level: "Beginner"
  },
  {
    id: 2,
    title: "AI for Deaf Assistance",
    description: "Specialized course on AI-powered tools and technologies designed to assist deaf and hard-of-hearing individuals. Learn how AI can enhance accessibility and communication.",
    category: "Special",
    isForDisabled: true,
    image: "/images/ai-deaf.jpg",
    duration: "8 weeks",
    instructor: "Prof. Maria Garcia",
    level: "Intermediate"
  }
];

export function getRecommendedCourses(preferences: {
  hasDisability: boolean;
  interests: string[];
}): Course[] {
  // Always return both courses as they are our featured recommendations
  return courses;
} 