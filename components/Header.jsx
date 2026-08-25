'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { nav } from '@/lib/content';
import { useActiveSection, useRafScroll } from '@/lib/hooks';
import Logo from './Logo';
import { Container } from './ui';
import styles from './Header.module.css';

const SECTION_IDS = nav.map((item) => item.href.slice(1));

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const active = useActiveSection(SECTION_IDS);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Tighten the bar once the hero is behind it.
  useRafScroll(({ y }) => setCondensed(y > 80));

  // Escape to close, scroll lock, focus trap, focus restore.
  useEffect(() => {
    if (!menuOpen) return;

    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? []
      );

    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className={styles.header} data-condensed={condensed}>
        <Container className={styles.inner}>
          <a href="#top" className={styles.brand}>
            <Logo className={styles.logo} />
          </a>

          <nav className={styles.nav} aria-label="Primary">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                  data-active={isActive}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label}
                  <span className={styles.navUnderline} aria-hidden="true" />
                </a>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <a href="#contact" className={styles.cta}>
              Book a call
            </a>
            <button
              ref={triggerRef}
              type="button"
              className={styles.hamburger}
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <span className={styles.bars} aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      {menuOpen ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <button
            type="button"
            className={styles.close}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span aria-hidden="true">×</span>
          </button>

          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.overlayLink}
              style={{ '--i': i }}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            className={styles.overlayCta}
            style={{ '--i': nav.length }}
            onClick={closeMenu}
          >
            Book a discovery call
          </a>
        </div>
      ) : null}
    </>
  );
}
