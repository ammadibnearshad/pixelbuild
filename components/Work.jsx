'use client';

import { useEffect, useRef, useState } from 'react';
import { work, workFilters } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/hooks';
import Placeholder from './Placeholder';
import { RevealGroup } from './Reveal';
import SplitWords from './SplitWords';
import { Container, Eyebrow } from './ui';
import styles from './Work.module.css';

const EXIT_MS = 240;

/** Radial highlight that tracks the pointer across a card. */
function onCardPointerMove(event) {
  const card = event.currentTarget;
  const box = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${event.clientX - box.left}px`);
  card.style.setProperty('--my', `${event.clientY - box.top}px`);
}

export default function Work() {
  const [filter, setFilter] = useState('all');
  const [rendered, setRendered] = useState('all');
  const [exiting, setExiting] = useState(false);
  const timer = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => () => clearTimeout(timer.current), []);

  const changeFilter = (id) => {
    if (id === filter) return;
    setFilter(id);

    if (reduced) {
      setRendered(id);
      return;
    }

    // Fade the grid out, swap the cards, then let them cascade back in.
    setExiting(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setRendered(id);
      setExiting(false);
    }, EXIT_MS);
  };

  const visible = work.filter((item) => rendered === 'all' || item.category === rendered);

  return (
    <section id="work" className={styles.section}>
      <Container>
        <RevealGroup className={styles.header} step={100}>
          <div className={styles.headerCopy}>
            <Eyebrow>Selected work</Eyebrow>
            <SplitWords
              className={styles.heading}
              text="Stores we’ve shipped, and what changed after"
            />
          </div>

          <div className={styles.tabs} role="group" aria-label="Filter work by discipline">
            {workFilters.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={styles.tab}
                aria-pressed={filter === tab.id}
                onClick={() => changeFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </RevealGroup>

        {/* The shell carries the exit fade so it never fights the cascade
            that RevealGroup runs on the cards themselves. */}
        <div className={styles.gridShell} data-exiting={exiting}>
          <RevealGroup key={rendered} className={styles.grid} variant="scale" step={80}>
            {visible.map((item) => (
              <article key={item.id}>
                <a
                  href="#contact"
                  className={styles.card}
                  onPointerMove={reduced ? undefined : onCardPointerMove}
                >
                  <span className={styles.spotlight} aria-hidden="true" />
                  <div className={styles.thumb}>
                    <Placeholder
                      label={item.imageAlt}
                      sizes="(max-width: 700px) 100vw, (max-width: 1240px) 50vw, 400px"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.tag}>{item.tag}</div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.result}>{item.result}</p>
                    <span className={styles.cardCta} aria-hidden="true">
                      Start a project <span className={styles.cardArrow}>→</span>
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
