import FeatureShowcase from '@/components/FeatureShowcase';
import DemoSection from '@/components/DemoSection';
import Hero from '@/components/Hero';
import ParticleSystem from '@/components/ParticleSystem';

import AgentGrid from '@/components/AgentGrid';
import BetaSignup from '@/components/BetaSignup';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import UseCaseTabs from '@/components/UseCaseTabs';
import EvolutionSection from '@/components/EvolutionSection';
import Link from 'next/link';
import ServicesSection from '@/components/ServicesSection';
import FAQSection from '@/components/FAQSection';


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ParticleSystem />
      <Hero />
      <FeatureShowcase />
      <UseCaseTabs />
      <DemoSection />
      <ServicesSection />
      <EvolutionSection />


      <AgentGrid />
      <FAQSection />
      <BetaSignup />
      <Footer />
    </main>
  );
}
