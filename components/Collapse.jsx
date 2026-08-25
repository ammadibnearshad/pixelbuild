'use client';

import styles from './Collapse.module.css';

/**
 * Smoothly expands and collapses to fit its content.
 *
 * Uses the `grid-template-rows: 0fr → 1fr` transition, so there is no
 * scrollHeight measurement and content of any height animates correctly.
 * The panel stays mounted (that is what makes the collapse animate) and is
 * marked `inert` while closed, which removes it from the a11y tree and the
 * tab order just as `hidden` would.
 */
export default function Collapse({ open, id, labelledBy, className, children }) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      className={styles.collapse}
      data-open={open}
      inert={!open}
    >
      <div className={styles.clip}>
        <div className={[styles.inner, className].filter(Boolean).join(' ')}>{children}</div>
      </div>
    </div>
  );
}
