import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Bot, X, Sparkles, Send, BrainCircuit, Maximize2, 
  FileText, Loader2, Lightbulb, CheckCircle2, RefreshCw, 
  Layers, ExternalLink 
} from 'lucide-react';
import './AIAssistantWidget.css';

const AIAssistantWidget = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your AI Knowledge Assistant. I can summarize content, explain concepts, build study roadmaps, and generate interactive quizzes based on whichever page you are viewing. Try selecting a quick action below or ask me a question!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const bodyRef = useRef(null);

  // Auto-scroll chat body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Context-aware trigger when route changes
  useEffect(() => {
    let welcomeMsg = "";
    if (location.pathname.includes('/article/')) {
      welcomeMsg = "I see you are reading about React 19 State Management. I can summarize this article, explain its code examples, or test you with an interactive quiz!";
    } else if (location.pathname.includes('/podcasts')) {
      welcomeMsg = "Welcome to the Podcasts section! I can outline key takeaways from Sumanvitha's Aerospace talk or Bharat Chandra's Microsoft MNC interview.";
    } else if (location.pathname.includes('/dashboard')) {
      welcomeMsg = "You're viewing your learning dashboard. I can help analyze your weekly streak, suggest matching resources to hit your 15h goal, or plan study paths.";
    } else if (location.pathname.includes('/search')) {
      welcomeMsg = "AI search page active. I can detail full Spring Boot roadmaps, auto-suggest practice tags, or outline Java microservices architecture.";
    } else {
      welcomeMsg = "I am ready to assist you. Ask me to explain corporate readiness, prepare for interviews, or summarize Talkiepedia's initiatives!";
    }
    
    // Add page transition notification from AI
    setMessages(prev => [
      ...prev,
      { id: `nav-${Date.now()}`, sender: 'ai', text: welcomeMsg, isNavHint: true }
    ]);
  }, [location.pathname]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `That's an interesting question about "${userText}". Here is how we should look at this: in a professional system design, scaling relies on caching, load balancing, and efficient database indexing. Would you like me to recommend a detailed learning path for this?`;
      
      if (userText.toLowerCase().includes('react') || userText.toLowerCase().includes('state')) {
        reply = "React 19 streamlines state with Server Actions and the `use` hook. When managing async transactions, the state transition is tracked automatically. For large apps, combining React Context for global state and localized hooks for transient states yields the best rendering profile.";
      } else if (userText.toLowerCase().includes('aerospace') || userText.toLowerCase().includes('sumanvitha')) {
        reply = "In Sumanvitha's Collins Aerospace session, she explains that entry-level aerospace systems roles value solid systems engineering fundamentals, C/C++ scripting proficiency, and hands-on familiarity with MATLAB or simulation software.";
      } else if (userText.toLowerCase().includes('microsoft') || userText.toLowerCase().includes('bharat')) {
        reply = "Bharat Chandra (Microsoft Software Engineer) emphasizes that MNC interviews evaluate data structures (trees, graphs, DP), database normalization, system scalability, and your behavioral response to collaborative team challenges.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  // Action: Summarize Current Page
  const triggerSummarize = () => {
    setIsTyping(true);
    setMessages(prev => [...prev, { id: `sum-req-${Date.now()}`, sender: 'user', text: 'Summarize this page for me' }]);

    setTimeout(() => {
      let summary = "";
      if (location.pathname.includes('/article/')) {
        summary = "📄 **Article Summary: React 19 State Management**\n\n1. **Simplification**: React 19 replaces verbose context and third-party setups with actions for async operations.\n2. **New Primitive Hooks**: Custom hooks allow developers to write clean, component-level state changes.\n3. **Render Efficiency**: Eliminates redundant wrapper nodes, boosting browser layout performance.";
      } else if (location.pathname.includes('/podcasts')) {
        summary = "🎙️ **Podcast Directory Summary**\n\n• **Aerospace**: Sumanvitha breaks down aerospace engineering pipelines at Collins.\n• **Tech Career**: Bharat Chandra details coding test patterns and MNC interviews.\n• **Corporate Success**: Dhananjay Dubey outlines corporate navigation rules.";
      } else if (location.pathname.includes('/dashboard')) {
        summary = "📊 **Dashboard Status Summary**\n\n• **Streak**: 14 days active. 1 day away from unlocking the 'Super Learner' badge.\n• **Weekly Target**: 12/15 hours completed. 3 hours left to hit weekly goal.\n• **Rank**: Top 5% global, fueled by high system design reading completion rates.";
      } else {
        summary = "💡 **Talkiepedia Insights Summary**\n\n• **Initiative**: An alum-tech bridging platform matching students with real company leaders.\n• **Format**: Visual video podcasts + audio stream with fully synchronized local players.\n• **Scale**: 1,000+ active listeners, 20+ recorded episodes, and premium corporate collaborations.";
      }

      setMessages(prev => [...prev, { id: `sum-res-${Date.now()}`, sender: 'ai', text: summary }]);
      setIsTyping(false);
    }, 1000);
  };

  // Action: Explain Like I'm Five
  const triggerELI5 = () => {
    setIsTyping(true);
    setMessages(prev => [...prev, { id: `eli-req-${Date.now()}`, sender: 'user', text: "Explain this like I'm 5 years old" }]);

    setTimeout(() => {
      let eli5 = "";
      if (location.pathname.includes('/article/')) {
        eli5 = "🧸 **Explain Like I'm 5 (React 19 State):**\n\nImagine your toy box has a magical messenger inside. Before, when you wanted a toy, you had to scream loudly so the whole house could hear you, and everyone would stop playing. Now, in React 19, you just whisper to the magical messenger, and he quietly drops the exact toy in your hand without bothering anyone else!";
      } else if (location.pathname.includes('/podcasts')) {
        eli5 = "🧸 **Explain Like I'm 5 (Podcasts):**\n\nImagine you want to ride a big bicycle, but you're not sure how. Instead of falling down, you listen to three older kids who already ride super fast. They tell you exactly where to put your feet and how to balance, so you can ride safely on your very first try!";
      } else {
        eli5 = "🧸 **Explain Like I'm 5 (Learning Path):**\n\nImagine you are building a LEGO tower. If you just pile blocks randomly, it falls over. A learning path is like the LEGO instruction manual. It tells you to put the wide gray blocks at the bottom first (fundamentals) before adding the cool colored flags on top (advanced code)!";
      }

      setMessages(prev => [...prev, { id: `eli-res-${Date.now()}`, sender: 'ai', text: eli5 }]);
      setIsTyping(false);
    }, 1000);
  };

  // Action: Interactive Quiz Generator
  const triggerQuiz = () => {
    setIsTyping(true);
    setMessages(prev => [...prev, { id: `quiz-req-${Date.now()}`, sender: 'user', text: 'Generate a quiz for me' }]);

    setTimeout(() => {
      let quizNode = null;
      if (location.pathname.includes('/article/')) {
        quizNode = {
          type: 'quiz',
          question: 'Which new feature in React 19 assists in handling asynchronous transitions automatically?',
          options: [
            { text: 'Redux Thunk API', isCorrect: false },
            { text: 'React Actions & use Hook', isCorrect: true },
            { text: 'useState dispatch loop', isCorrect: false },
            { text: 'Signals Event Bus', isCorrect: false }
          ],
          answered: false,
          explanation: 'React 19 actions let you pass async functions directly to HTML tags (e.g. form action) and track loading and error states automatically.'
        };
      } else {
        quizNode = {
          type: 'quiz',
          question: 'What company does Sumanvitha work for in the featured podcast episode?',
          options: [
            { text: 'Microsoft Corporation', isCorrect: false },
            { text: 'Collins Aerospace', isCorrect: true },
            { text: 'Forge Alumnus LLC', isCorrect: false },
            { text: 'Deloitte Consulting', isCorrect: false }
          ],
          answered: false,
          explanation: 'Sumanvitha KannamReddy is an Associate Principal Engineer at Collins Aerospace, sharing specialized aerospace insights.'
        };
      }

      setMessages(prev => [...prev, { id: `quiz-res-${Date.now()}`, sender: 'ai', isInteractive: true, interactiveData: quizNode }]);
      setIsTyping(false);
    }, 1000);
  };

  // Action: Flashcards Generator
  const triggerFlashcards = () => {
    setIsTyping(true);
    setMessages(prev => [...prev, { id: `fc-req-${Date.now()}`, sender: 'user', text: 'Create study flashcards' }]);

    setTimeout(() => {
      const cards = [
        { q: 'What are React 19 Actions?', a: 'Functions that handle async operations and manage pending, error, and optimistic state updates automatically.' },
        { q: 'What is Collins Aerospace known for?', a: 'A leading global provider of technologically advanced aerospace and defense system solutions.' },
        { q: 'What is a 14-day learning streak equivalent to?', a: 'Consistently logging in and reading articles/listening to podcasts for two full weeks.' }
      ];

      setMessages(prev => [
        ...prev,
        {
          id: `fc-res-${Date.now()}`,
          sender: 'ai',
          isInteractive: true,
          interactiveData: {
            type: 'flashcards',
            cards,
            index: 0
          }
        }
      ]);
      setFlashcardIndex(0);
      setShowFlashcardAnswer(false);
      setIsTyping(false);
    }, 1000);
  };

  // Action: Suggest Learning Path
  const triggerLearningPath = () => {
    setIsTyping(true);
    setMessages(prev => [...prev, { id: `path-req-${Date.now()}`, sender: 'user', text: 'Suggest a learning path' }]);

    setTimeout(() => {
      let pathContent = "";
      if (location.pathname.includes('/article/') || location.pathname.includes('/search')) {
        pathContent = "🛣️ **Spring Boot & React Developer Path**\n\n1. **Step 1: Core Fundamentals**\n   └─ Java OOP, JavaScript ES6 syntax, Async/Await.\n2. **Step 2: API & Backend**\n   └─ Spring Boot REST APIs, Spring Security (JWT), Hibernate.\n3. **Step 3: Client Interface**\n   └─ React Hooks, State Actions, Context, CSS grids.\n4. **Step 4: Integration & Scaling**\n   └─ Fetching endpoints, Docker containerization, AWS deploy.";
      } else {
        pathContent = "🛣️ **MNC Interview Preparation Path**\n\n1. **Step 1: Data Structures**\n   └─ Arrays, Trees, HashMaps, String operations.\n2. **Step 2: Core Engineering**\n   └─ DBMS, SQL queries, OS threads, networking concepts.\n3. **Step 3: Systems Design**\n   └─ Load balancers, microservices vs monolith, horizontal scaling.\n4. **Step 4: Behavioral & Case**\n   └─ STAR method presentation, career reviews.";
      }

      setMessages(prev => [...prev, { id: `path-res-${Date.now()}`, sender: 'ai', text: pathContent }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuizAnswer = (msgId, optIdx) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId && m.interactiveData && m.interactiveData.type === 'quiz') {
        const newData = { ...m.interactiveData, answered: true, selectedIdx: optIdx };
        return { ...m, interactiveData: newData };
      }
      return m;
    }));
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className={`ai-fab animate-fade-in ${isOpen ? 'hidden' : ''}`} 
        onClick={() => setIsOpen(true)}
        title="Open AI Companion"
        aria-label="Open AI Companion"
      >
        <Sparkles size={24} className="fab-glow-icon" />
        <span className="fab-tooltip">AI Assistant</span>
      </button>

      {/* Chat Widget Panel */}
      <div className={`ai-widget-panel glassmorphism ${isOpen ? 'open' : ''}`}>
        <div className="ai-widget-header">
          <div className="ai-title">
            <BrainCircuit className="accent-cyan-glow" size={20} />
            <span>AI Knowledge Assistant</span>
          </div>
          <div className="ai-actions">
            <button className="icon-btn-small" onClick={() => {
              setMessages([{ id: 1, sender: 'ai', text: 'Widget conversations reset. What would you like to cover now?' }]);
            }} title="Reset Conversation">
              <RefreshCw size={14} />
            </button>
            <button className="icon-btn-small ai-close-btn" onClick={() => setIsOpen(false)} title="Close Panel" aria-label="Close Panel">
              <X size={15} />
              <span>Exit</span>
            </button>
          </div>
        </div>
        
        {/* Core Capabilities Quick Buttons */}
        <div className="ai-quick-actions">
          <button className="quick-action-btn" onClick={triggerSummarize} title="Get page summary">
            <FileText size={12}/> Summarize
          </button>
          <button className="quick-action-btn" onClick={triggerELI5} title="Explain simply">
            <Lightbulb size={12}/> ELI5
          </button>
          <button className="quick-action-btn" onClick={triggerQuiz} title="Start interactive quiz">
            <CheckCircle2 size={12}/> Quiz
          </button>
          <button className="quick-action-btn" onClick={triggerFlashcards} title="Get flashcards">
            <Layers size={12}/> Flashcards
          </button>
          <button className="quick-action-btn" onClick={triggerLearningPath} title="View roadmap">
            <Sparkles size={12}/> Path
          </button>
        </div>

        {/* Messaging Body */}
        <div className="ai-widget-body" ref={bodyRef}>
          {messages.map((msg) => {
            const isNav = msg.isNavHint;
            return (
              <div key={msg.id} className={`message-item-wrapper ${msg.sender === 'user' ? 'user-align' : 'ai-align'} ${isNav ? 'nav-hint' : ''}`}>
                <div className="message-bubble">
                  {/* Handle normal string messages */}
                  {msg.text && !msg.isInteractive && (
                    <div className="markdown-render">
                      {msg.text.split('\n').map((para, pIdx) => {
                        if (para.startsWith('📄') || para.startsWith('🎙️') || para.startsWith('📊') || para.startsWith('💡') || para.startsWith('🧸') || para.startsWith('🛣️')) {
                          return <h6 key={pIdx} className="markdown-header mt-2">{para}</h6>;
                        }
                        if (para.trim().startsWith('•') || para.trim().startsWith('-')) {
                          return <li key={pIdx} className="markdown-li">{para.replace(/^[•-]\s*/, '')}</li>;
                        }
                        if (para.trim().match(/^\d+\./)) {
                          return <div key={pIdx} className="markdown-step-line">{para}</div>;
                        }
                        return <p key={pIdx} className="markdown-p">{para}</p>;
                      })}
                    </div>
                  )}

                  {/* Handle Interactive Quizzes */}
                  {msg.isInteractive && msg.interactiveData && msg.interactiveData.type === 'quiz' && (
                    <div className="interactive-quiz-block">
                      <span className="interactive-tag">⚡ PRACTICE QUIZ</span>
                      <p className="quiz-q">{msg.interactiveData.question}</p>
                      
                      <div className="quiz-options-list">
                        {msg.interactiveData.options.map((opt, oIdx) => {
                          const isSelected = msg.interactiveData.selectedIdx === oIdx;
                          const isAnswered = msg.interactiveData.answered;
                          
                          let btnClass = "";
                          if (isAnswered) {
                            if (opt.isCorrect) btnClass = "correct";
                            else if (isSelected) btnClass = "incorrect";
                            else btnClass = "disabled";
                          }

                          return (
                            <button
                              key={oIdx}
                              className={`quiz-opt-btn ${btnClass}`}
                              onClick={() => !isAnswered && handleQuizAnswer(msg.id, oIdx)}
                              disabled={isAnswered}
                            >
                              <span>{opt.text}</span>
                              {isAnswered && opt.isCorrect && <span className="feedback-indicator">✓</span>}
                              {isAnswered && isSelected && !opt.isCorrect && <span className="feedback-indicator">✗</span>}
                            </button>
                          );
                        })}
                      </div>

                      {msg.interactiveData.answered && (
                        <div className="quiz-explanation animate-fade-in">
                          <strong>Explanation:</strong> {msg.interactiveData.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Handle Interactive Flashcards */}
                  {msg.isInteractive && msg.interactiveData && msg.interactiveData.type === 'flashcards' && (
                    <div className="interactive-flashcard-block">
                      <span className="interactive-tag">🃏 FLASHCARDS</span>
                      
                      <div 
                        className={`flashcard-card-box ${showFlashcardAnswer ? 'flipped' : ''}`}
                        onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
                      >
                        <div className="card-face front">
                          <p>{msg.interactiveData.cards[flashcardIndex].q}</p>
                          <span className="card-hint">Click card to reveal answer</span>
                        </div>
                        <div className="card-face back">
                          <p>{msg.interactiveData.cards[flashcardIndex].a}</p>
                          <span className="card-hint">Click card to hide answer</span>
                        </div>
                      </div>

                      <div className="flashcard-controls mt-3">
                        <button 
                          className="btn btn-outline small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowFlashcardAnswer(false);
                            setFlashcardIndex(prev => Math.max(0, prev - 1));
                          }}
                          disabled={flashcardIndex === 0}
                        >
                          Prev
                        </button>
                        <span className="flashcard-num">
                          {flashcardIndex + 1} / {msg.interactiveData.cards.length}
                        </span>
                        <button 
                          className="btn btn-primary small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowFlashcardAnswer(false);
                            setFlashcardIndex(prev => Math.min(msg.interactiveData.cards.length - 1, prev + 1));
                          }}
                          disabled={flashcardIndex === msg.interactiveData.cards.length - 1}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="message-item-wrapper ai-align">
              <div className="message-bubble typing">
                <Loader2 size={12} className="spinner" /> Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Form Footer */}
        <form className="ai-widget-footer" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Ask AI anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Ask AI Assistant"
          />
          <button type="submit" disabled={!input.trim() || isTyping} className="send-btn" aria-label="Send query">
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
};

export default AIAssistantWidget;
