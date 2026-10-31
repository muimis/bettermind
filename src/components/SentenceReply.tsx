'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SENTENCE_REPLIES, SentenceReplyItem } from '@/content/sentences';
import { ArrowRight, Compass, Clock, CheckCircle2, Shield, Sparkles } from '@/components/icons';

const PRACTITIONER_PHOTOS: Record<string, string> = {
  'Dr. Meera Sen, Ph.D.': '/images/meera-sen.jpg',
  'Rajesh Kumar, M.Sc.': '/images/rajesh-kumar.jpg',
  'Priya Sharma, RD': '/images/priya-sharma.jpg',
  'Dr. Arun Nair, MD': '/images/arun-nair.jpg',
  'Ananya Roy, MSW': '/images/ananya-roy.jpg'
};

export default function SentenceReply() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const router = useRouter();
  const radioRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeItem: SentenceReplyItem = SENTENCE_REPLIES[selectedIdx] || SENTENCE_REPLIES[0];
  const photoUrl = PRACTITIONER_PHOTOS[activeItem.practitionerName] || '/images/meera-sen.jpg';

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (index + 1) % SENTENCE_REPLIES.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (index - 1 + SENTENCE_REPLIES.length) % SENTENCE_REPLIES.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = SENTENCE_REPLIES.length - 1;
    }

    if (nextIndex !== index) {
      setSelectedIdx(nextIndex);
      radioRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section className="bm-reflection-atelier" id="reflections" aria-labelledby="reflection-heading">
      <div className="container">
        {/* Section Header */}
        <div className="bm-reflection-header">
          <div className="bm-eyebrow-luxury">
            <span className="bm-eyebrow-accent">✦</span>
            <span>BESPOKE CARE DISCOVERY</span>
          </div>
          <h2 id="reflection-heading" className="bm-reflection-title">
            What is your mind or body <br />
            <em>navigating today?</em>
          </h2>
          <p className="bm-reflection-sub">
            No diagnostic questionnaires or sterile checklists. Select the reflection that aligns with your present state, and explore the exact clinical mechanism and matched specialist.
          </p>
        </div>

        {/* Interactive Atelier Interface */}
        <div className="bm-reflection-layout">
          {/* Left Column: Reflection Selector Tiles */}
          <div
            className="bm-reflection-selector-list"
            role="radiogroup"
            aria-label="Select what you are navigating today"
          >
            {SENTENCE_REPLIES.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <div
                  key={item.id}
                  ref={el => { radioRefs.current[idx] = el; }}
                  role="radio"
                  tabIndex={isSelected ? 0 : -1}
                  aria-checked={isSelected}
                  aria-controls={`reflection-dossier-${item.id}`}
                  onClick={() => setSelectedIdx(idx)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                  className={`bm-reflection-tile ${isSelected ? 'active' : ''}`}
                >
                  <div className="bm-tile-top-row">
                    <span className="bm-tile-category">{item.category}</span>
                    <span className="bm-tile-indicator" aria-hidden="true">
                      <span className="bm-indicator-core" />
                    </span>
                  </div>
                  <p className="bm-tile-quote">"{item.sentence}"</p>
                  <div className="bm-tile-matched-hint">
                    <span>Matched: {item.startingServiceName}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Clinical Dossier */}
          <div className="bm-reflection-dossier-wrap">
            <div className="bm-reflection-dossier" id={`reflection-dossier-${activeItem.id}`}>
              <div className="bm-dossier-badge-row">
                <span className="bm-dossier-faculty-pill">
                  {activeItem.category}
                </span>
                <span className="bm-dossier-mechanism">
                  {activeItem.mechanism}
                </span>
              </div>

              <h3 className="bm-dossier-service-title">
                {activeItem.startingServiceName}
              </h3>

              <div className="bm-dossier-mechanism-box">
                <span className="bm-mechanism-tag">Clinical Insight</span>
                <p className="bm-dossier-narrative">
                  {activeItem.replyParagraph}
                </p>
              </div>

              {/* Attending Specialist Ledger */}
              <div className="bm-dossier-clinician-card">
                <img
                  src={photoUrl}
                  alt={activeItem.practitionerName}
                  className="bm-dossier-avatar"
                />
                <div className="bm-dossier-clinician-info">
                  <div className="bm-clinician-label">Attending Faculty Specialist</div>
                  <h4 className="bm-clinician-name">{activeItem.practitionerName}</h4>
                  <span className="bm-clinician-creds">{activeItem.credentials}</span>
                </div>
                <div className="bm-dossier-investment-badge">
                  <span className="bm-invest-time">{activeItem.duration}</span>
                  <span className="bm-invest-fee">{activeItem.fee}</span>
                </div>
              </div>

              {/* Guarantees Bar */}
              <div className="bm-dossier-guarantees">
                <div className="bm-dg-item">
                  <CheckCircle2 size={13} />
                  <span>100% Confidential · DPDP Compliant</span>
                </div>
                <div className="bm-dg-item">
                  <Clock size={13} />
                  <span>Unhurried Private Session</span>
                </div>
                <div className="bm-dg-item">
                  <Shield size={13} />
                  <span>Bangalore Suite or Pan-India Video</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bm-dossier-actions">
                <Link
                  href={`/book?service=${activeItem.startingServiceSlug}`}
                  className="bm-btn-dossier-primary"
                >
                  <span>{activeItem.actionLabel}</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href="/book?service=initial-assessment"
                  className="bm-btn-dossier-secondary"
                >
                  <Compass size={14} />
                  <span>Or Request 15m Orientation (Free)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
