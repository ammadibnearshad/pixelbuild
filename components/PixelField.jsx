'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion, useRafScroll } from '@/lib/hooks';
import styles from './PixelField.module.css';

/**
 * Deterministic pseudo-random in [0, 1).
 *
 * Positions must be identical on the server and the client, so this is seeded
 * by index rather than using Math.random() — which would hydrate mismatched.
 */
function seeded(n) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

/**
 * Three depth layers. Faster `rate` reads as nearer the viewer, so those
 * squares are also larger and a touch brighter.
 */
const LAYERS = [
  { rate: 0.08, count: 16, min: 4, max: 8, seed: 11 },
  { rate: 0.19, count: 12, min: 6, max: 12, seed: 47 },
  { rate: 0.34, count: 9, min: 10, max: 18, seed: 83 },
].map((layer) => ({
  ...layer,
  pixels: Array.from({ length: layer.count }, (_, i) => {
    const s = layer.seed + i * 7.3;
    const [a, b, c, d] = [seeded(s), seeded(s + 1.7), seeded(s + 3.1), seeded(s + 5.9)];
    return {
      left: +(a * 96 + 2).toFixed(3),
      top: +(b * 96 + 2).toFixed(3),
      size: Math.round(layer.min + c * (layer.max - layer.min)),
      lime: d > 0.62,
      duration: +(8 + c * 9).toFixed(2),
      delay: +(-d * 12).toFixed(2),
    };
  }),
}));

function Tile({ pixels }) {
  return (
    <div className={styles.tile}>
      {pixels.map((pixel, i) => (
        <span
          key={i}
          className={styles.pixel}
          data-lime={pixel.lime}
          style={{
            left: `${pixel.left}%`,
            top: `${pixel.top}%`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            animationDuration: `${pixel.duration}s`,
            animationDelay: `${pixel.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Ambient pixel background for the whole page.
 *
 * A faint pixel grid plus three parallax layers of low-opacity squares, all
 * behind the content and inert to the pointer. Each layer renders its square
 * set twice, stacked one viewport apart, and scrolls by `offset % viewport` —
 * so the field loops forever with no visible seam and no growing DOM.
 *
 * The grid also lights up around the cursor: a second, brighter copy of the
 * same grid masked to a circle that follows the pointer.
 */
export default function PixelField() {
  const rootRef = useRef(null);
  const layerRefs = useRef([]);
  const reduced = usePrefersReducedMotion();

  useRafScroll(({ y }) => {
    const period = window.innerHeight || 1;
    LAYERS.forEach((layer, i) => {
      const node = layerRefs.current[i];
      if (!node) return;
      node.style.transform = `translate3d(0, ${-((y * layer.rate) % period)}px, 0)`;
    });
  }, !reduced);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;

    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${event.clientX}px`);
        root.style.setProperty('--my', `${event.clientY}px`);
        root.dataset.lit = 'true';
      });
    };

    const onLeave = () => {
      root.dataset.lit = 'false';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.field} data-lit="false" aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.gridLit} />

      {LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(node) => {
            layerRefs.current[i] = node;
          }}
          className={styles.layer}
          data-depth={i}
        >
          <Tile pixels={layer.pixels} />
          <Tile pixels={layer.pixels} />
        </div>
      ))}
    </div>
  );
}
