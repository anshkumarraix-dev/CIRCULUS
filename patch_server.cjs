const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const chatEndpoint = `
  // AI Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { history, message, systemInstruction } = req.body;
      const ai = getGeminiClient();
      if (!ai) {
        return res.status(500).json({ success: false, error: "Gemini API key not configured." });
      }

      // We'll use gemini-3.5-flash as the default for general tasks
      const model = "gemini-3.5-flash";

      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      // If there's history, we need to format it or use it. Actually \`ai.chats.create\` accepts history.
      // The history should be [{ role: "user" | "model", parts: [{ text: "..." }] }]
      const formattedHistory = history ? history.map((h: any) => ({
        role: h.role,
        parts: [{ text: h.text }]
      })) : [];

      const chatWithHistory = ai.chats.create({
        model,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: formattedHistory,
      });

      const response = await chatWithHistory.sendMessage({ message: [{ text: message }] });

      return res.json({
        success: true,
        text: response.text
      });
    } catch (error) {
      console.error("Chat API Error:", error);
      return res.status(500).json({
        success: false,
        error: sanitizeErrorMessage(error)
      });
    }
  });
`;

code = code.replace(/app\.get\("\/api\/health"/, chatEndpoint + '\n  app.get("/api/health"');

fs.writeFileSync('server.ts', code);
