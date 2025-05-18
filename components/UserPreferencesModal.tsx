import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (preferences: UserPreferences) => void;
}

export interface UserPreferences {
  ageGroup: string;
  hasDisability: boolean;
  interests: string[];
}

export default function UserPreferencesModal({ isOpen, onClose, onSubmit }: UserPreferencesModalProps) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    ageGroup: "",
    hasDisability: false,
    interests: [],
  });

  const handleSubmit = () => {
    onSubmit(preferences);
    onClose();
  };

  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(8px)",
    zIndex: 1000,
  };

  const contentStyle: React.CSSProperties = {
    background: "linear-gradient(145deg, rgba(19, 10, 42, 0.95), rgba(5, 5, 5, 0.95))",
    borderRadius: "24px",
    padding: "40px",
    width: "90%",
    maxWidth: "600px",
    border: "1px solid rgba(124, 58, 237, 0.2)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  };

  const optionStyle: React.CSSProperties = {
    padding: "16px",
    background: "rgba(124, 58, 237, 0.1)",
    border: "1px solid rgba(124, 58, 237, 0.2)",
    borderRadius: "12px",
    cursor: "pointer",
    marginBottom: "12px",
    transition: "all 0.3s ease",
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 style={{ 
              fontSize: "2rem", 
              marginBottom: "30px",
              background: "linear-gradient(135deg, #FFFFFF, #BB86FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {"What's your age group?"}
            </h2>
            {["Less than 12", "12-18", "18-25", "More than 25"].map((age) => (
              <motion.div
                key={age}
                style={{
                  ...optionStyle,
                  background: preferences.ageGroup === age ? "rgba(124, 58, 237, 0.2)" : "rgba(124, 58, 237, 0.1)",
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setPreferences({ ...preferences, ageGroup: age });
                  setStep(2);
                }}
              >
                <span style={{ color: "#FFFFFF" }}>{age}</span>
              </motion.div>
            ))}
          </div>
        );
      case 2:
        return (
          <div>
            <h2 style={{ 
              fontSize: "2rem", 
              marginBottom: "30px",
              background: "linear-gradient(135deg, #FFFFFF, #BB86FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {"Do you have any disabilities?"}
            </h2>
            {["Yes", "No"].map((option) => (
              <motion.div
                key={option}
                style={{
                  ...optionStyle,
                  background: (preferences.hasDisability === (option === "Yes")) ? 
                    "rgba(124, 58, 237, 0.2)" : "rgba(124, 58, 237, 0.1)",
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setPreferences({ ...preferences, hasDisability: option === "Yes" });
                  setStep(3);
                }}
              >
                <span style={{ color: "#FFFFFF" }}>{option}</span>
              </motion.div>
            ))}
          </div>
        );
      case 3:
        return (
          <div>
            <h2 style={{ 
              fontSize: "2rem", 
              marginBottom: "30px",
              background: "linear-gradient(135deg, #FFFFFF, #BB86FC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Select your areas of interest
            </h2>
            {["Science", "Web3", "AI", "Environment", "Self-development"].map((interest) => (
              <motion.div
                key={interest}
                style={{
                  ...optionStyle,
                  background: preferences.interests.includes(interest) ? 
                    "rgba(124, 58, 237, 0.2)" : "rgba(124, 58, 237, 0.1)",
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  const newInterests = preferences.interests.includes(interest)
                    ? preferences.interests.filter(i => i !== interest)
                    : [...preferences.interests, interest];
                  setPreferences({ ...preferences, interests: newInterests });
                }}
              >
                <span style={{ color: "#FFFFFF" }}>{interest}</span>
              </motion.div>
            ))}
            <motion.button
              style={buttonStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={preferences.interests.length === 0}
            >
              Complete
            </motion.button>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={modalStyle}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={contentStyle}
        >
          {renderStep()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 