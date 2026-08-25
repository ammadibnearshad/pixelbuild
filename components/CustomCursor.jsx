'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';
import styles from './CustomCursor.module.css';

/**
 * Solid lime cursor that replaces the native pointer.
 *
 * The native cursor is only hidden once this actually mounts — fine pointer,
 * wider than 900px, motion allowed — so touch, coarse-pointer and
 * reduced-motion visitors keep the system cursor. If JS never runs, the
 * attribute is never set and the native cursor stays: failing safe by default.
 *
 * Modes: `default` dot, `active` over anything clickable, `text` over fields
 * (the native I-beam is gone, so the affordance has to come from here).
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [active, setActive] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setActive(false);
      return;
    }

    // Re-evaluated on resize: dropping below 900px must hand the native
    // cursor back, or a narrowed window ends up with no cursor at all.
    const mq = window.matchMedia('(pointer: fine) and (min-width: 901px)');

    const sync = () => {
      setActive(mq.matches);
      if (mq.matches) {
        document.documentElement.dataset.customCursor = 'true';
      } else {
        delete document.documentElement.dataset.customCursor;
      }
    };

    sync();
    mq.addEventListener('change', sync);

    return () => {
      mq.removeEventListener('change', sync);
      delete document.documentElement.dataset.customCursor;
    };
  }, [reduced]);

  useEffect(() => {
    if (!active) return;
    const node = cursorRef.current;
    if (!node) return;

    const onMove = (event) => {
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      node.dataset.visible = 'true';

      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) {
        node.dataset.mode = 'text';
      } else if (target?.closest('a, button, [data-magnet], [role="button"]')) {
        node.dataset.mode = 'active';
      } else {
        node.dataset.mode = 'default';
      }
    };

    const hide = () => {
      node.dataset.visible = 'false';
    };
    const press = () => {
      node.dataset.pressed = 'true';
    };
    const release = () => {
      node.dataset.pressed = 'false';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);
    window.addEventListener('mousedown', press);
    window.addEventListener('mouseup', release);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('mousedown', press);
      window.removeEventListener('mouseup', release);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={cursorRef}
      className={styles.cursor}
      data-mode="default"
      data-visible="false"
      data-pressed="false"
      aria-hidden="true"
    >
      <span className={styles.shape} />
    </div>
  );
}
