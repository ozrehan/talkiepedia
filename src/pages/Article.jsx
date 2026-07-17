import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  Bookmark, Heart, Share2, MessageSquare, BrainCircuit, 
  FileText, Sparkles, Lightbulb, CheckCircle2, ArrowLeft, 
  Printer, Copy, Check, Send, Trash2, ThumbsUp 
} from 'lucide-react';
import './Article.css';

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState('overview');

  // Interactive Comments state
  const [comments, setComments] = useState([
    { id: 1, author: 'Sophia Rossi', avatar: 'https://i.pravatar.cc/150?img=33', text: 'This explanation of React 19 Actions is clean. Eliminating the manually coded async pending loaders is a massive win.', date: '1 day ago', likes: 14 },
    { id: 2, author: 'Ethan Hunt', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Does this compiler logic also optimize nested context renders automatically, or should we still memoize manually?', date: '18 hours ago', likes: 6 }
  ]);
  const [commentInput, setCommentInput] = useState('');

  // Article metadata
  const articleData = {
    title: "Understanding Next-Gen State Management in React 19",
    category: "Technology",
    readTime: "8 min read",
    author: "David Chen",
    role: "Senior Engineer @ Meta",
    date: "Dec 12, 2025",
    avatar: "https://i.pravatar.cc/150?img=15"
  };

  // Scroll listener for reading progress & active heading highlighting
  useEffect(() => {
    const handleScroll = () => {
      // 1. Reading progress computation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(progress);
        const globalBar = document.getElementById('global-progress-bar');
        if (globalBar) {
          globalBar.style.width = `${progress}%`;
        }
      }

      // 2. Headings active calculation
      const sections = ['overview', 'evolution', 'code-block-section', 'summary'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveHeading(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean progress bar on unmount
      const globalBar = document.getElementById('global-progress-bar');
      if (globalBar) globalBar.style.width = '0%';
    };
  }, []);

  const handleCopyCode = () => {
    const codeText = `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count is {count}
    </button>
  );
}`;
    navigator.clipboard.writeText(codeText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(prev => {
      const next = !prev;
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: next ? 'success' : 'info',
        title: next ? 'Bookmarked!' : 'Bookmark Removed',
        showConfirmButton: false,
        timer: 2000,
        background: 'var(--bg-sidebar)',
        color: 'var(--text-primary)'
      });
      return next;
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Link copied to clipboard!',
      showConfirmButton: false,
      timer: 2000,
      background: 'var(--bg-sidebar)',
      color: 'var(--text-primary)'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      author: 'Alex (You)',
      avatar: 'https://i.pravatar.cc/150?img=53',
      text: commentInput,
      date: 'Just now',
      likes: 0
    };

    setComments(prev => [...prev, newComment]);
    setCommentInput('');
  };

  const handleLikeComment = (cId) => {
    setComments(prev => prev.map(c => 
      c.id === cId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  const handleDeleteComment = (cId) => {
    setComments(prev => prev.filter(c => c.id !== cId));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="article-page container animate-fade-in">
      
      {/* Return button */}
      <button onClick={() => navigate('/podcasts')} className="btn btn-outline border-0 p-0 mb-4 d-inline-flex align-items-center gap-2 hover-text-blue">
        <ArrowLeft size={16} />
        <span>Return to Episodes</span>
      </button>

      <div className="article-grid">
        
        {/* Left Table of Contents Sidebar */}
        <aside className="article-left-sidebar d-none d-xl-block">
          <div className="toc-sidebar">
            <h6 className="fw-bold text-muted text-uppercase tracking-wider mb-3">On this page</h6>
            <ul className="toc-list">
              <li 
                className={`toc-item ${activeHeading === 'overview' ? 'active' : ''}`}
                onClick={() => scrollToSection('overview')}
              >
                Overview
              </li>
              <li 
                className={`toc-item ${activeHeading === 'evolution' ? 'active' : ''}`}
                onClick={() => scrollToSection('evolution')}
              >
                The Evolution of State
              </li>
              <li 
                className={`toc-item ${activeHeading === 'code-block-section' ? 'active' : ''}`}
                onClick={() => scrollToSection('code-block-section')}
              >
                Code Primitives
              </li>
              <li 
                className={`toc-item ${activeHeading === 'summary' ? 'active' : ''}`}
                onClick={() => scrollToSection('summary')}
              >
                Summary & Takeaways
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Article Content */}
        <article className="article-main card border-color p-4 p-md-5">
          
          {/* Header Metadata */}
          <div className="article-header" id="overview">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="badge">{articleData.category}</span>
              <span className="text-secondary small">{articleData.readTime}</span>
            </div>
            
            <h1 className="fw-bold text-white display-5 mb-4 leading-tight">
              {articleData.title}
            </h1>
            
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div className="author-info">
                <img src={articleData.avatar} alt={articleData.author} className="avatar border border-color" />
                <div>
                  <h6 className="fw-semibold text-white m-0">{articleData.author}</h6>
                  <span className="text-secondary small">{articleData.role} • {articleData.date}</span>
                </div>
              </div>
              
              {/* Document actions: Print */}
              <button 
                onClick={handlePrint}
                className="btn btn-outline border-color p-2 rounded-circle"
                title="Print Article"
              >
                <Printer size={16} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="article-body text-secondary" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
            <p>
              State management has been the subject of countless debates since the dawn of modern frontend frameworks. As applications grow in complexity, managing shared data without triggering cascading re-renders becomes an art form. React 19 introduces subtle yet powerful hooks that streamline this process.
            </p>
            
            <h3 id="evolution" className="fw-bold text-white mt-5 mb-3">The Evolution of State</h3>
            <p>
              From Redux to Context API, and now to Signals, the way we handle state is continuously evolving. With the introduction of React Actions, state updates bound to asynchronous forms can trigger loading, optimistic rendering, and error boundaries natively.
            </p>

            <h4 className="fw-bold text-white mt-4 mb-2">Eliminating Boilerplate</h4>
            <p>
              Before React 19, handling form submissions required writing custom loading state flags, managing API responses, and checking lock status. Now, passing an async function directly into HTML buttons or input containers natively handles async states.
            </p>

            {/* Code Block */}
            <div className="code-block-wrapper" id="code-block-section">
              <div className="code-block-header">
                <span>CounterExample.jsx</span>
                <button className="code-block-copy" onClick={handleCopyCode}>
                  {copySuccess ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  <span>{copySuccess ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
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
            
            <h3 id="summary" className="fw-bold text-white mt-5 mb-3">Summary & Takeaways</h3>
            <p>
              Understanding these patterns is crucial for any developer looking to build performant, scalable applications in the modern era. Leveraging native actions makes frontend architecture clean and drastically cuts bundle size by reducing dependency on heavyweight third-party stores.
            </p>
          </div>

          {/* Article Actions Bar */}
          <div className="article-actions py-4 border-top border-bottom border-color mt-5">
            <div className="action-group">
              <button 
                className={`btn btn-outline border-0 gap-2 ${isLiked ? 'text-danger' : 'text-secondary'}`} 
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                <span>1.2K</span>
              </button>
              <button className="btn btn-outline border-0 gap-2 text-secondary">
                <MessageSquare size={18} />
                <span>{comments.length} Comments</span>
              </button>
            </div>
            <div className="action-group">
              <button 
                className={`btn btn-outline border-0 ${isBookmarked ? 'text-cyan-accent' : 'text-secondary'}`} 
                onClick={handleBookmarkToggle}
                title="Bookmark article"
              >
                <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
              </button>
              <button 
                className="btn btn-outline border-0 text-secondary" 
                onClick={handleShare}
                title="Share article"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Interactive Comments Section */}
          <div className="article-comments-section mt-5">
            <h4 className="fw-bold text-white mb-4">Discussion ({comments.length})</h4>
            
            {/* Post comment form */}
            <form onSubmit={handleAddComment} className="comment-form-box mb-4">
              <textarea
                placeholder="Join the discussion... Share your thoughts."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="form-control bg-hover border-color text-white p-3 rounded-3"
                rows="3"
                required
              />
              <button type="submit" className="btn btn-primary mt-3 rounded-pill">
                <Send size={14} />
                <span>Post Comment</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="comments-list d-flex flex-column gap-3">
              {comments.map((cmt) => (
                <div key={cmt.id} className="comment-card p-3 rounded-3 bg-hover border border-color">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex gap-3 align-items-center">
                      <img src={cmt.avatar} alt={cmt.author} className="rounded-circle border border-color" style={{ width: '36px', height: '36px' }} />
                      <div>
                        <h6 className="fw-semibold text-white m-0">{cmt.author}</h6>
                        <span className="text-muted small">{cmt.date}</span>
                      </div>
                    </div>
                    {cmt.author === 'Alex (You)' && (
                      <button onClick={() => handleDeleteComment(cmt.id)} className="text-muted hover-text-danger" title="Delete comment">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-secondary mt-2 mb-2" style={{ fontSize: '0.95rem' }}>{cmt.text}</p>
                  <button onClick={() => handleLikeComment(cmt.id)} className="btn btn-outline border-0 p-0 text-muted small d-inline-flex align-items-center gap-1 hover-text-blue">
                    <ThumbsUp size={12} />
                    <span>{cmt.likes} Upvotes</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </article>

        {/* AI Sidebar */}
        <aside className="article-sidebar-col">
          <div className="ai-tools-card card border-color p-4 glassmorphism">
            <h4 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
              <BrainCircuit className="text-purple-accent" size={20} />
              <span>AI Study Panel</span>
            </h4>
            <p className="text-secondary small mb-4">Quick actions to enhance understanding of this article.</p>
            
            <div className="d-flex flex-column gap-3">
              {/* These trigger the global assistant open state with appropriate pre-loaded prompts */}
              <button 
                className="btn btn-outline w-100 text-start justify-content-start py-3 px-3 rounded-3 border-color hover-elevate"
                onClick={() => {
                  const fab = document.querySelector('.ai-fab');
                  if (fab) fab.click();
                  setTimeout(() => {
                    const btn = document.querySelector('.quick-action-btn:nth-child(1)'); // Summarize
                    if (btn) btn.click();
                  }, 100);
                }}
              >
                <FileText size={18} className="text-primary-blue" />
                <div style={{ marginLeft: '12px' }}>
                  <h6 className="fw-semibold text-white m-0">Generate Summary</h6>
                  <span className="text-muted small">Get 3 key bullet points</span>
                </div>
              </button>
              
              <button 
                className="btn btn-outline w-100 text-start justify-content-start py-3 px-3 rounded-3 border-color hover-elevate"
                onClick={() => {
                  const fab = document.querySelector('.ai-fab');
                  if (fab) fab.click();
                  setTimeout(() => {
                    const btn = document.querySelector('.quick-action-btn:nth-child(2)'); // ELI5
                    if (btn) btn.click();
                  }, 100);
                }}
              >
                <Lightbulb size={18} className="text-yellow" />
                <div style={{ marginLeft: '12px' }}>
                  <h6 className="fw-semibold text-white m-0">Explain like I'm 5</h6>
                  <span className="text-muted small">Simplify complex topics</span>
                </div>
              </button>

              <button 
                className="btn btn-outline w-100 text-start justify-content-start py-3 px-3 rounded-3 border-color hover-elevate"
                onClick={() => {
                  const fab = document.querySelector('.ai-fab');
                  if (fab) fab.click();
                  setTimeout(() => {
                    const btn = document.querySelector('.quick-action-btn:nth-child(3)'); // Quiz
                    if (btn) btn.click();
                  }, 100);
                }}
              >
                <CheckCircle2 size={18} className="text-cyan-accent" />
                <div style={{ marginLeft: '12px' }}>
                  <h6 className="fw-semibold text-white m-0">Generate Quiz</h6>
                  <span className="text-muted small">Test your comprehension</span>
                </div>
              </button>
            </div>

            <div className="sidebar-decor-box mt-4 p-3 rounded bg-hover border border-color">
              <Sparkles size={16} className="text-cyan-accent mb-2" />
              <p className="text-secondary small m-0 leading-normal">
                <strong>AI Recommendation:</strong> Readers of this article completed the "Advanced React Patterns" roadmap path.
              </p>
              <button onClick={() => navigate('/search')} className="btn btn-primary w-100 rounded-pill mt-3 py-2 small">Start Learning Path</button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Article;
