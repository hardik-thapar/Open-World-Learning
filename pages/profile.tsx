import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
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

export default function Profile() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("Waiting for MetaMask...");
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [badges, setBadges] = useState({ beginnerBadge: false, intermediateBadge: false });
  const [userProfile, setUserProfile] = useState<{ profileImage: string } | null>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setIsClient(true);
    // Check localStorage for existing wallet connection and user name
    const storedWallet = localStorage.getItem("walletAddress");
    const storedName = localStorage.getItem("userName");
    if (storedWallet) {
      setAccount(storedWallet);
    }
    if (storedName) {
      setUserName(storedName);
    }

    // Add this to load the profile image
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
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

    // Load badges from localStorage
    const userBadges = JSON.parse(localStorage.getItem('userBadges') || '{"beginnerBadge":false,"intermediateBadge":false}');
    setBadges(userBadges);
  }, []);

  async function connectWallet() {
    if (!provider || isConnecting) {
      return;
    }

    setIsConnecting(true);
    setStatus("Connecting to MetaMask...");

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        const signerInstance = await provider.getSigner();
        setSigner(signerInstance);
        setAccount(accounts[0]);
        setStatus(`Connected: ${accounts[0]}`);
      } else {
        setStatus("No accounts found.");
      }
    } catch (error: any) {
      console.error("MetaMask connection failed:", error);
      setStatus("MetaMask connection failed. Try again.");
    } finally {
      setIsConnecting(false);
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const pageStyle: React.CSSProperties = {
    background: theme === 'dark'
      ? "linear-gradient(145deg, #050505, #130A2A, #0A1229)"
      : "linear-gradient(145deg, #F8FAFC, #F1F5F9, #F8FAFC)",
    color: theme === 'dark' ? "#F5F5F5" : "#1E293B",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    paddingTop: "100px",
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

  return (
    <div style={pageStyle}>
      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 16px",
          backgroundColor: theme === 'dark' 
            ? "rgba(15, 15, 20, 0.4)" 
            : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          position: "fixed",
          top: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "100px",
          maxWidth: "800px", // Increased to accommodate more items
          width: "95%",
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

        {/* Navigation Links */}
        <div style={{
          display: "flex",
          gap: "8px",
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
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  color: "#FFFFFF",
                  textShadow: "0 0 10px rgba(124, 58, 237, 0.5)",
                }}
                style={{
                  color: theme === 'dark' ? "#E0E0E0" : "#7C3AED",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                }}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {/* Theme toggle */}
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
              {/* Theme toggle icon */}
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
            </motion.button>

            {/* Wallet Connection */}
            {account ? (
              <motion.div
                style={{
                  background: theme === 'dark'
                    ? "rgba(124, 58, 237, 0.1)"
                    : "rgba(124, 58, 237, 0.15)",
                  padding: "8px 16px",
                  borderRadius: "100px",
                  fontSize: "0.9rem",
                  color: theme === 'dark' ? "#FFFFFF" : "#7C3AED",
                  border: theme === 'dark'
                    ? "1px solid rgba(124, 58, 237, 0.2)"
                    : "1px solid rgba(124, 58, 237, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>{formatAddress(account)}</span>
              </motion.div>
            ) : (
              <motion.button
                onClick={connectWallet}
                disabled={isConnecting}
                whileHover={!isConnecting ? { scale: 1.05 } : {}}
                whileTap={!isConnecting ? { scale: 0.95 } : {}}
                style={{
                  background: theme === 'dark'
                    ? "rgba(124, 58, 237, 0.1)"
                    : "rgba(124, 58, 237, 0.15)",
                  color: theme === 'dark' ? "#FFFFFF" : "#7C3AED",
                  padding: "8px 16px",
                  borderRadius: "100px",
                  border: theme === 'dark'
                    ? "1px solid rgba(124, 58, 237, 0.2)"
                    : "1px solid rgba(124, 58, 237, 0.25)",
                  cursor: isConnecting ? "not-allowed" : "pointer",
                  opacity: isConnecting ? 0.7 : 1,
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main style={{ 
        padding: "40px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: theme === 'dark' 
              ? "rgba(19, 10, 42, 0.2)"
              : "rgba(255, 255, 255, 0.9)",
            borderRadius: "40px",
            padding: "40px",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(124, 58, 237, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* User Information Section */}
          <div style={{
            background: theme === 'dark' 
              ? "rgba(19, 10, 42, 0.3)"
              : "rgba(255, 255, 255, 0.95)",
            borderRadius: "32px",
            padding: "40px",
            marginBottom: "32px",
            border: "1px solid rgba(124, 58, 237, 0.1)",
            backdropFilter: "blur(20px)",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "32px",
            }}>
              {/* Profile Image */}
              <motion.div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid rgba(124, 58, 237, 0.2)",
                }}
              >
                {userProfile?.profileImage && (
                  <img
                    src={userProfile.profileImage}
                    alt="Profile Avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </motion.div>

              <div>
                <h2 style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: theme === 'dark' ? "#FFFFFF" : "#1E293B",
                  marginBottom: "4px",
                }}>
                  {userName || "n"}
                </h2>
                <div style={{
                  fontSize: "14px",
                  color: "rgba(124, 58, 237, 0.8)",
                }}>
                  Member
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  color: theme === 'dark' ? "#BB86FC" : "#7C3AED",
                  marginBottom: "8px",
                }}>
                  Name
                </label>
                <div style={{
                  padding: "12px 16px",
                  background: "rgba(124, 58, 237, 0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(124, 58, 237, 0.1)",
                  color: theme === 'dark' ? "#FFFFFF" : "#1E293B",
                }}>
                  {userName || "n"}
                </div>
              </div>

              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  color: theme === 'dark' ? "#BB86FC" : "#7C3AED",
                  marginBottom: "8px",
                }}>
                  Connected Wallet
                </label>
                <div style={{
                  padding: "12px 16px",
                  background: "rgba(124, 58, 237, 0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(124, 58, 237, 0.1)",
                  color: theme === 'dark' ? "#FFFFFF" : "#1E293B",
                  fontSize: "14px",
                  fontFamily: "monospace",
                }}>
                  {account || "0xa5a2efe14150ca1dec86db45ca75977d58b1c403"}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div style={{
            background: theme === 'dark' 
              ? "rgba(19, 10, 42, 0.3)"
              : "rgba(255, 255, 255, 0.95)",
            borderRadius: "32px",
            padding: "40px",
            border: "1px solid rgba(124, 58, 237, 0.1)",
            backdropFilter: "blur(20px)",
          }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "24px",
              color: theme === 'dark' ? "#FFFFFF" : "#1E293B",
            }}>
              Achievements
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}>
              {/* Beginner Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  width: "100%",
                  padding: "24px",
                  background: badges.beginnerBadge 
                    ? theme === 'dark'
                      ? "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(59, 130, 246, 0.2))"
                      : "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95))"
                    : theme === 'dark'
                      ? "rgba(124, 58, 237, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                  borderRadius: "16px",
                  textAlign: "center",
                  border: theme === 'dark'
                    ? "1px solid rgba(124, 58, 237, 0.2)"
                    : "1px solid rgba(124, 58, 237, 0.25)",
                  opacity: badges.beginnerBadge ? 1 : 0.7,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: theme === 'dark'
                    ? "none"
                    : "0 4px 12px rgba(148, 163, 184, 0.1)",
                }}
              >
                <Link 
                  href="https://bafkreibhov452vvhhktwxusqhrpe6dc6db4uhf3xz6kbgrzsesz7f7dpla.ipfs.flk-ipfs.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <motion.img 
                    src="/images/1.png"
                    alt="Beginner Badge"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "12px",
                      filter: badges.beginnerBadge ? "none" : "grayscale(100%)",
                    }}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.div 
                    style={{ 
                      color: theme === 'dark' ? "#FFFFFF" : "#1E293B",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      marginBottom: "4px",
                    }}
                  >
                    Beginner
                  </motion.div>
                  <motion.div style={{ 
                    color: theme === 'dark' ? "#E0E0E0" : "#64748B",
                    fontSize: "0.9rem",
                  }}>
                    Complete 2 Courses
                  </motion.div>
                </Link>
              </motion.div>

              {/* Intermediate Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  width: "100%",
                  padding: "24px",
                  background: badges.intermediateBadge 
                    ? theme === 'dark'
                      ? "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(59, 130, 246, 0.2))"
                      : "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95))"
                    : theme === 'dark'
                      ? "rgba(124, 58, 237, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                  borderRadius: "16px",
                  textAlign: "center",
                  border: theme === 'dark'
                    ? "1px solid rgba(124, 58, 237, 0.2)"
                    : "1px solid rgba(124, 58, 237, 0.25)",
                  opacity: badges.intermediateBadge ? 1 : 0.7,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: theme === 'dark'
                    ? "none"
                    : "0 4px 12px rgba(148, 163, 184, 0.1)",
                }}
              >
                <Link 
                  href="https://bafkreidyhe6ouxovddy5h64rpmhf6ljlxi2wm3l4nxnkzlv7g7y5i5namy.ipfs.flk-ipfs.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <motion.img 
                    src="/images/2.png"
                    alt="Intermediate Badge"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "12px",
                      filter: badges.intermediateBadge ? "none" : "grayscale(100%)",
                    }}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                  />
                  <motion.div 
                    style={{ 
                      color: theme === 'dark' ? "#FFFFFF" : "#1E293B",
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      marginBottom: "4px",
                    }}
                  >
                    Intermediate
                  </motion.div>
                  <motion.div style={{ 
                    color: theme === 'dark' ? "#E0E0E0" : "#64748B",
                    fontSize: "0.9rem",
                  }}>
                    Complete 5 Courses
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 