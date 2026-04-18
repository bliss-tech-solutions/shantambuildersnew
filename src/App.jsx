import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import HomeRoute from './components/homeroutes/HomeRoute'
import AboutUsPage from './components/otherroutes/AboutUsPage/AboutUsPage';
import Footer from './components/homeroutes/Footer/Footer';
import Navbar from './components/global/Navbar/Navbar';

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>

      <Footer />

      {/* ── WhatsApp Floating Button ── */}
      <a
        href="https://wa.me/917878787878"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={32} />
      </a>
    </Router>
  );
}

export default App