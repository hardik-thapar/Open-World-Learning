import { useEffect } from 'react';
import Script from 'next/script';

const ChatWidget = () => {
  useEffect(() => {
    // Cleanup function to remove the webchat when component unmounts
    return () => {
      // @ts-ignore
      if (window.botpressWebChat) {
        // @ts-ignore
        window.botpressWebChat.sendEvent({ type: 'hide' });
      }
    };
  }, []);

  return (
    <>
      {/* Load Botpress Scripts */}
      <Script
        src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://files.bpcontent.cloud/2025/01/31/13/20250131134141-44CL34MB.js"
        strategy="afterInteractive"
        onLoad={() => {
          setTimeout(() => {
            // @ts-ignore
            window.botpressWebChat?.init({
              containerWidth: '260px',    // Even narrower
              layoutWidth: '260px',       // Match container width
              hideWidget: false,
              stylesheet: `
                .bpw-layout {
                  width: 260px !important;
                  height: 320px !important;     // Much shorter height
                  max-height: 320px !important;
                  min-height: 320px !important;
                  right: 20px !important;
                  bottom: 70px !important;
                  border-radius: 10px !important;
                  overflow: hidden !important;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
                }
                .bpw-widget-btn {
                  width: 44px !important;      // Even smaller button
                  height: 44px !important;
                  padding: 0 !important;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.4) !important;
                  transition: transform 0.3s ease !important;
                }
                .bpw-widget-btn:hover {
                  transform: scale(1.1) !important;
                }
                .bpw-chat-container {
                  height: 320px !important;
                }
                .bpw-header-container {
                  height: 36px !important;     // Even smaller header
                  padding: 8px !important;
                  font-size: 12px !important;
                }
                .bpw-header-name {
                  font-size: 13px !important;  // Smaller title
                }
                .bpw-composer {
                  padding: 4px !important;     // Smaller padding
                  min-height: 36px !important; // Smaller composer height
                }
                .bpw-composer textarea {
                  font-size: 12px !important;  // Smaller input text
                  padding: 8px !important;
                }
                .bpw-chat-bubble {
                  font-size: 12px !important;  // Smaller message text
                  padding: 6px 10px !important;// Smaller bubble padding
                }
                .bpw-from-bot .bpw-chat-bubble {
                  max-width: 180px !important; // Limit message width
                }
                .bpw-from-user .bpw-chat-bubble {
                  max-width: 180px !important; // Limit message width
                }
                .bpw-date-container {
                  font-size: 11px !important;  // Smaller date text
                }
                .bpw-keyboard-quick_reply {
                  font-size: 12px !important;  // Smaller quick reply text
                  padding: 6px 10px !important;// Smaller quick reply padding
                }
              `
            });
          }, 100);
        }}
      />
    </>
  );
};

export default ChatWidget; 