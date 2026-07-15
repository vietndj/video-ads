import { createContext, useContext, createElement } from "react";
import type { ReactNode } from "react";

export interface BlocksMeta {
  order: string[];
  hidden: string[];
  media: Record<string, any[]>;
  custom: Record<string, { title: string; body: string }>;
}

// ─── Data types ───────────────────────────────────────────────
export interface BrandCard { brand: string; q: string; a: string }
export interface SkillCard { n: string; title: string; desc: string; warn: string; gif?: string }
export interface Stage { n: string; title: string; sub: string; desc: string; gif?: string }
export interface BonusItem { icon: string; title: string; desc: string; image?: string; }
export interface ProductItem { icon: string; title: string; desc: string }
export interface ValueLine { label: string; price: string }
export interface FailItem { fail: string; why: string }
export interface Benefit { title: string; desc: string }

export interface PageContent {
  _v?: number;
  price: string;
  value: string;

  // Section 1: Hero
  heroBadge: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroAccentLine: string;
  heroSub: string;
  heroCta: string;
  heroSubPrice?: string;

  // Section 2: Pain
  painLabel: string;
  painHeading: string;
  painBlockquote: string;
  painPara: string;
  painListHeading: string;
  painList: string[];
  painConclusion?: string;

  // Section 3: Expert / Instructor
  instructorLabel: string;
  instructorHeading: string;
  instructorInitials: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string[];
  instructorInsight?: string;
  instructorPhoto?: string;

  // Product embed overrides
  productsEbookEmbed?: string;
  productsVideoGif?: string;

  // Section 4: Products
  productsLabel?: string;
  productsHeading?: string;
  productsSub?: string;
  products: ProductItem[];
  midCta: string;

  // Section 5: Skills
  skillsLabel: string;
  skillsHeading: string;
  skillCards: SkillCard[];

  // Section 6: Roadmap
  roadmapLabel: string;
  roadmapHeading: string;
  roadmapPreviewHeading?: string;
  roadmapPreviewDesc?: string;
  roadmapIframeUrl?: string;
  roadmapChaptersHeading?: string;
  roadmapChaptersGif?: string;
  stages: Stage[];

  // Section 7: Bonuses
  bonusesLabel: string;
  bonusesHeading: string;
  bonusesSub: string;
  bonuses: BonusItem[];
  bonusesCta: string;
  bonusGif?: string;

  // Section 8: Before/After
  baLabel: string;
  baHeading: string;
  baSub: string;
  beforeLabel: string;
  afterLabel: string;
  beforeItems: string[];
  afterItems: string[];

  // Section 9: Final CTA
  urgencyBar: string;
  ctaLabel: string;
  ctaHeading: string;
  ctaSub: string;
  countdownLabel: string;
  valueStackTitle: string;
  valueStack: ValueLine[];
  guarantee: string;

  // Footer
  footerBrand: string;
  footerDot: string;
  footerTagline: string;
  footerLinks: string[];
  footerCopyright: string;

  // Legacy fields
  cycleLabel: string;
  cycleHeading: string;
  cyclePara: string;
  cycleItems: FailItem[];
  cycleConclusion: string;
  discoveryLabel: string;
  discoveryHeading: string;
  discoveryPara1: string;
  discoveryPara2: string;
  brandCards: BrandCard[];
  insightBox: string;
  solutionLabel: string;
  solutionHeading: string;
  solutionSub: string;
  benefits: Benefit[];
  bonusesTitle: string;

  blocksMeta: BlocksMeta;
}

const CONTENT_SCHEMA_VERSION = 6;

export const DEFAULT_CONTENT: PageContent = {
  _v: CONTENT_SCHEMA_VERSION,
  price: "599.000",
  value: "3.550.000",

  heroBadge: "8 NĂM KINH DOANH THỰC CHIẾN · 15 NĂM GIẢNG VIÊN FPT ARENA",
  heroHeadline1: "DỪNG NGAY VIỆC ĐỐT TIỀN CHẠY ADS",
  heroHeadline2: "VỚI NHỮNG VIDEO THIẾU NIỀM TIN.",
  heroAccentLine: "Sở hữu hệ thống kịch bản mồi câu và tư duy khung hình chuyển đổi cao. Tự tay sản xuất video chốt sale sắc nét, chỉn chu ngay trên chiếc điện thoại của bạn — không cần phụ thuộc Agency.",
  heroSub: "Đừng để khách hàng lướt qua sau 3 giây đầu tiên chỉ vì video của bạn trông như \"hàng chợ\". Giải pháp không nằm ở thiết bị đắt tiền, mà ở Tư duy sắp xếp không gian và Tâm lý học chốt sale.",
  heroCta: "SỞ HỮU QUY TRÌNH VIDEO CHUYỂN ĐỔI NGAY",
  heroSubPrice: "Video Ads Thực Chiến: Quay Là Chốt — Giá 3.550.000 VNĐ chỉ còn 599.000 VNĐ",

  painLabel: "Chi phí Ads ngốn sạch lợi nhuận",
  painHeading: "Camp cắn tiền rất nhanh, nhưng tỷ lệ chuyển đổi lẹt đẹt vì Video đang tự \"hạ thấp\" giá trị sản phẩm?",
  painBlockquote: '"Khách hàng ngày càng khó tính. Họ không mua sản phẩm của bạn vì video quảng cáo thiếu tính đĩnh đạc và không tạo ra đủ niềm tin (Trust)." ',
  painPara: "Đây là những nguyên nhân khiến ngân sách quảng cáo của bạn \"đổ sông đổ biển\":",
  painListHeading: "",
  painList: [
    "Khách lướt qua sau 3 giây: Thiếu Hook (mồi câu) thị giác khiến mọi nỗ lực target đối tượng đổ vỡ ngay lập tức.",
    "Sản phẩm xịn thành \"hàng chợ\": Ánh sáng phẳng lì, góc máy phèn làm mất đi sự cao cấp và đáng tin cậy.",
    "Kịch bản như \"đọc vẹt\": Không có điểm nhấn tâm lý, người xem không cảm thấy khao khát phải mua ngay.",
    "Phụ thuộc Agency đắt đỏ: Chi hàng chục triệu mỗi tháng nhưng không kiểm soát được chất lượng và tốc độ ra video."
  ],
  painConclusion: "Để tối ưu chi phí (CPM rẻ, CTR cao), thứ bạn cần không phải là học cách bấm máy quay — mà là học Tư duy cấu trúc hình ảnh để biến người xem thành người mua hàng.",

  instructorLabel: "Người đồng hành",
  instructorHeading: "Người đồng hành tối ưu\nhình ảnh kinh doanh cùng bạn",
  instructorInitials: "NĐV",
  instructorName: "Nguyễn Đức Việt",
  instructorTitle: "8 năm kinh doanh thực chiến · Founder Fedu.vn · Kỹ sư Bách Khoa",
  instructorBio: [
    "8 năm kinh doanh thực chiến: Hiểu rõ video làm ra phải phục vụ mục tiêu mang lại doanh thu, tỷ lệ chốt sale, và tối ưu chi phí Ads.",
    "Kỹ sư Công nghệ Phần mềm: Đóng gói nghệ thuật quay dựng thành quy trình logic, có tính lặp lại (Hệ thống hóa).",
    "15 năm Giảng viên FPT Arena: Nắm giữ nền tảng học thuật vững chắc về tâm lý học thị giác.",
  ],
  instructorInsight: '"Một video quảng cáo xuất sắc không phải là một video đầy kỹ xảo, mà là một nhân viên chốt sale không bao giờ ngủ, giao tiếp bằng ngôn ngữ thị giác và đánh gục rào cản phòng thủ của khách hàng."',

  productsLabel: "Gói THE BUSINESS",
  productsHeading: "Hệ Thống Video Chuyển Đổi",
  productsSub: "Khóa học Video Ads Thực Chiến: Quay Là Chốt cung cấp trọn bộ Tư duy Quay dựng trên Điện thoại kết hợp Trợ lý AI Viết kịch bản phân rã. Bạn chỉ cần nhập sản phẩm, máy sẽ thiết kế Hook và Cảnh quay.",
  products: [
    {
      icon: "🎬",
      title: "6 Buổi Đào Tạo Thực Chiến",
      desc: "Từ tư duy không gian, setup bối cảnh tại shop, đến tâm lý học kịch bản và vũ đạo ống kính. Làm chủ khả năng tự sản xuất video bán hàng.",
    },
    {
      icon: "🤖",
      title: "Hệ Thống Prompt AI Chốt Sale",
      desc: "AI tạo Kịch bản 2 Cột: Cột Lời thoại đánh đúng tử huyệt tâm lý khách hàng, Cột Hình ảnh hướng dẫn góc quay, cỡ cảnh chi tiết.",
    },
  ],
  midCta: "SỞ HỮU GÓI THE BUSINESS — CHỈ 599.000 VNĐ",

  skillsLabel: "Kỹ năng ra tiền",
  skillsHeading: "6 Kỹ năng biến video của bạn thành\n\"Cỗ Máy Chốt Sale\" liên tục",
  skillCards: [
    { n: "01", title: "Luật Hook 3 Giây Đầu Tiên", desc: "Sử dụng mồi câu thị giác và ngôn từ mạnh để chống lướt, giữ chân khách hàng ngay lập tức.", warn: "Thiếu điều này: khách lướt qua, mọi nỗ lực target Ads trở nên vô nghĩa." },
    { n: "02", title: "Góc Cận Cảnh Kích Thích", desc: "Đưa ống kính vào chi tiết sản phẩm để tạo sự khao khát sở hữu, làm nổi bật chất lượng thật.", warn: "Thiếu điều này: sản phẩm xịn lên hình nhìn như hàng đại trà." },
    { n: "03", title: "Setup Ánh Sáng Triệu Đô", desc: "Đánh sáng nổi khối 3D giúp tăng độ Trust, sản phẩm trông đắt tiền và sang trọng hơn.", warn: "Thiếu điều này: ánh sáng mờ nhạt khiến thương hiệu trông thiếu chuyên nghiệp." },
    { n: "04", title: "Ngôn Ngữ Cơ Thể Bán Hàng", desc: "Phong thái đĩnh đạc, giao tiếp bằng ánh mắt chân thành để tạo sự thuyết phục tuyệt đối.", warn: "Thiếu điều này: lên hình gượng ép, đọc vẹt kịch bản, mất điểm tin cậy." },
    { n: "05", title: "Chuyển Cảnh Tâm Lý", desc: "Giữ nhịp độ video không bị nhàm chán bằng các góc máy luân chuyển mượt mà.", warn: "Thiếu điều này: video lê thê, khách hàng thoát ra trước khi đến đoạn CTA." },
    { n: "06", title: "Kịch Bản Bán Hàng Bằng AI", desc: "Sử dụng công thức viết lời thoại đánh trúng tử huyệt tâm lý khách hàng do AI tối ưu sẵn.", warn: "Thiếu điều này: vắt óc nghĩ kịch bản hàng giờ, kết quả giống như học thuộc bài." },
  ],

  roadmapLabel: "Lộ trình 6 buổi tối ưu",
  roadmapHeading: "Từ số 0 đến\nVideo Ads chuyển đổi cao",
  roadmapPreviewHeading: "Thực chiến & Hướng tới doanh thu",
  roadmapPreviewDesc: "Chỉ tập trung vào những kiến thức giúp bạn ra đơn và tối ưu chi phí. Áp dụng ngay tại Shop của bạn.",
  roadmapIframeUrl: "",
  roadmapChaptersHeading: "Lộ trình gói THE BUSINESS:",
  stages: [
    { n: "Buổi 1", title: "Tư Duy Video Chuyển Đổi", sub: "Chống lướt", desc: "Bóc tách thuật toán giữ chân khách hàng. Làm chủ Luật Hook 3 Giây đầu tiên." },
    { n: "Buổi 2", title: "Ma Trận Góc Máy", sub: "Trưng bày đẳng cấp", desc: "Sử dụng các cỡ cảnh (Toàn - Trung - Cận) để trưng bày sản phẩm như một món đồ đắt tiền." },
    { n: "Buổi 3", title: "Ánh Sáng Bán Hàng", sub: "Setup tại Shop", desc: "Quy trình setup bối cảnh và ánh sáng tinh gọn ngay tại cửa hàng để tăng độ Trust." },
    { n: "Buổi 4", title: "Tâm Lý Học Kịch Bản", sub: "Vũ đạo ống kính", desc: "Phân tích tử huyệt khách hàng. Cách đứng trước ống kính đĩnh đạc, chốt sale tự nhiên." },
    { n: "Buổi 5", title: "Ứng Dụng AI Phân Rã", sub: "Tự động hóa", desc: "Sử dụng hệ thống Prompt AI để viết kịch bản quảng cáo 2 cột siêu nhanh, chuẩn tâm lý." },
    { n: "Buổi 6", title: "Thực Chiến Video Ads", sub: "Đóng gói quy trình", desc: "Hoàn thiện và xuất bản video quảng cáo đạt chuẩn, sẵn sàng lên Camp chốt đơn." },
  ],

  bonusesLabel: "Tài nguyên kinh doanh",
  bonusesHeading: "Vũ khí gia tăng tỷ lệ chuyển đổi\nngay trong chiến dịch đầu tiên",
  bonusesSub: "Cung cấp sẵn template để bạn không phải làm lại từ đầu.",
  bonuses: [
    { icon: "💡", title: "Kho Mẫu Hook Chống Lướt 3 Giây", desc: "Tổng hợp các mẫu câu tiêu đề giật tít, đánh trúng insight khách hàng để bắt đầu video." },
    { icon: "📋", title: "Bộ Lệnh AI Phân Tích Khách Hàng", desc: "Prompt giúp AI phân tích tệp khách hàng mục tiêu và viết kịch bản chốt sale cá nhân hóa." },
    { icon: "⏱️", title: "Sơ Đồ Setup Studio Tinh Gọn", desc: "Hướng dẫn bố trí đèn, máy quay bằng điện thoại tại cửa hàng sao cho chuẩn ánh sáng đắt tiền." },
    { icon: "🤖", title: "Vault Kịch Bản Mẫu Winning", desc: "Các cấu trúc kịch bản đã tiêu hàng tỷ đồng tiền Ads và chứng minh được hiệu quả ra đơn." },
    { icon: "🎥", title: "Kho 500+ Cinematic B-Roll 4K", desc: "Tài nguyên cảnh trám để tăng thêm độ Trust và tính thẩm mỹ cao cấp cho video." },
  ],
  bonusesCta: "ĐĂNG KÝ NGAY ĐỂ NHẬN TRỌN BỘ CÔNG CỤ",

  baLabel: "Hiệu quả đo lường",
  baHeading: "Sự khác biệt của việc làm chủ hệ thống",
  baSub: "Không chỉ đẹp hơn, mà là bán được nhiều hàng hơn với chi phí rẻ hơn.",
  beforeLabel: "TRƯỚC (ĐỐT TIỀN ADS)",
  afterLabel: "SAU (TỐI ƯU CHUYỂN ĐỔI)",
  beforeItems: [
    "CPM đắt đỏ, chi phí ra tin nhắn/đơn hàng cao.",
    "Khách hỏi giá xong im lặng, tỷ lệ chốt thấp.",
    "Video nhìn phèn, ánh sáng thiếu sức sống.",
    "Đọc vẹt kịch bản, không có điểm nhấn tâm lý."
  ],
  afterItems: [
    "Tối ưu CPM/CTR nhờ video giữ chân tốt.",
    "Chốt đơn dễ dàng vì video đã xây dựng sẵn niềm tin.",
    "Hình ảnh sắc nét, sản phẩm trông cao cấp đắt tiền.",
    "Phong thái đĩnh đạc, kịch bản tạo sự khao khát."
  ],

  urgencyBar: "⚠ GÓI THE BUSINESS GIỚI HẠN — CHỈ CÒN {PRICE} VNĐ",
  ctaLabel: "Video Ads Thực Chiến: Quay Là Chốt",
  ctaHeading: "Đầu tư một hệ thống tinh gọn,\nthu hồi vốn chỉ sau vài đơn hàng.",
  ctaSub: "Đừng để video kém chất lượng cản trở tốc độ tăng trưởng của bạn. Sở hữu ngay Hệ thống Tư duy Khung hình và Prompt AI để tự tay sản xuất video chốt sale sắc nét.",
  countdownLabel: "⏳ Ưu đãi đóng lại sau:",
  valueStackTitle: "Tổng giá trị Gói THE BUSINESS:",
  valueStack: [
    { label: "Khóa học Video Ads Thực Chiến: Quay Là Chốt (6 Buổi)", price: "3.550.000 VNĐ" },
    { label: "Trọn bộ Tài Nguyên Kinh Doanh & Prompt AI", price: "Tặng kèm" }
  ],
  guarantee: "🛡️ Cam kết hoàn tiền 100%: Nếu áp dụng đúng quy trình mà video không cải thiện chất lượng, hoàn tiền đàng hoàng trong 7 ngày.",

  footerBrand: "FEDU",
  footerDot: ".",
  footerTagline: "Hệ Thống Video Chuyển Đổi THE BUSINESS — fedu.vn",
  footerLinks: ["Privacy Policy", "Terms & Conditions", "Chính sách hoàn tiền", "Liên hệ hỗ trợ"],
  footerCopyright: "COPYRIGHT 2026 | NGUYỄN ĐỨC VIỆT",

  // Legacy
  cycleLabel: "", cycleHeading: "", cyclePara: "", cycleItems: [], cycleConclusion: "", discoveryLabel: "", discoveryHeading: "", discoveryPara1: "", discoveryPara2: "", brandCards: [], insightBox: "", solutionLabel: "", solutionHeading: "", solutionSub: "", benefits: [], bonusesTitle: "",

  blocksMeta: {
    order: ["hero", "pain", "instructor", "solutions", "products", "skills", "roadmap", "bonuses", "before-after", "cta", "footer"],
    hidden: ["solutions"],
    media: {},
    custom: {},
  },
};

export const ContentCtx = createContext<PageContent>(DEFAULT_CONTENT);

export function useContent(): PageContent {
  return useContext(ContentCtx);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  return createElement(ContentCtx.Provider, { value: DEFAULT_CONTENT }, children);
}
