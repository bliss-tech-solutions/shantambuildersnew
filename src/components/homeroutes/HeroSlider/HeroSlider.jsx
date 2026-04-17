import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { ArrowRightOutlined, ArrowLeftOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80',
    label:  'Shantam Builders & Group',
    location: 'Gujarat, India',
    tagline: 'Welcome To Shantam',
    headline: 'Building Trust.\nCreating Legacies.',
    description: 'Welcome to Shantam Builders & Group. We redefine the skyline by developing architectural masterpieces that inspire and endure.',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1400&q=80',
    label:  'Premium Commercial',
    location: 'Gujarat, India',
    tagline: 'Shantam Group',
    headline: 'Shilp\nEmbark',
    description: 'A benchmark of modern architecture offering state-of-the-art commercial spaces designed for the modern enterprise.',
  },
  // {
  //   id: 3,
  //   img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
  //   label:  'Modern Residency',
  //   location: 'Gujarat, India',
  //   tagline: 'Shantam Group',
  //   headline: 'Shantam - 9',
  //   description: 'Crafting premium residential spaces where architecture meets elegance and comfort for modern living.',
  // },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1400&q=80',
    label:  'Luxury Living',
    location: 'Gujarat, India',
    tagline: 'Shantam Group',
    headline: 'Shantam - 9',
    description: 'Redefining urban lifestyle with sophisticated design and world-class amenities in the heart of the city.',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=80',
    label:  'Bespoke Architecture',
    location: 'Gujarat, India',
    tagline: 'Shantam Group',
    headline: 'Shantam - 7',
    description: 'Uniquely designed residential complexes that stand as landmarks of quality and precision engineering.',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
    label:  'Corporate Excellence',
    location: 'Gujarat, India',
    tagline: 'Shantam Group',
    headline: 'Shantam - 11',
    description: 'A masterpiece of commercial architecture offering efficient workspaces and premium business environments.',
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
    label:  'Luxury Landmark',
    location: 'Gujarat, India',
    tagline: 'Shantam Group',
    headline: 'Shantam - SAPPHIRE',
    description: 'Experience the pinnacle of luxury living with meticulously crafted interiors and breathtaking architectural design.',
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero-slider ${isRevealed ? 'revealed' : ''}`}>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1200}
        loop
        onSwiper={(sw) => (swiperRef.current = sw)}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <div className="slide-bg-wrap">
              <div className="slide-img">
                <img src={slide.img} alt={slide.label} />
                <div className="slide-img-overlay" />
              </div>
            </div>

            {/* Cinematic dark overlay */}
            <div className="slide-cinematic-overlay" />

            {/* Slide Content */}
            <div className="slide-content">
              <div className="slide-content-inner">
                <div className="slide-label">
                  <span className="slide-label-dot" />
                  {slide.tagline}
                </div>
                <h1 className="slide-headline">
                  {slide.headline.split('\n').map((line, li) => (
                    <span key={li} className="slide-headline-line">{line}</span>
                  ))}
                </h1>
                <p className="slide-desc">{slide.description}</p>
                <div className="slide-meta">
                  <span className="slide-meta-item">
                    <EnvironmentOutlined /> {slide.location}
                  </span>
                  <span className="slide-divider-dot" />
                  <span className="slide-meta-item slide-meta-project">{slide.label}</span>
                </div>
                <div className="slide-actions">
                  <button className="sb-btn-primary slide-cta">
                    <span>View Our Work</span>
                    <ArrowRightOutlined />
                  </button>
                  <button className="slide-cta-ghost">
                    <PhoneOutlined /> Free Consultation
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="hero-nav">
          <button className="hero-nav-btn hero-nav-prev" onClick={() => swiperRef.current?.slidePrev()}>
            <ArrowLeftOutlined />
          </button>
          <button className="hero-nav-btn hero-nav-next" onClick={() => swiperRef.current?.slideNext()}>
            <ArrowRightOutlined />
          </button>
        </div>

        {/* Slide Progress */}
        <div className="hero-pagination">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${activeIndex === i ? 'active' : ''}`}
              onClick={() => swiperRef.current?.slideTo(i)}
            />
          ))}
        </div>
      </Swiper>

      {/* Stats Bar */}
      <div className="hero-stats-bar">
        {[
          { value: '500+', label: 'Projects Delivered' },
          { value: '18+', label: 'Years Experience' },
          { value: '98%', label: 'Client Satisfaction' },
          { value: '50+', label: 'Expert Team' },
        ].map((s, i) => (
          <div className="hero-stat" key={i}>
            <span className="hero-stat-value">{s.value}</span>
            <span className="hero-stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
