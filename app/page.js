import About from '@/components/About';
import ClientLogos from '@/components/ClientLogos';
import Contact from '@/components/Contact';
import CustomCursor from '@/components/CustomCursor';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import PixelField from '@/components/PixelField';
import ScrollProgress from '@/components/ScrollProgress';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import Work from '@/components/Work';
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
        <Work />
        <ClientLogos />
        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer className={styles.footer} />
    </div>
  );
}
