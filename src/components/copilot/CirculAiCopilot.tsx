import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  ChevronRight
} from "lucide-react";
import { MaterialPassport, UserRole } from "../../types";

interface CirculAiCopilotProps {
  isOpen: boolean;
  onClose: () => void;
  activePassport?: MaterialPassport;
  activeRole: UserRole;
}

interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  timestamp: string;
  suggestions?: string[];
}

const PRESET_PROMPTS = [
  "What new products can be manufactured from aluminium scrap?",
  "How much smoke and coal is saved by recycling 18 tons of metal?",
  "Why is it better for the earth to recycle plastic bottles?",
  "What government rules apply when selling scrap in India?",
];

export const CirculAiCopilot: React.FC<CirculAiCopilotProps> = ({
  isOpen,
  onClose,
  activePassport,
  activeRole,
}) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "copilot",
      text: `Namaste! I am your friendly AI recycling assistant. You can ask me anything about materials, what leftover scrap can be turned into, how much smoke recycling saves, or government green rules in simple words. How can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestions: PRESET_PROMPTS,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  
  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
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


      if (data.success && data.reply) {
        const copilotMsg: Message = {
          id: `copilot-${Date.now()}`,
          sender: "copilot",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: data.followUps || [],
        };
        setMessages((prev) => [...prev, copilotMsg]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Copilot error:", err);
      const fallbackMsg: Message = {
        id: `copilot-${Date.now()}`,
        sender: "copilot",
        text: `Recycling scrap like ${activePassport ? activePassport.title : "metals and plastics"} stops deep mining in mountains and saves up to 95% of electricity compared to making new metal from rocks. It keeps dumpyards clean and reduces dark smoke from factory chimneys!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-panel border-l border-white/10 shadow-2xl flex flex-col justify-between animate-slideLeft">
      {/* Header */}
      <div className="bg-panel p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-copper/900/20 border border-copper/200 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-copper/600" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-ink flex items-center gap-1.5 font-display">
              CirculAI Assistant
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-900/20 text-emerald-700 border border-emerald-200">
                Online
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Simple explanations for recycling questions
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-silver/80 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer text-xs"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Active Passport Banner if attached */}
      {activePassport && (
        <div className="bg-copper/900/20 px-4 py-2.5 border-b border-copper/100 flex items-center justify-between text-xs">
          <span className="text-copper/200 font-bold truncate max-w-xs">
            📄 Selected: {activePassport.title}
          </span>
          <span className="text-copper/700 font-semibold">{activePassport.quantityMT} Tons</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0B0F13]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[11px] text-silver/80 font-medium">
              {msg.sender === "copilot" ? (
                <>
                  <Bot className="w-3.5 h-3.5 text-copper/600" />
                  <span className="font-bold text-slate-700">CirculAI</span>
                </>
              ) : (
                <>
                  <span className="font-bold text-slate-700">You ({activeRole.name.split(" ")[0]})</span>
                  <User className="w-3.5 h-3.5 text-copper/600" />
                </>
              )}
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-4 rounded-3xl text-xs max-w-[90%] leading-relaxed shadow-xs ${
                msg.sender === "user"
                  ? "bg-copper/600 text-ink rounded-tr-none font-medium"
                  : "bg-panel text-slate-200 border border-white/10 rounded-tl-none space-y-3"
              }`}
            >
              <div className="whitespace-pre-wrap space-y-1.5">
                {msg.text.split("\n").map((line, lIdx) => {
                  if (!line.trim()) return <div key={lIdx} className="h-1" />;
                  
                  // Render bullet items cleanly
                  const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
                  const cleanLine = isBullet ? line.trim().replace(/^[-•*]\s*/, "") : line;
                  
                  // Parse bold markers **
                  const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
                  const parsedContent = parts.map((part, pIdx) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={pIdx} className="font-bold text-ink">{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  });

                  if (isBullet) {
                    return (
                      <div key={lIdx} className="flex items-start gap-2 pl-1">
                        <span className="text-copper/500 font-bold text-sm leading-none mt-0.5">•</span>
                        <span className="flex-1">{parsedContent}</span>
                      </div>
                    );
                  }

                  return <p key={lIdx}>{parsedContent}</p>;
                })}
              </div>

              {/* Suggestions chips if any */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
                  <p className="text-[11px] text-slate-500 font-bold">Try asking:</p>
                  <div className="flex flex-col gap-1.5">
                    {msg.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(s)}
                        className="text-left text-xs text-copper/700 hover:text-copper/200 bg-[#0B0F13] hover:bg-copper/900/20 p-2.5 rounded-2xl border border-white/10 hover:border-copper/200 transition flex items-center justify-between cursor-pointer group font-medium"
                      >
                        <span className="truncate">{s}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-copper/500 group-hover:translate-x-0.5 transition shrink-0 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="bg-panel p-3.5 rounded-2xl rounded-tl-none border border-white/10 text-xs text-silver/80 flex items-center gap-2 shadow-xs">
              <RefreshCw className="w-3.5 h-3.5 text-copper/600 animate-spin" />
              <span>Thinking of the best answer...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3.5 bg-panel border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your question here in simple words..."
            className="flex-1 bg-[#0B0F13] border border-white/10 rounded-2xl px-4 py-3 text-xs text-ink placeholder-slate-400 focus:border-copper/500 focus:bg-panel focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="p-3 rounded-2xl bg-copper/600 hover:bg-copper/700 disabled:opacity-50 text-ink transition cursor-pointer shadow-sm shadow-blue-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
