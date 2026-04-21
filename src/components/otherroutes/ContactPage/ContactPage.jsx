import { useEffect, useRef, useState } from 'react';
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlinePaperAirplane,
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineDevicePhoneMobile,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi2';
import { FaInstagram, FaFacebookF } from 'react-icons/fa6';
import './ContactPage.css';

/* ── Scroll Reveal Hook ── */
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

/* ── Contact Data ── */
const PHONES = [
  { num: '98 244 00 447', href: 'tel:9824400447' },
  { num: '93 750 44 900', href: 'tel:9375044900' },
  { num: '93 280 32 377', href: 'tel:9328032377' },
];

const OFFICES = [
  {
    label: 'Site Office — Mehsana',
    name: 'Shilp Embark',
    addr: 'Palodar, Nr. Fatepura Circle,\nMehsana Bypass Highway, Mehsana.',
  },
  {
    label: 'Site Office — Himatnagar',
    name: 'Shantam-9',
    addr: 'Motipura Cross Road,\nHimatnagar.',
  },
  {
    label: 'Corporate Office',
    name: 'One World Capital',
    addr: 'A-501, B/h Rajpath Club,\nOff. S-G Highway, Ahmedabad 380054.',
  },
];

/* ── Hero ── */
function ContactHero() {
  const [ref, visible] = useReveal(0);
  return (
    <section className="cp-hero" ref={ref}>
      <div className="cp-hero-bg" />
      <div className="cp-hero-pattern" />
      <div className="cp-hero-overlay" />
      <div className="sb-container cp-hero-content">
        <div className={`cp-hero-label reveal ${visible ? 'visible' : ''}`}>
          Get In Touch
        </div>
        <h1 className={`cp-hero-title reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '80ms' }}>
          Let's <em>Connect</em> With Us
        </h1>
      </div>
    </section>
  );
}

/* ── Contact Form ── */
function ContactForm() {
  const [ref, visible] = useReveal(0.1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    // Simulate submission — replace with actual API call
    setTimeout(() => setStatus('success'), 1400);
  };

  return (
    <div
      ref={ref}
      className={`cp-form-panel reveal ${visible ? 'visible' : ''}`}
    >
      <h2 className="cp-form-title">Send a Message</h2>
      <p className="cp-form-sub">We'll get back to you within 24 hours.</p>

      <form className="cp-form" onSubmit={handleSubmit} noValidate>
        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-name">
            <HiOutlineUser size={11} style={{ display: 'inline', marginRight: 4 }} />
            Name
          </label>
          <input
            id="cp-name"
            name="name"
            type="text"
            className="cp-input"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-email">
            <HiOutlineEnvelope size={11} style={{ display: 'inline', marginRight: 4 }} />
            Email
          </label>
          <input
            id="cp-email"
            name="email"
            type="email"
            className="cp-input"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-phone">
            <HiOutlineDevicePhoneMobile size={11} style={{ display: 'inline', marginRight: 4 }} />
            Phone *
          </label>
          <input
            id="cp-phone"
            name="phone"
            type="tel"
            className="cp-input"
            placeholder="+91 98000 00000"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="cp-field">
          <label className="cp-label" htmlFor="cp-message">
            <HiOutlineChatBubbleLeftRight size={11} style={{ display: 'inline', marginRight: 4 }} />
            Message
          </label>
          <textarea
            id="cp-message"
            name="message"
            className="cp-textarea"
            placeholder="Tell us about your requirement..."
            value={form.message}
            onChange={handleChange}
          />
        </div>

        {status === 'success' && (
          <div className="cp-msg success">
            <HiOutlineCheckCircle size={15} style={{ display: 'inline', marginRight: 6 }} />
            Thank you! We'll be in touch soon.
          </div>
        )}
        {status === 'error' && (
          <div className="cp-msg error">
            <HiOutlineExclamationCircle size={15} style={{ display: 'inline', marginRight: 6 }} />
            Please fill in your name and phone number.
          </div>
        )}

        <button
          type="submit"
          className="cp-submit"
          disabled={status === 'sending' || status === 'success'}
        >
          {status === 'sending' ? 'Sending…' : (
            <>
              Send Message
              <HiOutlinePaperAirplane className="cp-submit-icon" size={15} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

/* ── Info Panel ── */
function ContactInfo() {
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} className={`cp-info reveal ${visible ? 'visible' : ''}`}>
      {/* Heading */}
      <div>
        <div className="cp-section-label">Our Location</div>
        <h2 className="cp-section-title">Where to <em>Find Us</em></h2>
      </div>

      {/* Map */}
      <div className="cp-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.7570058587753!2d72.5032513!3d23.032692599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b474ee18051%3A0x80f91ac33ab4be3c!2sONE%20WORLD%20CAPITAL!5e0!3m2!1sen!2sin!4v1776741034516!5m2!1sen!2sin"
          title="Shantam Builders Office"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Office Cards */}
      <div className="cp-offices">
        {OFFICES.map((o, i) => (
          <div className="cp-office-card" key={i}>
            <div className="cp-office-icon">
              <HiOutlineMapPin />
            </div>
            <div>
              <div className="cp-office-label">{o.label}</div>
              <div className="cp-office-name">{o.name}</div>
              <div className="cp-office-addr">{o.addr}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Phone Numbers */}
      <div>
        <div className="cp-section-label" style={{ marginBottom: 10 }}>Call Us</div>
        <div className="cp-phones">
          {PHONES.map((p, i) => (
            <a key={i} href={p.href} className="cp-phone-row">
              <HiOutlinePhone className="cp-phone-icon" />
              <span className="cp-phone-num">{p.num}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="cp-social-section" style={{ marginTop: 10 }}>
        <div className="cp-section-label">Connect With Us</div>
        <div className="cp-social-grid">
          <a
            href="https://www.instagram.com/shantambuilders/"
            target="_blank"
            rel="noopener noreferrer"
            className="cp-social-item"
          >
            <div className="cp-social-icon"><FaInstagram /></div>
            <div className="cp-social-info">
              <span className="cp-social-name">Instagram</span>
              <span className="cp-social-handle">@shantambuilders</span>
            </div>
          </a>
          <a
            href="https://www.facebook.com/shantambuilders"
            target="_blank"
            rel="noopener noreferrer"
            className="cp-social-item"
          >
            <div className="cp-social-icon"><FaFacebookF /></div>
            <div className="cp-social-info">
              <span className="cp-social-name">Facebook</span>
              <span className="cp-social-handle">shantambuilders</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Page Root ── */
export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us | Shantam Builders';
  }, []);

  return (
    <>
      <ContactHero />

      <section className="cp-body">
        <div className="sb-container">
          <div className="cp-grid">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
