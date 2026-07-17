import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, Compass, FileText, Video, HelpCircle, 
  ChevronRight, PlayCircle, Loader2, ArrowRight, X, 
  Search, CheckCircle2, AlertCircle, BookOpen 
} from 'lucide-react';
import './AISearch.css';

const AISearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || "Teach me Spring Boot";

  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [activeResults, setActiveResults] = useState(null);
  
  // Interactive quiz states
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Filters state
  const [levelFilter, setLevelFilter] = useState('Beginner');
  const [typeFilter, setTypeFilter] = useState('Articles');

  const popularSearches = [
    "Teach me Spring Boot",
    "Explain React Hooks",
    "System Design patterns",
    "Docker Microservices"
  ];

  // Learning Database
  const searchDatabase = {
    springboot: {
      summary: "Spring Boot is an open-source Java-based framework used to build stand-alone, production-ready microservices. It is maintained by Pivotal and minimizes boilerplates by providing auto-configuration, starter POMs, and embedded application servers (like Tomcat).",
      roadmap: [
        { step: 1, title: "Java OOP & Collections", desc: "Understand classes, interfaces, lists, maps, and functional streams." },
        { step: 2, title: "Spring Core & IoC", desc: "Master Dependency Injection, Bean Lifecycle, and AppContext." },
        { step: 3, title: "Spring Boot REST API", desc: "Build endpoints with @RestController, request mapping, and JSON parsing." },
        { step: 4, title: "Data Persistence", desc: "Connect databases using Spring Data JPA and Hibernate ORM." }
      ],
      articles: [
        { id: 1, title: "Building a RESTful Web Service with Spring Boot", desc: "Learn to deploy your first REST endpoints with auto-configured DB." },
        { id: 2, title: "Understanding Spring Security JWT authentication", desc: "Configure stateless JWT token filters to protect REST API resources." }
      ],
      videos: [
        { title: "Spring Boot in 100 Seconds", channel: "Fireship", views: "1.2M views" }
      ],
      faqs: [
        "What is the difference between Spring and Spring Boot?",
        "How does auto-configuration work?",
        "Explain the @SpringBootApplication annotation."
      ],
      quiz: [
        {
          q: "What is the primary benefit of Spring Boot over standard Spring?",
          options: ["Provides a UI editor", "Auto-configuration and embedded servers", "Compiles Java into native machine code", "Replaces Java with Python"],
          correct: 1
        },
        {
          q: "Which annotation is a combination of @Configuration, @EnableAutoConfiguration, and @ComponentScan?",
          options: ["@RestController", "@SpringBootApplication", "@Service", "@Autowired"],
          correct: 1
        }
      ]
    },
    react: {
      summary: "React is a declarative component-driven JavaScript library designed by Meta to build interactive user interfaces. React 19 introduces Server Actions, the compiler, and direct document metadata rendering.",
      roadmap: [
        { step: 1, title: "Modern JavaScript (ES6+)", desc: "Master promises, fetch, de-structuring, map, and filter methods." },
        { step: 2, title: "Component States & Hooks", desc: "Master useState, useEffect, and custom modular state definitions." },
        { step: 3, title: "React 19 Actions & Suspense", desc: "Handle asynchronous form triggers natively with formAction." },
        { step: 4, title: "Frontend Architecture", desc: "Deploy global context APIs, signals, router-dom routes, and style modules." }
      ],
      articles: [
        { id: 1, title: "Understanding Next-Gen State Management in React 19", desc: "Explore compiling optimizations and actions in the new React core." },
        { id: 3, title: "Mastering React Router v7 routes", desc: "Build breadcrumb navigation, nested layouts, and lazy-loaded tabs." }
      ],
      videos: [
        { title: "React 19 Is Here: Everything You Must Know", channel: "Web Dev Simplified", views: "840K views" }
      ],
      faqs: [
        "What are React 19 Actions?",
        "When should I use React Context over Redux?",
        "How does React Suspense work?"
      ],
      quiz: [
        {
          q: "Which hook does React 19 introduce to dynamically read Promise contexts?",
          options: ["useEffect", "use", "usePromiseState", "useCallback"],
          correct: 1
        },
        {
          q: "What is the role of React Compiler?",
          options: ["Transpiles JavaScript to TypeScript", "Automatically memoizes component renders", "Runs code on the node server", "Creates responsive CSS grids"],
          correct: 1
        }
      ]
    },
    general: {
      summary: "System architecture and software engineering require understanding code design, microservices orchestration, data validation, and deployment pipelines.",
      roadmap: [
        { step: 1, title: "Algorithms & Complexity", desc: "Review Big-O runtimes, trees, graph theory, and dynamic programming." },
        { step: 2, title: "Containerization & VMs", desc: "Package applications in Docker containers and write YAML services." },
        { step: 3, title: "Message Brokers & Queues", desc: "Achieve stateless service updates using RabbitMQ or Apache Kafka." },
        { step: 4, title: "Cloud Deployment", desc: "Set up API gateways, CI/CD pipelines, and cloud monitoring clusters." }
      ],
      articles: [
        { id: 1, title: "Scaling Microservices at Uber", desc: "Trace how Uber manages API requests across thousands of nodes." },
        { id: 2, title: "Architecting Stateless JWT Authentication systems", desc: "Secure distributed servers with stateless token verification." }
      ],
      videos: [
        { title: "Docker Microservices deployment guide", channel: "TechWorld with Nana", views: "450K views" }
      ],
      faqs: [
        "How does horizontal scaling differ from vertical scaling?",
        "What is CAP theorem?",
        "When should I use SQL over NoSQL?"
      ],
      quiz: [
        {
          q: "What does the CAP theorem state?",
          options: ["Consistency, Availability, Partition tolerance", "Caching, APIs, Performance optimization", "Complexity, Algorithms, Programming limits", "Containers, Applications, Packaging"],
          correct: 0
        }
      ]
    }
  };

  const getResults = () => {
    const qLower = query.toLowerCase();
    if (qLower.includes('spring') || qLower.includes('boot') || qLower.includes('java')) {
      return searchDatabase.springboot;
    }
    if (qLower.includes('react') || qLower.includes('hook') || qLower.includes('state') || qLower.includes('front')) {
      return searchDatabase.react;
    }
    return searchDatabase.general;
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    // Reset quiz options
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);

    setTimeout(() => {
      setActiveResults(getResults());
      setIsSearching(false);
    }, 800);
  };

  // Run search on mount if initial query exists
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearchSubmit();
    }
  }, [initialQuery]);

  const handlePopularClick = (term) => {
    setQuery(term);
    setIsSearching(true);
    setTimeout(() => {
      const qLower = term.toLowerCase();
      let res = searchDatabase.general;
      if (qLower.includes('spring') || qLower.includes('boot')) res = searchDatabase.springboot;
      else if (qLower.includes('react') || qLower.includes('hook')) res = searchDatabase.react;
      
      setActiveResults(res);
      setIsSearching(false);
    }, 600);
  };

  // Highlight matches function
  const highlightMatch = (text, term) => {
    if (!term || !text) return text;
    const regex = new RegExp(`(${term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <mark key={i} className="highlighted-term">{part}</mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const handleOptionSelect = (qIdx, optIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    const currentQuiz = activeResults?.quiz || [];
    currentQuiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="ai-search-page container animate-fade-in">
      
      {/* Search Bar Header */}
      <div className="search-header-container mb-5">
        <form onSubmit={handleSearchSubmit} className="search-box-large glassmorphism">
          <Sparkles className="text-cyan-accent glow-cyan" size={24} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI what you want to learn today..."
            aria-label="Ask AI Assistant"
          />
          <button type="submit" className="btn btn-primary btn-gradient rounded-pill px-4">
            <Search size={16} />
            <span>Search</span>
          </button>
        </form>

        {/* Filter Badges */}
        <div className="filters-row mt-4">
          <div className="filter-group">
            <span className="filter-label">Level:</span>
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button 
                key={level} 
                className={`filter-badge ${levelFilter === level ? 'active' : ''}`}
                onClick={() => setLevelFilter(level)}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="filter-separator">|</div>
          <div className="filter-group">
            <span className="filter-label">Media:</span>
            {['Articles', 'Videos', 'Discussions'].map((type) => (
              <button 
                key={type} 
                className={`filter-badge ${typeFilter === type ? 'active' : ''}`}
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="popular-tags-row mt-3">
          <span className="tags-label">Try:</span>
          {popularSearches.map((term) => (
            <button 
              key={term} 
              className="popular-search-tag"
              onClick={() => handlePopularClick(term)}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCHING SKELETON LOADER */}
      {isSearching && (
        <div className="results-grid animate-fade-in">
          <div className="results-main-col">
            <div className="card mb-4">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
              <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
            </div>
            <div className="card">
              <div className="skeleton skeleton-title" style={{ width: '30%' }}></div>
              <div className="skeleton skeleton-card"></div>
            </div>
          </div>
          <aside className="results-side-col">
            <div className="card mb-4" style={{ height: '180px' }}>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
            <div className="card" style={{ height: '220px' }}>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          </aside>
        </div>
      )}

      {/* RESULTS DISPLAY PANEL */}
      {!isSearching && activeResults && (
        <div className="results-grid animate-fade-up">
          
          {/* Main Column */}
          <div className="results-main-col">
            
            {/* AI Summary Card */}
            <div className="ai-summary-card card mb-4">
              <div className="ai-badge-header">
                <Sparkles size={18} className="text-purple-accent" /> 
                <span className="gradient-text font-bold">AI Summary & Overview</span>
              </div>
              <div className="ai-summary-text">
                <p>{activeResults.summary}</p>
              </div>
            </div>

            {/* Roadmap section */}
            <div className="results-section mb-4">
              <h3 className="section-title text-white">
                <Compass className="text-primary-blue" size={20} />
                <span>Custom Learning Path</span>
              </h3>
              <div className="roadmap-card card p-4">
                <div className="roadmap-steps-list">
                  {activeResults.roadmap.map((step, idx) => (
                    <div className="roadmap-step" key={idx}>
                      <div className="step-number-circle active">{step.step}</div>
                      <div className="step-body-content">
                        <h5 className="fw-semibold text-white">{step.title}</h5>
                        <p className="text-secondary small mb-0">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Matching Articles */}
            <div className="results-section">
              <h3 className="section-title text-white">
                <BookOpen className="text-primary-blue" size={20} />
                <span>Related Knowledge Base</span>
              </h3>
              <div className="article-list-group">
                {activeResults.articles.map((art, idx) => (
                  <div 
                    key={idx} 
                    className="card article-list-card hover-elevate p-3 border-color"
                    onClick={() => navigate(`/article/${art.id}`)}
                  >
                    <div className="article-card-details">
                      <span className="badge mb-2">Episode Doc</span>
                      <h5 className="fw-bold text-white mb-1">
                        {highlightMatch(art.title, query)}
                      </h5>
                      <p className="text-secondary small m-0">
                        {highlightMatch(art.desc, query)}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-muted arrow-right" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="results-side-col">
            
            {/* Video tutorials */}
            <div className="card mb-4 p-4 border-color">
              <h4 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                <Video className="text-purple-accent" size={18} />
                <span>Watch Tutorials</span>
              </h4>
              <ul className="video-tutorials-list list-unstyled m-0">
                {activeResults.videos.map((vid, idx) => (
                  <li key={idx} className="d-flex align-items-center gap-3">
                    <div className="video-card-thumb rounded border border-color">
                      <PlayCircle size={22} className="play-overlay" />
                    </div>
                    <div className="video-text-meta">
                      <h6 className="fw-semibold text-white mb-1">{vid.title}</h6>
                      <span className="text-muted small">{vid.channel} • {vid.views}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quiz & Faqs */}
            <div className="card p-4 border-color">
              <h4 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
                <HelpCircle className="text-cyan-accent" size={18} />
                <span>Practice Challenges</span>
              </h4>
              <ul className="practice-links-list list-unstyled mb-4">
                {activeResults.faqs.map((faq, idx) => (
                  <li key={idx} className="practice-link-item" onClick={() => setQuizOpen(true)}>
                    {faq}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary w-100 rounded-pill" onClick={() => setQuizOpen(true)}>
                Start Learning Quiz
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* QUIZ INTERACTIVE DIALOG MODAL */}
      {quizOpen && (
        <div 
          className="modal show d-block bg-overlay animate-fade-in" 
          style={{ zIndex: 2000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setQuizOpen(false)}
        >
          <div className="modal-dialog modal-dialog-centered modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-sidebar border-color shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-0 d-flex justify-content-between align-items-center p-3 border-bottom border-color">
                <h5 className="fw-bold text-white m-0 d-flex align-items-center gap-2">
                  <CheckCircle2 className="text-cyan-accent" size={18} />
                  <span>Practice Knowledge Challenge</span>
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setQuizOpen(false)}></button>
              </div>
              
              <div className="modal-body p-4 max-h-70vh overflow-y">
                {activeResults?.quiz && activeResults.quiz.map((item, qIdx) => (
                  <div className="quiz-q-container mb-4" key={qIdx}>
                    <h6 className="fw-semibold text-white mb-2">{qIdx + 1}. {item.q}</h6>
                    <div className="quiz-options-group d-flex flex-column gap-2">
                      {item.options.map((opt, oIdx) => {
                        const isSelected = selectedAnswers[qIdx] === oIdx;
                        const isCorrect = item.correct === oIdx;
                        
                        let optionClass = "";
                        if (quizSubmitted) {
                          if (isCorrect) optionClass = "correct";
                          else if (isSelected) optionClass = "incorrect";
                          else optionClass = "disabled";
                        } else if (isSelected) {
                          optionClass = "selected";
                        }

                        return (
                          <button
                            key={oIdx}
                            className={`quiz-modal-opt-btn ${optionClass}`}
                            onClick={() => !quizSubmitted && handleOptionSelect(qIdx, oIdx)}
                            disabled={quizSubmitted}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <span className="text-success small">Correct</span>}
                            {quizSubmitted && isSelected && !isCorrect && <span className="text-danger small">Incorrect</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {quizSubmitted && (
                  <div className="quiz-result-summary p-3 rounded bg-hover border-color text-center animate-fade-in">
                    <span className="d-block small text-muted">CHALLENGE SUBMITTED</span>
                    <h4 className="fw-bold text-white mt-1">
                      Score: {quizScore} / {activeResults.quiz.length}
                    </h4>
                    <p className="text-secondary small m-0 mt-2">
                      {quizScore === activeResults.quiz.length ? "🎖️ Outstanding work! You have fully mastered this topic." : "💡 Good try! Review the topics and challenge yourself again."}
                    </p>
                  </div>
                )}
              </div>

              <div className="modal-footer border-0 p-3 border-top border-color d-flex justify-content-end gap-2">
                {quizSubmitted ? (
                  <button className="btn btn-outline" onClick={resetQuiz}>Retry Quiz</button>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(selectedAnswers).length < (activeResults?.quiz?.length || 0)}
                  >
                    Submit Answers
                  </button>
                )}
                <button className="btn btn-outline" onClick={() => setQuizOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISearch;
