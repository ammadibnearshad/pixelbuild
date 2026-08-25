import { clientLogos } from '@/lib/content';
import Reveal, { RevealGroup } from './Reveal';
import { Container } from './ui';
import styles from './ClientLogos.module.css';

/**
 * Text wordmarks standing in for real client logos.
 * Replace each cell with an inline SVG logo before launch.
 */
export default function ClientLogos() {
  return (
    <section className={styles.section} aria-labelledby="clients-label">
      <Container>
        <Reveal id="clients-label" className={styles.label} variant="fade">
          Brands we look after
        </Reveal>

        <RevealGroup as="ul" className={styles.grid} variant="fade" step={80}>
          {clientLogos.map((name) => (
            <li key={name} className={styles.cell}>
              {name}
            </li>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
