import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineMapPin } from 'react-icons/hi2';
import './FeaturedWorks.css';
import projectsData from '../../../data/projects.json';

const CATEGORIES = ['All', 'Completed', 'Ongoing'];

export default function FeaturedWorks() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isRevealed, setIsRevealed] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);

  const filtered = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

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
    <section className="fw-section" ref={sectionRef} id="works">
      <div className="sb-container">

        {/* ── Header Row ── */}
        <div className={`fw-header reveal ${isRevealed ? 'visible' : ''}`}>
          <div className="fw-header-left">
            <div className="sb-section-label">Our Portfolio</div>
            <h2 className="sb-section-title">
              Featured <em>Projects</em>
            </h2>
          </div>
          <div className="fw-header-right">
            <p className="fw-header-desc">
              A curated selection of landmark projects that define our legacy of quality and design excellence.
            </p>
            <button className="sb-btn-outline fw-header-cta">
              <span>View All Projects</span>
              <HiOutlineArrowRight />
            </button>
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div className={`fw-filters reveal ${isRevealed ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`fw-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {cat !== 'All' && (
                <span className="fw-filter-count">
                  {projectsData.filter(p => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Project List ── */}
        <div className="fw-list">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className={`fw-item reveal ${isRevealed ? 'visible' : ''} ${hoveredId === project.id ? 'fw-item--hovered' : ''}`}
              style={{ transitionDelay: `${200 + i * 80}ms`, textDecoration: 'none' }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Thumbnail */}
              <div className="fw-item-thumb">
                <img src={project.img} alt={project.title} className="fw-item-img" />
                <div className="fw-item-img-overlay" />
                <span className={`fw-category-badge fw-category-badge--${project.category.toLowerCase()}`}>
                  {project.category}
                </span>
              </div>

              {/* Main Info */}
              <div className="fw-item-body">
                <div className="fw-item-meta">
                  <span className="fw-item-tag">{project.tag}</span>
                  <span className="fw-item-year">{project.year}</span>
                </div>
                <h3 className="fw-item-title">{project.title}</h3>
                <p className="fw-item-desc">{project.desc}</p>
              </div>

              {/* Details */}
              <div className="fw-item-details">
                <div className="fw-detail">
                  <span className="fw-detail-label">Location</span>
                  <span className="fw-detail-value">
                    <HiOutlineMapPin /> {project.location}
                  </span>
                </div>
                <div className="fw-detail">
                  <span className="fw-detail-label">Area</span>
                  <span className="fw-detail-value">{project.area}</span>
                </div>
              </div>

              {/* Arrow CTA */}
              <div className="fw-item-arrow">
                <span className="fw-arrow-circle">
                  <HiOutlineArrowRight />
                </span>
              </div>

              {/* Hover accent line */}
              <div className="fw-item-accent-line" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
