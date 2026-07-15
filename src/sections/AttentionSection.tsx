import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function AttentionSection() {
  const c = useContent();
  const t = useTheme();
  const icons = ["💋", "🚨", "🤨"];
  return (
    <Sec maxWidth={780}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.attentionLabel}</Label>
          <SH typed>{c.attentionHeading}</SH>
          <p style={{ fontSize: 18, color: "var(--cl-text-muted, #888)", maxWidth: 620, margin: "-16px auto 0", lineHeight: 1.75 }}>
            {c.attentionPara}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 620, margin: "0 auto" }}>
          {c.attentionItems.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 18,
              padding: "20px 0",
              borderBottom: i < c.attentionItems.length - 1 ? `1px solid var(--cl-line)` : "none",
            }}>
              <span style={{ fontSize: 26, flexShrink: 0, marginTop: 2, opacity: 0.75 }}>{icons[i]}</span>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 3px 0" }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "#94a3b8", margin: 0 }}>
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
