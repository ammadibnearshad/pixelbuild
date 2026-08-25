import styles from './Logo.module.css';

/**
 * The Pixel Build logo — the full horizontal lockup.
 *
 * Inlined rather than loaded from /public/logo.svg so it costs no extra
 * request in the header and can take its colour from context: the white paths
 * become `currentColor` and the accent squares use the `--accent` token
 * instead of the hardcoded hex the source file ships with.
 *
 * The raw file stays at /public/logo.svg for anything outside React —
 * metadata, OG images, or handing the asset to someone else.
 *
 * This is now the only naming of the brand in the header, so it carries a
 * `<title>` and `role="img"` by default rather than being decorative. Pass
 * `decorative` where a visible text label already names the brand.
 */
export default function Logo({ className, title = 'The Pixel Build', decorative = false }) {
  return (
    <svg
      className={[styles.logo, className].filter(Boolean).join(' ')}
      viewBox="0 0 122.84 43.62"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      focusable="false"
    >
      {decorative ? null : <title>{title}</title>}

      <g fill="currentColor">
        <path d="M49.17,8.44h7.94V.27h19V8.41h8.14V23.82h-8v8.23H58V43.14H49.17Zm8.9,14.75H75.26V9.07H58.07Z" />
        <path d="M115,.45V8.59h7.89v9.77h-7.78V25.6h7.78v9.91H115v8.11H88.2V12.26h8.69v5.3H114V9.22H100.86V.45ZM97,34.84h17.07V26.37H97Z" />
        <path d="M12.42,15.73v11.9H.3V15.73Z" />
        <path d="M45.14,15.78V27.64h-12V15.78Z" />
        <path d="M45.13,43.05h-12V31.21h12Z" />
        <path d="M.32,31.2H12.38V43H.32Z" />
      </g>

      <g className={styles.accent}>
        <path d="M88.21,9.22c-.06-2.81,0-6.28,0-9.22h9.28V9.2Z" />
        <path d="M28.22,27.68c-3.82.06-7.64,0-11.52,0V15.63c3.86,0,7.83.17,11.6.24Z" />
        <path d="M28.22,12.27c-3.82.06-7.64,0-11.52,0V.22c3.86,0,7.83.17,11.6.24Z" />
        <path d="M11.52,12.27c-3.82.06-7.63,0-11.52,0V.22c3.87,0,7.83.17,11.6.24Z" />
        <path d="M45.17.35V12.17H33.07V.35Z" />
        <path d="M16.78,43V31.31H28.64V43Z" />
      </g>
    </svg>
  );
}
