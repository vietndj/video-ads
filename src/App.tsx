import React from "react";
import { useContent } from "./content";
import { useTheme } from "./theme";
import { ThemeSyncer, Div } from "./components/ui";
import { HeroSection } from "./sections/HeroSection";
import { PainSection } from "./sections/PainSection";
import { AttentionSection } from "./sections/AttentionSection";
import { RuleSection } from "./sections/RuleSection";
import { CycleSection } from "./sections/CycleSection";
import { DiscoverySection, SolutionsSection } from "./sections/DiscoverySection";
import { SolutionSection } from "./sections/DiscoverySection";
import { SkillsSection } from "./sections/SkillsSection";
import { MidCtaSection } from "./sections/MidCtaSection";
import { BeforeAfterSection } from "./sections/BeforeAfterSection";
import { RoadmapSection } from "./sections/RoadmapSection";
import { InstructorSection } from "./sections/InstructorSection";
import { BonusSection } from "./sections/BonusSection";
import { CtaSection } from "./sections/CtaSection";
import LiveSocialProof from "./LiveSocialProof";
import { Particles } from "./Particles";
import "./landing.css";

export default function App() {
  const t = useTheme();
  const c = useContent();
  const isHidden = (id: string) => c.blocksMeta?.hidden?.includes(id) ?? false;

  return (
    <div style={{ background: t.bg, color: t.textBase ?? "#f0f0f0", fontFamily: t.fontBody, minHeight: "100vh", overflowX: "hidden" }}>
      <ThemeSyncer />
      <Particles />

      {!isHidden("hero") && <HeroSection />}
      <Div />

      {!isHidden("pain") && <PainSection />}
      <Div />

      {!isHidden("attention") && <AttentionSection />}
      <Div />

      {!isHidden("rule") && <RuleSection />}
      <Div />

      {!isHidden("cycle") && <CycleSection />}
      <Div />

      {!isHidden("discovery") && <DiscoverySection />}
      <Div />

      {!isHidden("solutions") && <SolutionsSection />}
      <Div />

      {!isHidden("solution") && <SolutionSection />}
      <Div />

      {!isHidden("skills") && <SkillsSection />}
      <Div />

      {!isHidden("midCta") && <MidCtaSection />}
      <Div />

      {!isHidden("before-after") && <BeforeAfterSection />}
      <Div />

      {!isHidden("roadmap") && <RoadmapSection />}
      <Div />

      {!isHidden("instructor") && <InstructorSection />}
      <Div />

      {!isHidden("bonus") && <BonusSection />}
      <Div />

      {!isHidden("cta") && <CtaSection />}

      {!isHidden("footer") && (
        <footer className="cl-footer" style={{ borderTop: `1px solid ${t.line}`, fontFamily: t.fontBody }}>
          <div className="cl-footer__brand" style={{ fontFamily: t.fontDisplay }}>
            {c.footerBrand}<span style={{ color: t.accent }}>{c.footerDot}</span>VIDEO
          </div>
          <p className="cl-footer__tagline">{c.footerTagline}</p>
          <div className="cl-footer__links">
            {c.footerLinks.map((link) => (
              <a key={link} href="#" className="cl-footer__link">{link}</a>
            ))}
          </div>
          <p className="cl-footer__copy">{c.footerCopyright}</p>
        </footer>
      )}
      <LiveSocialProof />
    </div>
  );
}
