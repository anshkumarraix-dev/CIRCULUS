export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  return res.status(200).json({
    status: "ok",
    version: "1.0.0",
    service: "CIRCULUS Industrial Protocol API (Vercel Serverless)",
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY",
    blockchainMode: process.env.BLOCKCHAIN_MODE || "mock",
  });
}
