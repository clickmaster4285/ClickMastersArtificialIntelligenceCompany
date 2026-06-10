import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HugePreloader } from "@/components/HugePreloader";
import { HugeHero } from "@/components/HugeHero";
import { HugeAbout } from "@/components/HugeAbout";
import { HugeProcess } from "@/components/HugeProcess";
import { HugeCountersPartners } from "@/components/HugeCountersPartners";
import { HugeLogos } from "@/components/HugeLogos";
import { HugeTestimonials } from "@/components/HugeTestimonials";
import { HugeScrollSection } from "@/components/HugeScrollSection";
import { HugeFooter } from "@/components/HugeFooter";
import { StatCardSection } from "@/components/StatCard";
import { CaseStudies } from "@/components/CaseStudies";
import { ScrollVideoSection } from "@/components/ScrollVideoSection";
import AiTagSliderSection from "@/components/AiTagSliderSection";

import AwardsSection from "@/components/AwardSection";
import Testimonials3DRoom from "@/components/Testimonial";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clickmasters — A software house that ships what's next" },
      {
        name: "description",
        content:
          "Clickmasters is a software house crafting AI products, web platforms and mobile experiences for the brands you know.",
      },
    ],
  }),
  component: Index,
});

function Index() {
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

      <Testimonials3DRoom/>

      
      <AiTagSliderSection />

      <HugeFooter />
    </main>
  );
}
