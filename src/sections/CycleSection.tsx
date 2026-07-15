import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function CycleSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={800}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.cycleLabel}</Label>
          <SH typed>{c.cycleHeading}</SH>
          <p style={{ fontSize: 18, color: "var(--cl-text-muted, #888)", maxWidth: 660, margin: "16px auto 0", lineHeight: 1.75 }}>
            {c.cyclePara}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {c.cycleItems.map((item, i) => (
            <div key={i} style={{
              background: "var(--cl-card)", border: `1px solid var(--cl-line)`,
              borderRadius: t.cardRadius, padding: "28px", display: "flex", flexDirection: "column", gap: 12
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--cl-danger)", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, fontFamily: t.fontMono }}>
                ✗ {item.fail}
              </p>
              <div style={{ width: 24, height: 1, background: "var(--cl-line)", margin: "4px 0" }} />
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--cl-text-base, #e2e8f0)", margin: 0 }}>
                {item.why}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
      {c.cycleConclusion && (
        <FadeIn delay={180}>
          <div style={{ marginTop: 32, background: `${t.danger}12`, border: `1px solid ${t.danger}44`, borderRadius: t.cardRadius, padding: "20px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "#fff", fontStyle: "italic", margin: 0, fontWeight: 500 }}>
              {c.cycleConclusion}
            </p>
          </div>
        </FadeIn>
      )}
    </Sec>
  );
}
