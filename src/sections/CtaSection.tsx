import React, { useState } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, Countdown, MediaSection } from "../components/ui";

function IconGuarantee({ accent: c }: { accent: string }) {
  return (
    <svg width={44} height={44} viewBox="0 0 40 40" fill="none" style={{ animation: "ic-float 3.2s ease-in-out infinite", overflow: "visible" }}>
      <path d="M20 4 L34 10 L34 22 C34 30 20 38 20 38 C20 38 6 30 6 22 L6 10 Z"
        fill={`${c}14`} stroke={c} strokeWidth="1.8" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 8px ${c}44)` }}/>
      <polyline points="13,21 17,26 27,15" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RegForm() {
  const t = useTheme();
  const c = useContent();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const currentUrl = window.location.href;
    const customerData = { name: form.name, email: form.email, phone: form.phone, url: currentUrl };
    localStorage.setItem("video_customer", JSON.stringify(customerData));
    try {
      const res = await fetch("/api/lead/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });
      const data = await res.json() as { rowIndex?: number };
      if (data.rowIndex) localStorage.setItem("video_row", data.rowIndex.toString());
    } catch { /* silent */ }
    window.location.href = "/checkout";
  };

  return (
    <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[
        { name: "name", label: "Họ và tên *", type: "text", placeholder: "Nguyễn Văn A", required: true },
        { name: "email", label: "Email (để nhận khóa học) *", type: "email", placeholder: "nguyenvana@gmail.com", required: true },
        { name: "phone", label: "Số điện thoại", type: "tel", placeholder: "0912 345 678", required: false },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={`reg-${f.name}`} style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--cl-text-muted, #999)", marginBottom: 8 }}>{f.label}</label>
          <input
            id={`reg-${f.name}`}
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            required={f.required}
            value={form[f.name as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            style={{
              width: "100%", background: "#0a0a0c",
              border: `1px solid var(--cl-line)`, borderRadius: t.btnRadius,
              padding: "14px 18px", color: "#fff", fontSize: 15,
              outline: "none", boxSizing: "border-box",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--cl-accent)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--cl-line)"; }}
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? "#0a5560" : "var(--cl-accent)",
          color: "var(--cl-accent-text)",
          border: "none",
          borderRadius: t.btnRadius,
          padding: `${t.btnPaddingY}px ${t.btnPaddingX}px`,
          fontSize: 16,
          fontWeight: 800,
          cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: "0.03em",
          boxShadow: loading ? "none" : t.accentGlow ? `0 0 32px -2px ${t.accent}66` : "none",
          marginTop: 8,
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s",
        }}
      >
        {loading ? "⏳ ĐANG XỬ LÝ..." : "GỬI THÔNG TIN"}
      </button>
      <p style={{ textAlign: "center", fontSize: 13, color: "#666", fontStyle: "italic", marginTop: 4 }}>
        Điền thông tin trước — bạn sẽ được tư vấn và xác nhận trước khi thanh toán
      </p>
    </form>
  );
}

export function CtaSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <section id="dang-ky" style={{ maxWidth: 760, margin: "84px auto 0", padding: "0 20px" }}>
      <FadeIn>
        <div style={{ background: `linear-gradient(135deg, var(--cl-card), var(--cl-card2))`, border: `1px solid var(--cl-accent)`, borderRadius: 28, overflow: "hidden" }}>
          <div style={{ background: "var(--cl-accent)", padding: "14px 24px", textAlign: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--cl-accent-text)" }}>
              {c.urgencyBar.replace("{PRICE}", c.price)}
            </p>
          </div>
          <div style={{ padding: "48px 40px" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <Label>{c.ctaLabel}</Label>
              <SH typed>{c.ctaHeading}</SH>
              <p style={{ fontSize: 16, color: "var(--cl-text-body, #b0b0b0)", marginBottom: 32, lineHeight: 1.75 }}>{c.ctaSub}</p>
              <div style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 13, color: "var(--cl-text-muted, #666)", marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--cl-font-mono)" }}>{c.countdownLabel}</p>
                <Countdown />
              </div>
            </div>

            <div style={{ background: "#0a0a0c", border: `1px solid var(--cl-line)`, borderRadius: t.cardRadius, padding: "26px 24px", marginBottom: 32 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--cl-text-base, #fff)", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--cl-font-mono)" }}>{c.valueStackTitle}</p>

              {c.valueStack.map(({ label, price }, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12, alignItems: "baseline" }}>
                  <span style={{ fontSize: 14, color: "var(--cl-text-body, #bbb)", lineHeight: 1.5 }}>{label}</span>
                  <span style={{ fontSize: 14, color: "var(--cl-text-muted, #777)", fontFamily: "var(--cl-font-mono)", flexShrink: 0 }}>{price}</span>
                </div>
              ))}

              <div style={{ borderTop: `1px solid var(--cl-line)`, marginTop: 14, paddingTop: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--cl-accent)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--cl-font-mono)" }}>🎁 KÈM THEO — CHỈ TRONG ĐỢT NÀY:</p>
                {(c as any).bonusItems?.map((item: any, i: number) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, display: "flex", gap: 6 }}>
                      <span style={{ color: "var(--cl-accent)", flexShrink: 0 }}>✓</span>
                      {item.title}
                    </span>
                    <span style={{ fontSize: 13, color: "#64748b", fontFamily: "var(--cl-font-mono)", flexShrink: 0, textDecoration: "line-through" }}>250.000đ</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid var(--cl-line)`, marginTop: 14, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 14, color: "#666", textDecoration: "line-through", fontFamily: "var(--cl-font-mono)" }}>Tổng giá trị thực tế: {c.value} VNĐ</span>
                <span style={{ fontSize: 22, fontWeight: 900, color: "var(--cl-accent)", fontFamily: "var(--cl-font-mono)" }}>Hôm nay: {c.price} VNĐ</span>
              </div>
            </div>

            <RegForm />

            <div style={{ marginTop: 32, paddingTop: 28, borderTop: `1px solid var(--cl-line)`, textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <IconGuarantee accent={t.accent} />
              </div>
              <p style={{ fontSize: 15, color: "var(--cl-text-body, #cfcfcf)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto", fontStyle: "italic", textWrap: "balance" }}>
                {c.guarantee}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
