import styles from './ui.module.css';

/** 1240px centred content column. Horizontal gutter lives on the section. */
export function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={[styles.container, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  );
}

/** Small uppercase label above a section heading. */
export function Eyebrow({ tone = 'accent', className, children }) {
  return (
    <div
      className={[styles.eyebrow, className].filter(Boolean).join(' ')}
      data-tone={tone}
    >
      {children}
    </div>
  );
}

