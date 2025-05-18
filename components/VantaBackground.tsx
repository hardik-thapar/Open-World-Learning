import { useEffect, useRef } from 'react'
import Script from 'next/script'

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Vanta effect after scripts are loaded
    const initVanta = () => {
      if (typeof window.VANTA !== 'undefined' && vantaRef.current) {
        window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x7c3aed,
          shininess: 35.00,
          waveHeight: 15.00,
          waveSpeed: 0.75,
          zoom: 0.65
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

  return (
    <>
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
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x7c3aed,
              shininess: 35.00,
              waveHeight: 15.00,
              waveSpeed: 0.75,
              zoom: 0.65
            })
          }
        }}
      />
      <div
        ref={vantaRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: "linear-gradient(145deg, #050505, #130A2A, #0A1229)",
        }}
      />
    </>
  )
} 