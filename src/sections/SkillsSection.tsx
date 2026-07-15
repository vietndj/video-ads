import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";
import { SkillIcon } from "../components/icons";

export function SkillsSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={960}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <Label>{c.skillsLabel}</Label>
          <SH typed>{c.skillsHeading}</SH>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32
        }}>
          {c.skillCards.map((sc, i) => (
            <div key={i} style={{
              background: "var(--cl-card)", border: `1px solid var(--cl-line)`,
              borderRadius: t.cardRadius, padding: "36px 30px", display: "flex", flexDirection: "column", gap: 16,
              transition: "transform 0.3s ease, border-color 0.3s ease", position: "relative", overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", top: -20, right: -20, fontSize: 120, fontFamily: t.fontMono,
                fontWeight: 900, color: "var(--cl-accent)", opacity: 0.04, userSelect: "none"
              }}>{sc.n}</div>
              <div style={{ marginBottom: 8 }}><SkillIcon idx={i} accent={t.accent} /></div>
              <div style={{ fontFamily: t.fontMono, fontSize: 12, letterSpacing: "0.15em", color: "var(--cl-accent)", fontWeight: 700 }}>
                KỸ NĂNG {sc.n}
              </div>
              <h4 style={{ fontFamily: t.fontDisplay, fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>
                {sc.title}
              </h4>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--cl-text-body, #a1a1aa)", margin: 0 }}>
                {sc.desc}
              </p>
              <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px dashed var(--cl-line)` }}>
                <p style={{ fontSize: 14, color: "var(--cl-text-muted, #71717a)", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
                  <span style={{ color: "var(--cl-danger)", fontWeight: 700, fontStyle: "normal" }}>Thiếu điều này:</span> {sc.warn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Sec>
  );
}
