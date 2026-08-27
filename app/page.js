// Temporarily hidden — see the <Work /> / <ClientLogos /> note in <main> below.
// import ClientLogos from '@/components/ClientLogos';
// import Work from '@/components/Work';
import About from '@/components/About';
import Contact from '@/components/Contact';
import CustomCursor from '@/components/CustomCursor';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Pillars from '@/components/Pillars';
import PixelField from '@/components/PixelField';
import Process from '@/components/Process';
import ScrollProgress from '@/components/ScrollProgress';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.root}>
      <PixelField />
      <ScrollProgress />
      <CustomCursor />
      <Header />

      <main className={styles.main}>
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Services />
        <Process />
        <Pillars />
        {/* Hidden until the case studies and client list are ready. Restore by
            uncommenting these two lines and their imports above, plus the
            '#work' nav entries in lib/content.js and the hero's secondary CTA. */}
        {/* <Work /> */}
        {/* <ClientLogos /> */}
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer className={styles.footer} />
    </div>
  );
}
