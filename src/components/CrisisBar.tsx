'use client';

import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, X, Info } from './icons';

export default function CrisisBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <aside className="crisis-top-bar" role="complementary" aria-label="Crisis Support Information">
        <div className="container crisis-top-inner">
          <div className="crisis-content">
            <span className="crisis-tag">
              <ShieldAlert size={14} className="crisis-icon" /> Emergency Notice
            </span>
            <span className="crisis-text">
              Better Mind is an outpatient clinic. In acute psychological distress or medical emergency, call 24/7 National Helplines:
              {' '}
              <a href="tel:14416" className="crisis-phone-link">
                <strong>Tele-MANAS: 14416</strong>
              </a>
              {' '}(Toll-Free) or{' '}
              <a href="tel:18005990019" className="crisis-phone-link">
                <strong>KIRAN: 1800-599-0019</strong>
              </a>
            </span>
          </div>
          <button
            type="button"
            className="crisis-info-btn"
            onClick={() => setShowModal(true)}
            aria-label="View crisis and hospital casualty guidelines"
          >
            <Info size={13} />
            <span>Casualty Guidelines</span>
          </button>
        </div>
      </aside>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)} role="dialog" aria-modal="true">
          <div className="crisis-modal" onClick={e => e.stopPropagation()}>
            <div className="crisis-modal-header">
              <div className="crisis-modal-title">
                <ShieldAlert size={20} className="crisis-modal-icon" />
                <h3>Immediate Crisis & Casualty Assistance</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="crisis-modal-body">
              <p>
                <strong>Better Mind is a scheduled clinic and cannot provide emergency or round-the-clock crisis intervention.</strong>
              </p>
              <p>
                If you or someone you care about is experiencing active suicidal ideation, severe disorientation, psychosis, or imminent risk of self-harm, please take immediate action:
              </p>
              <div className="crisis-hotline-list">
                <div className="hotline-card">
                  <div className="hotline-name">Tele-MANAS (Govt. of India)</div>
                  <div className="hotline-number"><a href="tel:14416">14416</a> or <a href="tel:18008914416">1800 891 4416</a></div>
                  <div className="hotline-desc">24/7 toll-free multilingual psychiatric & crisis counseling</div>
                </div>
                <div className="hotline-card">
                  <div className="hotline-name">KIRAN (Dept. of Empowerment of PwDs)</div>
                  <div className="hotline-number"><a href="tel:18005990019">1800-599-0019</a></div>
                  <div className="hotline-desc">24/7 dedicated mental health rehabilitation helpline</div>
                </div>
                <div className="hotline-card">
                  <div className="hotline-name">National Emergency Services</div>
                  <div className="hotline-number"><a href="tel:112">112</a></div>
                  <div className="hotline-desc">Ambulance and urgent police/medical response</div>
                </div>
              </div>
              <div className="crisis-hospital-note">
                <strong>In Bengaluru:</strong> Please visit the 24-hour Emergency Psychiatric Casualty at <strong>NIMHANS</strong> (Hosur Road) or the nearest multi-specialty hospital emergency room immediately.
              </div>
            </div>
            <div className="crisis-modal-footer">
              <button type="button" className="btn-primary" onClick={() => setShowModal(false)}>
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
