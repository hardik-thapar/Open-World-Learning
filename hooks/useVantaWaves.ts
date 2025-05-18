import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export const useVantaWaves = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load THREE.js and Vanta scripts dynamically
    const loadScripts = async () => {
      if (typeof window !== 'undefined') {
        if (!window.THREE) {
          const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
      script.async = true;
      document.body.appendChild(script);
      await new Promise((resolve) => (script.onload = resolve));
        }
        if (!window.VANTA) {
          const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/tengbao/vanta/dist/vanta.waves.min.js";
      script.async = true;
      document.body.appendChild(script);
      await new Promise((resolve) => (script.onload = resolve));
        }

        if (!vantaEffect && vantaRef.current) {
          setVantaEffect(
            window.VANTA.WAVES({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x7c3aed, // Purple color matching your theme
              shininess: 35.00,
              waveHeight: 15.00,
              waveSpeed: 0.75,
              zoom: 0.65
            })
          )
        }
      }
    }

    loadScripts()

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return vantaRef
} 