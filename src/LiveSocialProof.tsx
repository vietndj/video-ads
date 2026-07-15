import { useEffect, useState } from "react";

const PROOFS = [
  // NHÓM 1: POP-UP "SỞ HỮU VŨ KHÍ & TÀI LIỆU" (Kích thích lòng tham)
  "Tuấn Anh (Hà Nội) vừa tải về thành công Bộ Prompt AI Kịch bản 2 cột cho ChatGPT 🤖",
  "Chị Lan (Chủ Shop - HCM) vừa nhận trọn bộ Tài liệu quy hoạch 7 loại B-roll minh họa 📁",
  "Hoàng Dũng (Đà Nẵng) vừa mở khóa kho dữ liệu Giải mã cấu trúc Video Trend Âu/Hàn 🔍",
  "Trang Phạm (Hải Phòng) vừa lưu về máy Sơ đồ Cài đặt Ánh sáng 3 Điểm chuẩn Studio 💡",
  "Thảo Vy (Solopreneur) vừa nhận đặc quyền Tặng Kèm Trợ Lý AI Kịch bản 🎁",

  // NHÓM 2: POP-UP "TIẾN ĐỘ THỰC HÀNH CỦA HỌC VIÊN" (Xóa bỏ nỗi sợ mua về vứt xó)
  "Anh Minh (Hà Nội) đang xem bài giảng Kỹ thuật Chuyển cảnh tàng hình (Cut on Action) ✂️",
  "Vy (Chủ Spa - Bình Dương) vừa truy cập Module Luân chuyển Ma trận Cỡ cảnh Toàn - Trung - Cận 🎥",
  "Đức Dũng (HCM) đang học bài Chữa bệnh đơ: Giải phóng ngôn ngữ cơ thể trước ống kính 🧘‍♂️",
  "Chị Mai (Bắc Ninh) vừa mở khóa bài học Luật Nhịp điệu 3 giây giữ chân khách hàng ⏱️",
  "Team Media Tuấn (Cần Thơ) đang xem hướng dẫn Giữ vững Kỷ luật đường mắt 1/3 📐",

  // NHÓM 3: POP-UP "GIAO DỊCH THỰC TẾ & SỰ ĐỒNG HÀNH" (Tăng độ Trust tuyệt đối)
  "Hải Đăng (Kinh doanh TMĐT) vừa thiết lập xong Góc quay Talking Head cố định 🎙️",
  "Chị Trâm Anh (Đà Lạt) vừa chốt cọc 500k để giữ vĩnh viễn Ưu đãi Quà tặng AI ⚡",
  "Anh Sơn (Nha Trang) vừa được hệ thống cấp quyền vào Nhóm hỗ trợ sửa video trực tiếp 🤝",
  "Bác sĩ Khánh (Hà Nội) vừa nâng cấp lên Gói Expert để chuẩn hóa kênh nhân hiệu 🚀",
  "Chị Phương (Đồng Nai) vừa quét QR thanh toán tự động, nhận ID đăng nhập sau 2 phút 📩"
];

const TIME_LABELS = [
  "vừa xong",
  "vài giây trước",
  "1 phút trước",
  "2 phút trước",
  "3 phút trước"
];

export default function LiveSocialProof() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLabel, setTimeLabel] = useState("vừa xong");
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    let active = true;
    let nextTimeout: any;

    const showNext = () => {
      if (!active) return;
      
      setCurrentIdx(Math.floor(Math.random() * PROOFS.length));
      setTimeLabel(TIME_LABELS[Math.floor(Math.random() * TIME_LABELS.length)]);
      setVisible(true);

      // Hide after 4.5 seconds
      nextTimeout = setTimeout(() => {
        setVisible(false);

        // Wait random 8 to 15 seconds before showing next
        const nextDelay = Math.floor(Math.random() * 7000) + 8000; // 8000ms to 15000ms
        nextTimeout = setTimeout(showNext, nextDelay);
      }, 4500);
    };

    // Initial delay: 11 seconds (11000ms)
    const initialTimeout = setTimeout(showNext, 11000);

    return () => {
      active = false;
      clearTimeout(initialTimeout);
      clearTimeout(nextTimeout);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 9999,
        maxWidth: 340,
        width: "calc(100% - 48px)",
        background: "rgba(18, 22, 33, 0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 14,
        padding: "14px 18px 14px 14px",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        transform: visible ? "translateY(0) scale(1)" : "translateY(100px) scale(0.95)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
      }}
    >
      {/* Pulse Green Dot */}
      <div style={{ 
        position: "relative", 
        width: 40, 
        height: 40, 
        borderRadius: "50%", 
        background: "rgba(255, 255, 255, 0.04)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flexShrink: 0 
      }}>
        <span style={{ fontSize: 18 }}>💡</span>
        <span
          style={{
            position: "absolute",
            bottom: 1,
            right: 1,
            width: 8,
            height: 8,
            background: "#10b981",
            borderRadius: "50%",
            border: "2px solid #121621",
            boxShadow: "0 0 6px #10b981",
            animation: "tw-pulse 2.2s infinite"
          }}
        />
      </div>

      {/* Message Info */}
      <div style={{ flex: 1, textAlign: "left" }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#f8fafc", lineHeight: 1.45 }}>
          {PROOFS[currentIdx]}
        </p>
        <span style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 3, display: "inline-block" }}>
          {timeLabel}
        </span>
      </div>

      {/* Close button */}
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => setDismissed(true), 500);
        }}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          background: "none",
          border: "none",
          color: "#64748b",
          fontSize: 16,
          cursor: "pointer",
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          transition: "color 0.2s"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#cbd5e1")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
      >
        ×
      </button>

      {/* Keyframe stylesheet injection */}
      <style>{`
        @keyframes tw-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .4; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
