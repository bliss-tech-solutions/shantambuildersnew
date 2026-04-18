import { Link } from 'react-router-dom';
import './Footer.css';

// Remove unused links to simplify to image reference
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="sb-container">

        {/* ── Top Grid ── */}
        <div className="footer-grid">

          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" style={{ textDecoration: 'none' }}>
              <img 
                src="/Images/Logo/shantamLogoBlack.svg" 
                alt="Shantam Group Logo" 
                className="footer-logo-img" 
              />
              <span className="footer-logo-sub">Group</span>
            </Link>
            <p className="footer-tagline">
              <strong>Shantam</strong> Comprises Most Suitable Space for Retail outlets, 
              Showrooms, Bank, Offices, ATM, Food Courts, Restaurants, 
              Banquet Hall, Hospital, Coaching Classes .....and many more.
            </p>
          </div>

          {/* Call Column */}
          <div className="footer-col">
            <h4 className="footer-col-title">CALL</h4>
            <div className="footer-contact-block">
              <a href="tel:+919824400447" className="footer-contact-link">98 244 00 447</a>
              <a href="tel:+918866631447" className="footer-contact-link">88 666 31 447</a>
            </div>
          </div>

          {/* Address Column */}
          <div className="footer-col footer-col--wide">
            <h4 className="footer-col-title">OFFICE ADDRESS</h4>
            <div className="footer-address-block">
              <p>A-501,</p>
              <p>ONE WORLD CAPITAL,</p>
              <p>B/H RAJPATH CLUB</p>
              <p>OFF. SARKHEJ - GANDHINAGAR HIGHWAY</p>
              <p>AHMEDABAD GUJARAT 380054</p>
            </div>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="footer-divider" />

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <span className="footer-copy">
            © DESIGNED BY THEBLISSSOLUTION TECHNOLOGIES
          </span>
          <button className="footer-totop" onClick={scrollToTop}>
            TO TOP <span className="totop-dot" />
          </button>
        </div>

      </div>
    </footer>
  );
}
