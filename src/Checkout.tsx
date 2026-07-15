import { useEffect, useState, useCallback } from "react";
import { useTheme } from "./theme";
import { useContent } from "./content";
import LiveSocialProof from "./LiveSocialProof";

function useIsMobile(breakpoint = 680) {
  const [mobile, setMobile] = useState(() => window.innerWidth < breakpoint);
  const update = useCallback(() => setMobile(window.innerWidth < breakpoint), [breakpoint]);
  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  return mobile;
}

const GREEN = "#10b981"; // Emerald green for success states

const LANTAN_FAQS = [
  {
    q: "1. \"Mình mù công nghệ, dùng điện thoại đời cũ thì có theo học được không?\"",
    a: "Chắc chắn được. Khóa học này không dạy bạn các kỹ xảo phức tạp trên máy tính. Sự \"đắt tiền\" của video đến từ Tư duy Không gian. Mình sẽ hướng dẫn bạn tận dụng tối đa chiếc điện thoại đang có. Chỉ cần setup đúng góc máy và ánh sáng cơ bản, khung hình của bạn sẽ sắc nét và sang trọng không thua gì thợ quay chuyên nghiệp."
  },
  {
    q: "2. \"Mình rất ngại lên hình, cứ bật máy quay là đơ cứng và quên kịch bản?\"",
    a: "Sự đơ cứng đến từ việc bạn đang tự tạo áp lực \"trả bài\" trước ống kính. Mình sẽ hướng dẫn bạn setup góc máy ngồi chéo trò chuyện cực kỳ tự nhiên; và đặc biệt là kỹ thuật dùng Cảnh trám (B-roll). Lỡ nói vấp? Không sao cả, B-roll sẽ đắp vào và che đi mọi vết cắt một cách êm ái. Bạn không cần phải cố gồng mình để \"diễn\"!"
  },
  {
    q: "3. \"Tôi rất bận kinh doanh, sợ không có thời gian ngồi viết kịch bản?\"",
    a: "Xây dựng hình ảnh là để tối ưu công việc kinh doanh, không phải để vắt kiệt sức lực của bạn! Khóa học đã tích hợp sẵn Bộ lệnh (Prompt) Trợ lý AI chuyên sâu. Bạn chỉ cần Copy-paste vào ChatGPT hoặc Gemini, AI sẽ tự động trả về kịch bản phân rã 2 cột chi tiết. Rút ngắn 80% thời gian chuẩn bị để bạn rảnh tay làm chuyên môn."
  },
  {
    q: "4. \"Tôi đã xem rất nhiều hướng dẫn CapCut trên mạng, khóa này có gì khác biệt?\"",
    a: "Các video miễn phí chỉ dạy bạn \"mẹo vặt\" (bấm hiệu ứng chớp nháy, lật trang 3D). Những thứ đó làm mắt khách hàng mệt mỏi và hạ thấp giá trị thương hiệu. Ở đây, mình trao cho bạn một Khuôn mẫu Kiến trúc Thị giác. Hiểu được gốc rễ TẠI SAO phải dùng góc Cận Cảnh, TẠI SAO phải chuyển cảnh vật lý, bạn sẽ tự chủ sản xuất mà không bao giờ sợ bị nền tảng đổi thuật toán."
  },
  {
    q: "5. \"Đầu tư số tiền này liệu có mang lại hiệu quả thực tế không?\"",
    a: "Hãy làm một phép tính thực tế: Nếu bạn chạy Ads bằng những video lôm côm, phẳng lì, khách lướt qua trong 3 giây... bạn đang đốt tiền quảng cáo mỗi ngày một cách vô ích. Đầu tư khóa học này một lần, bạn đang xây dựng một \"Tấm khiên\" bảo vệ ngân sách chạy Ads, tiết kiệm chi phí thuê Media ngoài và tăng tỷ lệ chuyển đổi dài hạn."
  },
  {
    q: "6. \"Tôi chuyển khoản xong thì bao lâu mới được vào học? Có sợ bị lỗi không?\"",
    a: "Ngay lập tức. Hệ thống vận hành tự động 100%. Ngay khi bạn quét mã QR thanh toán thành công, tài khoản học sẽ được gửi qua Zalo và Email của bạn chỉ trong vòng 1-2 phút, bất kể là 12h đêm. Bạn có thể mở ra và bắt đầu học ngay lập tức."
  },
  {
    q: "7. \"Nếu tôi học xong, làm theo mà video vẫn không đẹp lên thì sao?\"",
    a: "Uy tín 15 năm làm nghề của mình được đặt lên hàng đầu. Khóa học có một Cam kết đồng hành bảo vệ rủi ro: Sau khi học, nếu bạn đã setup đúng góc máy, ánh sáng mà video vẫn chưa chuyên nghiệp, hãy gửi video đó qua Zalo. Đích thân mình sẽ quay màn hình \"bắt bệnh\" và sửa lỗi 1-1 cho bạn đến khi ưng ý. Mình nhận rủi ro về phần mình, để bạn yên tâm đầu tư!"
  }
];

// ─── Countdown (15-minute timer stored in sessionStorage) ───
function Countdown({ label = "Ưu đãi kết thúc sau:", hideLabel = false }: { label?: string; hideLabel?: boolean }) {
  const theme = useTheme();
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const duration = 15 * 60 * 1000; // 15 minutes
    let startStr = sessionStorage.getItem("video_checkout_timer_start");
    let startTime = startStr ? parseInt(startStr, 10) : 0;

    if (!startTime) {
      startTime = Date.now();
      sessionStorage.setItem("video_checkout_timer_start", startTime.toString());
    }

    let id: any;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const totalSec = Math.floor(remaining / 1000);

      setMinutes(Math.floor(totalSec / 60));
      setSeconds(totalSec % 60);

      if (remaining <= 0 && id) {
        clearInterval(id);
      }
    };

    tick();
    id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const Box = ({ v, l }: { v: string; l: string }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ background: theme.card2, border: `1px solid ${theme.line}`, borderRadius: 10, padding: "10px 16px", minWidth: 54 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: theme.accent, fontVariantNumeric: "tabular-nums" }}>{v}</span>
      </div>
      <span style={{ fontSize: 12, color: theme.textMuted ?? "#555", letterSpacing: "0.12em", fontWeight: 500 }}>{l}</span>
    </div>
  );

  return (
    <div>
      {!hideLabel && label && <p style={{ fontSize: 13, color: theme.textMuted ?? "#777", textAlign: "center", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>{label}</p>}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "center" }}>
        <Box v={pad(minutes)} l="PHÚT" />
        <span style={{ fontSize: 22, color: theme.accent, fontWeight: 800, paddingBottom: 14 }}>:</span>
        <Box v={pad(seconds)} l="GIÂY" />
      </div>
    </div>
  );
}

function Ck({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
      <span style={{ color: GREEN, fontWeight: 700, flexShrink: 0, fontSize: 16 }}>✓</span>
      <span style={{ fontSize: 15, lineHeight: 1.65, color: t.textBody ?? "#c0c0c0" }}>{children}</span>
    </div>
  );
}

function Card({ children, highlight = false, style: extraStyle = {} }: { children: React.ReactNode; highlight?: boolean; style?: React.CSSProperties }) {
  const t = useTheme();
  return (
    <div style={{
      background: highlight ? `linear-gradient(135deg, ${t.card}, ${t.card2})` : t.card,
      border: `1px solid ${highlight ? t.accent + "44" : t.line}`,
      borderRadius: t.cardRadius,
      padding: "24px 20px",
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

function Lbl({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return <div style={{ fontFamily: t.fontMono, fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", color: t.accent, textTransform: "uppercase" as const, marginBottom: 10 }}>{children}</div>;
}

function H({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <h2 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 18px", color: t.textBase ?? "#fff" }}>
      {children}
    </h2>
  );
}

function PaymentSuccessModal({ onClose }: { onClose: () => void }) {
  const t = useTheme();
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${t.bg}, ${t.card2})`,
        border: `1px solid ${GREEN}`,
        borderRadius: t.cardRadius, padding: "48px 32px",
        maxWidth: 480, width: "100%", textAlign: "center",
        boxShadow: `0 0 80px ${GREEN}44, 0 24px 64px rgba(0,0,0,0.8)`,
      }}>
        <div style={{ fontSize: 72, marginBottom: 20, lineHeight: 1 }}>✅</div>
        <h2 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, color: t.textBase ?? "#fff", margin: "0 0 12px" }}>
          Thanh toán thành công!
        </h2>
        <p style={{ fontSize: 15, color: t.textBody ?? "#aaa", lineHeight: 1.75, margin: "0 0 24px" }}>
          Chúng tôi đã nhận được chuyển khoản của bạn.
        </p>
        <div style={{ background: t.card, border: `1px solid ${t.line}`, borderRadius: t.cardRadius, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#666", marginBottom: 8, fontWeight: 600 }}>📧 Tài liệu và liên kết truy cập:</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: GREEN, margin: "0 0 4px" }}>Đã được gửi tới email của bạn</p>
          <p style={{ fontSize: 13, color: t.textMuted ?? "#555" }}>Vui lòng kiểm tra hộp thư (kể cả Spam) sau vài phút nhé!</p>
        </div>
        <div style={{ background: t.card2, borderRadius: Math.max(8, t.cardRadius - 4), padding: "14px 20px", marginBottom: 24 }}>
          {["🎬 Khóa học Tư Duy Làm Video Điện Thoại: Quay Là Cuốn", `🎁 ${c.valueStack.length > 1 ? c.valueStack[1].label : "Quà Tặng Độc Quyền"}`, "♾ Sở hữu vĩnh viễn"].map((item) => (
            <div key={item} style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0", padding: "4px 0", textAlign: "left" }}>{item}</div>
          ))}
        </div>
        <button onClick={onClose} style={{
          background: t.accent, color: t.accentText, border: "none",
          borderRadius: t.btnRadius, padding: "14px 36px",
          fontSize: 15, fontWeight: 800, cursor: "pointer",
          boxShadow: `0 0 24px ${t.accent}66`,
        }}>
          Đóng
        </button>
      </div>
    </div>
  );
}

function ConfirmBanner({ onReset }: { onReset: () => void }) {
  const t = useTheme();
  return (
    <div style={{ textAlign: "center", padding: "40px 20px", background: t.card2, border: `1px solid ${GREEN}44`, borderRadius: t.cardRadius }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
      <h2 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 800, marginBottom: 12, color: t.textBase ?? "#fff" }}>
        Cảm ơn bạn đã chuyển khoản!
      </h2>
      <p style={{ fontSize: 15, color: t.textBody ?? "#aaa", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 24px" }}>
        Chúng tôi đang xác minh giao dịch. Bạn sẽ nhận được tài liệu qua email <strong style={{ color: "#fff" }}>trong vòng 30 phút</strong> (giờ hành chính).
      </p>
      <div style={{ display: "inline-flex", flexDirection: "column", gap: 10, background: t.card, border: `1px solid ${t.line}`, borderRadius: Math.max(8, t.cardRadius - 4), padding: "20px 24px", marginBottom: 20, textAlign: "left" }}>
        {["🎬 Khóa học Tư Duy Làm Video Điện Thoại: Quay Là Cuốn", `🎁 ${c.valueStack.length > 1 ? c.valueStack[1].label : "Quà Tặng Độc Quyền"}`, "♾ Sở hữu vĩnh viễn"].map((item) => (
          <span key={item} style={{ fontSize: 15, color: t.textBody ?? "#c0c0c0" }}>{item}</span>
        ))}
      </div>
      <p style={{ fontSize: 15, color: t.textMuted ?? "#555", lineHeight: 1.6 }}>Chưa nhận email sau 30 phút? Liên hệ <a href="mailto:vietndj@gmail.com" style={{ color: t.accent }}>vietndj@gmail.com</a> &nbsp;|&nbsp; Zalo: <a href="https://zalo.me/0934688632" style={{ color: t.accent }}>0934.688.632</a></p>
      <button onClick={onReset} style={{ marginTop: 20, background: "transparent", border: `1px solid ${t.line}`, borderRadius: t.btnRadius, padding: "10px 24px", color: t.textMuted ?? "#555", fontSize: 13, cursor: "pointer" }}>
        Quay lại trang thanh toán
      </button>
    </div>
  );
}

type BankInfo = { name: string; account: string; holder: string; amount: string; content: string };

function PaymentPanel({ bank, qrUrl, onConfirm, onVideoClick }: { bank: BankInfo; qrUrl: string; onConfirm: () => void; onVideoClick: () => void }) {
  const c = useContent();
  const t = useTheme();
  const priceVal = parseInt(c.price.replace(/\./g, ""), 10);
  const originalVal = parseInt(c.value.replace(/\./g, ""), 10);
  const savingVal = originalVal - priceVal;
  const formattedSaving = new Intl.NumberFormat("vi-VN").format(savingVal);

  return (
    <Card highlight style={{ padding: "24px 20px" }}>


      <Lbl>Thanh toán ngay</Lbl>

      {/* Pricing block */}
      <div style={{ textAlign: "center", marginBottom: 18, paddingBottom: 18, borderBottom: `1px solid ${t.line}` }}>
        <div style={{ fontSize: 15, color: t.textMuted ?? "#555", textDecoration: "line-through" }}>{c.value} VNĐ</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: t.textBase ?? "#fff" }}>{c.price} <span style={{ fontSize: 16 }}>VNĐ</span></div>
        <div style={{ fontSize: 15, color: t.accent, fontWeight: 700 }}>Tiết kiệm {formattedSaving} VNĐ</div>
      </div>

      {/* 🎁 [Khối Quà Tặng FOMO] (Trên cùng) */}
      <div style={{
        background: "rgba(249, 115, 22, 0.08)", 
        border: "1px solid rgba(249, 115, 22, 0.35)",
        borderRadius: 14,
        padding: "18px 16px",
        marginBottom: 20,
        textAlign: "left"
      }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12, textAlign: "center" }}>
          🎁 QUÀ TẶNG BẢO ĐẢM NHẬN NGAY
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
          {c.bonusItems.slice(0, 2).map((bonus, idx) => (
            <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ color: "#f97316", fontSize: 15, lineHeight: 1.2 }}>✓</span>
              <p style={{ fontSize: 13, color: "#fff", margin: 0, lineHeight: 1.4, fontWeight: 600 }}>
                {bonus.title}
              </p>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px dashed rgba(249, 115, 22, 0.2)", paddingTop: 10, textAlign: "center" }}>
          <p style={{ fontSize: 12.5, color: "#e2e8f0", margin: "0 0 8px", fontWeight: 500 }}>
            Quà tặng sẽ tự động hủy sau:
          </p>
          <Countdown hideLabel />
        </div>
      </div>
      {/* 🎁 [Khối Early Bird FOMO] */}
      <div style={{
        background: "rgba(249, 115, 22, 0.08)",
        border: "1px solid #f97316",
        borderRadius: 14,
        padding: "18px 16px",
        marginBottom: 20,
        textAlign: "left",
        boxShadow: "0 0 30px rgba(249, 115, 22, 0.2)"
      }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12, textAlign: "center" }}>
          🎁 ĐẶC QUYỀN EARLY BIRD (Chỉ dành cho 20 người đầu tiên)
        </div>
        <p style={{ fontSize: 13, color: "#fff", margin: "0 0 10px", lineHeight: 1.5, fontWeight: 500 }}>
          Hoàn tất thanh toán tự động hôm nay, bạn được <strong>tặng 01 Phiên zoom 1-1 (20 phút) trực tiếp với mình</strong> để hướng dẫn và định hướng kịch bản riêng cho bạn.
        </p>
        <p style={{ fontSize: 12, color: "#f97316", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
          (Hệ thống ghi nhận chỉ còn lại 06 suất cuối cùng, bạn thông cảm nhé vì hiện tại mình vẫn phải đi dạy trên trường nên ko sẵn sàng cả ngày được).
        </p>
      </div>
      {/* 📱 [Khối Mã QR & Thanh Toán] (Ở giữa, to nhất) */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: t.accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          📱 QUÉT MÃ ĐỂ VÀO LỚP NGAY
        </p>
        <div style={{ 
          display: "inline-block", 
          background: "#fff", 
          padding: 12, 
          borderRadius: 14, 
          boxShadow: `0 0 40px ${t.accent}22`,
          border: `1px solid ${t.line}`
        }}>
          <img
            src={qrUrl}
            alt="QR chuyển khoản Khóa học"
            width={190}
            height={190}
            style={{ display: "block", borderRadius: 8, objectFit: "contain" }}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = "none";
              const parent = img.parentElement;
              if (parent) {
                parent.innerHTML = `<div style="width:190px;height:190px;display:flex;align-items:center;justify-content:center;background:#141417;border-radius:8px;font-size:12px;color:#fff;text-align:center;padding:16px;">QR lỗi</div>`;
              }
            }}
          />
        </div>
        <p style={{ fontSize: 15, color: t.textMuted ?? "#555", marginTop: 10 }}>Tương thích: Momo, VCB, Techcombank, MB Bank, BIDV, v.v.</p>
      </div>



      {/* NEW INSTRUCTIONS */}
      <div style={{ marginBottom: 18, background: t.card2, borderRadius: 12, padding: "14px 16px", border: `1px solid ${t.line}` }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: t.textMuted ?? "#777", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Hướng dẫn siêu tốc</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
          <span style={{ background: t.accent, color: t.accentText, fontSize: 12, fontWeight: 700, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</span>
          <span style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0" }}>Mở App Ngân hàng quét mã QR bên trên.</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ background: t.accent, color: t.accentText, fontSize: 12, fontWeight: 700, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</span>
          <span style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0" }}>
            Nhập nội dung: <strong style={{ color: "#fff" }}>{prefix} + [Số điện thoại của bạn]</strong>
          </span>
        </div>
      </div>

      {/* BACKUP_OLD_DESIGN_START
      <div style={{ background: t.card2, border: `1px solid ${t.line}`, borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: t.textMuted ?? "#777", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Thông tin chuyển khoản</p>
        {[
          ["Ngân hàng", bank.name],
          ["Chủ tài khoản", bank.holder],
          ["Số tài khoản", bank.account],
          ["Số tiền", `${bank.amount} VNĐ`],
          ["Nội dung CK", bank.content],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, gap: 8 }}>
            <span style={{ fontSize: 15, color: t.textMuted ?? "#555", flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 15, color: t.textBase ?? "#fff", fontWeight: 600, textAlign: "right" }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: t.textMuted ?? "#777", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Hướng dẫn từng bước</p>
        {[
          "Mở app ngân hàng → Chuyển khoản → Quét QR hoặc nhập số TK",
          `Nhập số tiền: ${bank.amount} VNĐ`,
          "Nội dung: VIDEO [SĐT của bạn]",
          "Xác nhận và hoàn tất chuyển khoản",
          'Nhấn nút "Tôi đã chuyển khoản" bên dưới',
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ background: t.accent, color: t.accentText, fontSize: 11, fontWeight: 700, borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0", lineHeight: 1.55 }}>{step}</span>
          </div>
        ))}
      </div>
      BACKUP_OLD_DESIGN_END */}

      <button
        onClick={onConfirm}
        style={{
          width: "100%", background: t.accent, color: t.accentText, border: "none",
          borderRadius: t.btnRadius, padding: "16px 16px",
          fontSize: 15, fontWeight: 800, cursor: "pointer",
          letterSpacing: "0.04em", textTransform: "uppercase",
          boxShadow: `0 0 32px 4px ${t.accent}44`,
        }}
      >
        ✅ TÔI ĐÃ CHUYỂN KHOẢN
      </button>

      {/* BACKUP_OLD_GUARANTEE_START
      <div style={{ 
        marginTop: 14, 
        padding: "10px 12px", 
        background: `${GREEN}11`, 
        border: `1px dashed ${GREEN}44`, 
        borderRadius: 10,
        display: "flex",
        alignItems: "flex-start",
        gap: 8
      }}>
        <span style={{ color: GREEN, fontSize: 16, lineHeight: 1 }}>🛡️</span>
        <p style={{ fontSize: 12.5, color: t.textBody ?? "#ccc", margin: 0, lineHeight: 1.45, textAlign: "left" }}>
          <strong>Cam kết đồng hành:</strong> Bất kể bạn gặp khó khăn nào về góc máy, ánh sáng, thiết bị hay kịch bản, nhận ngay lịch gọi Zoom 1-1 để mình trực tiếp gỡ rối.
        </p>
      </div>
      BACKUP_OLD_GUARANTEE_END */}

      <p style={{ fontSize: 15, color: t.textMuted ?? "#555", textAlign: "center", marginTop: 16, marginBottom: 20, lineHeight: 1.6 }}>
        Link truy cập khóa học gửi qua email trong vài phút sau khi xác nhận.
      </p>

      {/* 💬 Zalo Support Safety Net */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <p style={{ fontSize: 14, color: t.textBody ?? "#ccc", marginBottom: 12, fontWeight: 600 }}>
          🎧 Gặp sự cố khi quét mã hoặc chưa nhận được link?
        </p>
        <a
          href="https://zalo.me/0934688632"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "rgba(0, 104, 255, 0.1)",
            border: "1px solid rgba(0, 104, 255, 0.4)",
            color: "#0068ff",
            padding: "12px 16px",
            borderRadius: 12,
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 14,
            whiteSpace: "nowrap",
            transition: "all 0.2s ease",
            cursor: "pointer",
            animation: "zalo-glow 1.5s infinite"
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = "rgba(0, 104, 255, 0.15)"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "rgba(0, 104, 255, 0.1)"; }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" style={{ width: 20, height: 20 }} />
          Nhấn vào đây để nhắn Zalo hỗ trợ ngay
        </a>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18, paddingTop: 14, borderTop: `1px solid ${t.line}`, flexWrap: "nowrap", overflowX: "auto" }}>
        {[["🔒", "Bảo mật"], ["↩", "Hoàn tiền 24h"], ["⚡", "Nhận ngay"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: t.textMuted ?? "#555", whiteSpace: "nowrap" }}>
            <span>{icon}</span><span>{label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function UrgencyNote() {
  const c = useContent();
  const t = useTheme();
  return (
    <div style={{ background: t.card2, border: `1px solid ${t.accent}33`, borderRadius: Math.max(8, t.cardRadius - 4), padding: "16px 18px" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: t.accent, marginBottom: 6 }}>⚠ Lưu ý quan trọng</p>
      <p style={{ fontSize: 15, color: t.textBody ?? "#888", lineHeight: 1.65, margin: 0 }}>
        Ưu đãi {c.price} VNĐ chỉ dành riêng cho 50 người đầu tiên. Sau khi đợt kết thúc, giá sẽ trở về <strong style={{ color: t.textBase ?? "#fff" }}>{c.value} VNĐ</strong> và không áp dụng thêm ưu đãi.
      </p>
    </div>
  );
}

function GuaranteeBox() {
  const t = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Box 1: Money Back */}
      <div style={{ background: t.card2, border: `1px solid ${GREEN}33`, borderRadius: Math.max(8, t.cardRadius - 4), padding: "16px 18px" }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: GREEN, marginBottom: 8 }}>💰 Cam kết hoàn tiền 100% — 24 giờ</p>
        <p style={{ fontSize: 15, color: t.textBody ?? "#666", lineHeight: 1.65, margin: 0 }}>
          Nếu bạn không hài lòng vì bất kỳ lý do gì, chúng tôi hoàn tiền 100% trong 24 giờ. Không hỏi lý do.
        </p>
      </div>
      {/* Box 2: 1-1 Review Guarantee */}
      <div style={{ background: t.card2, border: `1px solid ${t.accent}33`, borderRadius: Math.max(8, t.cardRadius - 4), padding: "16px 18px" }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: t.accent, marginBottom: 8 }}>🛡️ Đồng hành & Gỡ rối 1-1 cùng giảng viên</p>
        <p style={{ fontSize: 15, color: t.textBody ?? "#666", lineHeight: 1.65, margin: 0 }}>
          Bất kể bạn gặp khó khăn ở bước nào — từ setup góc máy, hướng đặt đèn, tối ưu thiết bị âm thanh đến lên kịch bản — hãy nhắn cho mình để nhận ngay lịch gọi Zoom trực tiếp gỡ rối và tối ưu hóa 1-1.
        </p>
      </div>
    </div>
  );
}

function CheckoutContent() {
  const t = useTheme();
  const c = useContent();
  const priceVal = parseInt(c.price.replace(/\./g, ""), 10);
  const originalVal = parseInt(c.value.replace(/\./g, ""), 10);
  const savingVal = originalVal - priceVal;
  const formattedSaving = new Intl.NumberFormat("vi-VN").format(savingVal);
  const [confirmed, setConfirmed] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const isMobile = useIsMobile();

  const rawCustomer = localStorage.getItem("video_customer");
  const customer = rawCustomer ? JSON.parse(rawCustomer) as { phone?: string } : {};
  const phone = customer.phone || "[SĐT CỦA BẠN]";
  const prefix = (c as any).transferPrefix || "VIDEO";
  const transferContent = `${prefix} ${phone}`;

  const BANK: BankInfo = { name: "TPBank", account: "88804101986", holder: "NGUYEN DUC VIET", amount: c.price, content: transferContent };
  const QR_URL = `https://img.vietqr.io/image/TPB-${BANK.account}-compact2.png?amount=${c.price.replace(/\./g, "")}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK.holder)}`;

  const handleManualConfirm = async () => {
    setConfirmed(true);
    try {
      const raw = localStorage.getItem("video_customer");
      const cust = raw ? JSON.parse(raw) as { name?: string; phone?: string; email?: string; url?: string } : {};
      const rowIndex = parseInt(localStorage.getItem("video_row") ?? "0", 10) || undefined;
      await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cust.name ?? "",
          phone: cust.phone ?? "",
          email: cust.email ?? "",
          url: cust.url ?? "",
          transactionId: "MANUAL_" + Date.now(),
          rowIndex,
        }),
      });
    } catch { /* silent */ }
  };

  // Polling: detect payment automatically via SePay
  useEffect(() => {
    let since = localStorage.getItem("video_payment_since");
    if (!since) {
      since = Date.now().toString();
      localStorage.setItem("video_payment_since", since);
    }
    let active = true;

    const poll = async () => {
      if (!active || paymentSuccess) return;
      try {
        const res = await fetch(`/api/payment/check?since=${since}&phone=${phone}`);
        if (!res.ok) return;
        const data = await res.json() as { found: boolean; transaction?: { id: string } };
        if (data.found && active && !paymentSuccess) {
          setPaymentSuccess(true);
          setShowModal(true);
          localStorage.removeItem("video_payment_since");
          
          const raw = localStorage.getItem("video_customer");
          const customer = raw ? JSON.parse(raw) as { name?: string; phone?: string; email?: string; url?: string } : {};
          const rowIndex = parseInt(localStorage.getItem("video_row") ?? "0", 10) || undefined;
          await fetch("/api/payment/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: customer.name ?? "",
              phone: customer.phone ?? "",
              email: customer.email ?? "",
              url: customer.url ?? "",
              transactionId: data.transaction?.id ?? "",
              rowIndex,
            }),
          });
        }
      } catch { /* silent */ }
    };

    const id = setInterval(poll, 5000);
    poll();
    return () => { active = false; clearInterval(id); };
  }, [paymentSuccess, phone]);

  return (
    <div style={{ background: t.bg, color: t.textBase ?? "#fff", fontFamily: t.fontBody, minHeight: "100vh" }}>
      {showModal && <PaymentSuccessModal onClose={() => setShowModal(false)} />}
      {showVideoModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99999,
          background: "rgba(0,0,0,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16,
        }}
        onClick={() => setShowVideoModal(false)}
        >
          <div style={{
            position: "relative",
            maxWidth: 800,
            width: "100%",
            aspectRatio: "16 / 9",
            background: "#000",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 50px rgba(0,0,0,0.8)",
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/CaDZiACYrV8?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              style={{ border: "none" }}
            />
            <button 
              onClick={() => setShowVideoModal(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: "#fff",
                fontSize: 20,
                cursor: "pointer",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <header style={{ borderBottom: `1px solid ${t.line}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 900 }}>
          VIDEO<span style={{ color: t.accent }}>.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔒</span>
          <span style={{ fontSize: 15, color: t.textMuted ?? "#555" }}>Thanh toán bảo mật</span>
        </div>
      </header>

      {/* ── URGENCY BAR ── */}
      <div style={{ background: t.accent, padding: "10px 16px", textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.04em", lineHeight: 1.4, color: t.accentText }}>
          ⚡ ƯU ĐÃI ĐẶC BIỆT — CHỈ DÀNH CHO HỌC VIÊN ĐÃ ĐĂNG KÝ — HOÀN TẤT NGAY ĐỂ GIỮ GIÁ NÀY
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 80px" }}>

        {/* ── DECISION CONFIRMATION ── */}
        <div style={{ textAlign: "center", padding: "40px 0 0" }}>
          <Lbl>Xác nhận quyết định</Lbl>
          <h1 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(22px, 4.2vw, 38px)", fontWeight: 800, lineHeight: 1.25, margin: "0 0 14px", color: t.textBase ?? "#fff" }}>
            Bạn đang hoàn tất đơn hàng<br />
            <em style={{ color: t.accent, fontStyle: "normal", fontWeight: 800 }}>
              {(c as any).checkoutTitle ? <span dangerouslySetInnerHTML={{ __html: (c as any).checkoutTitle }} /> : <>Tư Duy Làm Video Điện Thoại:<br />Quay Là Cuốn</>}
            </em>
          </h1>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#888", maxWidth: 520, margin: "0 auto 12px", lineHeight: 1.6 }}>
            Chỉ còn một bước nữa — chuyển khoản và truy cập ngay toàn bộ khóa học + 5 bài học quà tặng trong hôm nay.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: t.card2, border: `1px solid ${GREEN}33`, borderRadius: 50, padding: "8px 20px" }}>
            <span style={{ color: GREEN, fontSize: 14 }}>✓</span>
            <span style={{ fontSize: 15, color: t.textBody ?? "#aaa" }}>Bạn đã đăng ký thành công — chỉ cần hoàn tất thanh toán</span>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr min(360px, 100%)",
          gap: 20,
          marginTop: 36,
          alignItems: "start",
        }}>

          {/* MOBILE: QR panel first */}
          {isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {confirmed
                ? <ConfirmBanner onReset={() => setConfirmed(false)} />
                : <PaymentPanel bank={BANK} qrUrl={QR_URL} onConfirm={handleManualConfirm} onVideoClick={() => setShowVideoModal(true)} />
              }
              <UrgencyNote />
              <GuaranteeBox />
            </div>
          )}

          {/* LEFT column — order details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            {/* PRICING TABLE CARD */}
            <Card>
              <Lbl>Thông tin đơn hàng</Lbl>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: t.textBase ?? "#fff" }}>Khóa học Video The Creator</div>
                  <div style={{ fontSize: 15, color: t.textMuted ?? "#666", marginTop: 4 }}>Tư duy quay dựng video bằng điện thoại</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 15, color: t.accent, fontWeight: 700 }}>Tiết kiệm {formattedSaving} VNĐ</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: t.textBase ?? "#fff" }}>{c.price}<span style={{ fontSize: 16 }}> VNĐ</span></div>
                </div>
              </div>
            </Card>

            {/* WHAT YOU GET */}
            <Card>
              <Lbl>Bạn nhận được gì ngay hôm nay</Lbl>
              <H>Truy cập ngay sau xác nhận</H>
              {((c as any).checkoutFeatures || [
                "Khóa học Video The Creator: Tư duy quay dựng video bằng điện thoại",
                "Quyền sở hữu vĩnh viễn — học mọi lúc, mọi nơi, mọi thiết bị",
                "Kho 50+ âm thanh điện ảnh (SFX) bốc nhất",
                "Kho Nhạc Nền \"MasterClass\" Độc Bản (mình tạo bằng AI chuyên dụng nên sử dụng sạch bản quyền nhé)",
                "Sơ đồ đánh sáng 3 điểm cho phòng nhỏ",
                "Bộ template CapCut chuyển cảnh nghệ thuật",
                "Checklist 15 điểm QC trước khi đăng để giữ video sắc nét",
              ]).map((item: string, i: number) => <Ck key={i}>{item}</Ck>)}
            </Card>

            {/* BONUS STACK */}
            <Card>
              <Lbl>🎁 5 Bonus đặc biệt</Lbl>
              <H><em>Trị giá 1.250.000 VNĐ — tặng kèm miễn phí</em></H>
              {c.bonusItems.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>
                    {i === 0 ? "🎵" : i === 1 ? "🎹" : i === 2 ? "💡" : i === 3 ? "🎬" : "📋"}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>BONUS {i + 1}: {b.title}</div>
                    <div style={{ fontSize: 15, color: t.textMuted ?? "#555" }}>Trị giá: <s>250.000 VNĐ</s> — <span style={{ color: GREEN }}>Tặng miễn phí</span></div>
                  </div>
                </div>
              ))}
            </Card>

            {/* TESTIMONIALS */}
            <Card>
              <Lbl>Góc chia sẻ thật từ những anh chị em đã áp dụng</Lbl>
              {((c as any).checkoutTestimonials || [
                { 
                  name: "Chị Thu Lan", 
                  role: "Chủ shop Thời trang nữ (Hà Nội)", 
                  text: "Đúng là biết thế đăng ký học sớm cho đỡ tốn tiền đi mua điện thoại mới. Mình quay bằng con máy cũ mà áp dụng cách setup 2 cái đèn của thầy xong, lên hình nhìn da dẻ nổi khối đắt tiền hẳn. Bữa đăng video lên mấy khách quen còn nhắn tin hỏi 'Nay shop đầu tư thuê studio quay à' =)) Hình ảnh sang lên cái là khách tin tưởng, chốt đơn cũng dễ hơn hẳn." 
                },
                { 
                  name: "Anh Minh Đức", 
                  role: "Đào tạo Kỹ năng & Tư vấn (Đà Nẵng)", 
                  text: "Sợ nhất cái khoản cứ nhìn thẳng vào ống kính là mắt lác lác xong đơ như khúc gỗ, quay chục lần mới xong cái clip. Áp dụng cái bài đổi góc quay chéo chéo giống đang trò chuyện, xong biết cách lấy cảnh trám lấp liếm mấy chỗ nói vấp, giờ làm video tự nhiên và đĩnh đạc hơn bao nhiêu. Đặc biệt quả Trợ lý AI kịch bản nhàn thật sự, ném chủ đề vào là ra kịch bản quay luôn. Đáng đồng tiền bát gạo!" 
                },
                { 
                  name: "Quốc Bảo", 
                  role: "Kinh doanh & Phân phối Mỹ phẩm (TP. HCM)", 
                  text: "Hồi xưa mình cứ thấy người ta làm hiệu ứng giật giật lật trang trên Tiktok là đú theo, chả hiểu sao chạy quảng cáo toàn lỗ. Xem bài cỡ cảnh với luật nhịp điệu 3 giây mới vỡ lẽ ra, bán hàng là video phải êm ái khách mới chịu xem. Đổi góc quay cận cảnh sản phẩm mượt mượt tí, dạo này chạy Ads chi phí ra tin nhắn giảm hẳn mà khách chốt đều, không hỏi lằng nhằng nhiều nữa. Cảm ơn thầy!" 
                },
              ]).map((testimonial: any, i: number) => (
                <div key={i} style={{ borderTop: i === 0 ? "none" : `1px solid ${t.line}`, paddingTop: i === 0 ? 0 : 16, marginBottom: 16 }}>
                  <div style={{ color: "#FFB800", fontSize: 13, marginBottom: 6 }}>★★★★★</div>
                  <p style={{ fontSize: 15, color: t.textBody ?? "#b0b0b0", fontStyle: "italic", lineHeight: 1.65, marginBottom: 8 }}>"{testimonial.text}"</p>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.textBase ?? "#fff" }}>
                    👉 {testimonial.name} <span style={{ color: t.textMuted ?? "#888", fontWeight: 400 }}>— {testimonial.role}</span>
                  </div>
                </div>
              ))}
            </Card>

            {/* GIẢI ĐÁP NHỮNG LĂN TĂN CỦA BẠN TRƯỚC KHI XUỐNG TIỀN */}
            <Card>
              <Lbl>Giải đáp những lăn tăn của bạn trước khi xuống tiền!</Lbl>
              {((c as any).checkoutFaqs || LANTAN_FAQS).map((f: any, i: number) => (
                <div key={i} style={{ borderBottom: i < ((c as any).checkoutFaqs || LANTAN_FAQS).length - 1 ? `1px solid ${t.line}` : "none" }}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    style={{
                      width: "100%", background: "none", border: "none", color: t.textBase ?? "#fff", cursor: "pointer",
                      padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                      textAlign: "left", fontSize: 15, fontWeight: 700, lineHeight: 1.55,
                    }}
                  >
                    <span style={{ flex: 1 }}>{f.q}</span>
                    <span style={{ color: t.accent, fontSize: 18, flexShrink: 0, transition: "transform 0.2s", transform: faqOpen === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                  </button>
                  {faqOpen === i && (
                    <div style={{ fontSize: 15, color: t.textBody ?? "#888", lineHeight: 1.75, paddingBottom: 16 }}>
                      👉 {f.a}
                    </div>
                  )}
                </div>
              ))}
            </Card>
          </div>

          {/* RIGHT column — desktop only */}
          {!isMobile && (
            <div style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {confirmed
                ? <ConfirmBanner onReset={() => setConfirmed(false)} />
                : <PaymentPanel bank={BANK} qrUrl={QR_URL} onConfirm={handleManualConfirm} onVideoClick={() => setShowVideoModal(true)} />
              }
              <UrgencyNote />
              <GuaranteeBox />
            </div>
          )}
        </div>

        {/* ── FINAL CTA BAR ── */}
        <div style={{ marginTop: 40, background: `linear-gradient(135deg, ${t.card}, ${t.card2})`, border: `1px solid ${t.accent}33`, borderRadius: t.cardRadius, padding: "32px 24px", textAlign: "center" }}>
          <Lbl>Bước cuối cùng</Lbl>
          <h2 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(20px, 3.5vw, 32px)", fontWeight: 800, margin: "0 0 12px", color: t.textBase ?? "#fff" }}>
            Chuyển khoản ngay và bắt đầu<br /><span style={{ color: t.accent, fontWeight: 800 }}>lột xác hình ảnh chuyên gia hôm nay.</span>
          </h2>
          <p style={{ fontSize: 15, color: t.textBody ?? "#777", marginBottom: 24, lineHeight: 1.65 }}>
            Trong khi những người khác vẫn chật vật với clip "phèn" và tuyệt vọng nhìn khách lướt qua — bạn sẽ thảnh thơi với dòng khách tự động chuyển đổi nhờ Tư Duy Làm Video Điện Thoại: Quay Là Cuốn.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: t.accent, color: t.accentText, border: "none", borderRadius: t.btnRadius,
              padding: "18px 40px", fontSize: 16, fontWeight: 800, cursor: "pointer",
              letterSpacing: "0.04em", textTransform: "uppercase",
              boxShadow: `0 0 40px 6px ${t.accent}66`,
            }}
          >
            ↑ QUAY LÊN ĐỂ THANH TOÁN
          </button>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#555", marginTop: 16 }}>
            Đảm bảo hoàn tiền 100% trong 24 giờ · Truy cập vĩnh viễn
          </p>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign: "center", paddingTop: 48, borderTop: `1px solid ${t.line}`, marginTop: 40 }}>
          <div style={{ fontFamily: t.fontDisplay, fontSize: 20, fontWeight: 900, marginBottom: 12, color: t.textBase ?? "#fff" }}>
            VIDEO<span style={{ color: t.accent }}>.</span>
          </div>
          <p style={{ fontSize: 15, color: t.textMuted ?? "#444", lineHeight: 1.8 }}>
            © 2026 Tư Duy Làm Video Điện Thoại: Quay Là Cuốn · fedu.vn · Mọi quyền được bảo lưu.<br />
            <a href="mailto:vietndj@gmail.com" style={{ color: t.textMuted ?? "#555" }}>vietndj@gmail.com</a> | Zalo: 0934.688.632
          </p>
        </div>
      </div>
      <LiveSocialProof />
    </div>
  );
}

export default function Checkout() {
  return <CheckoutContent />;
}
