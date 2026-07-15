import React, { useState } from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, CtaButton } from "../components/ui";
import { useIsMobile } from "../components/ui";

export function SolutionsSection() {
  const t = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Chủ Shop / SMEs (Bán Ads)",
      subtitle: "Thoát cảnh quảng cáo lôm côm không ra đơn",
      pain: "Quay video bán hàng đặt máy chết một góc, review như đọc vẹt. Sản phẩm nhìn kém sang, 'hàng chợ', đổ tiền chạy quảng cáo là lỗ.",
      solution: "Dạy Ma trận Cỡ Cảnh (Toàn - Trung - Cận) để điều hướng mắt khán giả. Dùng Cảnh Cận (Close-up - Nam châm chi tiết) để khoe giá trị tinh hoa của sản phẩm, kích thích sự khao khát. Dùng ánh sáng khối làm sản phẩm nhìn đắt tiền. Dùng B-roll làm bằng chứng chốt sale.",
      leftLabel: "LÔM CÔM / HÀNG CHỢ",
      leftDesc: "Đặt máy từ xa góc tĩnh, nói đều đều, đánh sáng phòng phẳng lì rọi thẳng mặt.",
      rightLabel: "CHỈN CHU / ĐẤT TIỀN",
      rightDesc: "Luân chuyển cỡ cảnh theo nhịp nói, cận cảnh đặc tả giọt nước/đường nét sắc nét, setup ánh sáng ven nổi khối.",
      icon: "🏪"
    },
    {
      title: "Chuyên gia / KOC (Nhân hiệu)",
      subtitle: "Hệ thống sản xuất nhàn hạ, tự nhiên",
      pain: "Tự nghĩ kịch bản, tự setup lỉnh kỉnh mỗi ngày dẫn đến kiệt sức rồi bỏ hoang kênh. Đứng trước ống kính là bị đơ cứng, gượng gạo.",
      solution: "Setup định dạng Talking Head cố định bối cảnh 1 lần dùng mãi mãi. Dùng AI viết kịch bản 2 cột trong 1 phút. Áp dụng góc quay chéo 3/4 (giả lập cuộc hội thoại) kết hợp hành động vật lý (pha trà, lật sách) để cơ thể hát cùng ngôn từ tự nhiên, toát lên sự đĩnh đạc.",
      leftLabel: "LÊN HÌNH ĐƠ CỨNG",
      leftDesc: "Mắt nhìn chằm chằm trực diện vào camera gây áp lực lớn cho người xem, nói vấp phải quay lại nhiều lần.",
      rightLabel: "ĐĨNH ĐẠC & TỰ NHIÊN",
      rightDesc: "Góc quay chéo 3/4 thoải mái, cơ thể chuyển động theo hành động vật lý tự nhiên, đắp B-roll che lỗi vấp mượt mà.",
      icon: "🧠"
    },
    {
      title: "Editor / Tự học (Thẩm mỹ xịn)",
      subtitle: "Thoát mác 'Editor bình dân'",
      pain: "Lầm tưởng video đẹp là lạm dụng nhiều hiệu ứng lật trang 3D, giật chớp. Kết quả làm video bị rối mắt, sến sẩm và mất định vị chuyên nghiệp.",
      solution: "Đập tan ảo giác về phần mềm. Dạy kỹ thuật Cut on Action (chuyển cảnh vật lý tàng hình) và chuyển động cơ học tự nhiên (vung tay, lướt vật thể qua camera) giúp video mượt mà như một dòng chảy liên tục.",
      leftLabel: "HIỆU ỨNG SẾN SẨM",
      leftDesc: "Chèn hiệu ứng lật trang 3D lòe loẹt, chuyển cảnh giật cục phá vỡ sự thoải mái thị giác.",
      rightLabel: "CHUYỂN CẢNH TÀNG HÌNH",
      rightDesc: "Nối cảnh mượt mà bằng chuyển động vật lý cơ học, người xem không nhận ra vết cắt nhưng không thể rời mắt.",
      icon: "🎬"
    }
  ];

  return (
    <Sec maxWidth={900}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Label>Phân khúc nhu cầu</Label>
          <SH>Chọn Giải Pháp Cho Vấn Đề Của Bạn</SH>
          <p style={{ fontSize: 18, color: "var(--cl-text-muted, #888)", maxWidth: 620, margin: "-18px auto 0", lineHeight: 1.7 }}>
            Không học chung chung. Hãy chọn đúng toa giải pháp giải quyết trực tiếp điểm nghẽn của bạn.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <div style={{
          display: "flex", background: "var(--cl-card2)", border: `1px solid var(--cl-line)`,
          borderRadius: t.cardRadius, padding: 6, marginBottom: 32, gap: 6, flexWrap: "wrap"
        }}>
          {tabs.map((tab, idx) => {
            const active = idx === activeTab;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                style={{
                  flex: "1 1 200px", background: active ? "var(--cl-accent)" : "transparent",
                  color: active ? "var(--cl-accent-text)" : "var(--cl-text-body, #bbb)",
                  border: "none", borderRadius: Math.max(8, t.cardRadius - 6),
                  padding: "14px 18px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "all 0.2s ease"
                }}
              >
                <span>{tab.icon}</span><span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={140}>
        <div style={{
          background: `linear-gradient(135deg, var(--cl-card), var(--cl-card2))`, border: `1px solid var(--cl-line)`,
          borderRadius: t.cardRadius, padding: "40px 36px", position: "relative"
        }}>
          <p style={{ fontFamily: t.fontMono, fontSize: 12, color: "var(--cl-accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
            GIẢI PHÁP CHI TIẾT
          </p>
          <h3 style={{ fontFamily: t.fontDisplay, fontSize: 26, fontWeight: 700, marginBottom: 20, color: "var(--cl-text-base, #fff)" }}>
            {tabs[activeTab].subtitle}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--cl-danger)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: t.fontMono }}>
                ⚠ ĐIỂM ĐAU CỦA BẠN:
              </p>
              <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--cl-text-body, #b0b0b0)", margin: 0 }}>
                {tabs[activeTab].pain}
              </p>
            </div>

            <div style={{ borderTop: `1px solid var(--cl-line)`, paddingTop: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--cl-accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: t.fontMono }}>
                💡 TOA GIẢI PHÁP ĐÓNG GÓI:
              </p>
              <p style={{ fontSize: 18, lineHeight: 1.8, color: "var(--cl-text-base, #f0f0f0)", margin: 0 }}>
                {tabs[activeTab].solution}
              </p>
            </div>

            <div style={{
              marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20, background: "#08080a", border: `1px solid var(--cl-line)`,
              borderRadius: Math.max(8, t.cardRadius - 4), padding: "24px 20px"
            }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--cl-danger)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: t.fontMono }}>
                  ✗ {tabs[activeTab].leftLabel}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "#666", margin: 0 }}>
                  {tabs[activeTab].leftDesc}
                </p>
              </div>
              <div style={{ borderLeft: `1px solid var(--cl-line)`, paddingLeft: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--cl-accent)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: t.fontMono }}>
                  ✓ {tabs[activeTab].rightLabel}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--cl-text-body, #aaa)", margin: 0 }}>
                  {tabs[activeTab].rightDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}

export function DiscoverySection() {
  const c = useContent();
  const t = useTheme();
  const isMobile = useIsMobile();
  return (
    <Sec maxWidth={900}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.discoveryLabel}</Label>
          <SH typed>{c.discoveryHeading}</SH>
          <p style={{ fontSize: 19, color: "var(--cl-text-muted, #888)", maxWidth: 720, margin: "16px auto 0", lineHeight: 1.75, textWrap: "balance" }}>
            {c.discoverySub}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {c.discoveryItems.map((item, i) => {
            const isEven = i % 2 === 1;
            const isPlaceholder = item.gif.includes("unsplash.com");
            return (
              <div key={i} style={{
                background: "var(--cl-card)", border: `1px solid var(--cl-line)`,
                borderRadius: t.cardRadius, padding: isMobile ? "24px" : "32px",
                display: "grid", gridTemplateColumns: isMobile ? "1fr" : isEven ? "0.9fr 1.1fr" : "1.1fr 0.9fr",
                gap: isMobile ? "24px" : "40px", alignItems: "center"
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, order: isMobile ? 1 : isEven ? 2 : 1 }}>
                  <div style={{ fontFamily: t.fontMono, fontSize: 12, fontWeight: 700, color: "var(--cl-accent)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    // NGUYÊN LÝ 0{i + 1}
                  </div>
                  <h4 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.3 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--cl-text-body, #b0b0b0)", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
                <div style={{
                  order: isMobile ? 2 : isEven ? 1 : 2, width: "100%", aspectRatio: "4 / 5",
                  borderRadius: 12, overflow: "hidden", border: `1px solid var(--cl-line)`,
                  position: "relative", background: "var(--cl-card2)", display: "flex",
                  alignItems: "center", justifyContent: "center", cursor: "pointer",
                }} className="discovery-gif-container">
                  <img src={item.gif} alt={item.placeholderLabel} loading="lazy" style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    opacity: isPlaceholder ? 0.28 : 1, filter: isPlaceholder ? "grayscale(100%) contrast(1.1)" : "none",
                    transition: "all 0.4s ease"
                  }} />
                  {isPlaceholder && (
                    <div style={{
                      position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 30%, rgba(7,9,14,0.75) 100%)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, textAlign: "center"
                    }}>
                      <span style={{ fontSize: 24, marginBottom: 8, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}>🎬</span>
                      <span style={{
                        fontFamily: t.fontMono, fontSize: 12, fontWeight: 700, color: "var(--cl-accent)", letterSpacing: "0.05em",
                        background: "rgba(0,240,255,0.08)", border: `1px solid rgba(0,240,255,0.2)`, padding: "8px 14px",
                        borderRadius: 20, backdropFilter: "blur(4px)", textTransform: "uppercase"
                      }}>
                        {item.placeholderLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Sec>
  );
}

export function SolutionSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={800}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.solutionLabel}</Label>
          <SH typed>{c.solutionHeading}</SH>
          <p style={{ fontSize: 19, color: "var(--cl-text-muted, #888)", maxWidth: 720, margin: "16px auto 0", lineHeight: 1.75, textWrap: "balance" }}>
            {c.solutionSub}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{
          background: `linear-gradient(135deg, var(--cl-card), var(--cl-card2))`, border: `1px solid var(--cl-line)`,
          borderRadius: t.cardRadius, padding: "40px", display: "flex", flexDirection: "column", gap: 20
        }}>
          {c.solutionItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <span style={{ color: "var(--cl-accent)", fontSize: 24, lineHeight: 1 }}>✓</span>
              <p style={{ fontSize: 19, color: "#fff", lineHeight: 1.6, margin: 0 }}>{item}</p>
            </div>
          ))}
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <CtaButton label="Nâng Cấp Gu Hình Ảnh Ngay" />
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}
