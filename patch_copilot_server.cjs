const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const newCopilotRoute = `
  // API: CirculAI Reuse Copilot
  app.post("/api/copilot", async (req, res) => {
    try {
      const userPrompt = req.body.query || req.body.prompt || req.body.message || "";
      const contextPassport = req.body.context?.passport || req.body.contextPassport || req.body.context;
      const activeRoleName = req.body.context?.activeRole?.name || req.body.context?.activeRole?.orgName || "Facility User";
      const activeRoleLocation = req.body.context?.activeRole?.location || "India";
      
      const history = req.body.history || [];

      if (!userPrompt.trim() && history.length === 0) {
        return res.json({
          success: true,
          reply: "Namaste! Please ask any question about scrap recycling, material testing, government green rules, or carbon savings in simple words.",
          followUps: [
            "What new products can be manufactured from aluminium scrap?",
            "How much smoke and coal is saved by recycling 18 tons of metal?",
            "What government rules apply when selling scrap in India?",
            "How long is the drive from Sanand to Surat?"
          ]
        });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // High quality, domain-specific fallback generator
        const fallback = generateCopilotFallbackReply(userPrompt, contextPassport);
        return res.json({
          success: true,
          reply: fallback.reply,
          followUps: fallback.followUps,
          source: "circulus_domain_engine",
        });
      }

      const systemPrompt = \`You are CirculAI Copilot, the intelligent material, recycling, and circular economy assistant for CIRCULUS in India.
User: \${activeRoleName} (Location: \${activeRoleLocation})
Selected material batch context:
- Name/Type: \${contextPassport?.title || contextPassport?.materialType || "General industrial scrap"}
- Grade: \${contextPassport?.grade || "Standard Recyclable Grade"}
- Quantity: \${contextPassport?.quantityMT || "Batch"} MT
- Location/State: \${contextPassport?.location || contextPassport?.locationState || "India"}
- Supplier Location: Sanand, GJ
- Buyer Location: Surat, GJ

Guidelines:
1. Explain recycling concepts clearly using simple, professional words that even a 10th-grade student or busy factory supervisor can understand easily.
2. Answer queries related to the real-time location or distance between the buyer and supplier using Google Maps grounding.
3. Structure your response with clean bullet points and bold highlights.
4. Keep the answer concise.
5. At the very end of your response, on a new line, suggest 2 or 3 short follow-up questions formatted as:
FOLLOW_UPS:
- Question 1
- Question 2\`;

      // Build contents array for multi-turn chat
      const contents = history.map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));
      
      // If it's the first message and history doesn't include it (due to some reason), push it, but we expect history to include the latest user prompt.
      // Wait, let's assume the frontend passes the FULL history including the current user query.
      if (contents.length === 0 && userPrompt) {
        contents.push({ role: "user", parts: [{ text: userPrompt }] });
      }

      // Use gemini-3.5-flash with googleMaps tool as requested
      const modelName = "gemini-3.5-flash";
      
      let response = null;
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: systemPrompt,
            tools: [{ googleMaps: {} }]
          }
        });
      } catch (modelErr: any) {
        console.warn(\`[AI Copilot] Model \${modelName} error:\`, sanitizeErrorMessage(modelErr));
        // Fallback to gemini-3.1-pro-preview or domain fallback
        const fallback = generateCopilotFallbackReply(userPrompt, contextPassport);
        return res.json({
          success: true,
          reply: fallback.reply,
          followUps: fallback.followUps,
          source: "domain_knowledge_engine",
        });
      }

      if (response && response.text) {
        const fullText = response.text || "";
        let replyText = fullText;
        const followUps: string[] = [];

        if (fullText.includes("FOLLOW_UPS:")) {
          const parts = fullText.split("FOLLOW_UPS:");
          replyText = parts[0].trim();
          const lines = parts[1].split("\\n").map(l => l.replace(/^[-*•\\d.]+\\s*/, "").trim()).filter(Boolean);
          lines.slice(0, 3).forEach(l => followUps.push(l));
        }

        if (followUps.length === 0) {
          followUps.push(
            "How much CO₂ emissions are avoided by recycling this batch?",
            "What is the real time driving distance from supplier to buyer?",
            "What government rules apply when selling scrap in India?"
          );
        }

        return res.json({
          success: true,
          reply: replyText,
          followUps,
          source: \`gemini_copilot_\${modelName}\`,
        });
      }

      const fallback = generateCopilotFallbackReply(userPrompt, contextPassport);
      return res.json({
        success: true,
        reply: fallback.reply,
        followUps: fallback.followUps,
        source: "domain_knowledge_engine",
      });
    } catch (err: any) {
      console.warn("[AI Copilot] Handled request with domain fallback:", sanitizeErrorMessage(err));
      const userPrompt = req.body.query || req.body.prompt || "";
      const contextPassport = req.body.context?.passport || req.body.contextPassport;
      const fallback = generateCopilotFallbackReply(userPrompt, contextPassport);
      return res.json({
        success: true,
        reply: fallback.reply,
        followUps: fallback.followUps,
        source: "domain_knowledge_engine",
      });
    }
  });
`;

// Replace the existing app.post("/api/copilot", ...) block
const startPattern = /\/\/ API: CirculAI Reuse Copilot\n\s*app\.post\("\/api\/copilot"[\s\S]*?(?=\/\/ Vite middleware setup)/;
code = code.replace(startPattern, newCopilotRoute + "\n  ");

fs.writeFileSync('server.ts', code);
