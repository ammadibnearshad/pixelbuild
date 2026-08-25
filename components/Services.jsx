'use client';

import { useId, useState } from 'react';
import { services } from '@/lib/content';
import Collapse from './Collapse';
import PlusMark from './PlusMark';
import { RevealGroup } from './Reveal';
import SplitWords from './SplitWords';
import { Container, Eyebrow } from './ui';
import styles from './Services.module.css';

/** Single-open accordion. Clicking the open row closes it. Item 01 opens on load. */
export default function Services() {
  const [open, setOpen] = useState(services[0].id);
  const uid = useId();

  return (
    <section id="services" className={styles.section}>
      <Container>
        <RevealGroup className={styles.header} step={90}>
          <Eyebrow>What we do</Eyebrow>
          <SplitWords
            className={styles.heading}
            text="Everything technical about your Shopify store, handled"
          />
        </RevealGroup>

        <RevealGroup className={styles.list} step={65}>
          {services.map((service, i) => {
            const isOpen = open === service.id;
            const panelId = `${uid}-${service.id}-panel`;
            const buttonId = `${uid}-${service.id}-button`;

            return (
              <div key={service.id} className={styles.item} data-open={isOpen}>
                <h3 className={styles.itemHeading}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : service.id)}
                  >
                    <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.title}>{service.title}</span>
                    <span className={styles.marker}>
                      <PlusMark open={isOpen} />
                    </span>
                  </button>
                </h3>

                <Collapse open={isOpen} id={panelId} labelledBy={buttonId} className={styles.body}>
                  {service.body}
                </Collapse>
              </div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
