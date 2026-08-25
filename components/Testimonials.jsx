'use client';

import { useRef, useState } from 'react';
import { testimonials } from '@/lib/content';
import Placeholder from './Placeholder';
import Reveal, { RevealGroup } from './Reveal';
import SplitWords from './SplitWords';
import { Container, Eyebrow } from './ui';
import styles from './Testimonials.module.css';

const SWIPE_THRESHOLD = 45;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const dragStart = useRef(null);
  const count = testimonials.length;

  const go = (delta) => setIndex((current) => (current + delta + count) % count);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  const onPointerDown = (event) => {
    dragStart.current = event.clientX;
  };

  const onPointerUp = (event) => {
    if (dragStart.current === null) return;
    const travelled = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(travelled) > SWIPE_THRESHOLD) go(travelled < 0 ? 1 : -1);
  };

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <Container className={styles.inner}>
        <RevealGroup className={styles.header} step={90}>
          <Eyebrow>Kind words</Eyebrow>
          <SplitWords
            id="testimonials-heading"
            className={styles.heading}
            text="What merchants say after launch"
          />
        </RevealGroup>

        <Reveal
          className={styles.viewport}
          variant="scale"
          role="region"
          aria-roledescription="carousel"
          aria-label="Merchant testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragStart.current = null;
          }}
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${index * 100}%)` }}
            aria-live="polite"
          >
            {testimonials.map((item, i) => (
              <div
                key={item.id}
                className={styles.slide}
                data-active={i === index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                inert={i !== index}
              >
                <figure className={styles.card}>
                  <div className={styles.stars} aria-label="Rated 5 out of 5">
                    <span aria-hidden="true">★★★★★</span>
                  </div>
                  <blockquote className={styles.quote}>{item.quote}</blockquote>
                  <figcaption className={styles.author}>
                    <div className={styles.avatar}>
                      <Placeholder shape="circle" label={item.name} sizes="46px" />
                    </div>
                    <div>
                      <div className={styles.name}>{item.name}</div>
                      <div className={styles.role}>{item.role}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </Reveal>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.prev}
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className={styles.dots}>
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={styles.dot}
                data-active={i === index}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.next}
            onClick={() => go(1)}
            aria-label="Next testimonial"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </Container>
    </section>
  );
}
