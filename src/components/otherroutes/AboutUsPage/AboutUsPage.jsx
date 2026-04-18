import { useEffect, useRef, useState } from 'react';
import { 
  HiOutlineTrophy, 
  HiOutlineUserGroup, 
  HiOutlineLightBulb, 
  HiOutlineUsers, 
  HiOutlineMagnifyingGlass, 
  HiOutlineGlobeAlt,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineArrowSmallRight,
  HiOutlineShieldCheck
} from 'react-icons/hi2';
import './AboutUsPage.css';

/* ── Scroll Reveal Hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Data ── */
const services = ['Design', 'Architecture', 'Construction'];

const missionPoints = [
  {
    icon: <HiOutlineLightBulb />,
    text: 'Continuously innovate & use the latest technology to provide high-quality spaces.',
  },
  {
    icon: <HiOutlineUserGroup />,
    text: 'Build a strong team & corporate culture for dynamic work environments.',
  },
  {
    icon: <HiOutlineShieldCheck />,
    text: 'Establish transparent processes that gain customer trust.',
  },
  {
    icon: <HiOutlineGlobeAlt />,
    text: 'Contribute to social causes in Education, Healthcare & Community Development.',
  },
];

const stats = [
  { value: '18+', label: 'Years of Excellence' },
  { value: '300+', label: 'Projects Delivered' },
  { value: '5000+', label: 'Happy Families' },
  { value: '100%', label: 'ISO Certified' },
];

/* ── Components ── */
function HeroSection() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="au-hero" ref={ref}>
      <div className="au-hero-bg">
        <video 
          src="/Images/DroneVideo.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="au-hero-video"
        />
        <div className="au-hero-overlay" />
      </div>
      <div className="sb-container au-hero-content">
        <div className={`au-hero-label reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>
          <span className="au-hero-label-dot" />
          About Us
        </div>
        <h1 className={`au-hero-title reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
          Shantam <em>Group</em>
        </h1>
        <p className={`au-hero-sub reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
          Building trust · Creating legacies · Delivering excellence
        </p>
      </div>
      {/* Scroll indicator */}
      <div className="au-hero-scroll">
        <div className="au-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

function VisionSection() {
  const [ref, visible] = useReveal(0.15);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveService(p => (p + 1) % services.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="au-vision" ref={ref}>
      <div className="sb-container">
        <div className="au-vision-grid">
          {/* Left: image */}
          <div className={`au-vision-img-col reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>
            <div className="au-vision-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
                alt="Our Vision"
                className="au-vision-img"
              />
              <div className="au-vision-img-accent" />
              {/* Floating stat */}
              <div className="au-vision-float-card">
                <span className="au-vision-float-num">18+</span>
                <span className="au-vision-float-lbl">Years of Trust</span>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className={`au-vision-content reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <div className="sb-section-label">Our Vision</div>
            <h2 className="sb-section-title">
              Trusted · Transparent<br /><em>Admired.</em>
            </h2>
            <div className="sb-divider" />
            <p className="au-vision-lead">
              To be the most <strong>Trusted, Transparent, Admire & Esteem</strong> Real Estate Developer.
            </p>
            <p className="au-vision-body">
              Give Your Business an Advantage of a Strategic Address where <strong>Corporate Vision Meets Success</strong>.
            </p>

            {/* What We Do tags */}
            <div className="au-services-wrap">
              <span className="au-services-label">Services</span>
              <div className="au-services-tags">
                {services.map((s, i) => (
                  <span
                    key={s}
                    className={`au-service-tag ${activeService === i ? 'active' : ''}`}
                    onMouseEnter={() => setActiveService(i)}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const [ref, visible] = useReveal(0.15);
  return (
    <section className="au-philosophy-quote" ref={ref}>
      <div className="au-philosophy-quote-bg" />
      <div className="sb-container">
        <div className={`au-phil-block reveal ${visible ? 'visible' : ''}`}>
          <div className="au-phil-label">Our Philosophy</div>
          <h3 className="au-phil-main">
            &quot;To establish leadership across commercial segments of the real estate industry — with a commitment to growth, excellence, and the highest ethical standards.&quot;
          </h3>
          <p className="au-phil-sub">
            We provide satisfactory services and good value for money throughout the transaction process, right up to post-sales and beyond.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const [ref, visible] = useReveal(0.2);
  return (
    <div className={`au-stats-bar reveal ${visible ? 'visible' : ''}`} ref={ref}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="au-stat"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <span className="au-stat-value">{s.value}</span>
          <span className="au-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function MissionSection() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="au-mission" ref={ref}>
      <div className="sb-container">
        <div className={`au-mission-header reveal ${visible ? 'visible' : ''}`}>
          <div className="sb-section-label" style={{ justifyContent: 'center' }}>Our Mission</div>
          <h2 className="sb-section-title" style={{ textAlign: 'center' }}>
            Building with purpose,<br /><em>delivering with care.</em>
          </h2>
        </div>

        <div className="au-mission-grid">
          {missionPoints.map((p, i) => (
            <div
              key={i}
              className={`au-mission-card reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="au-mission-icon">{p.icon}</div>
              <p className="au-mission-text">{p.text}</p>
              <div className="au-mission-card-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GetInTouchSection() {
  const [ref, visible] = useReveal(0.15);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <section className="au-contact" ref={ref}>
      <div className="sb-container">
        <div className="au-contact-grid">
          {/* Left: info */}
          <div className={`au-contact-info reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>
            <div className="sb-section-label">Get in Touch</div>
            <h2 className="sb-section-title au-contact-title">
              Let's Build <em>Together</em>
            </h2>
            <p className="au-contact-desc">
              Have a project in mind or want to learn more about Shantam Group?
              Our team is ready to help you find the perfect space for your vision.
            </p>

            <div className="au-contact-details">
              <div className="au-contact-item">
                <div className="au-contact-icon"><HiOutlinePhone /></div>
                <div>
                  <span className="au-contact-item-label">Call Us</span>
                  <a href="tel:+919824400447" className="au-contact-item-value">98 244 00 447</a>
                  <a href="tel:+918866631447" className="au-contact-item-value">88 666 31 447</a>
                </div>
              </div>
              <div className="au-contact-item">
                <div className="au-contact-icon"><HiOutlineMapPin /></div>
                <div>
                  <span className="au-contact-item-label">Visit Us</span>
                  <span className="au-contact-item-value">A-501, One World Capital,</span>
                  <span className="au-contact-item-value">B/H Rajpath Club, Ahmedabad 380054</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className={`au-contact-form-wrap reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <form className="au-contact-form" onSubmit={e => e.preventDefault()}>
              <div className="au-form-row">
                <div className="au-form-group">
                  <label className="au-form-label">Full Name</label>
                  <input
                    className="au-form-input"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="au-form-group">
                  <label className="au-form-label">Phone</label>
                  <input
                    className="au-form-input"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="au-form-group">
                <label className="au-form-label">Email Address</label>
                <input
                  className="au-form-input"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="au-form-group">
                <label className="au-form-label">Your Message</label>
                <textarea
                  className="au-form-input au-form-textarea"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project or enquiry..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="sb-btn-primary au-form-submit">
                <span>Send Message</span>
                <HiOutlineArrowSmallRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBanner() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="au-trust-banner" ref={ref}>
      <div className="sb-container">
        <h3 className={`au-trust-text reveal ${visible ? 'visible' : ''}`}>
          Trusted by hundreds of investors and businesses across Gujarat.
        </h3>
      </div>
    </section>
  );
}

/* ── Main Export ── */
export default function AboutUsPage() {
  return (
    <main className="about-us-page">
      <HeroSection />
      <VisionSection />
      <PhilosophySection />
      <MissionSection />
      <StatsBar />
      <GetInTouchSection />
      <TrustBanner />
    </main>
  );
}
