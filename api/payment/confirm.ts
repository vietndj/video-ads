import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  try {
    const { name = "", phone = "", email = "", url = "", transactionId = "", rowIndex } = req.body || {};
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbzZLjbhxSzGSmBPZ3rzrQL-HOraI7WSe2y1N4tiqiLKCUOY8Q1bxJZ9_1cmagyT-qzN/exec";
    const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "https://hook.us2.make.com/mdc9dfwges9r1v06momkpboh9auhrtgu";

    if (!GOOGLE_SCRIPT_URL) {
      console.warn("GOOGLE_SCRIPT_URL is not set. Skipping sheet status update.");
    } else {
      const payload = {
        action: "update_status",
        phone: phone,
        status: "Đã thanh toán"
      };

      const updateRes = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let updateData: any = {};
      const contentType = updateRes.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        updateData = await updateRes.json();
      } else {
        const text = await updateRes.text();
        console.warn(`Google Script confirm status returned text: ${text}, status: ${updateRes.status}`);
      }

      // Use updated email/name from sheet or frontend fallback
      const customerEmail = updateData.email || email;
      const customerName = updateData.name || name;

      // Trigger Make.com webhook if email exists
      if (customerEmail) {
        console.log(`Triggering Make.com webhook for Skool automation for ${customerEmail}...`);
        await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: customerName,
            email: customerEmail,
            phone: phone,
            course: "Video Masterclass",
            transactionId
          })
        }).catch(err => console.error("Failed to call Make webhook:", err));
      }
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Error confirming payment:", err);
    return res.status(500).json({ error: "Failed to confirm payment", details: err.message });
  }
}
