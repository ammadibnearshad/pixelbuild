'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * True when the OS asks for reduced motion. Reacts to live changes.
 * Starts `false` so server and first client render agree.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return reduced;
}

/**
 * Fires once when the element scrolls into view.
 * Mirrors the prototype's observer: threshold .05, rootMargin 0 0 -8% 0,
 * plus a 2.6s safety timeout so content is never stuck hidden.
 */
export function useInView({ enabled = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    observer.observe(el);
    const safety = setTimeout(() => setInView(true), 2600);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [enabled]);

  return [ref, inView];
}

/** True once the viewport is at or below the single 900px breakpoint. */
export function useIsCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return compact;
}

/**
 * Calls `callback({ y, velocity })` at most once per frame while scrolling.
 * Velocity is px/ms — positive scrolling down. Write to refs/styles from the
 * callback; it deliberately does not cause a re-render.
 */
export function useRafScroll(callback, enabled = true) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let queued = false;
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const tick = () => {
      queued = false;
      const y = window.scrollY;
      const now = performance.now();
      const elapsed = Math.max(1, now - lastTime);
      callbackRef.current({ y, velocity: (y - lastY) / elapsed });
      lastY = y;
      lastTime = now;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    tick();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);
}

/**
 * Scroll spy. Returns the id of whichever section currently crosses the
 * middle band of the viewport, or null above the first one.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const key = ids.join(',');

  useEffect(() => {
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

/**
 * Magnetic pull — the element drifts toward the cursor while it is nearby,
 * then springs back. Fine pointers only, and disabled under reduced motion.
 */
export function useMagnet({ strength = 0.28, radius = 90 } = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;

    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy);
        const reach = Math.max(box.width, box.height) / 2 + radius;
        if (distance > reach) {
          el.style.transform = '';
          return;
        }
        const falloff = 1 - distance / reach;
        el.style.transform = `translate(${dx * strength * falloff}px, ${dy * strength * falloff}px)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = '';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      el.style.transform = '';
    };
  }, [reduced, strength, radius]);

  return ref;
}
