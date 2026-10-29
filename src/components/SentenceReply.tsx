'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SENTENCE_REPLIES, SentenceReplyItem } from '@/content/sentences';
import { ArrowRight, Compass, CheckCircle2, ChevronDown, Clock, ShieldCheck } from '@/components/icons';

export default function SentenceReply() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const router = useRouter();
  const radioRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedItem: SentenceReplyItem = SENTENCE_REPLIES[selectedIdx];

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
    <section className="bm-sentence-section" id="thoughts" aria-labelledby="sentence-heading">
      <div className="container">
        <div className="bm-sentence-header">
          <span className="bm-label-mono" style={{ color: 'var(--color-mind)' }}>
            Gentle Starting Points
          </span>
          <h2 id="sentence-heading" className="bm-sentence-title">
            What is on your <span className="bm-voice-visitor bm-title-highlight">mind today?</span>
          </h2>
          <p className="bm-sentence-intro">
            No need to prepare an agenda or have your thoughts in order. Tap whatever resonates right now to see where we can comfortably begin.
          </p>
        </div>

        <div className="bm-sentence-grid">
          {/* Left Column (or Mobile Accordion Stack) */}
          <div
            className="bm-sentence-list"
            role="radiogroup"
            aria-label="What brings you here today?"
          >
            {SENTENCE_REPLIES.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <div key={item.id} className="bm-sentence-wrapper">
                  <div
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
                    <ChevronDown size={16} className={`bm-mobile-chevron ${isSelected ? 'open' : ''}`} />
                  </div>

                  {/* Mobile-Only Inline Expansion (Right under the thumb) */}
                  {isSelected && (
                    <div className="bm-mobile-inline-reply">
                      <div className="bm-mobile-reply-badge-row">
                        <span className="bm-label-mono bm-service-badge">
                          Recommended
                        </span>
                        <span className="bm-label-mono bm-assigned-badge">
                          {item.duration} · {item.fee}
                        </span>
                      </div>

                      <h3 className="bm-mobile-service-title bm-voice-clinic">
                        {item.startingServiceName}
                      </h3>

                      <p className="bm-mobile-reply-text bm-voice-clinic">
                        {item.replyParagraph}
                      </p>

                      <div className="bm-mobile-reply-actions">
                        <button
                          type="button"
                          onClick={() => handleBookService(item.startingServiceSlug)}
                          className="bm-btn-book-this"
                        >
                          <span>Reserve this session</span>
                          <ArrowRight size={15} />
                        </button>

                        {item.showTalkFirst && (
                          <Link
                            href="/book?service=initial-assessment"
                            className="bm-btn-talk-first"
                          >
                            <Compass size={15} />
                            <span>Free 15m chat first</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Desktop Reply Panel */}
          <div className="bm-reply-column">
            <div
              key={selectedItem.id}
              id={`reply-panel-${selectedItem.id}`}
              className="bm-reply-card bm-reply-animate"
              role="region"
              aria-live="polite"
              aria-label="Suggested starting point"
            >
              <div className="bm-reply-top-meta">
                <span className="bm-label-mono bm-service-badge">
                  Recommended Starting Point
                </span>
                <span className="bm-label-mono bm-assigned-badge">
                  {selectedItem.duration} · {selectedItem.fee}
                </span>
              </div>

              <h3 className="bm-reply-service-title bm-voice-clinic">
                {selectedItem.startingServiceName}
              </h3>

              <p className="bm-reply-text bm-voice-clinic">
                {selectedItem.replyParagraph}
              </p>

              {/* Action Buttons */}
              <div className="bm-reply-actions">
                <button
                  type="button"
                  onClick={() => handleBookService(selectedItem.startingServiceSlug)}
                  className="bm-btn-book-this"
                >
                  <span>Reserve this session ({selectedItem.fee})</span>
                  <ArrowRight size={16} />
                </button>

                {selectedItem.showTalkFirst && (
                  <Link
                    href="/book?service=initial-assessment"
                    className="bm-btn-talk-first"
                    title="Speak with our care coordinator first"
                  >
                    <Compass size={16} />
                    <span>Talk with Ananya first (Free)</span>
                  </Link>
                )}
              </div>

              <div className="bm-reply-trust-footer">
                <CheckCircle2 size={15} />
                <span>Private 1-on-1 · Video across India or quiet metro suites · 100% confidential</span>
              </div>
            </div>

            <p className="bm-sentence-disclaimer">
              You are always in control of your journey. You can change your focus or switch specialists anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
