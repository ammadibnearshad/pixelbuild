'use client';

import { processSteps } from '@/lib/content';
import { RevealGroup } from './Reveal';
import SplitWords from './SplitWords';
import { Container, Eyebrow } from './ui';
import styles from './Process.module.css';

/**
 * Curved connector between two steps. Fixed 92×54 box so the arrowhead never
 * skews — it is positioned by the grid rather than stretched to fit. The head
 * is part of the path, so the dash-offset draw carries it along instead of
 * popping in early the way an SVG marker would.
 */
function Arrow() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 92 54"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path className={styles.arrowPath} d="M3 9c22 0 44 12 62 30m0 0-14 1.5M65 39l-4-13.5" />
    </svg>
  );
}

/**
 * Four steps on a descending stagger, connected by arrows that draw themselves
 * once when the row arrives. The draw is a dash-offset transition keyed off
 * RevealGroup's own `data-shown`, so there is no scroll handler here — the
 * rail in <Pillars /> already owns the per-frame work on this page.
 */
export default function Process() {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-heading">
      <Container>
        <RevealGroup className={styles.header} step={90}>
          <Eyebrow>Process</Eyebrow>
          <SplitWords
            id="process-heading"
            className={styles.heading}
            text="How a project actually runs"
          />
          <p className={styles.lead}>
            No black box, no month of silence between kick-off and reveal. Four steps, and
            you can see the work at every one of them.
          </p>
        </RevealGroup>

        <RevealGroup as="ol" className={styles.steps} step={120}>
          {processSteps.map((step, i) => (
            <li key={step.id} className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                {i + 1}
              </span>

              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
              <span className={styles.meta}>{step.meta}</span>

              {i < processSteps.length - 1 ? <Arrow /> : null}
            </li>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
