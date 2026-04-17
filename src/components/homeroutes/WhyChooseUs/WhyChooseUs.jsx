import { useEffect, useRef,useState } from 'react';
import { SafetyOutlined, StarOutlined, RocketOutlined, BuildOutlined } from '@ant-design/icons';
import './WhyChooseUs.css';

const features = [
  {
    icon: <SafetyOutlined />,
    title: 'Uncompromising Quality',
    desc: 'We source only the finest, certified materials, ensuring absolute structural integrity and longevity for your investment.',
  },
  {
    icon: <StarOutlined />,
    title: 'Precision Craftsmanship',
    desc: 'Our team of seasoned architects and skilled artisans pay meticulous attention to every minute detail of your project.',
  },
  {
    icon: <RocketOutlined />,
    title: 'On-Time Delivery',
    desc: 'Time is money. Our advanced project management systems ensure tight timelines without cutting any corners.',
  },
  {
    icon: <BuildOutlined />,
    title: 'End-to-End Solutions',
    desc: 'From initial 3D design to post-construction maintenance, we are your single point of contact for the entire lifecycle.',
  },
];

export default function WhyChooseUs() {
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
    <section className="why-section" ref={sectionRef} id="why-us">
      {/* Background Graphic */}
      <div className="why-bg-accent" aria-hidden="true" />
      
      <div className="sb-container">
        <div className="why-grid">
          
          {/* Left: Content & Features */}
          <div className="why-content">
            <div className={`sb-section-label reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>The Shantam Difference</div>
            <h2 className={`sb-section-title reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              Why <em>Choose Us?</em>
            </h2>
            <p className={`why-subtitle reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
              We don't just build structures; we build trust, relationships, 
              and legacies. Here is what sets Shantam Builders apart as 
              Gujarat's premier construction partner.
            </p>

            <div className="why-features">
              {features.map((feat, i) => (
                <div key={i} className={`why-feature reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: `${450 + i * 150}ms` }}>
                  <div className="why-feature-icon">{feat.icon}</div>
                  <div className="why-feature-text">
                    <h3 className="why-feature-title">{feat.title}</h3>
                    <p className="why-feature-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Images */}
          <div className={`why-images reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: `${450 + features.length * 150}ms` }}>
            <div className="why-image-wrapper why-image-wrapper-main">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80" 
                alt="Construction Planning" 
              />
              <div className="why-image-overlay" />
            </div>
            <div className="why-image-wrapper why-image-wrapper-sec">
               <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" 
                alt="Architect Tool" 
              />
            </div>
             {/* Year Badge */}
             <div className="why-experience-badge">
                <span className="why-badge-num">18+</span>
                <span className="why-badge-txt">Years of<br/>Excellence</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
