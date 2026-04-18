import { useEffect, useRef, useState } from 'react';
import { HiOutlineArrowRight, HiOutlineArrowsPointingOut } from 'react-icons/hi2';
import './HoverSliders.css';

const slides = [
  {
    id: 1,
    title: 'Luxury Villas',
    subtitle: 'Residential',
    count: '120+',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    color: '#E0B667',
  },
  {
    id: 2,
    title: 'Commercial Spaces',
    subtitle: 'Corporate',
    count: '85+',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
    color: '#E0B667',
  },
  {
    id: 3,
    title: 'Industrial Projects',
    subtitle: 'Industrial',
    count: '60+',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
    color: '#E0B667',
  },
  {
    id: 4,
    title: 'Heritage Restorations',
    subtitle: 'Renovation',
    count: '35+',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
    color: '#E0B667',
  },
  {
    id: 5,
    title: 'Smart Homes',
    subtitle: 'Technology',
    count: '200+',
    img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=900&q=80',
    color: '#E0B667',
  },
];

export default function HoverSliders() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-rotate
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleHover = (i) => {
    clearInterval(intervalRef.current);
    setActive(i);
  };

  const handleLeave = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3200);
  };

  const [isRevealed, setIsRevealed] = useState(false);

  // Scroll reveal
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
    <section className="hover-sliders-section" ref={sectionRef} id="services">
      <div className="sb-container">
        {/* Header */}
        <div className="hs-header">
          <div className="hs-header-left">
            <div className={`sb-section-label reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>Our Specialties</div>
            <h2 className={`sb-section-title reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
              What We <em>Build</em>
            </h2>
          </div>
          <p className={`sb-section-subtitle hs-subtitle reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            From luxury residences to large-scale industrial complexes — we bring
            expertise across every construction vertical.
          </p>
        </div>

        {/* Accordion Slider */}
        <div className="hs-accordion" onMouseLeave={handleLeave}>
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`hs-panel ${active === i ? 'hs-panel--active' : ''}`}
              onMouseEnter={() => handleHover(i)}
              onClick={() => setActive(i)}
              style={{ '--panel-accent': slide.color }}
            >
              {/* Background Image */}
              <div className="hs-panel-bg">
                <img src={slide.img} alt={slide.title} />
                <div className="hs-panel-overlay" />
              </div>

              {/* Collapsed state: vertical label */}
              <div className="hs-panel-collapsed-label">
                <span className="hs-collapsed-index">0{i + 1}</span>
                <span className="hs-collapsed-title">{slide.title}</span>
              </div>

              {/* Expanded content */}
              <div className="hs-panel-content">
                <div className="hs-panel-content-inner">
                  <span className="hs-panel-category">{slide.subtitle}</span>
                  <h3 className="hs-panel-title">{slide.title}</h3>
                  <div className="hs-panel-stat">
                    <span className="hs-panel-count">{slide.count}</span>
                    <span className="hs-panel-count-label">projects completed</span>
                  </div>
                  <button className="hs-panel-cta">
                    Explore <HiOutlineArrowRight />
                  </button>
                </div>
              </div>

              {/* Index number */}
              <span className="hs-panel-number">0{i + 1}</span>

              {/* Expand icon */}
              <div className="hs-expand-icon">
                <HiOutlineArrowsPointingOut />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className={`hs-dots reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hs-dot ${active === i ? 'active' : ''}`}
              onClick={() => { clearInterval(intervalRef.current); setActive(i); }}
              style={active === i ? { background: slides[i].color } : {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
