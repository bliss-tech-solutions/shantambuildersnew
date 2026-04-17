import { useEffect, useRef,useState } from 'react';
import {
  ApartmentOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
  TeamOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import './AboutUs.css';

const highlights = [
  { icon: <TrophyOutlined />, label: '18+ Years', sublabel: 'of Excellence' },
  { icon: <ApartmentOutlined />, label: '500+', sublabel: 'Projects Built' },
  { icon: <TeamOutlined />, label: '50+', sublabel: 'Expert Craftsmen' },
  { icon: <SafetyCertificateOutlined />, label: 'ISO', sublabel: '9001 Certified' },
];

const values = [
  'Premium materials sourced from certified suppliers',
  'On-time delivery with transparent timelines',
  'Expert in-house architects & structural engineers',
  'Post-construction support & warranty',
];

export default function AboutUs() {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" ref={sectionRef} id="about">
      <div className="sb-container">
        <div className="about-grid">

          {/* ── Left: Image Stack ── */}
          <div className="about-image-col">
            <div className={`about-img-stack reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>
              {/* Main image */}
              <div className="about-img-main">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80"
                  alt="Shantam Builders construction site"
                />
                <div className="about-img-main-overlay" />
              </div>

              {/* Secondary image */}
              <div className="about-img-secondary">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80"
                  alt="Architectural design"
                />
              </div>

              {/* Floating badge */}
              <div className="about-img-badge">
                <div className="about-badge-ring">
                  <TrophyOutlined className="about-badge-icon" />
                </div>
                <div>
                  <span className="about-badge-value">18+</span>
                  <span className="about-badge-text">Years of Trust</span>
                </div>
              </div>

              {/* Dots decoration */}
              <div className="about-dots" aria-hidden="true">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span key={i} className="about-dot" />
                ))}
              </div>

              {/* Gold frame accent */}
              <div className="about-frame-accent" />
            </div>

            {/* Stats row */}
            <div className="about-highlights">
              {highlights.map((h, i) => (
                <div 
                  className={`about-highlight-card reveal ${isRevealed ? 'visible' : ''}`} 
                  style={{ transitionDelay: `${120 + i * 120}ms` }} 
                  key={i}
                >
                  <div className="about-highlight-icon">{h.icon}</div>
                  <span className="about-highlight-value">{h.label}</span>
                  <span className="about-highlight-sub">{h.sublabel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="about-content-col">
            <div className={`sb-section-label reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>Welcome to Shantam</div>

            <h2 className={`sb-section-title reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '120ms' }}>
              Building <em>Excellence</em><br />Since 2007
            </h2>

            <div className={`sb-divider reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '240ms' }} />

            <p className={`about-lead reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '360ms' }}>
              The community is our reason for existence, and its happiness is our motivation. From our inception in 2007, the Shantam Group has fundamentally believed that our true success comes from our people and the opportunity to serve them.
            </p>

            <p className={`about-body reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '480ms' }}>
              Synonymous with quality, reliability, and architectural excellence, we have continually pioneered newer technologies and bold designs. Whether it's through our landmark commercial complexes or premium residential spaces, we are driven by a single purpose: to change expectations, elevate lifestyles, and transform the city's skyline.
            </p>

            <ul className={`about-values reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
              {values.map((v, i) => (
                <li key={i} className="about-value-item">
                  <CheckCircleFilled className="about-check" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>

            <div className={`about-ctas reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '720ms' }}>
              <button className="sb-btn-primary">
                <span>Explore Our Story</span>
                <ArrowRightOutlined />
              </button>
              <div className="about-contact-pill">
                <div className="about-contact-avatar-group">
                  {['?face=1', '?face=2', '?face=3'].map((q, i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40${q}`}
                      alt="Team member"
                      className="about-mini-avatar"
                    />
                  ))}
                </div>
                <div>
                  <span className="about-pill-text">Talk to Our Experts</span>
                  <span className="about-pill-sub">Free Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
