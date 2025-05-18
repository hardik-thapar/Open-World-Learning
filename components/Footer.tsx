import Link from "next/link";
import { motion } from "framer-motion";
import { OwlLogo } from "./OwlLogo";

export const Footer = () => {
  return (
    <footer style={{
      background: "linear-gradient(145deg, rgba(19, 10, 42, 1), rgba(5, 5, 5, 1))",
      padding: "80px 40px 40px",
      color: "#E0E0E0",
      borderTop: "1px solid rgba(187, 134, 252, 0.1)",
      marginTop: "100px",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "40px",
      }}>
        {/* Brand Section */}
        <div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <OwlLogo />
            <h3 style={{
              fontSize: "1.5rem",
              background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}>
              Open World Learning
            </h3>
          </div>
          <p style={{ 
            color: "#A0A0A0", 
            lineHeight: "1.6",
            fontSize: "0.95rem" 
          }}>
            Empowering minds through accessible education. Join our community of lifelong learners and explore a world of knowledge.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ 
            color: "#FFFFFF", 
            marginBottom: "20px",
            fontSize: "1.1rem" 
          }}>Quick Links</h4>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px" 
          }}>
            {[
              { label: "Home", path: "/" },
              { label: "Courses", path: "/courses" },
              { label: "Library", path: "/library" },
              { label: "About Us", path: "/about" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.path}
                style={{
                  color: "#A0A0A0",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                  fontSize: "0.95rem",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ 
            color: "#FFFFFF", 
            marginBottom: "20px",
            fontSize: "1.1rem"  
          }}>Contact</h4>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px" 
          }}>
            <p style={{ 
              color: "#A0A0A0", 
              margin: 0,
              fontSize: "0.95rem" 
            }}>Email: contact@owlearning.com</p>
            <p style={{ 
              color: "#A0A0A0", 
              margin: 0,
              fontSize: "0.95rem" 
            }}>Phone: +1 (555) 123-4567</p>
            <p style={{ 
              color: "#A0A0A0", 
              margin: 0,
              fontSize: "0.95rem" 
            }}>Address: 123 Learning Street, Education City, 12345</p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h4 style={{ 
            color: "#FFFFFF", 
            marginBottom: "20px",
            fontSize: "1.1rem" 
          }}>Follow Us</h4>
          <div style={{ 
            display: "flex", 
            gap: "20px" 
          }}>
            {[
              { label: "Twitter", icon: "𝕏" },
              { label: "LinkedIn", icon: "in" },
              { label: "GitHub", icon: "⌘" },
              { label: "Discord", icon: "🎮" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(124, 58, 237, 0.1)",
                  border: "1px solid rgba(124, 58, 237, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#E0E0E0",
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
                whileHover={{
                  backgroundColor: "rgba(124, 58, 237, 0.2)",
                  border: "1px solid rgba(124, 58, 237, 0.5)",
                  scale: 1.05,
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: "1px solid rgba(187, 134, 252, 0.1)",
        marginTop: "60px",
        paddingTop: "20px",
        textAlign: "center",
        color: "#A0A0A0",
        fontSize: "0.9rem",
      }}>
        <p>© 2025 Open World Learning. All rights reserved.</p>
      </div>
    </footer>
  );
}; 