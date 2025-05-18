import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ethers } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";

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

function Auth() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/success.mp3') : null);

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== "undefined" && !window.ethereum) {
      setError("Please install MetaMask to continue");
    }
  }, []);

  useEffect(() => {
    const splineFrame = document.createElement('iframe');
    splineFrame.src = 'https://my.spline.design/glowingplanetparticles-d3a91c8323434dc405078771ff0365c3/';
    splineFrame.style.width = '100vw';
    splineFrame.style.height = '110vh';
    splineFrame.style.border = 'none';
    splineFrame.style.position = 'absolute';
    splineFrame.style.top = '0';
    splineFrame.style.left = '0';
    splineFrame.style.right = '0';
    splineFrame.style.bottom = '0';
    splineFrame.style.transform = 'scale(1.1)';
    splineFrame.title = 'Spline Background';

    const container = document.getElementById('spline-container');
    if (container) {
      container.appendChild(splineFrame);
    }

    return () => {
      if (container && splineFrame) {
        container.removeChild(splineFrame);
      }
    };
  }, []);

  async function connectWallet() {
    if (isConnecting) return;

    setIsConnecting(true);
    setError("");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        // Store the account in localStorage
        localStorage.setItem("walletAddress", accounts[0]);
        setNotificationMessage("Wallet connected successfully!");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    } catch (error: any) {
      if (error.code === -32002) {
        setError("Please check your MetaMask popup");
      } else if (error.code === 4001) {
        setError("Connection rejected. Please try again");
      } else {
        setError("Failed to connect wallet. Please try again");
      }
    } finally {
      setIsConnecting(false);
    }
  }

  const handleNext = () => {
    if (!name.trim() || !account) {
      setError("Please complete all fields");
      return;
    }

    setShowSuccessAnimation(true);
    
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    localStorage.setItem("userName", name.trim());
    localStorage.setItem("walletAddress", account);

    setTimeout(() => {
      router.push("/profile-setup"); // Route to new profile setup page
    }, 5000);
  };

  // Add disconnect function
  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");
    setNotificationMessage("Wallet disconnected");
    setShowNotification(true);
  };

  const pageStyle: React.CSSProperties = {
    background: "#0A0A0F",
    color: "#F5F5F5",
    minHeight: "100vh",
    height: "100%",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    paddingTop: "80px",
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
  };

  const navbarStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px",
    backgroundColor: "rgba(15, 15, 20, 0.4)",
    backdropFilter: "blur(10px)",
    position: "fixed",
    top: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "100px",
    maxWidth: "360px",
    width: "90%",
    zIndex: 1000,
    border: "1px solid rgba(124, 58, 237, 0.2)",
    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.15)",
  };

  return (
    <div style={pageStyle}>
      {/* Spline Background Container */}
      <div
        id="spline-container"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      />

      {/* Add a mask to hide the watermark */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "linear-gradient(to bottom, transparent, #0A0A0F)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          ...navbarStyle,
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Logo section with enhanced animations */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <motion.div 
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 20px rgba(124, 58, 237, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              background: "rgba(124, 58, 237, 0.1)",
              padding: "8px 16px",
              borderRadius: "100px",
              gap: "10px",
              border: "1px solid rgba(124, 58, 237, 0.2)",
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
                color: "#FFFFFF",
                textShadow: "0 0 10px rgba(124, 58, 237, 0.5)",
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
          {/* Help button with enhanced animation */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              background: "rgba(124, 58, 237, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "transparent",
              color: "#FFFFFF",
              padding: "6px 12px",
              borderRadius: "100px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          padding: "40px",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "420px",
          margin: "180px auto 0",
          position: "relative",
          zIndex: 1,
          background: "rgba(20, 20, 31, 0.25)",
          backdropFilter: "blur(20px) brightness(1.1)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 25px 25px rgba(0, 0, 0, 0.1)",
          color: "#FFFFFF",
        }}
      >
        <div style={{ 
          marginBottom: "30px",
          background: "rgba(15, 15, 25, 0.3)",
          padding: "24px",
          borderRadius: "16px",
        }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              marginBottom: "24px",
              background: "linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}>
              Welcome to OWL
            </h2>
          </motion.div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(20, 20, 31, 0.6)",
              color: "#FFFFFF",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.3s ease",
            }}
            placeholder="Enter your display name"
          />
        </div>

        <motion.button
          onClick={account ? disconnectWallet : connectWallet}
          disabled={isConnecting}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(225, 119, 38, 0.35)",
            transition: { 
              duration: 0.2,
              ease: "easeOut"
            }
          }}
          whileTap={{ 
            scale: 0.98,
            boxShadow: "0 5px 15px rgba(225, 119, 38, 0.2)",
          }}
          initial={false}
          animate={isConnecting ? {
            scale: [1, 0.98, 1],
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          } : {}}
          style={{
            width: "100%",
            padding: "16px 20px",
            borderRadius: "14px",
            border: "none",
            background: account ? 
              "rgba(255, 255, 255, 0.05)" :
              "linear-gradient(135deg, #FF9B37, #E17726)",
            color: "#FFFFFF",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            position: "relative",
            overflow: "hidden",
            boxShadow: account ? 
              "none" :
              "0 8px 24px rgba(225, 119, 38, 0.25)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {account ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                background: "rgba(255, 255, 255, 0.05)",
                padding: "8px 12px",
                borderRadius: "12px",
              }}
            >
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px" 
              }}>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(76, 175, 80, 0.4)",
                      "0 0 0 10px rgba(76, 175, 80, 0)",
                      "0 0 0 0 rgba(76, 175, 80, 0.4)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#4CAF50",
                    borderRadius: "50%",
                  }}
                />
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                  }}
                >
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                </motion.span>
              </div>

              <motion.button
                onClick={disconnectWallet}
                whileHover={{ 
                  scale: 1.05,
                  background: "rgba(255, 59, 48, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <motion.span
                  style={{
                    color: "#FF3B30",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                  }}
                >
                  Disconnect
                </motion.span>
                <motion.svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#FF3B30"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </motion.svg>
              </motion.button>
            </motion.div>
          ) : (
            <>
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* MetaMask Fox Icon */}
                <svg width="24" height="24" viewBox="0 0 35 33" fill="none">
                  <path d="M32.958 1l-13.134 9.718 2.442-5.727L32.958 1z" fill="#FFFFFF"/>
                  <path d="M2.663 1l13.134 9.718-2.442-5.727L2.663 1z" fill="#FFFFFF"/>
                  <path d="M28.888 23.32l-3.726 5.718 8.789 2.42 2.526-8.563-7.59.424z" fill="#FFFFFF"/>
                  <path d="M0.144 22.895l2.526 8.563 8.789-2.42-3.726-5.718-7.59-.424z" fill="#FFFFFF"/>
                  <path d="M11.459 14.89l-2.442 3.673 8.789.424-.424-9.47-5.922 5.373z" fill="#FFFFFF"/>
                  <path d="M24.162 14.89l-5.922-5.373-.424 9.47 8.789-.424-2.442-3.673z" fill="#FFFFFF"/>
                </svg>
                {isConnecting ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Initializing Connection...
                  </motion.span>
                ) : (
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <span>
                      {account ? "Wallet Connected" : "Connect Web3 Wallet"}
                    </span>
                    {!account && (
                      <span style={{
                        fontSize: "0.8rem",
                        opacity: 0.7,
                        background: "rgba(255, 255, 255, 0.1)",
                        padding: "4px 8px",
                        borderRadius: "6px",
                      }}>
                        MetaMask
                      </span>
                    )}
                  </span>
                )}
              </motion.div>
              {!isConnecting && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "110%",
                    height: "110%",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "14px",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </>
          )}
        </motion.button>

        <motion.button
          onClick={handleNext}
          whileHover={!isSuccess ? { 
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(124, 58, 237, 0.3)",
            transition: { 
              duration: 0.2,
              ease: "easeOut"
            }
          } : {}}
          whileTap={!isSuccess ? { 
            scale: 0.98,
            boxShadow: "0 5px 15px rgba(124, 58, 237, 0.2)",
          } : {}}
          animate={isSuccess ? {
            scale: [1, 0.9, 1.1, 1],
            backgroundColor: ["#7C3AED", "#059669"],
            boxShadow: [
              "0 4px 20px rgba(124, 58, 237, 0.25)",
              "0 4px 20px rgba(5, 150, 105, 0.25)"
            ],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            }
          } : {}}
          style={{
            width: "100%",
            padding: "14px 20px",
            borderRadius: "12px",
            border: "none",
            background: isSuccess 
              ? "linear-gradient(135deg, #059669, #10B981)"
              : "linear-gradient(135deg, #7C3AED, #3B82F6)",
            boxShadow: "0 4px 20px rgba(124, 58, 237, 0.25)",
            color: "#FFFFFF",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            opacity: (!name.trim() || !account) ? 0.7 : 1,
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
              <span>Welcome Aboard!</span>
            </motion.div>
          ) : (
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>Continue to Platform</span>
              <span style={{
                fontSize: "0.8rem",
                opacity: 0.7,
              }}>
                {!name.trim() && !account 
                  ? "Complete profile to continue" 
                  : !name.trim() 
                    ? "Enter display name" 
                    : !account 
                      ? "Connect wallet to proceed" 
                      : ""}
              </span>
            </motion.div>
          )}
          {isSuccess && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 2],
                opacity: [0.5, 0],
              }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut",
                times: [0, 1],
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100%",
                height: "100%",
                border: "2px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "12px",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </motion.button>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: "#EF4444",
              marginTop: "20px",
              textAlign: "center",
              fontSize: "1rem",
            }}
          >
            {error}
          </motion.div>
        )}
      </motion.div>

      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
            padding: "16px 24px",
            background: "rgba(5, 150, 105, 0.95)",
            color: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}>
            ✓
          </div>
          {notificationMessage}
        </motion.div>
      )}

      {showSuccessAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(30px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            overflow: "hidden",
            perspective: "1000px",
          }}
        >
          {/* Animated 3D background rings */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              initial={{ scale: 0, opacity: 0, rotateX: 0, rotateY: 0 }}
              animate={{ 
                scale: [0, 1.5, 2.5],
                opacity: [0, 0.6, 0],
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
                width: `${300 + i * 50}px`,
                height: `${300 + i * 50}px`,
                borderRadius: "50%",
                border: "2px solid rgba(124, 58, 237, 0.2)",
                background: "radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)",
                boxShadow: "0 0 30px rgba(124, 58, 237, 0.1)",
              }}
            />
          ))}

          {/* Floating geometric shapes */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              initial={{ 
                x: 0,
                y: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{ 
                x: Math.sin(i) * 200,
                y: Math.cos(i) * 200,
                scale: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                position: "absolute",
                width: 10 + Math.random() * 20,
                height: 10 + Math.random() * 20,
                background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.3)`,
                borderRadius: i % 2 === 0 ? "50%" : "4px",
                filter: "blur(1px)",
              }}
            />
          ))}

          {/* Enhanced central success icon */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ 
              scale: [0, 1.4, 1],
              rotateY: [0, 360, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeOut",
            }}
            style={{
              background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
              borderRadius: "50%",
              width: "140px",
              height: "140px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 80px rgba(124, 58, 237, 0.6)",
              transform: "translateZ(50px)",
            }}
          >
            <motion.svg
              width="70"
              height="70"
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
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 1.5,
                delay: 0.5,
                ease: "easeInOut",
              }}
            >
              <polyline points="20 6 9 17 4 12" />
            </motion.svg>
          </motion.div>

          {/* Ultra particle effects */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 1,
                rotate: 0,
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
                width: 3 + Math.random() * 10,
                height: 3 + Math.random() * 10,
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

          {/* Enhanced success text with 3D effect */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            style={{
              position: "absolute",
              bottom: "25%",
              textAlign: "center",
              color: "#FFFFFF",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.h2
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 20px rgba(124, 58, 237, 0.3)",
                  "0 0 60px rgba(124, 58, 237, 0.6)",
                  "0 0 20px rgba(124, 58, 237, 0.3)",
                ],
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                marginBottom: "16px",
                background: "linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "1px",
              }}
            >
              Welcome Aboard!
            </motion.h2>

            {/* Enhanced redirecting text */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.8],
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  fontSize: "1.2rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                  fontWeight: "500",
                }}
              >
                Preparing Your Journey
              </motion.p>

              {/* Loading dots */}
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
                      background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                      boxShadow: "0 0 10px rgba(124, 58, 237, 0.4)",
                    }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div style={{
                width: "120px",
                height: "2px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                overflow: "hidden",
                marginTop: "4px",
              }}>
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: "50%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Auth; 