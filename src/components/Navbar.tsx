'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Phone, ArrowRight, ShieldCheck, UserCheck } from './icons';

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
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg">
              <circle cx="18" cy="18" r="16" fill="url(#teal-grad)" />
              <path d="M18 8C13.5817 8 10 11.5817 10 16C10 20.4183 14 26 18 28C22 26 26 20.4183 26 16C26 11.5817 22.4183 8 18 8Z" fill="#FFFFFF" fillOpacity="0.22" />
              <path d="M18 12C15.7909 12 14 13.7909 14 16C14 18.5 17 22 18 23C19 22 22 18.5 22 16C22 13.7909 20.2091 12 18 12Z" fill="#FFFFFF" />
              <circle cx="18" cy="16" r="2.5" fill="#124E47" />
              <defs>
                <linearGradient id="teal-grad" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#195B53" />
                  <stop offset="1" stopColor="#0B3731" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-text-group">
            <span className="brand-title">Better Mind</span>
            <span className="brand-subtitle">Integrated Clinic · Bengaluru</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <Link href="/services" className={`nav-link ${pathname === '/services' ? 'active' : ''}`}>
            Services
          </Link>
          <Link href="/#pathways" className="nav-link">
            Care Pathways
          </Link>
          <Link href="/#philosophy" className="nav-link">
            Our Method
          </Link>
          <Link href="/#first-session" className="nav-link">
            First Session Guide
          </Link>
          <Link href="/#team" className="nav-link">
            Specialists
          </Link>
          <Link href="/#pricing-faq" className="nav-link">
            Pricing & FAQs
          </Link>
        </nav>

        {/* Action Header Group */}
        <div className="header-actions">
          <a href="tel:+918047182200" className="header-contact-link" title="Call Clinic Desk">
            <Phone size={15} />
            <span className="contact-number">080 4718 2200</span>
          </a>

          <Link href="/book" className="btn-book-cta">
            <Calendar size={16} />
            <span>Book Consultation</span>
          </Link>

          <Link href="/staff" className="staff-portal-link" title="Staff & Clinician Login">
            <UserCheck size={16} />
            <span className="staff-label">Staff</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-inner">
            <div className="mobile-drawer-header">
              <span className="drawer-clinic-name">Better Mind Navigation</span>
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
              <Link href="/services" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Services Catalogue</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/#pathways" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Care Pathways (Mind, Body, Wellness)</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/#philosophy" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Our Integrated Method</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/#first-session" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>What Happens in a First Session</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/#team" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Our Specialist Team</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/#pricing-faq" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Transparent Fees & FAQ</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/staff" className="mobile-nav-item staff-item" onClick={() => setMobileMenuOpen(false)}>
                <span>Clinician & Staff Desk</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mobile-drawer-cta">
              <Link href="/book" className="btn-primary btn-full btn-lg" onClick={() => setMobileMenuOpen(false)}>
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
              <div className="mobile-clinic-quick-info">
                <p>📍 14th Main Rd, Indiranagar, Bengaluru</p>
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
