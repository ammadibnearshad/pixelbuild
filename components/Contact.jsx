'use client';

import { useRef, useState } from 'react';
import { contactEmail } from '@/lib/content';
import Reveal, { RevealGroup } from './Reveal';
import SplitWords from './SplitWords';
import { Container } from './ui';
import styles from './Contact.module.css';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [error, setError] = useState('');
  const mountedAt = useRef(Date.now());

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // `elapsed` lets the route reject a form filled faster than a human could.
        body: JSON.stringify({ ...data, elapsed: Date.now() - mountedAt.current }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || '');
        setStatus('error');
        return;
      }

      setStatus('sent');
    } catch {
      // Offline, DNS, blocked by an extension — never a validation problem.
      setError('');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <Container>
        <Reveal className={styles.panel}>
          <div className={styles.orbit} aria-hidden="true" />

          <div className={styles.grid}>
            <RevealGroup step={85}>
              <SplitWords className={styles.heading} text="Let’s talk about your store" />
              <p className={styles.support}>
                Thirty minutes, no obligation. Tell us where the store is stuck and we&rsquo;ll
                tell you honestly whether we&rsquo;re the right team for it.
              </p>
              <div className={styles.details}>
                <a href={`mailto:${contactEmail}`} className={styles.email}>
                  {contactEmail}
                </a>
                <div className={styles.reply}>Replies within one business day</div>
              </div>
            </RevealGroup>

            {status === 'sent' ? (
              <div className={styles.success} role="status">
                <div className={styles.successTitle}>Thanks — we&rsquo;ll be in touch</div>
                <p className={styles.successBody}>
                  We&rsquo;ve got your details and will reply within one business day. If it is
                  urgent, email us directly at {contactEmail}.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
                {/* Honeypot. Off-screen rather than display:none — some bots skip
                    hidden inputs but happily fill a positioned one. Never shown to
                    a person, so it is hidden from assistive tech too. */}
                <div className={styles.trap} aria-hidden="true">
                  <label htmlFor="company">Company (leave this empty)</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <label className={styles.field}>
                  <span className={styles.labelText}>Your name</span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={styles.input}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.labelText}>Work email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Work email"
                    className={styles.input}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.labelText}>Store URL</span>
                  <input
                    name="storeUrl"
                    type="url"
                    autoComplete="url"
                    placeholder="Store URL"
                    className={styles.input}
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.labelText}>What are you hoping to fix or build?</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="What are you hoping to fix or build?"
                    className={styles.textarea}
                  />
                </label>

                {status === 'error' ? (
                  <p className={styles.error} role="alert">
                    {error ? `${error} ` : 'Something went wrong. '}
                    You can always email us at {contactEmail}.
                  </p>
                ) : null}

                <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Request a call'}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
