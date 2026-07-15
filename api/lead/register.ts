import type { VercelRequest, VercelResponse } from '@vercel/node';

function viTimestamp() {
  return new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  try {
    const { name = "", phone = "", email = "", url = "" } = req.body || {};
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbzZLjbhxSzGSmBPZ3rzrQL-HOraI7WSe2y1N4tiqiLKCUOY8Q1bxJZ9_1cmagyT-qzN/exec";

    if (!GOOGLE_SCRIPT_URL) {
      console.warn("GOOGLE_SCRIPT_URL is not set. Cannot save to Google Sheets.");
      return res.status(200).json({ success: true, rowIndex: -1 });
    }

    const payload = {
      action: "append",
      values: [viTimestamp(), name, `'${phone}`, email, url, "chưa thanh toán"]
    };

    // We fetch Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Google Script failed with status ${response.status}`);
    }

    return res.status(200).json({ success: true, rowIndex: -1 });
  } catch (err: any) {
    console.error("Error registering lead:", err);
    return res.status(500).json({ error: "Failed to register lead", details: err.message });
  }
}
