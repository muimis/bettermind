'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SENTENCE_REPLIES, SentenceReplyItem } from '@/content/sentences';
import { ArrowRight, Compass, Shield, CheckCircle2 } from '@/components/icons';

export default function SentenceReply() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const router = useRouter();
  const radioRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedItem: SentenceReplyItem = SENTENCE_REPLIES[selectedIdx];

  // Handle arrow key navigation across the radio group (WCAG 2.1 AA Radiogroup)
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

  const handleBookService = (slug: string) => {
    router.push(`/book?service=${slug}`);
  };

  return (
    <section className="bm-sentence-section" aria-labelledby="sentence-heading">
      <div className="container">
        <div className="bm-sentence-header">
          <span className="bm-label-mono" style={{ color: 'var(--color-mind)' }}>
            Sentence-Led Navigator
          </span>
          <h2 id="sentence-heading" className="bm-sentence-title">
            Pick what is feeling <span className="bm-voice-visitor bm-title-highlight">heaviest right now.</span>
          </h2>
          <p className="bm-sentence-intro">
            You don’t have to know what service you need. Select the sentence that resonates closest to your lived reality, and our clinic provides your recommended starting point.
          </p>
        </div>

        <div className="bm-sentence-grid">
          {/* Left Column: Radio Group of 9 First-Person Sentences */}
          <div
            className="bm-sentence-list"
            role="radiogroup"
            aria-label="What are you carrying right now?"
            aria-describedby="sentence-disclaimer"
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
                  aria-controls={`reply-panel-${item.id}`}
                  onClick={() => setSelectedIdx(idx)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                  className={`bm-sentence-tile ${isSelected ? 'selected' : ''}`}
                >
                  <div className="bm-sentence-radio-indicator" aria-hidden="true">
                    <span className="bm-indicator-dot" />
                  </div>
                  <span className="bm-sentence-text bm-voice-visitor">
                    "{item.sentence}"
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Clinic's Live Responsive Reply Panel */}
          <div className="bm-reply-column">
            <div
              key={selectedItem.id}
              id={`reply-panel-${selectedItem.id}`}
              className="bm-reply-card bm-reply-animate"
              role="region"
              aria-live="polite"
              aria-label="Clinic suggestion"
            >
              <div className="bm-reply-top-meta">
                <span className="bm-label-mono bm-service-badge">
                  Recommended Starting Service
                </span>
                <span className="bm-label-mono bm-assigned-badge">
                  Clinician Assigned at Confirmation
                </span>
              </div>

              <h3 className="bm-reply-service-title bm-voice-clinic">
                {selectedItem.startingServiceName}
              </h3>

              <p className="bm-reply-text bm-voice-clinic">
                {selectedItem.replyParagraph}
              </p>

              {/* Optional Clinical Safety Note */}
              {selectedItem.medicalNote && (
                <div className="bm-reply-medical-note">
                  <Shield size={14} className="bm-note-icon" />
                  <span>{selectedItem.medicalNote}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="bm-reply-actions">
                <button
                  type="button"
                  onClick={() => handleBookService(selectedItem.startingServiceSlug)}
                  className="bm-btn-book-this"
                >
                  <span>Book this consultation</span>
                  <ArrowRight size={16} />
                </button>

                {selectedItem.showTalkFirst && (
                  <Link
                    href="/book?service=initial-assessment"
                    className="bm-btn-talk-first"
                    title="Speak with our care coordinator first"
                  >
                    <Compass size={16} />
                    <span>Talk to someone first (₹0)</span>
                  </Link>
                )}
              </div>

              <div className="bm-reply-trust-footer">
                <CheckCircle2 size={14} />
                <span>NMC & RCI Accredited · Database Enforced Zero Overlap</span>
              </div>
            </div>

            <p id="sentence-disclaimer" className="bm-sentence-disclaimer">
              * The reply above is a clinical navigation recommendation for where to begin your care plan. It does not constitute a medical diagnosis. No personal data typed is stored or analyzed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
