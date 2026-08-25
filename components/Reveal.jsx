'use client';

import { usePrefersReducedMotion, useInView } from '@/lib/hooks';
import styles from './Reveal.module.css';

const cx = (...values) => values.filter(Boolean).join(' ');

/** Delay is capped so a long list never trails far behind the viewport. */
const MAX_STEPS = 8;

/**
 * Reveals a single element when it scrolls into view.
 *
 * variant — how it arrives:
 *   'up'      28px rise (default; section-level blocks)
 *   'up-sm'   14px rise (items inside a cascade)
 *   'fade'    opacity only
 *   'scale'   settles from 97% — for media and cards
 *   'left' / 'right'  24px slide
 *
 * stagger — index within a hand-ordered sequence; delay = stagger * step.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  stagger = 0,
  step = 70,
  className,
  style,
  children,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ enabled: !reduced });
  const shown = reduced || inView;

  return (
    <Tag
      ref={ref}
      className={cx(styles.reveal, className)}
      data-shown={shown}
      data-variant={variant}
      style={{ '--reveal-delay': `${Math.min(stagger, MAX_STEPS) * step}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Cascades its direct children when the group scrolls into view.
 *
 * One observer for the whole group, so the run reads as a single gesture
 * instead of each item firing at its own scroll position. Children need no
 * props — the delay comes from :nth-child.
 */
export function RevealGroup({
  as: Tag = 'div',
  variant = 'up-sm',
  step = 70,
  className,
  style,
  children,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ enabled: !reduced });
  const shown = reduced || inView;

  return (
    <Tag
      ref={ref}
      className={cx(styles.group, className)}
      data-shown={shown}
      data-variant={variant}
      style={{ '--reveal-step': `${step}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
