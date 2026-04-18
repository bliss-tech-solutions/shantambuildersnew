import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { 
  HiOutlineArrowRight, 
  HiOutlineArrowLeft, 
  HiOutlineMapPin, 
  HiOutlinePhone 
} from 'react-icons/hi2';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    img: '/Images/image.png',
    label:  'Shantam Builders & Group',
    location: 'Gujarat, India',
    tagline: 'Welcome To Shantam',
    headline: 'Building Trust.\nCreating Legacies.',
    description: 'Welcome to Shantam Builders & Group. We redefine the skyline by developing architectural masterpieces that inspire and endure.',
  }
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
                {/* <p className="slide-desc">{slide.description}</p> */}
                <div className="slide-meta">
                  <span className="slide-meta-item">
                    <HiOutlineMapPin /> {slide.location}
                  </span>
                  <span className="slide-divider-dot" />
                  <span className="slide-meta-item slide-meta-project">{slide.label}</span>
                </div>
                <div className="slide-actions">
                  <button className="sb-btn-primary slide-cta">
                    <span>View Our Work</span>
                    <HiOutlineArrowRight />
                  </button>
                  <button className="slide-cta-ghost">
                    <HiOutlinePhone /> Free Consultation
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="hero-nav">
          <button className="hero-nav-btn hero-nav-prev" onClick={() => swiperRef.current?.slidePrev()}>
            <HiOutlineArrowLeft />
          </button>
          <button className="hero-nav-btn hero-nav-next" onClick={() => swiperRef.current?.slideNext()}>
            <HiOutlineArrowRight />
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
