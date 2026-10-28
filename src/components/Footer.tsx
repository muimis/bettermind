import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, Clock, HeartHandshake } from './icons';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      {/* Top Banner inside Footer */}
      <div className="footer-top-strip">
        <div className="container footer-strip-inner">
          <div className="strip-item">
            <ShieldCheck size={20} className="strip-icon" />
            <div>
              <strong>RCI & NMC Certified Specialists</strong>
              <span>Verified academic & hospital credentials</span>
            </div>
          </div>
          <div className="strip-item">
            <HeartHandshake size={20} className="strip-icon" />
            <div>
              <strong>Zero-Overlap Guaranteed</strong>
              <span>Coordinated multi-disciplinary care plans</span>
            </div>
          </div>
          <div className="strip-item">
            <MapPin size={20} className="strip-icon" />
            <div>
              <strong>Online Across India & Partner Hubs</strong>
              <span>Encrypted video rooms & in-person centers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main-content">
        <div className="footer-grid">
          {/* Col 1: Brand & Philosophy */}
          <div className="footer-col brand-col">
            <div className="footer-brand-title">Better Mind</div>
            <p className="footer-brand-desc">
              An integrated online clinic for mental health and whole-person wellness. We unite medical psychiatry, evidence-based psychotherapy, gut-brain clinical nutrition, and somatic nervous system therapy into one coordinated journey.
            </p>
            <div className="footer-contact-details">
              <div className="f-contact-line">
                <MapPin size={16} />
                <span>Online Video Pan-India · Partner clinic hubs (locations to confirm)</span>
              </div>
              <div className="f-contact-line">
                <Clock size={16} />
                <span>Mon – Sat: 8:30 AM – 8:30 PM IST · Sun: 10:00 AM – 4:00 PM IST</span>
              </div>
              <div className="f-contact-line">
                <Phone size={16} />
                <a href="tel:+918047182200">+91 80 4718 2200</a>
              </div>
              <div className="f-contact-line">
                <Mail size={16} />
                <a href="mailto:care@bettermind.clinic">care@bettermind.clinic</a>
              </div>
            </div>
          </div>

          {/* Col 2: Services & Care Pathways */}
          <div className="footer-col">
            <h4 className="footer-heading">Care Disciplines</h4>
            <ul className="footer-links-list">
              <li><Link href="/services#mind">Clinical Psychology & CBT</Link></li>
              <li><Link href="/services#mind">Psychiatry & Medical Evaluation</Link></li>
              <li><Link href="/services#body">Gut-Brain Clinical Nutrition</Link></li>
              <li><Link href="/services#body">Therapeutic Somatic Yoga</Link></li>
              <li><Link href="/services#wellness">Mindfulness & Polyvagal Regulation</Link></li>
              <li><Link href="/services#start">Initial Care Assessment & Triage</Link></li>
            </ul>
          </div>

          {/* Col 3: Patient Resources */}
          <div className="footer-col">
            <h4 className="footer-heading">Patient Resources</h4>
            <ul className="footer-links-list">
              <li><Link href="/#first-session">What to Expect in Session 1</Link></li>
              <li><Link href="/#pathways">Coordinated Care Pathways</Link></li>
              <li><Link href="/#team">Our Specialist Medical Team</Link></li>
              <li><Link href="/#pricing-faq">Consultation Fees & Reimbursement</Link></li>
              <li><Link href="/#pricing-faq">Frequently Asked Questions</Link></li>
              <li><Link href="/staff">Clinician & Staff Desk Login</Link></li>
            </ul>
          </div>

          {/* Col 4: Crisis Support Box */}
          <div className="footer-col crisis-col">
            <h4 className="footer-heading crisis-heading">24/7 National Crisis Lifelines</h4>
            <div className="footer-crisis-box">
              <p className="crisis-box-text">
                Better Mind provides scheduled therapy and consultations. If you or someone you know is in active crisis or experiencing self-harm urges, please reach out immediately:
              </p>
              <div className="crisis-box-numbers">
                <div className="crisis-box-item">
                  <span className="crisis-label">Tele-MANAS (Mental Health)</span>
                  <a href="tel:14416" className="crisis-val">14416 (Toll-Free)</a>
                </div>
                <div className="crisis-box-item">
                  <span className="crisis-label">KIRAN (Govt. Helpline)</span>
                  <a href="tel:18005990019" className="crisis-val">1800-599-0019</a>
                </div>
                <div className="crisis-box-item">
                  <span className="crisis-label">Emergency Services</span>
                  <a href="tel:112" className="crisis-val">112 (National Response)</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Regulatory Disclosures */}
        <div className="footer-disclaimers">
          <p>
            <strong>Medical & Telemedicine Practice Notice:</strong> Consultations conducted online are regulated by the <em>Telemedicine Practice Guidelines (2020)</em> issued by the Board of Governors in supersession of the Medical Council of India (MCI) and the <em>Mental Healthcare Act, 2017</em>. Prescription of medications is subject to clinical discretion and statutory Schedule restrictions.
          </p>
          <p>
            <strong>Data Privacy & Protection:</strong> All patient personal health records, notes, and session details are strictly confidential, end-to-end encrypted, and governed in compliance with the <em>Digital Personal Data Protection (DPDP) Act, 2023</em>.
          </p>
          <p>
            <strong>Emergency Disclaimer:</strong> Better Mind does not operate an emergency room or casualty ward. Appointments must be scheduled in advance with our clinical roster.
          </p>
        </div>

        {/* Bottom copyright row */}
        <div className="footer-bottom-row">
          <div className="footer-copy">
            © {new Date().getFullYear()} Better Mind Integrated Health Pvt. Ltd. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <Link href="/services">Service Catalogue</Link>
            <span>·</span>
            <Link href="/book">Schedule Appointment</Link>
            <span>·</span>
            <Link href="/#pricing-faq">Privacy & Consent Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
