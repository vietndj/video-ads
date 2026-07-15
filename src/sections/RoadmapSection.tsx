import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";
import { TimelineDrawPath } from "../components/TimelineDrawPath";

export function RoadmapSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={900}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <Label>{c.roadmapLabel}</Label>
          <SH typed>{c.roadmapHeading}</SH>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ fontSize: 22, fontWeight: 700, color: "var(--cl-text-base, #f0f0f0)", marginBottom: 14 }}>
            {c.roadmapPreviewHeading ?? "Trải nghiệm trực quan không gian bên trong ấn phẩm"}
          </p>
          <p style={{ fontSize: 18, color: "var(--cl-text-muted, #888)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.75 }}>
            {c.roadmapPreviewDesc}
          </p>
        </div>
        {c.roadmapIframeUrl ? (
          <div style={{
            borderRadius: t.cardRadius, overflow: "hidden", border: `1px solid var(--cl-line)`, marginBottom: 52,
            aspectRatio: "9 / 16", position: "relative", maxWidth: 340, margin: "0 auto 52px auto",
            boxShadow: `0 20px 40px -15px rgba(0,240,255,0.15)`
          }}>
            <iframe
              src={c.roadmapIframeUrl}
              title="Inside Course Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{
            border: `2px dashed var(--cl-line)`, borderRadius: t.cardRadius, padding: "60px 24px",
            textAlign: "center", marginBottom: 52, color: "var(--cl-text-muted, #555)",
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🎬</div>
            <p style={{ fontFamily: t.fontMono, fontSize: 12, letterSpacing: "0.1em" }}>
              [ DEMO VIDEO TRỤ CỘT HỌC TẬP SẼ ĐƯỢC ĐĂNG Ở ĐÂY ]
            </p>
            <p style={{ fontSize: 13, marginTop: 8 }}>Sẽ cập nhật video demo sau khi ra mắt chính thức.</p>
          </div>
        )}
      </FadeIn>

      <FadeIn delay={160}>
        <p style={{ fontSize: 19, fontWeight: 600, textAlign: "center", color: "var(--cl-text-base, #f0f0f0)", marginBottom: 48, letterSpacing: "0.01em" }}>
          {c.roadmapChaptersHeading ?? "Hệ thống hóa toàn bộ tư duy thiết kế của bạn:"}
        </p>
        <div className="cl-timeline">
          <TimelineDrawPath />
          {c.stages.map((m, i) => (
            <div key={i} className="cl-timeline-item">
              <div className="cl-timeline-dot" style={{ background: "var(--cl-accent)", color: "var(--cl-accent-text)" }}>{String(i + 1)}</div>
              <div className="cl-timeline-card">
                <div className="cl-timeline-card__tags">
                  <span className="cl-stage__n" style={{ color: "var(--cl-accent)", background: `${t.accent}18` }}>{m.n}</span>
                  <span className="cl-stage__sub">{m.sub}</span>
                </div>
                <h3 className="cl-timeline-card__title">{m.title}</h3>
                <p className="cl-timeline-card__desc">{m.desc}</p>
                {m.gif && (
                  <div style={{ borderTop: `1px solid var(--cl-line)`, marginTop: 18, marginLeft: -32, marginRight: -32 }}>
                    <img src={m.gif} loading="lazy" alt={m.title} style={{ width: "100%", display: "block" }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {c.roadmapChaptersGif && (
          <div style={{ marginTop: 28, borderRadius: t.cardRadius, overflow: "hidden", border: `1px solid var(--cl-line)` }}>
            <img src={c.roadmapChaptersGif} loading="lazy" alt="Lộ trình" style={{ width: "100%", display: "block" }} />
          </div>
        )}
      </FadeIn>
    </Sec>
  );
}
