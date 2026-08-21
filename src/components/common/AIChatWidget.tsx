import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Minimize2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages: ChatMessage[] = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/copilot-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
          systemInstruction: "You are a helpful AI assistant for the CIRCULUS industrial material platform."
        })
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch(e) {
        throw new Error("Invalid JSON from server. Status: " + response.status + " Body: " + responseText.substring(0, 100));
      }
      if (data.success) {
        setMessages([...newMessages, { role: "model", text: data.text }]);
      } else {
        setMessages([...newMessages, { role: "model", text: "Sorry, I encountered an error: " + data.error }]);
      }
    } catch (error: any) {
      setMessages([...newMessages, { role: "model", text: "Sorry, I encountered an error connecting to the server. Details: " + String(error) }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 rounded-full glass-panel glow-edge-cyan text-accent-cyan hover:bg-accent-cyan/10 transition-colors z-50 flex items-center justify-center cursor-pointer"
            aria-label="Open AI Chat"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-full max-w-sm sm:w-[380px] h-[500px] glass-panel glow-edge-cyan rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-panel-elevated/50 border-b border-white/10 p-4 flex items-center justify-between text-ink">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-bold">CIRCULUS AI Helper</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-ink-muted hover:text-ink"
                aria-label="Close Chat"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-transparent">
              {messages.length === 0 && (
                <div className="text-center text-ink-muted my-8 text-base">
                  <Bot className="w-12 h-12 mx-auto mb-3 text-accent-cyan/30" />
                  <p>Hello! I'm your CIRCULUS AI assistant.</p>
                  <p className="mt-1">How can I help you today?</p>
                </div>
              )}
              
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {msg.role === "model" && (
                    <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-accent-cyan" />
                    </div>
                  )}
                  
                  <div 
                    className={`max-w-[75%] p-3 rounded-2xl text-base ${msg.role === "user" ? "bg-accent-cyan text-primary rounded-br-sm shadow-[0_0_15px_rgba(79,216,232,0.3)]" : "bg-panel border border-white/10 text-ink rounded-bl-sm"}`}
                  >
                    {msg.role === "model" ? (
                      <div className="markdown-body text-base prose prose-sm prose-p:leading-relaxed">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-accent-cyan" />
                  </div>
                  <div className="bg-panel border border-white/10 text-ink rounded-2xl rounded-bl-sm shadow-sm p-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-accent-cyan" />
                    <span className="text-sm text-ink-muted font-medium">AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-panel border-t border-white/10">
              <div className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask a question..."
                  className="flex-1 bg-primary border border-white/10 focus:ring-1 focus:ring-accent-cyan focus:border-accent-cyan rounded-full py-2.5 pl-4 pr-12 text-base text-ink placeholder-ink-muted outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-1 p-2 rounded-full bg-accent-cyan hover:bg-accent-cyan/80 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-primary transition-colors cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
