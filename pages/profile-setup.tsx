import { useState, useContext, ChangeEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ThemeContext } from "../context/ThemeContext";
import dynamic from 'next/dynamic';
import styles from '../styles/ProfileSetup.module.css';
import Link from "next/link";
import Spline from "@splinetool/react-spline";
// Dynamically import Spline with no SSR
// const Spline = dynamic(() => import('@splinetool/react-spline').then(mod => mod.default), { ssr: false });

interface Profile {
  displayName: string;
  profileImage: string;
}

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

const ProfileSetup = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [profile, setProfile] = useState<Profile>({
    displayName: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/success.mp3') : null);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setProfile(prev => ({ ...prev, displayName: savedName }));
    }
  }, []);

  const handleSelectAvatar = (avatarNumber: number) => {
    setProfile(prev => ({
      ...prev,
      profileImage: `/images/profile${avatarNumber}.png`
    }));
  };

  const handleComplete = async () => {
    if (!profile.profileImage) {
      alert("Please select an avatar");
      return;
    }

    setLoading(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem("userProfile", JSON.stringify(profile));
    }

    // Play success sound
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }

    setShowSuccessAnimation(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    router.push("/home");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -30,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.8
      }
    }
  };

  const avatarVariants = {
    hidden: { 
      opacity: 0,
      y: 40,
      scale: 0.4,
      rotate: -20,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }
    },
    selected: {
      scale: 1.1,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [-3, 3],
    rotate: [-2, 2],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      rotate: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={styles.container}>
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px",
          backgroundColor: theme === 'dark' 
            ? "rgba(15, 15, 20, 0.4)" 
            : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          position: "fixed",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "100px",
          maxWidth: "360px",
          width: "90%",
          zIndex: 1000,
          border: theme === 'dark'
            ? "1px solid rgba(124, 58, 237, 0.2)"
            : "1px solid rgba(124, 58, 237, 0.3)",
          boxShadow: theme === 'dark'
            ? "0 4px 20px rgba(0, 0, 0, 0.2)"
            : "0 4px 20px rgba(124, 58, 237, 0.15)",
        }}
      >
        {/* Logo section */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <motion.div 
            whileHover={{ 
              scale: 1.02,
              boxShadow: theme === 'dark'
                ? "0 0 20px rgba(124, 58, 237, 0.2)"
                : "0 0 20px rgba(124, 58, 237, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              background: theme === 'dark'
                ? "rgba(124, 58, 237, 0.1)"
                : "rgba(124, 58, 237, 0.15)",
              padding: "8px 16px",
              borderRadius: "100px",
              gap: "10px",
              border: theme === 'dark'
                ? "1px solid rgba(124, 58, 237, 0.2)"
                : "1px solid rgba(124, 58, 237, 0.25)",
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <OwlLogo />
            </motion.div>
            <motion.span
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                letterSpacing: "0.05em",
                color: theme === 'dark' 
                  ? "#FFFFFF" 
                  : "#7C3AED",
                textShadow: theme === 'dark'
                  ? "0 0 10px rgba(124, 58, 237, 0.5)"
                  : "0 0 10px rgba(124, 58, 237, 0.3)",
              }}
            >
              OWL
            </motion.span>
          </motion.div>
        </Link>

        {/* Action buttons container */}
        <div style={{
          display: "flex",
          gap: "6px",
          padding: "4px",
        }}>
          {/* Theme toggle button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: theme === 'dark'
                ? "rgba(15, 15, 20, 0.6)"
                : "rgba(255, 255, 255, 0.95)",
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: theme === 'dark'
                ? "1px solid rgba(124, 58, 237, 0.2)"
                : "1px solid rgba(124, 58, 237, 0.15)",
              boxShadow: theme === 'dark'
                ? "0 4px 20px rgba(124, 58, 237, 0.1)"
                : "0 4px 20px rgba(124, 58, 237, 0.1)",
            }}
          >
            <motion.div
              initial={false}
              animate={{
                rotate: theme === 'dark' ? 0 : 360,
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              {theme === 'dark' ? (
                <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2m0 16v2M4 12H2m20 0h-2m-2.05-6.95l-1.41 1.41M5.46 5.46l-1.41 1.41m0 10.26l1.41 1.41m12.72 0l1.41-1.41"/>
                </motion.svg>
              ) : (
                <motion.svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </motion.svg>
              )}
            </motion.div>
          </motion.button>

          {/* Help button */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              background: theme === 'dark'
                ? "rgba(124, 58, 237, 0.1)"
                : "rgba(124, 58, 237, 0.15)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "transparent",
              color: theme === 'dark' 
                ? "#FFFFFF" 
                : "#7C3AED",
              padding: "6px 12px",
              borderRadius: "100px",
              border: theme === 'dark'
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(124, 58, 237, 0.25)",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <motion.svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </motion.svg>
            Help
          </motion.button>
        </div>
      </motion.nav>

      <div className={styles.splineContainer}>
        <style jsx global>{`
          .spline-watermark {
            display: none !important;
          }
        `}</style>
        <Spline scene="https://prod.spline.design/9LSKdbWjgJ-GNtBW/scene.splinecode" />
        <motion.div 
          className={styles.owlBranding}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        >
          <motion.div
            animate={{ 
              background: ["rgba(124, 58, 237, 0.1)", "rgba(124, 58, 237, 0.2)", "rgba(124, 58, 237, 0.1)"],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={styles.brandingInner}
          >
            <span>OWL</span>
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
          className={styles.card}
        >
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Choose Your Avatar
          </motion.h2>

          <motion.div 
            className={styles.avatarGrid}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <motion.div
                key={num}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                whileTap={{ scale: 0.95 }}
                className={styles.avatarWrapper}
              >
                <motion.div
                  className={`${styles.avatarOption} ${
                    profile.profileImage === `/images/profile${num}.png` ? styles.selected : ''
                  }`}
                  onClick={() => handleSelectAvatar(num)}
                  animate={profile.profileImage === `/images/profile${num}.png` ? {
                    y: [0, -5, 0],
                    transition: {
                      y: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }
                  } : {}}
                >
                  <motion.div 
                    className={styles.avatarGlow}
                    initial={false}
                    animate={{
                      opacity: profile.profileImage === `/images/profile${num}.png` ? 0.8 : 0
                    }}
                  />
                  <img 
                    src={`/images/profile${num}.png`}
                    alt={`Profile ${num}`}
                    className={styles.avatarImage}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            onClick={handleComplete}
            disabled={loading}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(124, 58, 237, 0.35)",
              transition: { 
                duration: 0.2,
                ease: "easeOut"
              }
            }}
            whileTap={{ 
              scale: 0.98,
              boxShadow: "0 5px 15px rgba(124, 58, 237, 0.2)",
            }}
            initial={false}
            animate={loading ? {
              scale: [1, 0.98, 1],
              transition: { 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            } : {}}
            className={styles.button}
          >
            {loading ? (
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  position: "relative",
                }}
              >
                <span>Setting up your profile</span>
                <div style={{
                  display: "flex",
                  gap: "6px",
                  marginTop: "-4px",
                }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #FFFFFF, rgba(255, 255, 255, 0.8))",
                        boxShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
                      }}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "120px",
                  height: "2px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}>
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: "50%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, #FFFFFF, transparent)",
                    }}
                  />
                </div>
              </motion.div>
            ) : (
              "Continue"
            )}
          </motion.button>
        </motion.div>
      </div>

      {showSuccessAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.98)",
            backdropFilter: "blur(50px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "3rem",
            zIndex: 1000,
            perspective: "1200px",
          }}
        >
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 0,
              }}
              animate={{ 
                x: Math.cos(i * 12 * Math.PI / 180) * (200 + Math.random() * 200),
                y: Math.sin(i * 12 * Math.PI / 180) * (200 + Math.random() * 200),
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                ease: "easeOut",
                delay: 0.2 + Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
              style={{
                position: "absolute",
                width: 3 + Math.random() * 8,
                height: 3 + Math.random() * 8,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                background: i % 3 === 0 
                  ? "linear-gradient(135deg, #7C3AED, transparent)"
                  : i % 3 === 1
                    ? "linear-gradient(135deg, #3B82F6, transparent)"
                    : "linear-gradient(135deg, #8B5CF6, transparent)",
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)",
                filter: "blur(0.5px)",
              }}
            />
          ))}

          {/* Animated rings with glow */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 2],
                opacity: [0, 0.4, 0],
                rotateX: [0, 90, 180],
                rotateY: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                width: `${300 + i * 40}px`,
                height: `${300 + i * 40}px`,
                borderRadius: "50%",
                border: "2px solid rgba(124, 58, 237, 0.3)",
                background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
                boxShadow: "0 0 30px rgba(124, 58, 237, 0.2)",
                filter: "blur(1px)",
              }}
            />
          ))}

          {/* Enhanced success checkmark */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotateY: 0,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            style={{
              background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
              borderRadius: "50%",
              width: "160px",
              height: "160px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `
                0 0 60px rgba(124, 58, 237, 0.6),
                0 0 100px rgba(124, 58, 237, 0.4),
                inset 0 0 30px rgba(255, 255, 255, 0.2)
              `,
              position: "relative",
            }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(124, 58, 237, 0.3)",
                  "0 0 0 20px rgba(124, 58, 237, 0)",
                  "0 0 0 0px rgba(124, 58, 237, 0.3)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
              }}
            />
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1,
                opacity: 1,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1,
                ease: "easeOut",
              }}
            >
              <polyline points="20 6 9 17 4 12" />
            </motion.svg>
          </motion.div>

          {/* Enhanced welcome text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ 
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <motion.h2
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 20px rgba(124, 58, 237, 0.3)",
                  "0 0 40px rgba(124, 58, 237, 0.6)",
                  "0 0 20px rgba(124, 58, 237, 0.3)",
                ],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                fontSize: "3rem",
                fontWeight: "800",
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
              }}
            >
              Welcome to OWL
            </motion.h2>
            <motion.div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                justifyContent: "center",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1.3rem",
                fontWeight: "500",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <span>Launching your experience</span>
              <motion.div style={{ display: "flex", gap: "6px" }}>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -8, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "50%",
                      display: "inline-block",
                      boxShadow: "0 0 20px rgba(124, 58, 237, 0.6)",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfileSetup; 