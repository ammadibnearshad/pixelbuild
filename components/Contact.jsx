'use client';

import { useState } from 'react';
import { contactEmail } from '@/lib/content';
import Reveal, { RevealGroup } from './Reveal';
import SplitWords from './SplitWords';
import { Container } from './ui';
import styles from './Contact.module.css';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    // TODO: POST to the real CRM / booking endpoint and validate server-side.
    // const data = Object.fromEntries(new FormData(event.currentTarget));
    // const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    // if (!res.ok) return setStatus('error');

    setStatus('sent');
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
                    Something went wrong. Please email {contactEmail} instead.
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
