'use client';

import { useEffect, useRef } from 'react';
import styles from './ScrollProgress.module.css';

/** Fixed 3px lime bar whose width tracks scroll depth. */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? (doc.scrollTop || window.scrollY) / max : 0;
      if (barRef.current) {
        barRef.current.style.width = `${(progress * 100).toFixed(2)}%`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div ref={barRef} className={styles.bar} aria-hidden="true" />;
}
