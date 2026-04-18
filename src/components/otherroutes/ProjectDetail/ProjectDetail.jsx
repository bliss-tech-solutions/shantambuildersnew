import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineMapPin,
  HiOutlineCalendar,
  HiOutlineSquares2X2,
  HiOutlineArrowLeft,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineCheckCircle,
  HiOutlineStar,
  HiOutlinePhone,
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineBuildingOffice2,
  HiOutlineAcademicCap,
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineHome,
} from 'react-icons/hi2';
import projectsData from '../../../data/projects.json';
import './ProjectDetail.css';

/* ── Scroll Reveal ── */
function useReveal(threshold = 0.12) {
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

/* ── Icon map for salient features ── */
const featureIconMap = {
  location: <HiOutlineMapPin />,
  apartment: <HiOutlineHome />,
  amenity: <HiOutlineSparkles />,
  temple: <HiOutlineHeart />,
  garden: <HiOutlineSparkles />,
  hospital: <HiOutlineShieldCheck />,
  theatre: <HiOutlineSparkles />,
  school: <HiOutlineAcademicCap />,
  mall: <HiOutlineBuildingOffice2 />,
  office: <HiOutlineBuildingOffice2 />,
  shieldCheck: <HiOutlineShieldCheck />,
  sparkles: <HiOutlineSparkles />,
};

/* ── Location Image Gallery ── */
function LocationGallery({ images }) {
  const [active, setActive] = useState(0);
  if (!images || images.length === 0) return null;

  const prev = () => setActive(i => (i - 1 + images.length) % images.length);
  const next = () => setActive(i => (i + 1) % images.length);

  return (
    <div className="pd-gallery">
      <div className="pd-gallery-main">
        <img src={images[active]} alt={`Location ${active + 1}`} className="pd-gallery-img" />
        {images.length > 1 && (
          <>
            <button className="pd-gallery-btn pd-gallery-btn--prev" onClick={prev} aria-label="Previous">
              <HiOutlineChevronLeft size={22} />
            </button>
            <button className="pd-gallery-btn pd-gallery-btn--next" onClick={next} aria-label="Next">
              <HiOutlineChevronRight size={22} />
            </button>
            <div className="pd-gallery-counter">{active + 1} / {images.length}</div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="pd-gallery-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`pd-gallery-thumb ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <img src={img} alt={`Thumb ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main Component ── */
export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="pd-not-found">
        <h2>Project not found.</h2>
        <Link to="/" className="sb-btn-primary">Go Home</Link>
      </div>
    );
  }

  return (
    <main className="project-detail-page">
      {/* ── HERO ── */}
      <HeroSection project={project} navigate={navigate} />

      {/* ── OVERVIEW + PROCESS ── */}
      <OverviewSection project={project} />

      {/* ── FLOOR PLANS ── */}
      {project.floorPlans && project.floorPlans.length > 0 && (
        <FloorPlansSection project={project} />
      )}

      {/* ── PRIME LOCATION ── */}
      {project.locationImages && project.locationImages.length > 0 && (
        <LocationSection project={project} />
      )}

      {/* ── SALIENT FEATURES ── */}
      <FeaturesSection project={project} />

      {/* ── BUSINESS EDGE ── */}
      {project.businessTagline && <BusinessSection project={project} />}

      {/* ── SPECIFICATIONS ── */}
      <SpecsSection project={project} />

      {/* ── TERMS ── */}
      <TermsSection project={project} />

      {/* ── CTA ── */}
      <CTASection />
    </main>
  );
}

/* ── Hero ── */
function HeroSection({ project, navigate }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section className="pd-hero">
      <div className="pd-hero-bg">
        <img src={project.img} alt={project.title} className="pd-hero-img" />
        <div className="pd-hero-overlay" />
      </div>
      <div className="sb-container pd-hero-content">
        <button className={`pd-back-btn reveal ${loaded ? 'visible' : ''}`} onClick={() => navigate(-1)}>
          <HiOutlineArrowLeft size={18} /> Back
        </button>
        <div className={`pd-hero-badge reveal ${loaded ? 'visible' : ''}`} style={{ transitionDelay: '80ms' }}>
          <span className="pd-hero-dot" />
          {project.tag} · {project.type}
        </div>
        <h1 className={`pd-hero-title reveal ${loaded ? 'visible' : ''}`} style={{ transitionDelay: '160ms' }}>
          {project.title}
        </h1>
        {project.subtitle && (
          <p className={`pd-hero-subtitle reveal ${loaded ? 'visible' : ''}`} style={{ transitionDelay: '240ms' }}>
            {project.subtitle}
          </p>
        )}
        <div className={`pd-hero-meta reveal ${loaded ? 'visible' : ''}`} style={{ transitionDelay: '320ms' }}>
          <span><HiOutlineMapPin /> {project.location}</span>
          <span className="pd-meta-sep" />
          <span><HiOutlineCalendar /> {project.year}</span>
          <span className="pd-meta-sep" />
          <span><HiOutlineSquares2X2 /> {project.area}</span>
          {project.rating > 0 && (
            <>
              <span className="pd-meta-sep" />
              <span className="pd-hero-rating"><HiOutlineStar /> {project.rating}</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Overview + Process ── */
function OverviewSection({ project }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="pd-overview" ref={ref}>
      <div className="sb-container">
        <div className="pd-overview-grid">
          <div className={`pd-overview-text reveal ${visible ? 'visible' : ''}`}>
            <div className="sb-section-label">Project Overview</div>
            <h2 className="sb-section-title">
              Welcome to <em>{project.title}</em>
            </h2>
            <div className="sb-divider" />
            <p className="pd-overview-lead">{project.heroDescription}</p>
            {project.subDescription && (
              <p className="pd-overview-body">{project.subDescription}</p>
            )}
            {project.tagline && (
              <p className="pd-overview-tagline">
                <span className="pd-tagline-icon"><HiOutlineSparkles /></span>
                {project.tagline}
              </p>
            )}
          </div>

          {/* Process Steps */}
          <div className={`pd-process reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <div className="pd-process-label">Our Process</div>
            {project.process.map((step, i) => (
              <div key={i} className="pd-process-step">
                <div className="pd-step-num">{step.step}</div>
                <div className="pd-step-content">
                  <h4 className="pd-step-title">{step.title}</h4>
                  <p className="pd-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Floor Plans Section ── */
function FloorPlansSection({ project }) {
  const [ref, visible] = useReveal(0.1);
  const [activeTab, setActiveTab] = useState(0);
  const plan = project.floorPlans[activeTab];

  return (
    <section className="pd-floor-plans" ref={ref}>
      <div className="sb-container">
        <div className={`pd-floor-header reveal ${visible ? 'visible' : ''}`}>
          <div className="sb-section-label" style={{ justifyContent: 'center' }}>Floor Plans</div>
          <h2 className="sb-section-title" style={{ textAlign: 'center' }}>
            Heart of <em>{project.location.split(',').pop().trim() || 'Modasa'}</em>
          </h2>
        </div>

        {/* Tab Bar */}
        <div className={`pd-floor-tabs reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '120ms' }}>
          {project.floorPlans.map((fp, i) => (
            <button
              key={fp.id}
              className={`pd-floor-tab ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {fp.title}
            </button>
          ))}
        </div>

        {/* Active Plan Content */}
        <div className={`pd-floor-content reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
          {plan.tagline && (
            <p className="pd-floor-tagline">{plan.tagline}</p>
          )}

          <div className="pd-floor-body">
            {/* Area Sheet Table */}
            {plan.areaSheet && plan.areaSheet.length > 0 && (
              <div className="pd-floor-table-wrap">
                <h4 className="pd-floor-table-title">Area Sheet</h4>
                <table className="pd-area-table">
                  <thead>
                    <tr>
                      <th>Shop No.</th>
                      <th>Dimensions</th>
                      <th>Sq. Ft.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.areaSheet.map((row, i) => (
                      <tr key={i}>
                        <td>{row.shopNo}</td>
                        <td>{row.dimensions}</td>
                        <td>{row.sqft}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Floor Images */}
            <div className="pd-floor-images">
              {plan.images && plan.images.length > 0 ? (
                plan.images.map((img, idx) => (
                  <div className="pd-floor-img-wrap" key={idx}>
                    <img src={img.url} alt={img.label || plan.title} className="pd-floor-img" />
                    <span className="pd-floor-img-label">{img.label || 'View'}</span>
                  </div>
                ))
              ) : (
                <>
                  {plan.image && (
                    <div className="pd-floor-img-wrap">
                      <img src={plan.image} alt={plan.title} className="pd-floor-img" />
                      <span className="pd-floor-img-label">View</span>
                    </div>
                  )}
                  {plan.floorImage && (
                    <div className="pd-floor-img-wrap">
                      <img src={plan.floorImage} alt={`${plan.title} Map`} className="pd-floor-img" />
                      <span className="pd-floor-img-label">Floor Map</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Prime Location ── */
function LocationSection({ project }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="pd-location" ref={ref}>
      <div className="sb-container">
        <div className={`pd-location-header reveal ${visible ? 'visible' : ''}`}>
          <div className="sb-section-label" style={{ justifyContent: 'center' }}>Prime Location</div>
          <h2 className="sb-section-title" style={{ textAlign: 'center' }}>
            <HiOutlineMapPin style={{ color: 'var(--primary)', verticalAlign: 'middle', marginRight: 8 }} />
            {project.primeLocation}
          </h2>
        </div>
        <div className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
          <LocationGallery images={project.locationImages} />
        </div>
      </div>
    </section>
  );
}

/* ── Salient Features ── */
function FeaturesSection({ project }) {
  const [ref, visible] = useReveal(0.1);
  if (!project.salientFeatures || project.salientFeatures.length === 0) return null;

  return (
    <section className="pd-features" ref={ref}>
      <div className="sb-container">
        <div className={`pd-features-header reveal ${visible ? 'visible' : ''}`}>
          <div className="sb-section-label" style={{ justifyContent: 'center' }}>Salient Features</div>
          <h2 className="sb-section-title" style={{ textAlign: 'center' }}>
            What Makes It <em>Special</em>
          </h2>
        </div>
        <div className="pd-features-grid">
          {project.salientFeatures.map((f, i) => (
            <div
              key={i}
              className={`pd-feature-card reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${150 + i * 60}ms` }}
            >
              <div className="pd-feature-icon">
                {featureIconMap[f.icon] || <HiOutlineSparkles />}
              </div>
              <p className="pd-feature-text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Business Edge ── */
function BusinessSection({ project }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="pd-business" ref={ref}>
      <div className="pd-business-overlay" />
      <div className="sb-container">
        <p className={`pd-business-text reveal ${visible ? 'visible' : ''}`}>
          {project.businessTagline}
        </p>
      </div>
    </section>
  );
}

/* ── Specifications ── */
function SpecsSection({ project }) {
  const [ref, visible] = useReveal(0.1);
  if (!project.specifications || project.specifications.length === 0) return null;

  return (
    <section className="pd-specs" ref={ref}>
      <div className="sb-container">
        <div className={`pd-specs-header reveal ${visible ? 'visible' : ''}`}>
          <div className="sb-section-label" style={{ justifyContent: 'center' }}>Specifications</div>
          <h2 className="sb-section-title" style={{ textAlign: 'center' }}>
            Built to the <em>Finest Detail</em>
          </h2>
        </div>
        <div className="pd-specs-grid">
          {project.specifications.map((spec, i) => (
            <div
              key={i}
              className={`pd-spec-card reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${150 + i * 80}ms` }}
            >
              <div className="pd-spec-label">{spec.label}</div>
              <p className="pd-spec-detail">{spec.detail}</p>
              <div className="pd-spec-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Terms ── */
function TermsSection({ project }) {
  const [ref, visible] = useReveal(0.1);
  const [open, setOpen] = useState(true);
  if (!project.termsAndConditions || project.termsAndConditions.length === 0) return null;

  return (
    <section className="pd-terms" ref={ref}>
      <div className="sb-container">
        <div className={`pd-terms-box reveal ${visible ? 'visible' : ''}`}>
          <button className="pd-terms-toggle" onClick={() => setOpen(o => !o)}>
            <span>Terms & Conditions</span>
            <HiOutlineShieldCheck size={20} />
          </button>
          {open && (
            <ul className="pd-terms-list">
              {project.termsAndConditions.map((t, i) => (
                <li key={i} className="pd-terms-item">
                  <HiOutlineCheckCircle className="pd-terms-icon" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTASection() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="pd-cta" ref={ref}>
      <div className="sb-container">
        <div className={`pd-cta-inner reveal ${visible ? 'visible' : ''}`}>
          <h3 className="pd-cta-title">Interested in this project?</h3>
          <p className="pd-cta-sub">Get in touch with our team for site visits, pricing, and more details.</p>
          <div className="pd-cta-actions">
            <a href="tel:+919824400447" className="sb-btn-primary">
              <HiOutlinePhone size={18} />
              <span>Call Us Now</span>
            </a>
            <Link to="/" className="pd-cta-ghost">
              <HiOutlineArrowRight size={18} />
              <span>View All Projects</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
