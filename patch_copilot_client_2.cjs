const fs = require('fs');
let code = fs.readFileSync('src/components/copilot/CirculAiCopilot.tsx', 'utf8');

const replacement = `
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: \`user-\${Date.now()}\`,
      sender: "user",
      text: query,
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
          query,
          history: historyToSend,
          context: {
            activeRole: activeRole.name,
            orgName: activeRole.orgName,
            location: activeRole.location,
            passport: activePassport ? {
              id: activePassport.id,
              title: activePassport.title,
              category: activePassport.category,
              quantityMT: activePassport.quantityMT,
              reusabilityScore: activePassport.reusabilityScore,
              location: activePassport.location,
              locationState: activePassport.locationState,
            } : null
          },
        }),
      });

      const data = await response.json();
`;

const regex = /const handleSendMessage = async \(textToSend\?: string\) => \{[\s\S]*?const data = await response\.json\(\);/;
code = code.replace(regex, replacement);

fs.writeFileSync('src/components/copilot/CirculAiCopilot.tsx', code);
