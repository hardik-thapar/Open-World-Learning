import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { OwlLogo } from '../components/OwlLogo';
import GoogleTranslate from '../components/GoogleTranslate';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const cyclingWords = ["limitations", "boundaries", "restrictions"];

const testimonials = [
  {
    text: "In our village, the nearby region was caught in conflict, and because of the violence, our school was closed for several months. My son lost his year of schooling, and it affected his future.",
    author: "Asha",
    role: "Parent from Conflict Zone",
    image: "/images/gettyimages-2178594401.jpg.webp"
  },
  {
    text: "At 14, I have been displaced four times due to the Syrian conflict, disrupting my education and leaving me with emotional distress. I dream of returning to school but face the harsh realities of war.",
    author: "Maya",
    role: "Student from Syria",
    image: "/images/image770x420cropped.jpg"
  },
  {
    text: "Our apartment was hit during a missile strike, forcing me to switch to online learning amidst the ongoing conflict. It's hard to focus on studies when you're worried about safety.",
    author: "Danylo",
    role: "Student from Ukraine",
    image: "/images/image1170x530cropped.jpg"
  },
  {
    text: "Due to financial hardships from conflict, I missed six months of schooling. The economic barriers we face in war-torn areas make education seem like a distant dream.",
    author: "Inbarasa",
    role: "Student from Sri Lanka",
    image: "/images/p0hd287j.jpg"
  }
];

export default function Landing() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Vanta effect after scripts are loaded
    const initVanta = () => {
      if (typeof window.VANTA !== 'undefined' && vantaRef.current) {
        window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x0f0f1a,
          colorSecond: 0x1a0b2c,
          shininess: 15.00,
          waveHeight: 20.00,
          waveSpeed: 0.75,
          zoom: 0.85,
          backgroundColor: 0x050508
        })
      }
    }

    // Call initVanta when both scripts are loaded
    if (typeof window.VANTA !== 'undefined') {
      initVanta()
    }

    return () => {
      if (vantaRef.current) {
        // @ts-ignore
        if (vantaRef.current.vanta) {
          // @ts-ignore
          vantaRef.current.vanta.destroy()
        }
      }
    }
  }, [])

  const pageStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, #050505, #130A2A, #0A1229)",
    color: "#F5F5F5",
    fontFamily: "'Inter', sans-serif",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  };

  const navbarStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 32px",
    backgroundColor: "rgba(15, 15, 20, 0.7)",
    backdropFilter: "blur(20px)",
    boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.3), inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.1)",
    position: "fixed",
    top: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "100px",
    maxWidth: "460px",
    width: "90%",
    zIndex: 1000,
    border: "1px solid rgba(255, 255, 255, 0.05)",
  };

  const navLinksStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "#E0E0E0",
    fontSize: "1.1rem",
    fontWeight: "600",
  };

  return (
    <div style={pageStyle}>
      {/* Vanta Scripts */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="https://cdn.jsdelivr.net/gh/tengbao/vanta/dist/vanta.waves.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          if (typeof window.VANTA !== 'undefined' && vantaRef.current) {
            window.VANTA.WAVES({
              el: vantaRef.current,
              mouseControls: false,
              touchControls: false,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x0f0f1a,
              colorSecond: 0x1a0b2c,
              shininess: 15.00,
              waveHeight: 20.00,
              waveSpeed: 0.75,
              zoom: 0.85,
              backgroundColor: 0x050508
            })
          }
        }}
      />

      {/* Vanta Background Container */}
      <div
        ref={vantaRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: "linear-gradient(145deg, rgba(5, 5, 8, 0.97), rgba(15, 15, 26, 0.95), rgba(26, 11, 44, 0.95))",
        }}
      />

      {/* Navbar */}
      <nav style={{ ...navbarStyle, position: 'relative', zIndex: 2 }}>
        {/* Static OWL logo and text */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          background: "linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(124, 58, 237, 0.05))",
          padding: "8px 16px",
          borderRadius: "100px",
          border: "1px solid rgba(124, 58, 237, 0.25)",
        }}>
          <OwlLogo />
          <div style={{
            fontSize: "1.5rem",
            background: "linear-gradient(135deg, #FFFFFF, #E9D5FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "800",
            letterSpacing: "-0.02em",
            textShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
            filter: "drop-shadow(0 0 8px rgba(124, 58, 237, 0.3))",
            position: "relative",
          }}>
            OWL
          </div>
        </div>

        <div style={navLinksStyle}>
          <Link href="/auth">
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(124, 58, 237, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "rgba(124, 58, 237, 0.05)",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: "100px",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                fontSize: "0.95rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.3px",
              }}
            >
              Sign In
            </motion.button>
          </Link>
          <Link href="/auth">
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 6px 20px rgba(124, 58, 237, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                color: "#FFFFFF",
                padding: "10px 24px",
                borderRadius: "100px",
                border: "none",
                fontSize: "0.95rem",
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)",
                transition: "all 0.2s ease",
                letterSpacing: "0.3px",
              }}
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
          padding: "80px 20px",
          overflow: "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Background gradient effect */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15), transparent 70%)",
            pointerEvents: "none",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            marginTop: "-40px",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <motion.h1 
            style={{ 
              fontSize: "clamp(4.5rem, 9vw, 8rem)",
              color: "#FFFFFF",
              fontWeight: "900",
              lineHeight: "0.9",
              letterSpacing: "-0.03em",
              textAlign: "center",
              maxWidth: "90%",
              marginBottom: "0",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.2em",
            }}>
              <div style={{
                display: "flex",
                gap: "0.3em",
                opacity: 0.95,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}>
                <span>Open</span>
                <span>World</span>
              </div>
              <span style={{
                background: "linear-gradient(to bottom, #FFFFFF, rgba(255, 255, 255, 0.85))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                marginTop: "-0.1em",
              }}>
                Learning
              </span>
            </div>
          </motion.h1>

          <motion.p 
            style={{ 
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              color: "#FFFFFF",
              fontWeight: "600",
              maxWidth: "800px",
              lineHeight: "1.3",
              letterSpacing: "-0.01em",
              textAlign: "center",
              padding: "0 20px",
              marginTop: "30px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.3rem",
              height: "60px"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <motion.span
              style={{ 
                display: "inline-block",
                color: "#FFFFFF",
                textShadow: "0 0 30px rgba(124, 58, 237, 0.3)",
                lineHeight: "60px",
                height: "60px",
              }}
            >
              Learn without&nbsp;
            </motion.span>
            {" "}
            <motion.span
              style={{
                display: "inline-flex",
                alignItems: "center",
                minWidth: "250px",
                color: "#BB86FC",
                position: "relative",
                textShadow: "0 0 30px rgba(124, 58, 237, 0.5)",
                height: "60px",
                overflow: "hidden"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={cyclingWords[0]}
            >
              <AnimatedWord words={cyclingWords} />
            </motion.span>
          </motion.p>

          <motion.div 
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              padding: "10px",
              width: "100%",
              maxWidth: "560px",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link href="/auth">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(124, 58, 237, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                  color: "#FFFFFF",
                  padding: "16px 36px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)",
                }}
              >
                Get Started
              </motion.button>
            </Link>
            <motion.a
              href="https://bafkreicrpjskcoco23ovvli33f47o4vnfbr7wwjb7pkwr5pn6pfcrcn6tu.ipfs.flk-ipfs.xyz"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(124, 58, 237, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "rgba(124, 58, 237, 0.1)",
                color: "#FFFFFF",
                padding: "16px 36px",
                borderRadius: "12px",
                border: "1px solid rgba(124, 58, 237, 0.3)",
                textDecoration: "none",
                fontSize: "1.2rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AnimatedWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <motion.span  // Changed from div to span to match parent
      style={{
        background: "linear-gradient(135deg, #BB86FC, #7C3AED)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: "700",
        letterSpacing: "0.5px",
        display: "inline-flex",  // Changed to inline-flex
        alignItems: "center",
        justifyContent: "flex-start"
      }}
    >
      <motion.span  // Changed from span to match parent structure
        animate={{
          scale: isAnimating ? [1, 1.1, 1] : 1,
          opacity: isAnimating ? [1, 0.8, 1] : 1
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        {words[index]}
      </motion.span>
    </motion.span>
  );
} 