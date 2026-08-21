const { GoogleGenAI } = require("@google/genai");

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const chat = ai.chats.create({ model: "gemini-3.5-flash" });
  try {
    const response = await chat.sendMessage({ message: [{ text: "Hello" }] });
    console.log("Success:", response.text);
  } catch (err) {
    console.error("SDK Error:", err);
  }
}
run();
