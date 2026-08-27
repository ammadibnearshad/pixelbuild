'use client';

import { useRef } from 'react';
import { usePrefersReducedMotion, useMagnet, useRafScroll } from '@/lib/hooks';
import Placeholder from './Placeholder';
import Reveal from './Reveal';
import { Container } from './ui';
import styles from './Hero.module.css';

export default function Hero() {
  const glowRef = useRef(null);
  const mediaRef = useRef(null);
  const badgeRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const magnetRef = useMagnet({ strength: 0.3, radius: 70 });

  // Layered parallax: the glow drifts down, the frame lifts, the badge floats
  // furthest. Transform-only, rAF-throttled, and skipped past the hero.
  useRafScroll(({ y }) => {
    if (y > window.innerHeight * 1.2) return;
    if (glowRef.current) glowRef.current.style.transform = `translate3d(-50%, ${y * 0.16}px, 0)`;
    if (mediaRef.current) mediaRef.current.style.transform = `translate3d(0, ${y * -0.045}px, 0)`;
    if (badgeRef.current) badgeRef.current.style.transform = `translate3d(0, ${y * -0.11}px, 0)`;
  }, !reduced);

  return (
    <section id="top" className={styles.section}>
      <div ref={glowRef} className={styles.glow} aria-hidden="true" />

      <Container className={styles.inner}>
        <Reveal className={styles.eyebrow} variant="fade" stagger={0}>
          <span className={styles.dot} aria-hidden="true" />
          <span>Your ecommerce technical partner</span>
        </Reveal>

        <Reveal as="h1" className={styles.title} stagger={1}>
          We build Shopify stores that{' '}
          <span className={styles.highlight}>actually sell</span>
        </Reveal>

        <Reveal as="p" className={styles.lead} stagger={2}>
          Design, development, CRO, marketing and AI-assisted product listings — all under
          one roof. We look after the technical side of your store so you can spend your days
          growing the brand.
        </Reveal>

        <Reveal className={styles.ctas} stagger={3}>
          <a href="#contact" className={styles.primary} data-magnet ref={magnetRef}>
            Book a discovery call{' '}
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </a>
          {/* Restore alongside <Work /> in app/page.js */}
          {/* <a href="#work" className={styles.secondary}>
            See our work
          </a> */}
        </Reveal>

        <Reveal className={styles.mediaWrap} variant="scale" stagger={4}>
          <div ref={mediaRef} className={styles.media}>
            <Placeholder
              src="/images/hero-shopify-plus.webp"
              alt="Shopify storefront, mobile checkout and analytics dashboard designed by The Pixel Build"
              priority
              sizes="(max-width: 1240px) 100vw, 1240px"
            />

            <div className={styles.floatingStats} aria-hidden="true">
              <div className={styles.glassCard}>
                <div className={styles.glassValue}>+38%</div>
                <div className={styles.glassLabel}>Avg. conversion lift</div>
              </div>
              <div className={styles.limeCard}>
                <div className={styles.limeValue}>$41M+</div>
                <div className={styles.limeLabel}>Client GMV managed</div>
              </div>
            </div>
          </div>

          <div ref={badgeRef} className={styles.badgeAnchor} aria-hidden="true">
            <div className={styles.badge}>
              <span>
                SHOPIFY
                <br />
                PLUS
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
