import Reveal from './Reveal';
import Logo from './Logo';
import { Container } from './ui';
import styles from './Footer.module.css';

export default function Footer({ className }) {
  return (
    <footer className={[styles.footer, className].filter(Boolean).join(' ')}>
      <Container>
        <Reveal className={styles.brand}>
          <a href="#top" className={styles.logoLink} aria-label="The Pixel Build — back to top">
            <Logo decorative />
          </a>
          <p className={styles.descriptor}>
            Ecommerce technical partners for ambitious Shopify brands.
          </p>
        </Reveal>

        <Reveal className={styles.legal} variant="fade">
          <span>&copy; 2026 The Pixel Build. All rights reserved.</span>
          <span>Shopify Plus Partner</span>
        </Reveal>
      </Container>
    </footer>
  );
}
