import GoogleTranslate from './GoogleTranslate';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="some-container">
        <div className="translate-widget-container" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
          <GoogleTranslate />
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout; 