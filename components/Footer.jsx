import { footerColumns } from '@/lib/content';
import Reveal, { RevealGroup } from './Reveal';
import { Container } from './ui';
import styles from './Footer.module.css';

export default function Footer({ className }) {
  return (
    <footer className={[styles.footer, className].filter(Boolean).join(' ')}>
      <Container>
        <RevealGroup className={styles.grid} step={75}>
          <div>
            <div className={styles.wordmark}>The Pixel Build</div>
            <p className={styles.descriptor}>
              Ecommerce technical partners for ambitious Shopify brands.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} className={styles.column} aria-label={column.heading}>
              <h2 className={styles.columnHeading}>{column.heading}</h2>
              {column.links.map((link) => (
                <a key={link.label} href={link.href} className={styles.link}>
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </RevealGroup>

        <Reveal className={styles.legal} variant="fade">
          <span>&copy; 2026 The Pixel Build. All rights reserved.</span>
          <span>Shopify Plus Partner</span>
        </Reveal>
      </Container>
    </footer>
  );
}
