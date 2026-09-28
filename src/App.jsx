import React from 'react';
import { AmicaProvider, useAmica } from './context/AmicaContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/marketing/Hero';
import HowItWorks from './components/marketing/HowItWorks';
import Features from './components/marketing/Features';
import InteractiveDemo from './components/marketing/InteractiveDemo';
import CaregiverPreview from './components/marketing/CaregiverPreview';
import ElderlyUiPreview from './components/marketing/ElderlyUiPreview';
import Pricing from './components/marketing/Pricing';
import Testimonials from './components/marketing/Testimonials';
import AboutTeam from './components/marketing/AboutTeam';
import DemoModal from './components/marketing/DemoModal';
import ElderlyPortal from './components/elderly/ElderlyPortal';
import CaregiverDashboard from './components/caregiver/CaregiverDashboard';
import ProviderPortal from './components/provider/ProviderPortal';

function MainAppContent() {
  const { currentView } = useAmica();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {currentView === 'marketing' && (
          <>
            <Hero />
            <HowItWorks />
            <Features />
            <InteractiveDemo />
            <CaregiverPreview />
            <ElderlyUiPreview />
            <Pricing />
            <Testimonials />
            <AboutTeam />
            <DemoModal />
          </>
        )}

        {currentView === 'elderly' && <ElderlyPortal />}
        {currentView === 'caregiver' && <CaregiverDashboard />}
        {currentView === 'provider' && <ProviderPortal />}
      </main>

      {currentView === 'marketing' && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AmicaProvider>
      <MainAppContent />
    </AmicaProvider>
  );
}
