import React, { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Add the Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize the translate element
    window.googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
        },
        'google_translate_element'
      );
    };

    addScript();

    // Cleanup
    return () => {
      // Remove the script and global function when component unmounts
      delete window.googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate_element" />;
};

export default GoogleTranslate; 