import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    botpressWebChat: {
      init: (config: any) => void;
      sendEvent: (payload: any) => void;
    };
  }
}

// Voice Navigation setup
class VoiceNavigation {
  private recognition: any;
  private isListening: boolean;
  private routes: { [key: string]: string };

  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.routes = {
      'take me to the home page': '/home',
      'go to home': '/home',
      'take me to the course page': '/courses',
      'go to courses': '/courses',
      'take me to about page': '/about',
      'go to about': '/about',
      'take me to library': '/library',
      'go to library': '/library',
      'take me to profile': '/profile',
      'go to profile': '/profile',
    };
  }

  initialize(router: any) {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      this.recognition = new window.webkitSpeechRecognition();
      this.setupRecognition(router);
    }
  }

  private setupRecognition(router: any) {
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      console.log('Voice recognition started');
    };

    this.recognition.onend = () => {
      console.log('Voice recognition ended');
      // Restart if it was still supposed to be listening
      if (this.isListening) {
        this.recognition.start();
      }
    };

    this.recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase().trim();
      
      console.log('Recognized command:', command);
      this.handleCommand(command, router);
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech Recognition Error:', event.error);
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access to use voice navigation');
        this.stopListening();
      }
    };
  }

  private handleCommand(command: string, router: any) {
    for (const [phrase, route] of Object.entries(this.routes)) {
      if (command.includes(phrase)) {
        router.push(route);
        break;
      }
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
      localStorage.setItem('voiceNavigationEnabled', 'true');
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      localStorage.setItem('voiceNavigationEnabled', 'false');
    }
  }

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
    return this.isListening;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [voiceNav] = useState(() => new VoiceNavigation());
  const [isListening, setIsListening] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      voiceNav.initialize(router);
      
      // Check if voice navigation was enabled
      const isEnabled = localStorage.getItem('voiceNavigationEnabled') === 'true';
      if (isEnabled) {
        voiceNav.startListening();
        setIsListening(true);
      }
    }

    // Initialize Botpress webchat
    const script = document.createElement('script');
    script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script.async = true;
    document.body.appendChild(script);

    // Add the configuration script
    const configScript = document.createElement('script');
    configScript.src = "https://files.bpcontent.cloud/2025/02/06/17/20250206170433-M38DOAO3.js";
    configScript.async = true;
    document.body.appendChild(configScript);

    return () => {
      // Cleanup scripts on unmount
      document.body.removeChild(script);
      document.body.removeChild(configScript);
    };
  }, [router]);

  const toggleVoiceNavigation = () => {
    if (!isListening) {
      // Show tooltip with instructions when starting
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000); // Hide after 5 seconds
    }
    const newState = voiceNav.toggleListening();
    setIsListening(newState);
  };

  // Add voice navigation button to all pages except landing and auth
  const showVoiceNav = !['/landing', '/auth', '/'].includes(router.pathname);

  return (
    <React.Fragment>
      {showVoiceNav && (
        <React.Fragment>
          {/* Existing Voice Navigation Button */}
          <button
            onClick={toggleVoiceNavigation}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '20px',
              zIndex: 1000,
              padding: '12px 20px',
              borderRadius: '50px',
              border: 'none',
              background: isListening ? '#DC2626' : '#3B82F6',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            {isListening ? (
              <React.Fragment>
                <span>🎤</span>
                Stop Voice Nav
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span>🎤</span>
                Start Voice Nav
              </React.Fragment>
            )}
          </button>

          {/* Instructions Tooltip */}
          {showTooltip && (
            <div style={{
              position: 'fixed',
              bottom: '150px',
              right: '20px',
              zIndex: 1000,
              padding: '15px 20px',
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              borderRadius: '10px',
              maxWidth: '300px',
              fontSize: '14px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
              <p>Try saying:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                <li>Take me to the course page</li>
                <li>Go to home</li>
                <li>Take me to library</li>
              </ul>
            </div>
          )}
        </React.Fragment>
      )}
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp