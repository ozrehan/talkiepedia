import React, { useState } from 'react';
import { Bot, X, Sparkles, Send, BrainCircuit, Maximize2, FileText, Loader2 } from 'lucide-react';
import './AIAssistantWidget.css';

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your AI Knowledge Companion. How can I assist you with your learning today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: 'That is a great question. Based on current trends, mastering foundational concepts like data structures will accelerate your learning path significantly. Would you like me to generate a study roadmap for this?' 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className={`ai-fab ${isOpen ? 'hidden' : ''}`} 
        onClick={() => setIsOpen(true)}
        title="Open AI Companion"
      >
        <Sparkles size={24} />
      </button>

      {/* Chat Widget Panel */}
      <div className={`ai-widget-panel glassmorphism ${isOpen ? 'open' : ''}`}>
        <div className="ai-widget-header">
          <div className="ai-title">
            <BrainCircuit className="accent-cyan" size={20} />
            <span>AI Knowledge Companion</span>
          </div>
          <div className="ai-actions">
            <button className="icon-btn-small"><Maximize2 size={16} /></button>
            <button className="icon-btn-small" onClick={() => setIsOpen(false)}><X size={16} /></button>
          </div>
        </div>
        
        <div className="ai-quick-actions">
          <button className="quick-action-btn"><FileText size={14}/> Summarize Page</button>
          <button className="quick-action-btn"><BrainCircuit size={14}/> Generate Quiz</button>
        </div>

        <div className="ai-widget-body">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="message ai">
              <div className="message-bubble typing">
                <Loader2 size={14} className="spinner" /> AI is thinking...
              </div>
            </div>
          )}
        </div>

        <form className="ai-widget-footer" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={!input.trim()} className="send-btn">
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
};

export default AIAssistantWidget;
