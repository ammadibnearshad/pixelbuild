'use client';

import { Fragment, useRef } from 'react';
import { marqueeItems } from '@/lib/content';
import { usePrefersReducedMotion, useRafScroll } from '@/lib/hooks';
import styles from './Marquee.module.css';

function Run({ hidden = false }) {
  return (
    <span className={styles.run} aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <Fragment key={item}>
          <span className={styles.item}>{item}</span>
          <span aria-hidden="true" className={styles.spark}>
            ✦
          </span>
        </Fragment>
      ))}
    </span>
  );
}

/**
 * Infinite CSS marquee. The track holds two identical runs and translates
 * 0 → -50%, so the seam is never visible.
 *
 * The band also leans with scroll velocity — a small skew and horizontal
 * offset that make the strip feel physically dragged rather than looping
 * independently of the page.
 *
 * `speed` is the full-loop duration in seconds (prototype default: 26).
 */
export default function Marquee({ speed = 26 }) {
  const leanRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useRafScroll(({ velocity }) => {
    const node = leanRef.current;
    if (!node) return;
    const clamped = Math.max(-3, Math.min(3, velocity));
    node.style.transform = `skewX(${clamped * -1.1}deg) translateX(${clamped * -6}px)`;
  }, !reduced);

  return (
    <div className={styles.band}>
      <div ref={leanRef} className={styles.lean}>
        <div className={styles.track} style={{ '--marquee-duration': `${speed}s` }}>
          <Run />
          <Run hidden />
        </div>
      </div>
    </div>
  );
}
