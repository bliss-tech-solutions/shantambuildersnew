import { useEffect, useRef,useState } from 'react';
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineDocumentText, 
  HiOutlineHome, 
  HiOutlinePhone 
} from 'react-icons/hi2';
import './OurProcess.css';

const steps = [
  {
    id: '01',
    icon: <HiOutlineMagnifyingGlass />,
    title: 'Idea & Start',
    desc: 'We assess your site, understand your vision, and set the groundwork. Through in-depth consultations, we establish a clear roadmap tailored to your specific requirements.',
    duration: 'Phase 1',
    color: '#E0B667',
  },
  {
    id: '02',
    icon: <HiOutlineDocumentText />,
    title: 'Design & Create',
    desc: 'Our architects translate your ideas into detailed 3D blueprints. We focus on aesthetic value, structural safety, and securing all necessary permits to prepare for building.',
    duration: 'Phase 2',
    color: '#E0B667',
  },
  {
    id: '03',
    icon: <HiOutlineHome />,
    title: 'Build & Finish',
    desc: 'With precision engineering and premium materials, our team constructs your project exactly as planned—culminating in a multi-point quality inspection and seamless handover.',
    duration: 'Phase 3',
    color: '#E0B667',
  },
];

export default function OurProcess() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

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
    <section className="process-section" ref={sectionRef} id="process">
      {/* Background decoration */}
      <div className="process-bg-deco" aria-hidden="true">
        <div className="process-bg-circle process-bg-circle--1" />
        <div className="process-bg-circle process-bg-circle--2" />
      </div>

      <div className="sb-container">
        {/* Header */}
        <div className="process-header">
          <div className={`sb-section-label reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>How We Work</div>
          <h2 className={`sb-section-title reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '120ms' }}>
            Our <em>Process</em>
          </h2>
          <p className={`sb-section-subtitle process-subtitle reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '240ms' }}>
            A transparent, proven, and client-centric approach to turning your
            construction vision into a reality — step by step.
          </p>
        </div>

        {/* Timeline */}
        <div className="process-timeline">
          {/* Centre line */}
          <div className="process-center-line" aria-hidden="true" />

          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`process-step reveal ${isRevealed ? 'visible' : ''} ${i % 2 === 0 ? 'process-step--left' : 'process-step--right'} ${activeStep === i ? 'active' : ''}`}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
              style={{ '--step-color': step.color, transitionDelay: `${360 + (i * 120)}ms` }}
            >
              {/* Card */}
              <div className="process-card">
                <div className="process-card-header">
                  <div className="process-icon-wrap">
                    {step.icon}
                  </div>
                  <div className="process-card-meta">
                    <span className="process-step-id">{step.id}</span>
                    <span className="process-duration">{step.duration}</span>
                  </div>
                </div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
                <div className="process-card-bar" />
              </div>

              {/* Connector dot */}
              <div className="process-connector">
                <div className="process-dot-outer">
                  <div className="process-dot-inner" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`process-cta reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: `${360 + steps.length * 120}ms` }}>
          <div className="process-cta-card">
            <div className="process-cta-content">
              <h3>Ready to Start Your Project?</h3>
              <p>Contact us today for a free site visit and consultation with our expert team.</p>
            </div>
            <div className="process-cta-actions">
              <button className="sb-btn-primary">
                <span>Get Free Consultation</span>
              </button>
              <a href="tel:+917878787878" className="process-phone">
                <HiOutlinePhone /> +91 78787 87878
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
