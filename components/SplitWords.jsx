'use client';

import { Fragment } from 'react';
import { usePrefersReducedMotion, useInView } from '@/lib/hooks';
import styles from './SplitWords.module.css';

/**
 * Heading that rises into place one word at a time from behind a mask.
 *
 * `text` must be a plain string — each word becomes an inline-block, so
 * wrapping and line breaks match the unsplit heading exactly. Screen readers
 * get the whole string from aria-label and skip the per-word spans.
 */
export default function SplitWords({
  as: Tag = 'h2',
  text,
  step = 45,
  className,
  style,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ enabled: !reduced });
  const shown = reduced || inView;
  const words = text.split(' ');

  return (
    <Tag
      ref={ref}
      className={[styles.split, className].filter(Boolean).join(' ')}
      data-shown={shown}
      style={{ '--word-step': `${step}ms`, ...style }}
      aria-label={text}
      {...rest}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className={styles.mask} aria-hidden="true">
            <span className={styles.word} style={{ '--i': i }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
