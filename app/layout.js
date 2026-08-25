import { Bricolage_Grotesque, Manrope } from 'next/font/google';
import './globals.css';

// next/font self-hosts both families and inlines the @font-face CSS — no
// render-blocking request to fonts.googleapis.com.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://thepixelbuild.com'),
  title: 'The Pixel Build — Ecommerce technical partner for Shopify brands',
  description:
    'Design, development, CRO, marketing and AI-assisted product listings for Shopify and Shopify Plus brands. Book a discovery call.',
  openGraph: {
    title: 'The Pixel Build — Ecommerce technical partner for Shopify brands',
    description:
      'Design, development, CRO, marketing and AI-assisted product listings for Shopify and Shopify Plus brands.',
    type: 'website',
    url: '/',
    siteName: 'The Pixel Build',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pixel Build',
    description: 'Ecommerce technical partner for Shopify and Shopify Plus brands.',
  },
};

export const viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${manrope.variable}`}>
      <body>
        {/* Scroll reveals start hidden and are shown by JS. Without scripting,
            force everything visible rather than serving a blank page. */}
        <noscript>
          <style>{`[data-shown],[data-shown] > *{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
