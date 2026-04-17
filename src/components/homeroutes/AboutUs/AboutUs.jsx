import { useEffect, useRef, useState } from 'react';
import {
  TrophyOutlined,
  SafetyCertificateOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  PhoneOutlined,
} from '@ant-design/icons';
import './AboutUs.css';

const highlights = [
  { icon: <TrophyOutlined />, label: '18+', sublabel: 'Years of Excellence' },
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" ref={sectionRef} id="about">
      <div className="sb-container">
        <div className="about-grid">

          {/* ── Left: Single Image ── */}
          <div className={`about-image-col reveal ${isRevealed ? 'visible' : ''}`}>
            <div className="about-img-wrap">
              <img
                src="/Images/AboutUsHomeImage.png"
                alt="Shantam Builders Project"
                className="about-img-main-img"
              />
              <div className="about-img-overlay" />

              {/* Stats floating cards */}
              <div className="about-stat-cards">
                {highlights.map((h, i) => (
                  <div className="about-stat-card" key={i}>
                    <span className="about-stat-icon">{h.icon}</span>
                    <span className="about-stat-value">{h.label}</span>
                    <span className="about-stat-label">{h.sublabel}</span>
                  </div>
                ))}
              </div>

              {/* Gold corner accent */}
              <div className="about-corner-accent about-corner-accent--tl" />
              <div className="about-corner-accent about-corner-accent--br" />
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="about-content-col">
            <div className={`sb-section-label reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>
              Welcome to Shantam
            </div>

            <h2 className={`sb-section-title reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
              Building <em>Excellence</em><br />Since 2007
            </h2>

            <div className={`sb-divider reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }} />

            <p className={`about-lead reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
              The community is our reason for existence, and its happiness is our motivation. From our inception in 2007, the Shantam Group has believed that true success comes from the opportunity to serve people.
            </p>

            <p className={`about-body reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
              Synonymous with quality, reliability, and architectural excellence, we pioneer bolder designs and newer technologies — transforming the city's skyline one landmark at a time.
            </p>

            <ul className={`about-values reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '500ms' }}>
              {values.map((v, i) => (
                <li key={i} className="about-value-item">
                  <CheckCircleFilled className="about-check" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>

            <div className={`about-ctas reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
              <button className="btn-primary-sm">
                <span>Explore Our Story</span>
                <ArrowRightOutlined />
              </button>
              <a href="tel:+917878787878" className="btn-ghost-sm">
                <PhoneOutlined />
                <span>Free Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
