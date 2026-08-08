import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { certifications, type Certification } from "@/data/certifications";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { ScrollDepthCarousel } from "@/components/common/ScrollDepthCarousel";
import { CertificationDepthCard } from "@/components/common/PortfolioDepthCards";
import { Button } from "@/components/ui/button";
import { useDepthCarouselLayout } from "@/hooks/useCardSwapSize";

const INITIAL_CERT_COUNT = 6;

export function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const { width, height, spread, depth, scrollStepVh, visibleCards, isMobile } =
    useDepthCarouselLayout();

  const visibleCerts = showAll
    ? certifications
    : certifications.slice(0, INITIAL_CERT_COUNT);

  const realCertCount = certifications.filter((c) => !c.comingSoon).length;
  const hasMore = certifications.length > INITIAL_CERT_COUNT;

  const toggleShowAll = () => {
    if (showAll) {
      document.getElementById("honors-awards")?.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll(!showAll);
  };

  const viewMoreFooter =
    hasMore && !showAll ? (
      <Button className="min-h-[44px] shadow-lg" onClick={() => setShowAll(true)}>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
        View More ({realCertCount}+ credentials)
      </Button>
    ) : showAll && hasMore ? (
      <Button
        variant="outline"
        className="min-h-[44px] shadow-lg bg-background/90 backdrop-blur-sm"
        onClick={toggleShowAll}
      >
        <ChevronUp className="h-4 w-4" aria-hidden="true" />
        View Less
      </Button>
    ) : undefined;

  return (
    <section id="honors-awards" className="section-padding">
      <div className="container-max">
        <Reveal>
          <SectionHeading title="Honors & Awards" />
        </Reveal>

        <ScrollDepthCarousel<Certification>
          key={`certs-${showAll}-${visibleCerts.length}`}
          items={visibleCerts}
          renderItem={(cert) => <CertificationDepthCard cert={cert} />}
          cardWidth={width}
          cardHeight={height}
          depth={depth}
          spread={spread}
          tilt={0}
          tiltDirection="right"
          perspective={1550}
          visibleCards={visibleCards}
          falloff={0.17}
          blur={6}
          radius={12}
          scrollStepVh={scrollStepVh}
          isMobile={isMobile}
          hint="Scroll — one credential at a time"
          footer={viewMoreFooter}
        />
      </div>
    </section>
  );
}
