import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function BonusSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={800}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{(c as any).bonusLabel || c.bonusesLabel}</Label>
          <SH typed>{(c as any).bonusHeading || c.bonusesHeading}</SH>
          <p style={{ fontSize: 18, color: "var(--cl-text-muted, #888)", maxWidth: 620, margin: "16px auto 0", lineHeight: 1.75 }}>
            {(c as any).bonusSub || c.bonusesSub}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {((c as any).bonusItems || c.bonuses || []).map((item: any, i: number) => (
            <div key={i} style={{
              background: "var(--cl-card)", border: `1px solid var(--cl-line)`,
              borderRadius: t.cardRadius, padding: "32px", display: "flex", alignItems: "flex-start", gap: 24,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
                border: `1px solid ${t.accent}44`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <span style={{ fontSize: 24 }}>{item.icon || "🎁"}</span>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "var(--cl-accent)", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                  BONUS {i + 1}
                </div>
                <h4 style={{ fontFamily: t.fontBody, fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px 0" }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "#cbd5e1", margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Sec>
  );
}
