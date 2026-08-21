const fs = require('fs');
let code = fs.readFileSync('src/components/copilot/CirculAiCopilot.tsx', 'utf8');

// Inside handleSendMessage, capture history correctly
const newHandleSendMessage = `
  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || inputMessage;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: \`user-\${Date.now()}\`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage("");
    setIsLoading(true);

    try {
      const historyToSend = newHistory.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          history: historyToSend,
          context: { passport: activePassport, activeRole },
        }),
      });

      const data = await response.json();
`;

// Replace handleSendMessage up to `const data = await response.json();`
code = code.replace(/const handleSendMessage = async \(textOverride\?: string\) => \{[\s\S]*?const data = await response\.json\(\);/, newHandleSendMessage);

fs.writeFileSync('src/components/copilot/CirculAiCopilot.tsx', code);
