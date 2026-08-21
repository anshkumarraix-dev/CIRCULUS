const { GoogleGenAI } = require("@google/genai");
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const chat = ai.chats.create({
    model: "gemini-3.5-flash",
    config: {
      systemInstruction: "You are a helpful AI",
      temperature: 0.7
    },
    history: []
  });
  console.log("Chat created");
  try {
    const res = await chat.sendMessage({ message: [{ text: "Hello" }] });
    console.log(res.text);
  } catch (e) {
    console.error("Error sending:", e);
  }
}
run();
