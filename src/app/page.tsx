'use client';

import { useState } from 'react';
import AgeVerificationModal from '../components/AgeVerificationModal';
import HeaderSection from '../components/HeaderSection';
import AdvantagesSection from '../components/AdvantagesSection';
import CarouselSection from '../components/CarouselSection';
import OrderSection from '../components/OrderSection';
import ContactSection from '../components/ContactSection';
import FooterSection from '../components/FooterSection';
import { PersistentButton } from '@/components/PersistentButton';

export default function HomePage() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  return (
    <>
      <AgeVerificationModal
        isOpen={!isAgeVerified}
        onVerify={() => setIsAgeVerified(true)}
      />

      <div className="min-h-screen retrowave-bg relative overflow-hidden w-full">
        <div className="fixed inset-0 opacity-20 z-0 w-full">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,0,128,0.3)_25%,rgba(255,0,128,0.3)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.3)_75%,rgba(0,255,255,0.3)_76%,transparent_77%,transparent)] bg-[length:60px_60px] retrowave-grid animate-pulse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,0,128,0.2)_25%,rgba(255,0,128,0.2)_26%,transparent_27%,transparent_74%,rgba(0,255,255,0.2)_75%,rgba(0,255,255,0.2)_76%,transparent_77%,transparent)] bg-[length:60px_60px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,0,255,0.15)_0%,transparent_60%)]"></div>
        </div>

        <PersistentButton isAgeVerified={isAgeVerified} />

        <div className="relative z-10 w-full">
          <HeaderSection />
          <main>
            {/*<div className="h-20 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>*/}
            <AdvantagesSection />
            {/*<div className="h-20 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent"></div>*/}
            <CarouselSection />
            {/*<div className="h-20 bg-gradient-to-b from-transparent via-black/40 to-transparent"></div>*/}
            <OrderSection />
            {/*<div className="h-20 bg-gradient-to-b from-transparent via-purple-900/30 to-transparent"></div>*/}
            <ContactSection />
            {/*<div className="h-10 bg-gradient-to-b from-transparent to-black/50"></div>*/}
          </main>
          <FooterSection />
        </div>
      </div>
    </>
  );
}
