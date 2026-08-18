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

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
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
              spcb: activePassport.spcbJurisdiction,
            } : null,
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
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between animate-slideLeft">
      {/* Header */}
      <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 font-display">
              CirculAI Assistant
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
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
          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer text-xs"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Active Passport Banner if attached */}
      {activePassport && (
        <div className="bg-blue-50 px-4 py-2.5 border-b border-blue-100 flex items-center justify-between text-xs">
          <span className="text-blue-900 font-bold truncate max-w-xs">
            📄 Selected: {activePassport.title}
          </span>
          <span className="text-blue-700 font-semibold">{activePassport.quantityMT} Tons</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400 font-medium">
              {msg.sender === "copilot" ? (
                <>
                  <Bot className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-bold text-slate-700">CirculAI</span>
                </>
              ) : (
                <>
                  <span className="font-bold text-slate-700">You ({activeRole.name.split(" ")[0]})</span>
                  <User className="w-3.5 h-3.5 text-blue-600" />
                </>
              )}
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-4 rounded-3xl text-xs max-w-[90%] leading-relaxed shadow-xs ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-tr-none font-medium"
                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-none space-y-3"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Suggestions chips if any */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
                  <p className="text-[11px] text-slate-500 font-bold">Try asking:</p>
                  <div className="flex flex-col gap-1.5">
                    {msg.suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(s)}
                        className="text-left text-xs text-blue-700 hover:text-blue-900 bg-slate-50 hover:bg-blue-50 p-2.5 rounded-2xl border border-slate-200 hover:border-blue-200 transition flex items-center justify-between cursor-pointer group font-medium"
                      >
                        <span className="truncate">{s}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-0.5 transition shrink-0 ml-1" />
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
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-600 flex items-center gap-2 shadow-xs">
              <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              <span>Thinking of the best answer...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3.5 bg-white border-t border-slate-200">
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
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition cursor-pointer shadow-sm shadow-blue-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
