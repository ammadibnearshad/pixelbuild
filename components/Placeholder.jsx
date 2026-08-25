import Image from 'next/image';
import styles from './Placeholder.module.css';

/**
 * Drop-in image slot.
 *
 * With no `src` it renders an on-brand placeholder well. Pass a `src` (a file in
 * /public, or a static import) and it becomes a real optimised next/image —
 * that is the whole swap, no other markup changes.
 *
 * The parent element owns the aspect ratio, radius and overflow clipping.
 */
export default function Placeholder({
  src,
  alt = '',
  label,
  shape = 'rect',
  priority = false,
  sizes = '100vw',
}) {
  if (src) {
    return (
      <div className={styles.frame}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.image}
        />
      </div>
    );
  }

  return (
    <div
      className={styles.frame}
      data-shape={shape}
      role="img"
      aria-label={label ? `Image placeholder: ${label}` : 'Image placeholder'}
    >
      <div className={styles.hatch} aria-hidden="true" />
      <div className={styles.body} aria-hidden="true">
        <span className={styles.mark}>
          <span />
          <span />
          <span />
          <span />
        </span>
        {shape === 'rect' && label ? <span className={styles.label}>{label}</span> : null}
      </div>
    </div>
  );
}
