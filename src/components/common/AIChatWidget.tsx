import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, Minimize2, Loader2, Sparkles, RotateCcw, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { generateLocalCopilotResponse } from "../../utils/aiCopilotEngine";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  source?: "gemini_live" | "circulus_knowledge_base";
}

const SUGGESTED_PROMPTS = [
  "📋 CPCB EPR Plastic Rules",
  "⚡ Fly Ash MoEFCC Mandate",
  "🛡️ Digital Product Passport (DPP)",
  "🌱 Carbon LCA Avoidance Factors",
  "⚙️ HMS Steel Scrap Pricing",
  "🧪 rPET Technical Specifications"
];

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "model",
      text: "👋 Welcome to **CIRCULUS Industrial Copilot**! I'm your AI assistant for circular economy compliance, secondary material valuation, CPCB/SPCB EPR guidelines, and Digital Product Passports.\n\nHow can I help your facility today?",
      source: "circulus_knowledge_base"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "model",
        text: "Conversation cleared. How can I assist you with your secondary materials, EPR certificates, or passports?",
        source: "circulus_knowledge_base"
      }
    ]);
  };

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isTyping) return;

    const userMessage = queryText.trim();
    setInput("");
    const userMsgObj: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: userMessage
    };
    const updatedMessages = [...messages, userMsgObj];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      // Format history for payload
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text
      }));

      // Try server endpoint first
      let aiText = "";
      let source: "gemini_live" | "circulus_knowledge_base" = "circulus_knowledge_base";

      try {
        const response = await fetch("/api/copilot-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            history: historyPayload,
            systemInstruction: "You are the CIRCULUS Industrial Copilot, an expert AI assistant specializing in Indian industrial circular economy, CPCB/SPCB EPR regulations, Digital Product Passports (DPP), material valuation, and carbon lifecycle assessment (LCA)."
          })
        });

        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            if (data.success && data.text) {
              aiText = data.text;
              source = data.source === "gemini_live" ? "gemini_live" : "circulus_knowledge_base";
            }
          }
        }
      } catch (networkErr) {
        console.warn("[Copilot] Server endpoint unreachable, activating local intelligence fallback:", networkErr);
      }

      // If backend was not reached or returned fallback, generate from local domain engine
      if (!aiText) {
        aiText = generateLocalCopilotResponse(userMessage, historyPayload);
        source = "circulus_knowledge_base";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: "model",
          text: aiText,
          source
        }
      ]);
    } catch (err) {
      console.error("[Copilot Error]:", err);
      // Graceful fallback guarantees no dead error message
      const fallbackReply = generateLocalCopilotResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: "model",
          text: fallbackReply,
          source: "circulus_knowledge_base"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    sendQuery(input);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="open-ai-chat-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 p-3.5 sm:p-4 rounded-full glass-panel glow-edge-cyan text-accent-cyan hover:bg-accent-cyan/10 transition-colors z-40 flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(79,216,232,0.4)]"
            aria-label="Open CIRCULUS AI Copilot"
          >
            <div className="relative">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-copilot-widget-container"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-2 bottom-20 top-16 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[580px] sm:max-h-[85vh] glass-panel glow-edge-cyan rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-accent-cyan/30 bg-[#0c1015]/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-panel-elevated/70 backdrop-blur-md border-b border-white/10 p-3.5 flex items-center justify-between text-ink">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent-cyan/15 border border-accent-cyan/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent-cyan" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-ink leading-none">CIRCULUS Copilot</h3>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                      AI Active
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted leading-tight mt-0.5">Indian Circular Economy & Compliance</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-ink-muted hover:text-ink"
                  aria-label="Clear chat history"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-ink-muted hover:text-ink"
                  aria-label="Close Chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Suggested Chips Carousel */}
            <div className="bg-panel/40 border-b border-white/5 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <Sparkles className="w-3.5 h-3.5 text-accent-amber shrink-0 ml-0.5" />
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendQuery(prompt.replace(/^[^\w\s]+/, "").trim())}
                  disabled={isTyping}
                  className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-white/5 hover:bg-accent-cyan/15 border border-white/10 hover:border-accent-cyan/40 text-ink-muted hover:text-accent-cyan transition-all cursor-pointer whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-primary/40">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {msg.role === "model" && (
                    <div className="w-7 h-7 rounded-full bg-accent-cyan/15 border border-accent-cyan/35 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-accent-cyan" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent-cyan text-slate-950 font-medium rounded-br-sm shadow-[0_0_15px_rgba(79,216,232,0.25)]"
                        : "bg-panel-elevated/90 border border-white/10 text-ink rounded-bl-sm shadow-md"
                    }`}
                  >
                    {msg.role === "model" ? (
                      <div className="space-y-2">
                        <div className="markdown-body prose prose-invert max-w-none text-sm text-ink leading-relaxed prose-headings:text-accent-cyan prose-headings:font-bold prose-headings:text-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-white prose-table:text-xs">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-ink-muted">
                          <span className="flex items-center gap-1 font-mono text-[10px]">
                            {msg.source === "gemini_live" ? "✨ Gemini Live" : "🛡️ Verified Domain Knowledge"}
                          </span>
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="p-1 hover:bg-white/10 rounded transition-colors text-ink-muted hover:text-accent-cyan flex items-center gap-1"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-accent-emerald" />
                                <span className="text-[10px] text-accent-emerald">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="text-[10px]">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent-cyan/15 border border-accent-cyan/35 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-accent-cyan" />
                  </div>
                  <div className="bg-panel-elevated border border-white/10 text-ink rounded-2xl rounded-bl-sm shadow-sm p-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-accent-cyan" />
                    <span className="text-xs text-ink-muted font-medium">Analyzing material intelligence...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-panel-elevated/90 border-t border-white/10">
              <div className="flex items-center gap-2 relative">
                <input
                  id="ai-copilot-input-field"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about EPR, Fly Ash, DPP Passports, HSN codes..."
                  className="flex-1 bg-primary/70 border border-white/15 focus:ring-1 focus:ring-accent-cyan focus:border-accent-cyan rounded-full py-2.5 pl-4 pr-12 text-sm text-ink placeholder-ink-muted/70 outline-none transition-all"
                />
                <button
                  id="ai-copilot-send-btn"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1.5 p-2 rounded-full bg-accent-cyan hover:bg-accent-cyan/90 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-slate-950 font-semibold transition-all cursor-pointer shadow-sm"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-1.5 text-center">
                <span className="text-[10px] text-ink-muted/60">
                  CIRCULUS Industrial Copilot • Grounded in CPCB, MoEFCC & ISO 14040/44 standards
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
