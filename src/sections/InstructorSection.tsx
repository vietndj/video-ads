import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function InstructorSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.instructorLabel}</Label>
          <SH typed>{c.instructorHeading}</SH>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.002) 100%)",
          border: `1px solid var(--cl-line)`, borderRadius: t.cardRadius, padding: "48px 40px",
          display: "flex", gap: 52, alignItems: "flex-start", flexWrap: "wrap", boxShadow: "0 20px 50px -15px rgba(0,0,0,0.4)",
        }}>
          <div style={{ flexShrink: 0, textAlign: "center", minWidth: 200, maxWidth: 240, margin: "0 auto" }}>
            <div style={{
              borderRadius: 16, overflow: "hidden", border: `2px solid ${t.accent}44`,
              boxShadow: `0 0 40px -12px ${t.accent}55`, marginBottom: 16,
            }}>
              <img src={c.instructorPhoto ?? "/instructor.jpg"} loading="lazy" alt={c.instructorName} style={{ width: "100%", display: "block" }} />
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
              {c.instructorName}
            </div>
            <div style={{
              display: "inline-block", background: `${t.accent}18`, border: `1px solid ${t.accent}44`,
              borderRadius: 40, padding: "5px 14px", fontSize: 13, color: "var(--cl-accent)",
              fontWeight: 700, letterSpacing: "0.03em",
            }}>
              15 năm giảng dạy
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 0 }}>
            <p style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--cl-text-muted, #666)", fontFamily: "monospace", marginBottom: 8 }}>
              {c.instructorTitle}
            </p>
            <div style={{ height: 1, background: "var(--cl-line)", marginBottom: 24 }} />
            
            {c.instructorBio && c.instructorBio.map((bioLine, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: i === c.instructorBio.length - 1 ? "#fff" : "#94a3b8", fontWeight: i === c.instructorBio.length - 1 ? 600 : 400, margin: 0 }}>
                  {bioLine}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
      {c.instructorInsight && (
        <FadeIn delay={180}>
          <div style={{ marginTop: 36, background: `linear-gradient(135deg, ${t.accent}12, var(--cl-card))`, border: `1px solid ${t.accent}44`, borderRadius: t.cardRadius, padding: "26px 30px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ color: "var(--cl-accent)", fontSize: 28, lineHeight: 1, flexShrink: 0, marginTop: 2, opacity: 0.7 }}>"</span>
            <p style={{
              fontSize: 21, lineHeight: 1.85, color: "var(--cl-text-base, #e8e8e8)", fontFamily: t.fontBody,
              fontStyle: "normal", fontWeight: 500, letterSpacing: "0.01em", margin: 0,
            }}>
              {c.instructorInsight}
            </p>
          </div>
        </FadeIn>
      )}
    </Sec>
  );
}
