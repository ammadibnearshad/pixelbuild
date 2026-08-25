import styles from './PlusMark.module.css';

/**
 * A plus that rotates into a cross. Two bars, not a glyph swap, so open/close
 * is a continuous 135° spin rather than a character popping in and out.
 * State is conveyed by shape, not colour.
 */
export default function PlusMark({ open, className }) {
  return (
    <span
      className={[styles.mark, className].filter(Boolean).join(' ')}
      data-open={open}
      aria-hidden="true"
    >
      <span />
      <span />
    </span>
  );
}
