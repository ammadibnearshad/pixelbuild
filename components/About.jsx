import { credentials } from '@/lib/content';
import Placeholder from './Placeholder';
import { RevealGroup } from './Reveal';
import SplitWords from './SplitWords';
import { Container, Eyebrow } from './ui';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <RevealGroup step={80}>
            <Eyebrow>About us</Eyebrow>
            <SplitWords
              className={styles.heading}
              text="A small team that treats your store like our own"
            />
            <p className={styles.body}>
              We started The Pixel Build because merchants kept getting handed pretty themes
              nobody had tested. So we do both halves: the craft and the numbers. Every build
              ships with analytics wired up, a testing roadmap, and someone you can message
              directly.
            </p>
            <p className={styles.body}>
              Nine years in, we&rsquo;ve launched, migrated and rescued more than 200 Shopify and
              Shopify Plus stores across fashion, beauty, supplements and home.
            </p>
            <ul className={styles.pills}>
              {credentials.map((item) => (
                <li
                  key={item.label}
                  className={styles.pill}
                  data-accent={item.accent ? 'true' : 'false'}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </RevealGroup>

          <RevealGroup className={styles.mosaic} variant="scale" step={110}>
            <div className={styles.tall}>
              <Placeholder
                src="/images/about-team.webp"
                alt="Three members of The Pixel Build team reviewing a Shopify storefront on a monitor"
                sizes="(max-width: 900px) 50vw, 300px"
              />
            </div>
            <div className={styles.stack}>
              <div className={styles.square}>
                <Placeholder
                  src="/images/about-studio.webp"
                  alt="Laptop showing a store wireframe beside a notebook of hand-drawn page layouts"
                  sizes="(max-width: 900px) 50vw, 300px"
                />
              </div>
              <div className={styles.statTile}>
                <div className={styles.statValue}>
                  9<span className={styles.statUnit}>yrs</span>
                </div>
                <div className={styles.statLabel}>building on Shopify, only Shopify</div>
              </div>
            </div>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
