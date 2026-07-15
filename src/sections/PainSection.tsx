import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function PainSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={760}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>{c.painLabel}</Label>
          <SH typed>{c.painHeading}</SH>
        </div>
      </FadeIn>
      
      <FadeIn delay={100}>
        <p style={{ fontSize: "clamp(16px, 1.8vw, 18px)", lineHeight: 1.8, color: "var(--cl-text-body, #b0b0b0)", marginBottom: 36, textAlign: "center" }}>
          {(c as any).painSub || c.painPara}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
          {((c as any).pains || c.painList)?.map((p: string, i: number) => (
            <div key={i} style={{ 
              display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255, 255, 255, 0.01)",
              border: "1px solid rgba(255, 255, 255, 0.03)", borderRadius: 12, padding: "16px 20px", textAlign: "left",
            }}>
              <span style={{ color: "var(--cl-accent)", fontSize: 18, lineHeight: 1.2 }}>—</span>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "#f1f5f9", margin: 0 }}>
                {p}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={160}>
        <blockquote style={{
          borderLeft: `3px solid var(--cl-accent)`, paddingLeft: 24, margin: "0 auto", maxWidth: 680,
          fontFamily: t.blockquoteFontFamily ?? t.fontAccent, fontStyle: t.blockquoteFontStyle ?? "italic",
          fontWeight: t.blockquoteFontWeight ?? 400, fontSize: "clamp(18px, 2.3vw, 21px)", color: "#fff", 
          lineHeight: 1.7, textAlign: "left",
        }}>
          “{(c as any).painQuote || c.painBlockquote}”
        </blockquote>
      </FadeIn>

      {c.painConclusion && (
        <FadeIn delay={220}>
          <div style={{ marginTop: 32, background: `${t.danger}0d`, border: `1px solid ${t.danger}22`, borderRadius: t.cardRadius, padding: "20px 24px" }}>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--cl-text-body, #b0b0b0)", fontStyle: "italic" }}>
              {c.painConclusion}
            </p>
          </div>
        </FadeIn>
      )}
    </Sec>
  );
}
