import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Grid Lines */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`grid-x-${i}`}
          style={{
            position: "absolute",
            left: `${(i / 20) * 100}%`,
            top: 0,
            width: "1px",
            height: "100%",
            background: "linear-gradient(to bottom, transparent, rgba(124, 58, 237, 0.1), transparent)",
            opacity: 0.3,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`grid-y-${i}`}
          style={{
            position: "absolute",
            top: `${(i / 20) * 100}%`,
            left: 0,
            width: "100%",
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(124, 58, 237, 0.1), transparent)",
            opacity: 0.3,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleX: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Floating Connection Points */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: "4px",
            height: "4px",
            background: "rgba(124, 58, 237, 0.6)",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(124, 58, 237, 0.3)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        >
          {/* Connection Lines */}
          {[...Array(3)].map((_, j) => (
            <motion.div
              key={`line-${i}-${j}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: `${150 + Math.random() * 100}px`,
                height: "1px",
                background: "linear-gradient(90deg, rgba(124, 58, 237, 0.3), transparent)",
                transform: `rotate(${(j * 120) + Math.random() * 30}deg)`,
                transformOrigin: "left center",
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Glowing Background Effect */}
      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, transparent 50%)",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

const ParticleBackground = () => {
  const { theme } = useContext(ThemeContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
      opacity: theme === 'dark' ? 0.6 : 0.3,
    }}>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            background: theme === 'dark'
              ? "linear-gradient(135deg, #7C3AED, #3B82F6)"
              : "linear-gradient(135deg, #7C3AED, #5B21B6)",
            borderRadius: "50%",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const FooterLink = ({ href, children }) => {
  const { theme } = useContext(ThemeContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={href} 
      style={{ 
        color: theme === 'dark' ? "#E0E0E0" : "#4B5563", 
        opacity: isHovered ? "1" : "0.8",
        textDecoration: "none",
        transition: "all 0.3s ease",
        fontSize: "1rem",
        display: "inline-block",
        transform: isHovered ? "translateX(5px)" : "translateX(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

const SocialLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        color: isHovered ? "#BB86FC" : "#E0E0E0",
        textDecoration: "none",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

export default function About() {
  const { scrollYProgress } = useScroll();
  const ref = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const pageStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? "linear-gradient(145deg, #050505, #130A2A, #0A1229)"
      : "linear-gradient(145deg, #F8FAFC, #F1F5F9, #F8FAFC)",
    color: theme === 'dark' ? "#F5F5F5" : "#1E293B",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  };

  const navbarStyle: React.CSSProperties = {
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
  };

  const logoContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const logoStyle: React.CSSProperties = {
    fontSize: "2rem",
    background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "800",
    letterSpacing: "0.5px",
  };

  const navLinksStyle: React.CSSProperties = {
    display: "flex",
    gap: "40px",
    alignItems: "center",
  };

  const linkStyle: React.CSSProperties = {
    color: "#E0E0E0",
    fontSize: "1.1rem",
    fontWeight: "500",
    cursor: "pointer",
    textDecoration: "none",
    position: "relative",
    letterSpacing: "0.5px",
    padding: "8px 0",
    transition: "color 0.3s ease",
  };

  const sectionStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, rgba(19, 10, 42, 0.9), rgba(5, 5, 5, 0.9))",
    padding: "60px",
    borderRadius: "24px",
    marginBottom: "60px",
    border: "1px solid rgba(124, 58, 237, 0.2)",
    position: "relative",
    overflow: "hidden",
  };

  const features = [
    {
      title: "Decentralized Access",
      description: "Access educational content anywhere, anytime - even in regions affected by conflict or limited infrastructure.",
      icon: "🌍",
      gradient: "linear-gradient(135deg, #7C3AED, #3B82F6)"
    },
    {
      title: "MetaMask Integration",
      description: "Secure blockchain-based authentication and transactions using MetaMask wallet integration.",
      icon: "🦊",
      gradient: "linear-gradient(135deg, #F6851B, #E4761B)"
    },
    {
      title: "Digital Library",
      description: "Vast collection of educational resources stored on IPFS for permanent, censorship-resistant access.",
      icon: "📚",
      gradient: "linear-gradient(135deg, #059669, #10B981)"
    },
    {
      title: "Interactive Courses",
      description: "Engaging learning experiences with real-world applications and hands-on practice.",
      icon: "💡",
      gradient: "linear-gradient(135deg, #DB2777, #EC4899)"
    }
  ];

  return (
    <div style={pageStyle}>
      <ParticleBackground />
      
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

        {/* Right Side - Profile and Actions (empty for about page) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* You can add profile dropdown or GoogleTranslate here if needed for consistency */}
        </div>
      </nav>

      <main style={{ 
        padding: "20px 40px",
        position: "relative" 
      }}>
        {/* Hero Section with Network Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            marginBottom: "40px",
            position: "relative",
            padding: "160px 20px",
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <NetworkBackground />
          
          <motion.div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <motion.h1 
              style={{ 
                fontSize: "4rem",
                fontWeight: "800",
                marginBottom: "40px",
                color: "#FFFFFF",
                textShadow: "0 0 40px rgba(187, 134, 252, 0.2)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Open World Learning
            </motion.h1>
            <motion.p 
              style={{
                fontSize: "1.6rem",
                color: "#E0E0E0",
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: "1.6",
                marginBottom: "50px",
                opacity: 0.9,
              }}
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Revolutionizing education through blockchain technology and decentralized learning
            </motion.p>
            
            {/* Enhanced Documentation Button */}
            <motion.a
              href="https://bafkreicrpjskcoco23ovvli33f47o4vnfbr7wwjb7pkwr5pn6pfcrcn6tu.ipfs.flk-ipfs.xyz"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                color: "#FFFFFF",
                padding: "16px 32px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "600",
                display: "inline-block",
                marginTop: "24px",
                boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)",
              }}
              whileHover={{ 
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(124, 58, 237, 0.4)",
              }}
              whileTap={{ transform: "translateY(0px)" }}
            >
              Read Documentation
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Enhanced What We Do Section with Bento Grid */}
        <section style={{
          padding: "40px",
          marginBottom: "40px", // Adjusted margin since it's now the last section
        }}>
          <h2 style={{
            fontSize: "3.5rem",
            fontWeight: "800",
            marginBottom: "60px",
            background: "linear-gradient(135deg, #FFFFFF, #BB86FC)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            position: "relative",
          }}>
            What We Do
            <motion.div
              style={{
                position: "absolute",
                bottom: "-15px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "150px",
                height: "4px",
                background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
                borderRadius: "2px",
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                width: ["130px", "170px", "130px"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </h2>

          {/* Enhanced Bento Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, auto)",
            gap: "25px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}>
            {/* Main Feature Box - Enhanced */}
            <motion.div
              style={{
                gridColumn: "span 2",
                gridRow: "span 2",
                background: "linear-gradient(145deg, rgba(19, 10, 42, 0.9), rgba(5, 5, 5, 0.9))",
                borderRadius: "24px",
                padding: "40px",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(124, 58, 237, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Add subtle animated gradient overlay */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(45deg, transparent, rgba(124, 58, 237, 0.1), transparent)",
                  opacity: 0,
                }}
                whileHover={{ opacity: 1 }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div>
                <motion.div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "20px",
                    background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  🌍
                </motion.div>
                <h3 style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  marginBottom: "20px",
                  color: "#FFFFFF",
                }}>
                  Decentralized Learning
                </h3>
                <p style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  color: "#E0E0E0",
                }}>
                  Revolutionizing education through blockchain technology, making quality learning 
                  accessible to everyone, everywhere. Our decentralized platform ensures that 
                  education remains accessible even in regions affected by conflict, censorship, 
                  or limited infrastructure.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Learn More →
              </motion.button>
            </motion.div>

            {/* Feature Boxes - Enhanced */}
            {[
              {
                icon: "🔒",
                title: "Secure Access",
                description: "MetaMask integration for secure authentication",
                gradient: "linear-gradient(135deg, #F6851B, #E4761B)",
              },
              {
                icon: "📚",
                title: "IPFS Storage",
                description: "Permanent, decentralized content storage",
                gradient: "linear-gradient(135deg, #059669, #10B981)",
              },
              {
                icon: "🎓",
                title: "Verified Learning",
                description: "Blockchain-verified credentials",
                gradient: "linear-gradient(135deg, #7C3AED, #3B82F6)",
              },
              {
                icon: "🌐",
                title: "Global Reach",
                description: "Borderless educational access",
                gradient: "linear-gradient(135deg, #DB2777, #EC4899)",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                style={{
                  background: "linear-gradient(145deg, rgba(19, 10, 42, 0.9), rgba(5, 5, 5, 0.9))",
                  borderRadius: "24px",
                  padding: "30px",
                  border: "1px solid rgba(124, 58, 237, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(124, 58, 237, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Add hover glow effect */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: feature.gradient,
                    opacity: 0,
                    filter: "blur(20px)",
                  }}
                  whileHover={{ opacity: 0.15 }}
                />

                <div style={{ 
                  fontSize: "2.5rem",
                  marginBottom: "15px",
                  position: "relative",
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: "1.4rem",
                  fontWeight: "700",
                  marginBottom: "10px",
                  color: "#FFFFFF",
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: "1rem",
                  color: "#E0E0E0",
                  lineHeight: "1.6",
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "0", // Adjusted since it's now the last section
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
              style={{
                background: theme === 'dark'
                  ? "linear-gradient(145deg, rgba(19, 10, 42, 0.9), rgba(5, 5, 5, 0.9))"
                  : "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.9))",
                padding: "30px",
                borderRadius: "20px",
                border: theme === 'dark'
                  ? "1px solid rgba(124, 58, 237, 0.2)"
                  : "1px solid rgba(124, 58, 237, 0.15)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: feature.gradient,
                  opacity: 0,
                  pointerEvents: "none",
                }}
                whileHover={{ opacity: 0.1 }}
              />
              <div style={{ 
                fontSize: "3rem",
                marginBottom: "20px",
                position: "relative",
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                marginBottom: "16px",
                background: theme === 'dark'
                  ? "linear-gradient(135deg, #FFFFFF, #BB86FC)"
                  : "linear-gradient(135deg, #7C3AED, #5B21B6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                fontSize: "1.1rem", 
                color: theme === 'dark' ? "#E0E0E0" : "#4B5563", 
                lineHeight: "1.6" 
              }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer style={{
        background: theme === 'dark'
          ? "linear-gradient(145deg, rgba(19, 10, 42, 1), rgba(5, 5, 5, 1))"
          : "linear-gradient(145deg, #F8FAFC, #F1F5F9)",
        padding: "40px 40px 30px",
        color: theme === 'dark' ? "#E0E0E0" : "#1E293B",
        borderTop: theme === 'dark'
          ? "1px solid rgba(187, 134, 252, 0.1)"
          : "1px solid rgba(124, 58, 237, 0.1)",
        marginTop: "40px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "60px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}>
          {/* Brand Section */}
          <div>
            <div style={{ ...logoContainerStyle, marginBottom: "20px" }}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <OwlLogo />
                  <span style={{ 
                    fontSize: "1.5rem", 
                    fontWeight: "700",
                    color: theme === 'dark' ? "#FFFFFF" : "#1E293B",
                  }}>
                    Open World Learning
                  </span>
                </div>
              </Link>
            </div>
            <p style={{ color: "#E0E0E0", opacity: 0.8, lineHeight: "1.6" }}>
              Empowering global education through blockchain technology.
            </p>
          </div>

          {/* Quick Links */}
          {[
            {
              title: "Navigation",
              links: ["Home", "Library", "Courses", "About"]
            },
            {
              title: "Resources",
              links: ["Documentation", "Tutorials", "Blog", "Support"]
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy"]
            }
          ].map((section, index) => (
            <div key={index}>
              <h3 style={{ 
                color: "#FFFFFF", 
                fontSize: "1.2rem", 
                fontWeight: "600",
                marginBottom: "20px",
                background: "linear-gradient(135deg, #FFFFFF, #BB86FC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {section.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} style={{ marginBottom: "12px" }}>
                    <FooterLink href="#">{link}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(187, 134, 252, 0.1)",
          marginTop: "60px",
          paddingTop: "30px",
          textAlign: "center",
          color: "#E0E0E0",
          opacity: 0.8,
          fontSize: "0.9rem",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginBottom: "20px",
          }}>
            {["Facebook", "Twitter", "LinkedIn", "GitHub"].map((social, index) => (
              <SocialLink key={index} href="#">{social}</SocialLink>
            ))}
          </div>
          <p>© 2024 Open World Learning. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
