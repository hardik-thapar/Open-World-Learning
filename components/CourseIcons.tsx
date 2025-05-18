export const CourseIcons = {
  PythonIcon: () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M31.9 11c-15.7 0-14.7 6.8-14.7 6.8l.1 7h15v2.1h-20.9s-10.5-1.2-10.5 15.4c0 16.6 9.2 16 9.2 16h5.5v-7.7s-.3-9.2 9-9.2h15.5s8.7.1 8.7-8.4v-14.2s1.3-7.8-16.9-7.8zm-8.2 4.8c1.5 0 2.8 1.2 2.8 2.8 0 1.5-1.2 2.8-2.8 2.8-1.5 0-2.8-1.2-2.8-2.8.1-1.6 1.3-2.8 2.8-2.8z" fill="url(#python-gradient-1)"/>
      <path d="M32.1 53c15.7 0 14.7-6.8 14.7-6.8l-.1-7h-15v-2.1h20.9s10.5 1.2 10.5-15.4c0-16.6-9.2-16-9.2-16h-5.5v7.7s.3 9.2-9 9.2h-15.5s-8.7-.1-8.7 8.4v14.2s-1.3 7.8 16.9 7.8zm8.2-4.8c-1.5 0-2.8-1.2-2.8-2.8 0-1.5 1.2-2.8 2.8-2.8 1.5 0 2.8 1.2 2.8 2.8-.1 1.6-1.3 2.8-2.8 2.8z" fill="url(#python-gradient-2)"/>
      <defs>
        <linearGradient id="python-gradient-1" x1="8" y1="11" x2="40" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4584B6"/>
          <stop offset="1" stopColor="#5D9FD3"/>
        </linearGradient>
        <linearGradient id="python-gradient-2" x1="24" y1="21" x2="56" y2="53" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD43B"/>
          <stop offset="1" stopColor="#FFE873"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  EnvironmentIcon: () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm0 44c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z" fill="url(#env-gradient)"/>
      <path d="M32 16c-2.2 0-4 1.8-4 4 0 1.5.8 2.8 2 3.4-1.2 2.3-3 4.1-5.3 5.3-.6-1.2-1.9-2-3.4-2-2.2 0-4 1.8-4 4s1.8 4 4 4c1.5 0 2.8-.8 3.4-2 2.3 1.2 4.1 3 5.3 5.3-1.2.6-2 1.9-2 3.4 0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.5-.8-2.8-2-3.4 1.2-2.3 3-4.1 5.3-5.3.6 1.2 1.9 2 3.4 2 2.2 0 4-1.8 4-4s-1.8-4-4-4c-1.5 0-2.8.8-3.4 2-2.3-1.2-4.1-3-5.3-5.3 1.2-.6 2-1.9 2-3.4 0-2.2-1.8-4-4-4z" fill="url(#leaf-gradient)"/>
      <defs>
        <linearGradient id="env-gradient" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4CAF50"/>
          <stop offset="1" stopColor="#81C784"/>
        </linearGradient>
        <linearGradient id="leaf-gradient" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2E7D32"/>
          <stop offset="1" stopColor="#4CAF50"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  AiIcon: () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M56 32c0 13.3-10.7 24-24 24S8 45.3 8 32 18.7 8 32 8s24 10.7 24 24z" fill="url(#ai-bg-gradient)"/>
      <path d="M32 16c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm0 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="url(#ai-circuit-gradient)"/>
      <path d="M32 26c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#fff"/>
      <path d="M44 20l-4 4m-16-4l4 4m16 16l-4-4m-16 4l4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <defs>
        <linearGradient id="ai-bg-gradient" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED"/>
          <stop offset="1" stopColor="#6D28D9"/>
        </linearGradient>
        <linearGradient id="ai-circuit-gradient" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BB86FC"/>
          <stop offset="1" stopColor="#9B66EA"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  HistoryIcon: () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm0 44c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z" fill="url(#history-border)"/>
      <path d="M32 16v16l12 8" stroke="url(#history-hand)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 20c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12" stroke="url(#history-arc)" strokeWidth="4" strokeLinecap="round"/>
      <defs>
        <linearGradient id="history-border" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9800"/>
          <stop offset="1" stopColor="#F57C00"/>
        </linearGradient>
        <linearGradient id="history-hand" x1="32" y1="16" x2="44" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB74D"/>
          <stop offset="1" stopColor="#FFA726"/>
        </linearGradient>
        <linearGradient id="history-arc" x1="20" y1="20" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB74D"/>
          <stop offset="1" stopColor="#FFA726"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  AccessibilityIcon: () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="16" r="8" fill="url(#accessibility-head)"/>
      <path d="M48 32H16m16-8v24m8-12l-8 12m-8-12l8 12" stroke="url(#accessibility-body)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 40a8 8 0 0116 0" stroke="url(#accessibility-arc)" strokeWidth="4" strokeLinecap="round"/>
      <defs>
        <linearGradient id="accessibility-head" x1="24" y1="8" x2="40" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899"/>
          <stop offset="1" stopColor="#DB2777"/>
        </linearGradient>
        <linearGradient id="accessibility-body" x1="16" y1="24" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6"/>
          <stop offset="1" stopColor="#EC4899"/>
        </linearGradient>
        <linearGradient id="accessibility-arc" x1="24" y1="36" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6"/>
          <stop offset="1" stopColor="#EC4899"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  SignLanguageIcon: () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 20c-2.2 0-4 1.8-4 4v8c0 4.4-3.6 8-8 8s-8-3.6-8-8v-8c0-2.2-1.8-4-4-4s-4 1.8-4 4v8c0 8.8 7.2 16 16 16s16-7.2 16-16v-8c0-2.2-1.8-4-4-4z" fill="url(#sign-hand)"/>
      <path d="M32 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" fill="url(#sign-circle)"/>
      <path d="M24 28s4-6 8-6 8 6 8 6" stroke="url(#sign-motion)" strokeWidth="3" strokeLinecap="round"/>
      <defs>
        <linearGradient id="sign-hand" x1="20" y1="20" x2="44" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
        <linearGradient id="sign-circle" x1="28" y1="12" x2="36" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A78BFA"/>
          <stop offset="1" stopColor="#8B5CF6"/>
        </linearGradient>
        <linearGradient id="sign-motion" x1="24" y1="22" x2="40" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A78BFA"/>
          <stop offset="1" stopColor="#8B5CF6"/>
        </linearGradient>
      </defs>
    </svg>
  ),
}; 