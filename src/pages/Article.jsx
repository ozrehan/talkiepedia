import React, { useState } from 'react';
import { Bookmark, Heart, Share2, MessageSquare, BrainCircuit, FileText, Sparkles, Lightbulb, CheckCircle2 } from 'lucide-react';
import './Article.css';

const Article = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="article-page container animate-fade-up">
      <div className="article-grid">
        
        {/* Main Article Content */}
        <article className="article-main card">
          <div className="article-header">
            <div className="article-meta">
              <span className="badge">Technology</span>
              <span className="read-time">8 min read</span>
            </div>
            <h1 className="article-title">Understanding Next-Gen State Management in React 19</h1>
            <div className="author-info">
              <img src="https://i.pravatar.cc/150?img=15" alt="Author" className="avatar" />
              <div>
                <h4>David Chen</h4>
                <span>Senior Engineer @ Meta • Published Dec 12, 2025</span>
              </div>
            </div>
          </div>

          <div className="article-body">
            <p>State management has been the subject of countless debates since the dawn of modern frontend frameworks. As applications grow in complexity, managing shared data without triggering cascading re-renders becomes an art form.</p>
            
            <h2>The Evolution of State</h2>
            <p>From Redux to Context API, and now to Signals, the way we handle state is continuously evolving. React 19 introduces subtle yet powerful hooks that streamline this process...</p>

            <div className="code-block">
              <pre>
                <code>
{`function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count is {count}
    </button>
  );
}`}
                </code>
              </pre>
            </div>
            
            <p>Understanding these patterns is crucial for any developer looking to build performant, scalable applications in the modern era.</p>
          </div>

          <div className="article-actions">
            <div className="action-group">
              <button className={`icon-btn ${isLiked ? 'liked' : ''}`} onClick={() => setIsLiked(!isLiked)}>
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} /> 1.2K
              </button>
              <button className="icon-btn"><MessageSquare size={20} /> 342</button>
            </div>
            <div className="action-group">
              <button className="icon-btn"><Bookmark size={20} /></button>
              <button className="icon-btn"><Share2 size={20} /></button>
            </div>
          </div>
        </article>

        {/* AI Sidebar */}
        <aside className="article-sidebar">
          <div className="ai-tools-card card">
            <h3><BrainCircuit className="accent-purple" size={20}/> AI Reading Tools</h3>
            <p className="subtitle">Enhance your understanding of this article.</p>
            
            <div className="ai-action-list">
              <button className="btn btn-outline w-100 ai-action-btn">
                <FileText size={18} className="text-blue" />
                <div className="text-left">
                  <h4>Generate Summary</h4>
                  <span>Get a 3-bullet point overview</span>
                </div>
              </button>
              
              <button className="btn btn-outline w-100 ai-action-btn">
                <Lightbulb size={18} className="text-yellow" />
                <div className="text-left">
                  <h4>Explain like I'm 5</h4>
                  <span>Simplify complex concepts</span>
                </div>
              </button>

              <button className="btn btn-outline w-100 ai-action-btn">
                <CheckCircle2 size={18} className="accent-cyan" />
                <div className="text-left">
                  <h4>Generate Quiz</h4>
                  <span>Test your knowledge (5 Qs)</span>
                </div>
              </button>
            </div>

            <div className="ai-highlight-box mt-20">
              <Sparkles size={16} className="gradient-text"/>
              <p><strong>AI Insight:</strong> 85% of readers who read this also completed the "Advanced React Patterns" path.</p>
              <button className="btn btn-primary w-100 mt-10">Start Path</button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Article;
