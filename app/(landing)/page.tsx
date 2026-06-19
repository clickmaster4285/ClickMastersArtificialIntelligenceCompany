"use client";

import { useEffect, useState } from "react";

import { HugePreloader } from "@/components/landingPage/HugePreloader";
import { HugeHero } from "@/components/landingPage/HugeHero";
import { HugeAbout } from "@/components/landingPage/HugeAbout";
import { HugeProcess } from "@/components/landingPage/HugeProcess";
import { HugeCountersPartners } from "@/components/landingPage/HugeCountersPartners";
import { HugeLogos } from "@/components/landingPage/HugeLogos";
import { HugeScrollSection } from "@/components/landingPage/HugeScrollSection";
import { HugeFooter } from "@/components/landingPage/HugeFooter";
import { StatCardSection } from "@/components/landingPage/StatCard";
import { CaseStudies } from "@/components/landingPage/CaseStudies";
import { ScrollVideoSection } from "@/components/landingPage/ScrollVideoSection";
import AiTagSliderSection from "@/components/landingPage/AiTagSliderSection";
import AwardsSection from "@/components/landingPage/AwardSection";
import Testimonials3DRoom from "@/components/landingPage/Testimonial";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <main className="bg-background">
      <HugePreloader onComplete={() => setLoaded(true)} />

      <HugeHero visible={loaded} />

      <HugeCountersPartners />

      <HugeAbout />

      <HugeLogos />

      <HugeProcess />

      <StatCardSection />

      <AwardsSection />

      <CaseStudies />

      <ScrollVideoSection />

      <HugeScrollSection />

      {/* <HugeTestimonials /> */}

      <Testimonials3DRoom />

      <AiTagSliderSection />

      <HugeFooter />
    </main>
  );
}