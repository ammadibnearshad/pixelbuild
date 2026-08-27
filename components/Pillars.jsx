'use client';

import { useRef } from 'react';
import { pillars } from '@/lib/content';
import { useActiveSection, usePrefersReducedMotion, useRafScroll } from '@/lib/hooks';
import { RevealGroup } from './Reveal';
import SplitWords from './SplitWords';
import { Container, Eyebrow } from './ui';
import styles from './Pillars.module.css';

/** Stroke icons, 24px box, `currentColor` so the tile owns the colour. */
const ICONS = {
  badge: (
    <>
      <circle cx="12" cy="9.2" r="6.2" />
      <path d="m9.2 9.2 2 2 3.6-3.8" />
      <path d="M8.4 14.6 7 21.4l5-2.5 5 2.5-1.4-6.8" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.4v2.5M12 18.1v2.5M20.6 12h-2.5M5.9 12H3.4M18.08 5.92l-1.77 1.77M7.69 16.31l-1.77 1.77M18.08 18.08l-1.77-1.77M7.69 7.69 5.92 5.92" />
    </>
  ),
  clock: (
    <>
      <path d="M9.6 2.6h4.8M12 2.6v2.3" />
      <circle cx="12" cy="13" r="8.2" />
      <path d="m8.6 13 2.3 2.3 4.5-4.6" />
    </>
  ),
};

/**
 * Three pillars on a vertical rail.
 *
 * Two independent bits of scroll wiring, both cheap:
 *   - the rail draws itself via a `--rail` custom property written from rAF,
 *     so filling it never re-renders React;
 *   - whichever pillar crosses the middle of the viewport becomes active,
 *     which is a real state change but only fires on the handful of crossings.
 * A fine pointer hovering a pillar previews the same emphasis without stealing
 * the scroll-driven active state.
 */
export default function Pillars() {
  const listRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const active = useActiveSection(pillars.map((pillar) => `pillar-${pillar.id}`));

  // Draw the rail between three-quarters up the viewport and the list's end.
  // Bails out entirely once the list is off-screen.
  useRafScroll(() => {
    const el = listRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const viewport = window.innerHeight;
    if (box.bottom < -200 || box.top > viewport + 200) return;
    const progress = (viewport * 0.72 - box.top) / box.height;
    el.style.setProperty('--rail', String(Math.min(1, Math.max(0, progress))));
  }, !reduced);

  return (
    <section className={styles.section} aria-labelledby="pillars-heading">
      <Container className={styles.layout}>
        <RevealGroup className={styles.aside} step={90}>
          <Eyebrow>Why us</Eyebrow>
          <SplitWords
            id="pillars-heading"
            className={styles.heading}
            text="Why merchants stay after the first project"
          />
          <p className={styles.lead}>
            Most agencies go quiet at launch. The reasons people keep working with us are
            the unglamorous ones — the same faces, visible work, dates that hold.
          </p>
        </RevealGroup>

        {/* The rail owns `--rail` and the decorative line; the list inside stays a
            clean <ul> so RevealGroup keeps its own observer ref and nth-child cascade. */}
        <div ref={listRef} className={styles.rail}>
          <span className={styles.track} aria-hidden="true" />
          <span className={styles.fill} aria-hidden="true" />
          <span className={styles.head} aria-hidden="true" />

          <RevealGroup as="ul" className={styles.list} step={110}>
            {pillars.map((pillar, i) => (
              <li
                key={pillar.id}
                id={`pillar-${pillar.id}`}
                className={styles.item}
                data-active={active === `pillar-${pillar.id}`}
              >
                <span className={styles.tile} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[pillar.icon]}
                  </svg>
                </span>

                <div className={styles.copy}>
                  <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.title}>{pillar.title}</h3>
                  <p className={styles.body}>{pillar.body}</p>
                </div>
              </li>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
