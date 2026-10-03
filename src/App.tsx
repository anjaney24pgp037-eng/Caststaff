import { useTheme } from '@/hooks/useTheme';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Assessment } from '@/components/Assessment';
import { Timeline } from '@/components/Timeline';
import { Principles } from '@/components/Principles';
import { Team } from '@/components/Team';
import { Trust } from '@/components/Trust';
import { CaseStudies } from '@/components/CaseStudies';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen">
      <Navbar dark={dark} onToggleTheme={toggle} />
      <Hero />
      <Services />
      <Assessment />
      <Timeline />
      <Principles />
      <Team />
      <Trust />
      <CaseStudies />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
