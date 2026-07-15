import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "../theme";
import { useContent } from "../content";

export const MONO = "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace";

export function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth < breakpoint);
  const update = useCallback(() => setMobile(window.innerWidth < breakpoint), [breakpoint]);
  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  return mobile;
}

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  
  return (
    <div ref={ref} className="fade-in-section" style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export function ScrollTypewriter({ text, speed = 18, delay = 0, highlightText }: { text: string; speed?: number; delay?: number; highlightText?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const t = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      });
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const chars = Array.from(text);
    let index = 0;
    setDisplayText("");
    setIsDone(false);
    const dt = setTimeout(() => {
      const iv = setInterval(() => {
        if (index < chars.length) {
          const ch = chars[index];
          setDisplayText(prev => prev + ch);
          index++;
        } else {
          clearInterval(iv);
          setIsDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(dt);
  }, [hasStarted, text, speed, delay]);

  const chars = Array.from(text);
  const currentLength = displayText.length;

  const highlightStart = highlightText ? text.indexOf(highlightText) : -1;
  const highlightEnd = highlightStart !== -1 ? highlightStart + highlightText.length : -1;

  return (
    <span ref={ref} style={{ position: "relative", display: "inline", whiteSpace: "pre-line" }}>
      {hasStarted ? (
        <>
          {hasStarted && !isDone && currentLength === 0 && (
            <span className="tw-cursor" style={{ background: t.accent }} />
          )}
          {chars.map((char, idx) => {
            const isTyped = idx < currentLength;
            const showCursorHere = hasStarted && !isDone && idx === currentLength - 1;
            const isHighlighted = highlightStart !== -1 && idx >= highlightStart && idx < highlightEnd;
            return (
              <span key={idx} style={{ position: "relative", display: "inline" }}>
                <span style={{
                  color: isTyped ? (isHighlighted ? "var(--cl-accent)" : "inherit") : "transparent",
                  fontWeight: isHighlighted ? 900 : "inherit",
                  userSelect: isTyped ? "auto" : "none",
                  pointerEvents: isTyped ? "auto" : "none",
                }}>
                  {char}
                </span>
                {showCursorHere && (
                  <span className="tw-cursor" style={{ background: "var(--cl-accent)" }} />
                )}
              </span>
            );
          })}
        </>
      ) : (
        <span style={{ opacity: 0 }}>{text}</span>
      )}
    </span>
  );
}

export function NL({ str }: { str: string }) {
  return (
    <>
      {str.split("\n").map((p, i) => (
        <span key={i}>{i > 0 && <br />}{p}</span>
      ))}
    </>
  );
}

export function Countdown() {
  const t = useTheme();
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  useEffect(() => {
    const dayStart = Math.floor(Date.now() / 86400000) * 86400000;
    const tick = () => {
      const elapsed = Math.floor((Date.now() - dayStart) / 1000) % 86400;
      const remaining = 86400 - elapsed;
      setTime({ h: Math.floor(remaining / 3600), m: Math.floor((remaining % 3600) / 60), s: remaining % 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
      {[{ v: pad(time.h), l: "GIỜ" }, { v: pad(time.m), l: "PHÚT" }, { v: pad(time.s), l: "GIÂY" }].map(({ v, l }, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ background: "#161a1b", border: `1px solid ${t.accent}33`, borderRadius: 10, padding: "10px 18px", minWidth: 64, textAlign: "center", boxShadow: `0 0 22px -8px ${t.accent}` }}>
            <span style={{ fontSize: 32, fontWeight: 800, fontFamily: MONO, fontVariantNumeric: "tabular-nums", color: "var(--cl-accent)" }}>{v}</span>
          </div>
          <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#666", fontFamily: MONO }}>{l}</span>
        </div>
      )).reduce((acc, el, i) => i < 2 ? [...acc, el, <span key={`sep${i}`} style={{ fontSize: 28, fontWeight: 800, color: "var(--cl-accent)", marginTop: -18 }}>:</span>] : [...acc, el], [] as React.ReactNode[])}
    </div>
  );
}

export function CtaButton({ label }: { label: string }) {
  const t = useTheme();
  const isOutline = t.btnVariant === "outline";
  const isGhost   = t.btnVariant === "ghost";
  return (
    <a
      href="#dang-ky"
      onClick={(e) => { e.preventDefault(); document.getElementById("dang-ky")?.scrollIntoView({ behavior: "smooth" }); }}
      className={`cl-btn ${isOutline ? "cl-btn--outline" : isGhost ? "cl-btn--ghost" : "cl-btn--solid"}`}
    >
      {label}
    </a>
  );
}

export function Scarcity() {
  const c = useContent();
  return (
    <p className="cl-scarcity">
      🔥 Ưu đãi đặc quyền — chỉ còn {c.price} VNĐ
    </p>
  );
}

export function Sec({ children, style = {}, maxWidth = 820 }: { children: React.ReactNode; style?: React.CSSProperties; maxWidth?: number }) {
  const cls = maxWidth >= 940 ? "cl-sec cl-sec--wide" : maxWidth <= 760 ? "cl-sec cl-sec--narrow" : "cl-sec";
  return (
    <section className={cls} style={maxWidth !== 820 && maxWidth !== 940 && maxWidth !== 760 ? { maxWidth, ...style } : style}>
      {children}
    </section>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="cl-label">
      <span style={{ opacity: 0.4 }}>// </span>{children}
    </div>
  );
}

export function SH({ children, center = true, typed = false }: { children: React.ReactNode; center?: boolean; typed?: boolean }) {
  const textStr = typeof children === "string" ? children : null;
  return (
    <h2 className={center ? "cl-sh" : "cl-sh cl-sh--left"}>
      {typed && textStr ? <ScrollTypewriter text={textStr} speed={22} /> : children}
    </h2>
  );
}

export function Check({ children, icon = "›", color: colorProp }: { children: React.ReactNode; icon?: string; color?: string }) {
  return (
    <div className="cl-check">
      <span className="cl-check__icon" style={{ color: colorProp || "var(--cl-accent)" }}>{icon}</span>
      <span className="cl-check__text">{children}</span>
    </div>
  );
}

export function Div() {
  return <div className="cl-divider" />;
}

export function ThemeSyncer() {
  const t = useTheme();
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--cl-bg",           t.bg);
    r.style.setProperty("--cl-card",         t.card);
    r.style.setProperty("--cl-card2",        t.card2);
    r.style.setProperty("--cl-accent",       t.accent);
    r.style.setProperty("--cl-accent-text",  t.accentText);
    r.style.setProperty("--cl-line",         t.line);
    r.style.setProperty("--cl-danger",       t.danger);
    r.style.setProperty("--cl-text-base",    t.textBase  ?? "#f0f0f0");
    r.style.setProperty("--cl-text-body",    t.textBody  ?? "#b0b0b0");
    r.style.setProperty("--cl-text-muted",   t.textMuted ?? "#666666");
    r.style.setProperty("--cl-radius",       `${t.cardRadius}px`);
    r.style.setProperty("--cl-radius-sm",    `${Math.max(6, t.cardRadius - 6)}px`);
    r.style.setProperty("--cl-font-display", t.fontDisplay);
    r.style.setProperty("--cl-font-body",    t.fontBody);
    r.style.setProperty("--cl-font-mono",    t.fontMono);
    r.style.setProperty("--cl-font-accent",  t.fontAccent);
  }, [t]);
  return null;
}

export function AppYTEmbed({ url, caption }: { url: string; caption?: string }) {
  const ytId = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/|live\/))([a-zA-Z0-9_-]{11})/
  )?.[1];
  const isShorts = url.includes("/shorts/");
  
  if (!ytId) return null;
  return (
    <>
      <div style={{ position: "relative", width: "100%", paddingBottom: isShorts ? "177.78%" : "56.25%", height: 0, background: "#000" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
          title="YouTube video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
      {caption && <p style={{ fontSize: 13, color: "var(--cl-text-muted)", textAlign: "center", padding: "10px 20px", fontStyle: "italic", fontFamily: MONO }}>{caption}</p>}
    </>
  );
}

export function MediaSection({ blockId }: { blockId: string }) {
  const c = useContent();
  const t = useTheme();
  const media = c.blocksMeta?.media ?? {};
  const items = media[blockId] ?? [];
  if (!items.length) return null;
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 20px 0" }}>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 20, borderRadius: t.cardRadius, overflow: "hidden", border: `1px solid var(--cl-line)` }}>
          {item.type === "image" && (
            <>
              <img src={item.url} loading="lazy" alt={item.caption || ""}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                style={{ width: item.fit === "half" ? "50%" : "100%", display: "block", maxHeight: 520, objectFit: "cover" }} />
              {item.caption && <p style={{ fontSize: 13, color: "var(--cl-text-muted)", textAlign: "center", padding: "10px 20px", fontStyle: "italic", fontFamily: MONO }}>{item.caption}</p>}
            </>
          )}
          {item.type === "youtube" && <AppYTEmbed url={item.url} caption={item.caption} />}
        </div>
      ))}
    </div>
  );
}
