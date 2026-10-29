'use client';

import React, { useState } from 'react';
import { Shield, X, Info } from './icons';

export default function CrisisBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <aside className="crisis-top-bar" role="complementary" aria-label="Crisis Support Information">
        <div className="container crisis-top-inner">
          <div className="crisis-content">
            <span className="crisis-tag">
              <Shield size={13} />
              <span>Outpatient Practice</span>
            </span>
            <span className="crisis-text">
              24/7 National Support:
              {' '}
              <a href="tel:14416" className="crisis-phone-link">
                <strong>Tele-MANAS: 14416</strong>
              </a>
              {' '}or{' '}
              <a href="tel:18005990019" className="crisis-phone-link">
                <strong>KIRAN: 1800-599-0019</strong>
              </a>
              {' '}(Toll-free, Govt. of India)
            </span>
          </div>
          <button
            type="button"
            className="crisis-info-btn"
            onClick={() => setShowModal(true)}
            aria-label="View 24/7 national support guide"
          >
            <Info size={13} />
            <span>Support & Safety Guide</span>
          </button>
        </div>
      </aside>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)} role="dialog" aria-modal="true">
          <div className="crisis-modal" onClick={e => e.stopPropagation()}>
            <div className="crisis-modal-header">
              <div className="crisis-modal-title">
                <Shield size={20} />
                <h3>Immediate Crisis & Hospital Casualty Support</h3>
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
                <strong>Better Mind is a scheduled outpatient clinic and does not provide 24/7 emergency casualty intervention.</strong>
              </p>
              <p>
                If you or a loved one are experiencing acute suicidal thoughts, severe self-harm urges, or extreme medical distress, please contact these verified government helplines or visit your nearest hospital emergency ward immediately:
              </p>
              <div className="modal-helpline-list">
                <div className="modal-helpline-card">
                  <div>
                    <strong>Tele-MANAS (Govt. of India)</strong>
                    <span>National Tele Mental Health Programme · 24/7 Toll-Free</span>
                  </div>
                  <a href="tel:14416" className="modal-call-btn">Call 14416</a>
                </div>
                <div className="modal-helpline-card">
                  <div>
                    <strong>KIRAN Mental Health Helpline</strong>
                    <span>Department of Empowerment of Persons with Disabilities</span>
                  </div>
                  <a href="tel:18005990019" className="modal-call-btn">Call 1800-599-0019</a>
                </div>
                <div className="modal-helpline-card">
                  <div>
                    <strong>Emergency Services (Police / Ambulance)</strong>
                    <span>Pan-India Emergency Response Support System</span>
                  </div>
                  <a href="tel:112" className="modal-call-btn">Call 112</a>
                </div>
              </div>
              <div className="modal-footer-note">
                Our clinicians operate on scheduled appointment slots. If your booking is upcoming and your distress is escalating, please seek immediate emergency casualty care.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
