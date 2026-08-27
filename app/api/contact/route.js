import { appendEnquiry } from '@/lib/sheets';

/** Field caps. Anything longer is a bot or a paste accident, not an enquiry. */
const LIMITS = { name: 120, email: 200, storeUrl: 300, message: 4000 };

/** Deliberately loose — real addresses fail strict regexes more often than bots pass them. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Per-IP throttle. In-memory, so it resets on redeploy and is per-instance
 * rather than global — enough to blunt a script hammering one box, not a real
 * distributed rate limiter. Move to Upstash/Redis if this ever gets abused.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const seen = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  if (seen.length >= MAX_PER_WINDOW) return true;
  seen.push(now);
  hits.set(ip, seen);
  return false;
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return Response.json(
      { error: 'Too many submissions. Please email us instead.' },
      { status: 429 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Malformed request.' }, { status: 400 });
  }

  // Honeypot: a hidden field no human sees, plus a floor on how fast the form
  // could plausibly be filled. Both answer 200 so the bot books it as a win and
  // does not come back to probe for what gave it away.
  const elapsed = Number(payload?.elapsed);
  if (clean(payload?.company, 50) || (Number.isFinite(elapsed) && elapsed < 2000)) {
    return Response.json({ ok: true });
  }

  const name = clean(payload?.name, LIMITS.name);
  const email = clean(payload?.email, LIMITS.email);
  const storeUrl = clean(payload?.storeUrl, LIMITS.storeUrl);
  const message = clean(payload?.message, LIMITS.message);

  if (!name || !EMAIL.test(email)) {
    return Response.json(
      { error: 'Please add your name and a valid email address.' },
      { status: 400 }
    );
  }

  try {
    await appendEnquiry({ name, email, storeUrl, message, source: 'Website contact form' });
  } catch (error) {
    // The visitor gets a generic failure; the cause stays in the server log,
    // since it is usually a credential problem and not their fault.
    console.error('[contact] Sheets append failed:', error);
    return Response.json({ error: 'Could not send your enquiry.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
