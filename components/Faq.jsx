'use client';

import { useId, useState } from 'react';
import { faqs } from '@/lib/content';
import Collapse from './Collapse';
import PlusMark from './PlusMark';
import { RevealGroup } from './Reveal';
import SplitWords from './SplitWords';
import { Container, Eyebrow } from './ui';
import styles from './Faq.module.css';

/** Single-open accordion, independent of the services group. First row opens on load. */
export default function Faq() {
  const [open, setOpen] = useState(faqs[0].id);
  const uid = useId();

  return (
    <section id="faq" className={styles.section}>
      <Container className={styles.grid}>
        <RevealGroup step={80}>
          <Eyebrow>FAQ</Eyebrow>
          <SplitWords className={styles.heading} text="Questions we get asked most weeks" />
          <p className={styles.support}>
            Something else on your mind? Ask us on the call — no pitch deck, just a
            conversation about your store.
          </p>
          <a href="#contact" className={styles.link}>
            Book a discovery call{' '}
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </a>
        </RevealGroup>

        <RevealGroup className={styles.list} step={65}>
          {faqs.map((item) => {
            const isOpen = open === item.id;
            const panelId = `${uid}-${item.id}-panel`;
            const buttonId = `${uid}-${item.id}-button`;

            return (
              <div key={item.id} className={styles.row} data-open={isOpen}>
                <h3 className={styles.rowHeading}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                  >
                    <span className={styles.question}>{item.question}</span>
                    <PlusMark className={styles.marker} open={isOpen} />
                  </button>
                </h3>

                <Collapse
                  open={isOpen}
                  id={panelId}
                  labelledBy={buttonId}
                  className={styles.answer}
                >
                  {item.answer}
                </Collapse>
              </div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
