import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineBars3, HiOutlineXMark, HiOutlinePhone } from 'react-icons/hi2';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    // If you want jumping to sections, you can use these or update later as needed
    // { name: 'Projects', path: '/#works' },
    // { name: 'Our Process', path: '/#process' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="sb-container navbar-inner">
          
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img 
              src="/Images/Logo/shantam-logo.svg" 
              alt="Shantam Group" 
              className="navbar-logo-img" 
            />
            {/* <span className="navbar-logo-text">Shantam</span> */}
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar-nav desktop-nav">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="navbar-actions">
            <a href="tel:+917878787878" className="navbar-phone desktop-only">
              <HiOutlinePhone className="navbar-phone-icon" />
              <span>+91 78787 87878</span>
            </a>
            
            <button 
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <HiOutlineXMark size={28} /> : <HiOutlineBars3 size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
            <img 
              src="/Images/Logo/shantam-logo.svg" 
              alt="Shantam Group" 
              className="navbar-logo-img" 
            />
            <span className="navbar-logo-text">Shantam</span>
          </Link>
        </div>
        <nav className="mobile-nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <a href="tel:+917878787878" className="sb-btn-primary full-width-btn">
            <HiOutlinePhone size={20} />
            <span>+91 78787 87878</span>
          </a>
        </div>
      </div>
    </>
  );
}
