import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChatWidget from '../src/components/ChatWidget';
import GoogleTranslate from '../components/GoogleTranslate';
import Image from "next/image";
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import UserPreferencesModal, { UserPreferences } from '../components/UserPreferencesModal';
// import { Course } from '../data/recommendedCourses';
import { courses, Course } from '../data/courses';


const OwlLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "15px" }}>
    <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z" fill="url(#paint0_linear)"/>
    <path d="M20 8c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm-2 16c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 0c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" fill="url(#paint1_linear)"/>
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7C3AED"/>
        <stop offset="1" stopColor="#A78BFA"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7C3AED"/>
        <stop offset="1" stopColor="#A78BFA"/>
      </linearGradient>
    </defs>
  </svg>
);

const NetworkBackground = () => {
  // Increase particle count and adjust parameters
  const particles = [];
  const particleCount = 150; // Increased from 100
  
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const z = Math.random() * 300 - 150; // Increased depth range from 200 to 300
    const size = Math.random() * 4 + 1; // Slightly larger particles
    particles.push({ x, y, z, size });
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.05), transparent 70%)",
        perspective: "1200px", // Increased from 1000px
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: [0, 3, 0, -3, 0], // Increased rotation range
        rotateY: [0, -3, 0, 3, 0],
      }}
      transition={{
        duration: 15, // Decreased for faster rotation
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Particles with enhanced animation */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: "rgba(124, 58, 237, 0.8)",
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)", // Enhanced glow
            transform: `translateZ(${particle.z}px)`,
          }}
          animate={{
            scale: [1, 1.4, 1], // Increased scale range
            opacity: [0.2, 0.6, 0.2], // Increased opacity range
            z: [particle.z, particle.z + 80, particle.z], // Increased Z movement
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Connecting Lines with enhanced visibility */}
      {particles.map((particle1, i) => 
        particles.slice(i + 1).map((particle2, j) => {
          const distance = Math.sqrt(
            Math.pow(particle1.x - particle2.x, 2) + 
            Math.pow(particle1.y - particle2.y, 2) +
            Math.pow(particle1.z - particle2.z, 2)
          );
          
          if (distance < 25) { // Increased connection distance from 20
            return (
              <motion.div
                key={`line-${i}-${j}`}
                style={{
                  position: "absolute",
                  left: `${particle1.x}%`,
                  top: `${particle1.y}%`,
                  width: `${distance}%`,
                  height: "1.5px", // Increased line thickness
                  background: `linear-gradient(90deg, 
                    rgba(124, 58, 237, ${0.3 - (distance / 25) * 0.3}), 
                    transparent
                  )`,
                  transform: `
                    translateZ(${(particle1.z + particle2.z) / 2}px)
                    rotate(${Math.atan2(particle2.y - particle1.y, particle2.x - particle1.x)}rad)
                  `,
                  transformOrigin: "left center",
                  opacity: 0.4 - (distance / 25) * 0.4,
                }}
                animate={{
                  opacity: [
                    0.4 - (distance / 25) * 0.4,
                    0.7 - (distance / 25) * 0.4,
                    0.4 - (distance / 25) * 0.4,
                  ],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          }
          return null;
        })
      )}

      {/* Enhanced Ambient Light */}
      <motion.div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.08), transparent 60%)",
          transform: "translateZ(-150px)", // Increased depth
        }}
        animate={{
          scale: [1, 1.3, 1], // Increased scale range
          opacity: [0.5, 0.8, 0.5], // Increased opacity range
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

const Features = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section style={{ 
      padding: "140px 40px", 
      textAlign: "center",
      background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.08), transparent 70%)",
    }}>
      <motion.h2
        style={{ 
          fontSize: "4.5rem", 
          fontWeight: "800",
          marginBottom: "50px",
          color: "#FFFFFF",
          textShadow: "0 0 40px rgba(187, 134, 252, 0.2)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Our Features
      </motion.h2>

      {isMounted && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "24px",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "20px",
        }}>
          {[
            {
              title: "Secure Learning",
              description: "Experience worry-free education with blockchain-powered security.",
              icon: "🔒",
              gradient: "linear-gradient(135deg, #7C3AED, #3B82F6)"
            },
            {
              title: "Global Community",
              description: "Connect with passionate educators and learners worldwide.",
              icon: "🌍",
              gradient: "linear-gradient(135deg, #3B82F6, #2DD4BF)"
            },
            {
              title: "Lifetime Access",
              description: "Own your learning journey with permanent content access.",
              icon: "⭐",
              gradient: "linear-gradient(135deg, #2DD4BF, #7C3AED)"
            },
            {
              title: "Smart Content",
              description: "Experience personalized learning paths tailored for you.",
              icon: "✨",
              gradient: "linear-gradient(135deg, #BB86FC, #3B82F6)"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              style={{
                flex: 1,
                minWidth: "260px",
                maxWidth: "300px",
                background: "rgba(13, 12, 34, 0.7)",
                borderRadius: "24px",
                overflow: "hidden",
                position: "relative",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(124, 58, 237, 0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover="hover"
            >
              <motion.div
                style={{
                  padding: "40px 30px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 1,
                }}
                variants={{
                  hover: {
                    transform: "translateY(-5px)",
                  }
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  style={{
                    fontSize: "2.8rem",
                    marginBottom: "24px",
                    padding: "20px",
                    background: "rgba(124, 58, 237, 0.1)",
                    borderRadius: "20px",
                    border: "1px solid rgba(124, 58, 237, 0.15)",
                  }}
                  variants={{
                    hover: {
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                    }
                  }}
                >
                  {feature.icon}
                </motion.div>

                <motion.h3
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "700",
                    marginBottom: "16px",
                    background: feature.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {feature.title}
                </motion.h3>

                <motion.p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    color: "#E0E0E0",
                    opacity: 0.9,
                  }}
                >
                  {feature.description}
                </motion.p>

                <motion.div
                  style={{
                    position: "absolute",
                    inset: "-1px",
                    background: feature.gradient,
                    opacity: 0,
                    zIndex: -1,
                  }}
                  variants={{
                    hover: {
                      opacity: 0.15,
                    }
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

const getRecommendedCourses = (preferences: UserPreferences): Course[] => {
  if (!preferences || !preferences.interests || preferences.interests.length === 0) {
    return courses.slice(0, 2); // Default courses if no preferences
  }

  // Custom course templates based on interests
  const courseTemplates: { [key: string]: Course[] } = {
    'Science': [
      {
        id: "quantum-physics",
        title: "Quantum Physics Fundamentals",
        description: "Explore the fascinating world of quantum mechanics and particle physics.",
        price: 0.01,
        videoUrl: "",
        ipfsLink: "",
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        videoCID: "",
        isPaid: true,
        duration: "8 hours",
        instructor: "Dr. Richard Quantum",
        category: "Science",
        icon: "PhysicsIcon",
        topics: ["Physics", "Quantum Mechanics"]
      },
      {
        id: "molecular-biology",
        title: "Advanced Molecular Biology",
        description: "Deep dive into cellular structures and molecular mechanisms.",
        price: 0.01,
        videoUrl: "",
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        ipfsLink: "",
        videoCID: "",
        isPaid: true,
        duration: "10 hours",
        instructor: "Dr. Sarah Cell",
        category: "Science",
        icon: "BiologyIcon",
        topics: ["Biology", "Molecular Science"]
      }
    ],
    'AI': [
      {
        id: "neural-networks",
        title: "Neural Networks Architecture",
        description: "Master the design and implementation of neural networks.",
        price: 0.01,
        videoUrl: "",
        ipfsLink: "",
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        videoCID: "",
        isPaid: true,
        duration: "12 hours",
        instructor: "Dr. AI Smith",
        category: "Technology",
        icon: "AIIcon",
        topics: ["AI", "Neural Networks"]
      },
      {
        id: "computer-vision",
        title: "Computer Vision Mastery",
        description: "Learn advanced computer vision algorithms and applications.",
        price: 0.01,
        videoUrl: "",
        ipfsLink: "",
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        videoCID: "",
        isPaid: true,
        duration: "8 hours",
        instructor: "Prof. Vision Expert",
        category: "Technology",
        icon: "VisionIcon",
        topics: ["AI", "Computer Vision"]
      }
    ],
    'Environment': [
      {
        id: "climate-science",
        title: "Climate Science & Analysis",
        description: "Understanding climate patterns and environmental impact assessment.",
        price: 0.01,
        videoUrl: "",
        ipfsLink: "",
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        videoCID: "",
        isPaid: true,
        duration: "6 hours",
        instructor: "Dr. Earth Care",
        category: "Environment",
        icon: "ClimateIcon",
        topics: ["Climate", "Environmental Science"]
      },
      {
        id: "sustainable-energy",
        title: "Sustainable Energy Systems",
        description: "Explore renewable energy technologies and sustainability practices.",
        price: 0.01,
        videoUrl: "",
        ipfsLink: "",
        videoCID: "",
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        isPaid: true,
        duration: "8 hours",
        instructor: "Prof. Green Energy",
        category: "Environment",
        icon: "EnergyIcon",
        topics: ["Sustainability", "Renewable Energy"]
      }
    ],
    'Web3': [
      {
        id: "blockchain-dev",
        title: "Blockchain Development",
        description: "Build decentralized applications and smart contracts.",
        price: 0.01,
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        videoUrl: "",
        ipfsLink: "",
        videoCID: "",
        isPaid: true,
        duration: "10 hours",
        instructor: "Dr. Block Chain",
        category: "Technology",
        icon: "BlockchainIcon",
        topics: ["Web3", "Blockchain"]
      },
      {
        id: "defi-systems",
        title: "DeFi Systems Architecture",
        description: "Master decentralized finance protocols and implementations.",
        price: 0.01,
        videoUrl: "",
        ipfsLink: "",
        videoCID: "",
        isPaid: true,
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        duration: "8 hours",
        instructor: "Prof. DeFi Expert",
        category: "Technology",
        icon: "DefiIcon",
        topics: ["Web3", "DeFi"]
      }
    ],
    'Self-development': [
      {
        id: "leadership-mastery",
        title: "Leadership Mastery",
        description: "Develop essential leadership skills and emotional intelligence.",
        price: 0.01,
        videoUrl: "",
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        ipfsLink: "",
        videoCID: "",
        isPaid: true,
        duration: "6 hours",
        instructor: "Dr. Lead Well",
        category: "Personal Growth",
        icon: "LeadershipIcon",
        topics: ["Leadership", "Personal Development"]
      },
      {
        id: "productivity-systems",
        title: "Advanced Productivity Systems",
        description: "Master time management and productivity optimization.",
        price: 0.01,
        videoUrl: "",
        ipfsLink: "",
        videoCID: "",
        certificateTemplate: "",
        signLanguage: "",
        specialFeatures: [],
        subtitles: false,
        isPaid: true,
        duration: "4 hours",
        instructor: "Prof. Time Master",
        category: "Personal Growth",
        icon: "ProductivityIcon",
        topics: ["Productivity", "Self Development"]
      }
    ]
  };

  // Get the first selected interest
  const mainInterest = preferences.interests[0];
  
  // Return the custom courses for the selected interest, or default courses if interest not found
  return courseTemplates[mainInterest] || courses.slice(0, 2);
};

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [status, setStatus] = useState<string>("");
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  const pageStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, #050505, #130A2A, #0A1229)",
    color: "#F5F5F5",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
  };

  const handleSignOut = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("walletAddress");
    router.push("/auth");
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    // Check localStorage for existing wallet connection
    const storedWallet = localStorage.getItem("walletAddress");
    if (storedWallet) {
      setWalletAddress(storedWallet);
    }

    async function initializeProvider() {
      if (typeof window !== "undefined" && window?.ethereum) {
        try {
          const browserProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(browserProvider);
          setStatus("MetaMask detected. Please connect.");
        } catch (error) {
          console.error("Provider initialization failed:", error);
          setStatus("Failed to initialize MetaMask.");
        }
      } else {
        setStatus("MetaMask not detected. Please install it.");
      }
    }

    initializeProvider();
  }, [isHydrated]);

  useEffect(() => {
    // Check if user is authenticated
    const storedName = localStorage.getItem("userName");
    const storedWallet = localStorage.getItem("walletAddress");
    
    if (!storedName || !storedWallet) {
      router.push("/auth");
    } else {
      setUserName(storedName);
      setWalletAddress(storedWallet);
      
      // Check if user has already answered the preferences questionnaire
      const preferences = localStorage.getItem("userPreferences");
      if (!preferences) {
        // Only show modal if user hasn't set preferences yet
        setShowPreferencesModal(true);
      }
      
      // Load existing preferences for recommended courses if they exist
      if (preferences) {
        try {
          const parsedPreferences = JSON.parse(preferences);
          const recommended = getRecommendedCourses(parsedPreferences);
          setRecommendedCourses(recommended.length > 0 ? recommended : courses);
        } catch (error) {
          console.error("Error loading preferences:", error);
        }
      }
    }
  }, []);

  const handlePreferencesSubmit = (preferences: UserPreferences) => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    const recommended = getRecommendedCourses(preferences);
    setRecommendedCourses(recommended.length > 0 ? recommended : courses);
    setShowPreferencesModal(false);
  };

  return (
    <div style={pageStyle}>
      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "40px 60px",
        height: "120px",
        backgroundColor: "rgba(5, 5, 5, 0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}>
        {/* Left Side - Logo and Platform Name */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <OwlLogo />
          <div style={{
            fontSize: "2rem",
            background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "800",
          }}>
            Owl: Open World Learning
          </div>
        </Link>

        {/* Middle - Navigation Links */}
        <div style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
        }}>
          {[
            { label: "Home", path: "/home" },
            { label: "Library", path: "/library" },
            { label: "Courses", path: "/courses" },
            { label: "About", path: "/about" }
          ].map((item, index) => (
            <Link 
              key={index}
              href={item.path}
              style={{
                color: "#E0E0E0",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: "500",
                position: "relative",
                padding: "5px 0",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  position: "relative",
                }}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Right Side - Profile and Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Profile Dropdown */}
          <motion.div
            initial={false}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: "rgba(124, 58, 237, 0.1)",
                padding: "8px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(124, 58, 237, 0.3)",
              }}
            >
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "1.2rem",
                fontWeight: "600",
              }}>
                {userName?.[0]?.toUpperCase() || "U"}
              </div>
              <span style={{ color: '#E0E0E0' }}>{userName}</span>
              <motion.span
                animate={{ rotate: isProfileOpen ? 180 : 0 }}
                style={{ color: '#E0E0E0', fontSize: '1.2rem' }}
              >
                ▼
              </motion.span>
            </motion.div>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '10px',
                  background: "rgba(13, 12, 34, 0.95)",
                  borderRadius: "12px",
                  border: "1px solid rgba(124, 58, 237, 0.2)",
                  backdropFilter: "blur(12px)",
                  overflow: 'hidden',
                  minWidth: '200px',
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div
                  style={{
                    padding: '12px 16px',
                    color: '#E0E0E0',
                    borderBottom: '1px solid rgba(124, 58, 237, 0.3)',
                    fontSize: '0.95rem',
                  }}
                >
                  {userName || 'User'}
                </div>
                <div
                  style={{
                    padding: '12px 16px',
                    color: '#E0E0E0',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    fontSize: '0.95rem',
                  }}
                  onClick={() => router.push("/profile")}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'}
                >
                  My Profile
                </div>
                <div
                  style={{
                    padding: '12px 16px',
                    color: '#E0E0E0',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    fontSize: '0.95rem',
                    borderTop: '1px solid rgba(124, 58, 237, 0.1)',
                  }}
                  onClick={() => {
                    localStorage.removeItem("walletAddress");
                    localStorage.removeItem("userName");
                    router.push("/auth");
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#E0E0E0'}
                >
                  Logout
                </div>
              </motion.div>
            )}
          </motion.div>

          <div style={{ marginLeft: '20px' }}>
            <GoogleTranslate />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "160px 20px",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <NetworkBackground />
        
        <motion.div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 style={{ 
            fontSize: "5.5rem", 
            color: "#FFFFFF", 
            marginBottom: "30px",
            fontWeight: "800",
            lineHeight: "1.1",
            textShadow: "0 0 40px rgba(187, 134, 252, 0.3)",
          }}>
            Welcome Back, {userName}!
          </h1>
          <p style={{ 
            fontSize: "1.8rem", 
            color: "#E0E0E0", 
            marginBottom: "50px", 
            fontWeight: "400",
            maxWidth: "800px",
            margin: "0 auto 50px",
            lineHeight: "1.6",
            opacity: 0.9,
          }}>
            Continue your learning journey and explore<br />new opportunities in our decentralized platform.
          </p>
          <div style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginTop: "40px",
          }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(124, 58, 237, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                color: "#FFFFFF",
                padding: "20px 40px",
                borderRadius: "12px",
                border: "none",
                fontSize: "1.3rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)",
              }}
            >
              Start Learning
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "rgba(124, 58, 237, 0.1)",
                color: "#FFFFFF",
                padding: "20px 40px",
                borderRadius: "12px",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                fontSize: "1.3rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              View Courses
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Recommended Courses Section */}
      <div style={{ marginTop: "60px" }}>
        <h2 style={{
          fontSize: "2rem",
          marginBottom: "30px",
          color: "#FFFFFF"
        }}>
          Recommended Courses for {userPreferences?.interests?.join(', ') || 'You'}
        </h2>
        {recommendedCourses.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginTop: "20px"
          }}>
            {recommendedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                style={{
                  background: "rgba(13, 12, 34, 0.6)",
                  borderRadius: "24px",
                  padding: "30px",
                  border: "1px solid rgba(124, 58, 237, 0.15)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(187, 134, 252, 0.1))",
                  padding: "12px",
                  borderRadius: "16px",
                  marginBottom: "20px",
                  border: "1px solid rgba(124, 58, 237, 0.1)",
                }}>
                  <div style={{
                    fontSize: "1.6rem",
                    color: "#FFFFFF",
                    fontWeight: "700",
                    marginBottom: "8px",
                  }}>
                    {course.title}
                  </div>
                  <div style={{
                    color: "#BB86FC",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}>
                    {course.category}
                  </div>
                </div>

                <p style={{
                  fontSize: "1rem",
                  color: "#E0E0E0",
                  marginBottom: "20px",
                  opacity: 0.9,
                  lineHeight: "1.6",
                  flex: 1,
                }}>
                  {course.description}
                </p>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid rgba(124, 58, 237, 0.1)",
                  paddingTop: "20px",
                  marginTop: "auto",
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#E0E0E0",
                    fontSize: "0.9rem",
                  }}>
                    <span style={{ opacity: 0.7 }}>🕒</span>
                    {course.duration}
                  </div>
                  {/* <div style={{
                    background: "linear-gradient(135deg, #7C3AED, #BB86FC)",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    color: "#FFFFFF",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}>
                    {course.level}
                  </div> */}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "40px",
            color: "#A1A1AA"
          }}>
            No courses found for your interests. Explore our full course catalog!
          </div>
        )}
      </div>

      {/* Rest of your home page content */}
      <Features />

      {/* User Preferences Modal */}
      <UserPreferencesModal
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        onSubmit={handlePreferencesSubmit}
      />

      {/* More Features Section */}
      <section style={{
        padding: "100px 40px",
        background: "linear-gradient(145deg, rgba(19, 10, 42, 0.8), rgba(5, 5, 5, 0.8))",
        borderTop: "1px solid rgba(124, 58, 237, 0.2)",
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "60px",
            background: "linear-gradient(135deg, #FFFFFF, #BB86FC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          More Ways to Learn
        </motion.h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}>
          {[
            {
              title: "AI Chatbot Assistance",
              description: "Get instant help and personalized support from our advanced AI chatbot available 24/7.",
              icon: "🤖",
              color: "#7C3AED"
            },
            {
              title: "Special Courses for Divyang",
              description: "Inclusive learning materials and specially designed courses for differently-abled learners.",
              icon: "♿",
              color: "#3B82F6"
            },
            {
              title: "Resource Library",
              description: "Access a comprehensive collection of learning materials, documents, and multimedia content.",
              icon: "📚",
              color: "#2DD4BF"
            },
            {
              title: "Decentralised & Global Access",
              description: "Learn without boundaries with blockchain-powered global accessibility and secure content delivery.",
              icon: "🌍",
              color: "#BB86FC"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{
                background: "rgba(13, 12, 34, 0.6)",
                borderRadius: "20px",
                padding: "40px 30px",
                border: "1px solid rgba(124, 58, 237, 0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{
                fontSize: "2.5rem",
                marginBottom: "20px",
                background: `rgba(${parseInt(item.color.slice(1,3),16)}, ${parseInt(item.color.slice(3,5),16)}, ${parseInt(item.color.slice(5,7),16)}, 0.1)`,
                width: "60px",
                height: "60px",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${item.color}25`,
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "15px",
                color: item.color,
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "#E0E0E0",
                opacity: 0.9,
              }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "linear-gradient(145deg, rgba(19, 10, 42, 1), rgba(5, 5, 5, 1))",
        padding: "80px 40px 40px",
        color: "#E0E0E0",
        borderTop: "1px solid rgba(187, 134, 252, 0.1)",
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "60px",
          marginBottom: "60px",
        }}>
          {/* Brand Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <OwlLogo />
              <div style={{
                fontSize: "1.5rem",
                background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "800",
              }}>
                Open World Learning
              </div>
            </div>
            <p style={{ color: "#A0A0A0", lineHeight: "1.6" }}>
              Transforming education through decentralized learning experiences and blockchain technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "20px", fontWeight: "600" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["About Us", "Courses", "Community", "Support"].map((link) => (
                <a key={link} href="#" style={{ color: "#A0A0A0", textDecoration: "none", transition: "color 0.3s" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "20px", fontWeight: "600" }}>Resources</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Documentation", "Tutorials", "Blog", "FAQ"].map((link) => (
                <a key={link} href="#" style={{ color: "#A0A0A0", textDecoration: "none", transition: "color 0.3s" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1.2rem", marginBottom: "20px", fontWeight: "600" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#A0A0A0" }}>
              <p>Email: contact@owlearning.com</p>
              <p>Discord: OWL Community</p>
              <p>Twitter: @OWLearning</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: "1px solid rgba(187, 134, 252, 0.1)",
          paddingTop: "30px",
          textAlign: "center",
          color: "#808080",
          fontSize: "0.9rem",
        }}>
          © 2025 Open World Learning. All rights reserved.
        </div>
      </footer>
    </div>
  );
}