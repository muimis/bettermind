import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from './icons';

export default function Footer() {
  return (
    <footer className="bm-sanctuary-footer" role="contentinfo">
      <div className="container bm-footer-inner">
        <div className="bm-footer-main-row">
          <div className="bm-footer-brand-group">
            <Link href="/" className="bm-footer-brand">
              Better Mind
            </Link>
            <p className="bm-footer-tagline">
              An unhurried space for your mind, body, and daily peace.
            </p>
            <div className="bm-footer-contacts">
              <a href="tel:+918047182200" className="bm-footer-contact-link">
                <Phone size={14} />
                <span>080 4718 2200</span>
              </a>
              <a href="mailto:care@bettermind.clinic" className="bm-footer-contact-link">
                <Mail size={14} />
                <span>care@bettermind.clinic</span>
              </a>
              <span className="bm-footer-contact-item">
                <MapPin size={14} />
                <span>Online Video Across India · Quiet Metro Suites</span>
              </span>
            </div>
          </div>

          <div className="bm-footer-nav-groups">
            <div className="bm-footer-col">
              <h4 className="bm-footer-heading">Practices</h4>
              <ul className="bm-footer-links">
                <li><Link href="/book?service=clinical-psychology">Psychotherapy</Link></li>
                <li><Link href="/book?service=therapeutic-yoga">Somatic Bodywork</Link></li>
                <li><Link href="/book?service=dietetics-nutrition">Gut-Brain Nutrition</Link></li>
                <li><Link href="/book?service=psychiatry-consultation">Focus & Medical Review</Link></li>
                <li><Link href="/book?service=initial-assessment">Free 15-Minute Intro</Link></li>
              </ul>
            </div>

            <div className="bm-footer-col">
              <h4 className="bm-footer-heading">Practice Desk</h4>
              <ul className="bm-footer-links">
                <li><Link href="/book">Reserve a Session</Link></li>
                <li><Link href="/services">All Services</Link></li>
                <li><Link href="/staff">Practitioner Login</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiet, discreet 24/7 emergency support line */}
        <div className="bm-footer-safety-strip">
          <p className="bm-footer-safety-text">
            If you or someone close to you is experiencing an acute emergency, please reach out to free 24/7 national support lines: <strong>Tele-MANAS (14416)</strong> or <strong>KIRAN (1800-599-0019)</strong>.
          </p>
        </div>

        {/* Copyright & minimal legal links */}
        <div className="bm-footer-bottom">
          <span>© {new Date().getFullYear()} Better Mind Health Pvt. Ltd. All rights reserved.</span>
          <div className="bm-footer-legal">
            <Link href="/book">Privacy & Confidentiality</Link>
            <span>·</span>
            <Link href="/book">Terms of Care</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

