/**
 * Single source of truth for page copy.
 *
 * NOTE: every statistic, client name, case-study result and testimonial below is
 * a plausible placeholder written for the design — not a verified fact.
 * Replace with client-approved content before launch (see README "Content status").
 */

export const nav = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  // Restore alongside <Work /> in app/page.js
  // { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
];

export const marqueeItems = [
  'Shopify Design',
  'Custom Development',
  'CRO & A/B Testing',
  'Performance Marketing',
  'AI Listing Images',
  'Product Feed Optimization',
  'Migrations',
];

export const credentials = [
  { label: 'Shopify Plus partner', accent: true },
  { label: 'Klaviyo certified' },
  { label: 'Remote-first, 4 timezones' },
];

export const stats = [
  { value: 212, suffix: '+', label: 'Stores launched & migrated' },
  { value: 38, suffix: '%', label: 'Median conversion lift', accent: true },
  { value: 41, prefix: '$', suffix: 'M', label: 'Annual GMV supported' },
  { value: 96, suffix: '%', label: 'Clients still with us after year one' },
];

export const services = [
  {
    id: 'store-design',
    title: 'Store design & theme development',
    body: 'Custom themes and section-based page builders your marketing team can actually use. Figma to Liquid, no page-builder bloat, Core Web Vitals in the green before we hand over.',
  },
  {
    id: 'cro',
    title: 'Conversion rate optimisation',
    body: "Research, heatmaps and a running A/B test programme on PDP, cart and checkout. You get a monthly readout of what we tested, what won, and what we're trying next.",
  },
  {
    id: 'ai-listings',
    title: 'AI listing images & product content',
    body: 'On-model and on-set imagery generated and retouched with AI, plus titles, bullets and descriptions written for search. Consistent across your whole catalogue, delivered in days rather than months.',
  },
  {
    id: 'performance',
    title: 'Performance marketing & lifecycle',
    body: 'Paid social and search that respects your margin, plus Klaviyo flows for welcome, browse, cart and post-purchase. One dashboard, blended numbers, honest attribution.',
  },
  {
    id: 'migrations',
    title: 'Migrations, apps & integrations',
    body: 'WooCommerce, Magento or BigCommerce to Shopify with URLs and SEO intact. Custom apps, ERP and 3PL integrations, subscriptions, B2B and multi-currency setups.',
  },
  {
    id: 'care',
    title: 'Ongoing technical care',
    body: 'A retained team for launches, bug fixes, speed work and peak-season readiness. Shared Slack channel, same-day responses, no ticket queue.',
  },
];

export const processSteps = [
  {
    id: 'kickoff',
    title: 'Teardown and kick-off',
    body: 'We go through your store, your analytics and your last six months of numbers before anyone opens Figma. You leave the first call with a written audit and a ranked roadmap.',
    meta: 'Audit + ranked roadmap',
  },
  {
    id: 'build',
    title: 'Design and build',
    body: 'Figma to Liquid by hand — custom sections your marketing team can edit, no page-builder bloat, Core Web Vitals green before handover. Migrations keep URLs and SEO intact.',
    meta: 'Staged, reviewable theme',
  },
  {
    id: 'launch',
    title: 'Launch and instrument',
    body: 'We ship, wire up analytics and events properly, and take a clean baseline. The written handover and the shared channel start here, not once the invoice clears.',
    meta: 'Live store + baseline',
  },
  {
    id: 'scale',
    title: 'Test, market and scale',
    body: 'A running A/B programme on PDP, cart and checkout, AI listing images and copy across the catalogue, and paid and lifecycle work that respects your margin.',
    meta: 'Monthly readout',
  },
];

export const pillars = [
  {
    id: 'certified',
    icon: 'badge',
    title: 'Certified Shopify developers',
    body: 'Shopify Plus partners who write the theme code themselves. No white-label subcontractors, no handing your store to whoever happens to be free that week.',
  },
  {
    id: 'quality',
    icon: 'gear',
    title: 'Quality you can check',
    body: 'Every build ships with analytics wired up, a testing roadmap and a written handover — so you can see what changed, why it changed, and what it did to the numbers.',
  },
  {
    id: 'delivery',
    icon: 'clock',
    title: 'On time, or you hear it first',
    body: 'Fixed scope, fixed dates, and a shared channel where you get the developer rather than an account manager. If a date is going to slip, you hear it from us before it does.',
  },
];

export const workFilters = [
  { id: 'all', label: 'All' },
  { id: 'build', label: 'Builds' },
  { id: 'cro', label: 'CRO' },
  { id: 'ai', label: 'AI & content' },
];

export const work = [
  {
    id: 'nordvik',
    category: 'build',
    tag: 'Replatform',
    title: 'Nordvik Outdoor',
    result: 'Magento to Shopify Plus in six weeks. Page load down 61%, revenue per session up 24%.',
    imageAlt: 'Nordvik Outdoor storefront',
  },
  {
    id: 'maren',
    category: 'cro',
    tag: 'CRO programme',
    title: 'Maren Skin',
    result: '14 tests in a quarter on PDP and cart. Add-to-cart rate up 31%, returns down.',
    imageAlt: 'Maren Skin product page',
  },
  {
    id: 'bloomhaus',
    category: 'ai',
    tag: 'AI imagery',
    title: 'Bloomhaus Home',
    result: '1,800 SKUs re-shot with AI lifestyle sets. Organic traffic up 46% in five months.',
    imageAlt: 'Bloomhaus Home catalogue imagery',
  },
  {
    id: 'fjord',
    category: 'build',
    tag: 'B2B build',
    title: 'Fjord Supply Co.',
    result: 'Wholesale portal with tiered pricing and net terms, live alongside the DTC store.',
    imageAlt: 'Fjord Supply Co. wholesale portal',
  },
  {
    id: 'rally',
    category: 'cro',
    tag: 'Subscriptions',
    title: 'Rally Nutrition',
    result: 'Rebuilt the subscribe-and-save flow. Churn down 19%, LTV up a third.',
    imageAlt: 'Rally Nutrition subscription flow',
  },
  {
    id: 'atelier-ovo',
    category: 'ai',
    tag: 'Feeds & SEO',
    title: 'Atelier Ovo',
    result: 'Clean product feeds across Google and Meta. Shopping ROAS from 1.8 to 3.4.',
    imageAlt: 'Atelier Ovo product feed',
  },
];

/** Text wordmarks standing in for real client SVG logos. */
export const clientLogos = ['Nordvik', 'Maren', 'Bloomhaus', 'Fjord Co.', 'Rally', 'Atelier Ovo'];

export const testimonials = [
  {
    id: 'elin',
    quote:
      "They rebuilt our PDP, told us honestly which of our ideas wouldn't work, and then proved it with a test. Revenue per visitor is up 24% and I finally trust our numbers.",
    name: 'Elin Sørensen',
    role: 'Head of Ecommerce, Nordvik Outdoor',
  },
  {
    id: 'priya',
    quote:
      'We had 1,800 products with inconsistent photography. Their AI imagery pipeline gave us one look across the whole catalogue in under a month — something three agencies had quoted us a year for.',
    name: 'Priya Raman',
    role: 'Founder, Bloomhaus Home',
  },
  {
    id: 'marcus',
    quote:
      "Peak season used to terrify us. Now there's a team in our Slack who knows the store better than we do, and Black Friday was the calmest day of our year.",
    name: 'Marcus Bell',
    role: 'Ops Director, Rally Nutrition',
  },
];

export const faqs = [
  {
    id: 'shopify-only',
    question: 'Do you only work on Shopify?',
    answer:
      'Yes — Shopify and Shopify Plus only. Going deep on one platform is why we can move fast and spot problems early.',
  },
  {
    id: 'timeline',
    question: 'How long does a full build take?',
    answer:
      'Six to ten weeks for most stores, depending on catalogue size and integrations. Migrations with clean data have gone live in four.',
  },
  {
    id: 'cost',
    question: 'What does it cost to work with you?',
    answer:
      "Projects typically start around $18k; retained CRO and technical care start at $4k a month. We'll give you a real number after the first call, not a range.",
  },
  {
    id: 'ai-safety',
    question: 'Is AI imagery safe for my brand?',
    answer:
      'We start from your real product photography, so colour, texture and proportions stay accurate. Every image is reviewed by a human before it reaches your store.',
  },
  {
    id: 'who',
    question: 'Who will I actually talk to?',
    answer:
      'The people doing the work. No account managers relaying messages — you get the developer, the designer and the strategist in one shared channel.',
  },
];

// Unused for now — <Footer /> renders only the centred logo + tagline.
// Restore by mapping these back into components/Footer.jsx.
export const footerColumns = [
  {
    heading: 'Services',
    links: [
      { href: '#services', label: 'Design & development' },
      { href: '#services', label: 'CRO' },
      { href: '#services', label: 'AI listings' },
      { href: '#services', label: 'Marketing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '#about', label: 'About' },
      // Restore alongside <Work /> in app/page.js
      // { href: '#work', label: 'Work' },
      { href: '#faq', label: 'FAQ' },
      { href: '#contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Elsewhere',
    links: [
      { href: '#top', label: 'LinkedIn' },
      { href: '#top', label: 'Instagram' },
      { href: '#top', label: 'Dribbble' },
    ],
  },
];

export const contactEmail = 'hello@thepixelbuild.com';
