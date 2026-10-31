'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Phone, ArrowRight } from './icons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Logo */}
        <Link href="/" className="brand-logo" aria-label="Better Mind Home">
          <div className="brand-symbol">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg">
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" />
              <circle cx="13" cy="16" r="6" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="19" cy="16" r="6" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="16" cy="16" r="2" fill="currentColor" />
            </svg>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Better Mind</span>
            <span className="brand-subtitle">Mental Health & Care Collective</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <div className="nav-capsule">
            <Link href="/#book-now" className="nav-link">
              Quick Book
            </Link>
            <span className="nav-capsule-divider">·</span>
            <Link href="/#specialists" className="nav-link">
              Specialists & Fees
            </Link>
            <span className="nav-capsule-divider">·</span>
            <Link href="/#how-it-works" className="nav-link">
              How It Works
            </Link>
            <span className="nav-capsule-divider">·</span>
            <Link href="/#location" className="nav-link">
              Bangalore Clinic
            </Link>
            <span className="nav-capsule-divider">·</span>
            <Link href="/services" className={`nav-link ${pathname === '/services' ? 'active' : ''}`}>
              All Practices
            </Link>
          </div>
        </nav>

        {/* Action Header Group */}
        <div className="header-actions">
          <a href="tel:+918047182200" className="header-contact-link" title="Call Clinic Desk">
            <Phone size={13} />
            <span className="contact-number">080 4718 2200</span>
          </a>

          <Link href="/book" className="btn-book-cta">
            <Calendar size={13} />
            <span>Book Appointment</span>
            <ArrowRight size={13} />
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-inner">
            <div className="mobile-drawer-header">
              <span className="drawer-clinic-name">Better Mind</span>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-nav-links">
              <Link href="/book?service=initial-assessment" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Free 15-Minute Orientation with Ananya</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/#specialists" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Specialists Roster & Fees (From ₹1,400)</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/#how-it-works" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>How Your Session Works</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/#location" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Indiranagar Bangalore Clinic & Video</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>All Disciplines & Services</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/staff" className="mobile-nav-item staff-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Practitioner Desk</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mobile-drawer-cta">
              <Link href="/book" className="btn-primary btn-full btn-lg" onClick={() => setMobileMenuOpen(false)}>
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
              <div className="mobile-clinic-quick-info">
                <p>🌐 Online Video Pan-India & Indiranagar Bangalore Hub</p>
                <p>🕒 Mon – Sat: 8:30 AM – 8:30 PM IST</p>
                <p>📞 <a href="tel:+918047182200">+91 80 4718 2200</a></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
