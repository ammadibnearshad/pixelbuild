'use client';

import { useEffect, useState } from 'react';
import { stats } from '@/lib/content';
import { usePrefersReducedMotion, useInView } from '@/lib/hooks';
import { RevealGroup } from './Reveal';
import { Container } from './ui';
import styles from './Stats.module.css';

/** Counts 0 → value over 1500ms with an ease-out-cubic curve, once. */
function Counter({ value, prefix = '', suffix = '', accent }) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ enabled: !reduced });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame;
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return (
    <div ref={ref} className={styles.value} data-accent={accent ? 'true' : 'false'}>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className={styles.srOnly}>{`${prefix}${value}${suffix}`}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className={styles.section} aria-label="By the numbers">
      <Container as={RevealGroup} className={styles.grid} step={100}>
        {stats.map((stat) => (
          <div key={stat.label}>
            <Counter
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              accent={stat.accent}
            />
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </Container>
    </section>
  );
}
