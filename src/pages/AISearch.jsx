import React, { useState } from 'react';
import { Sparkles, LayoutList, Video, HelpCircle, FileText, Compass, ChevronRight } from 'lucide-react';
import './AISearch.css';
import { useNavigate } from 'react-router-dom';

const AISearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("Teach me Spring Boot");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <div className="ai-search-page container animate-fade-up">
      <div className="search-header">
        <form onSubmit={handleSearch} className="large-search-box glassmorphism">
          <Sparkles className="accent-cyan" size={24} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to learn today?"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        
        <div className="search-filters">
          <span>Filters:</span>
          <button className="badge active">Beginner</button>
          <button className="badge">Intermediate</button>
          <button className="badge">Advanced</button>
          <span className="divider">|</span>
          <button className="badge active">Articles</button>
          <button className="badge">Videos</button>
          <button className="badge">Discussions</button>
        </div>
      </div>

      {!isSearching && (
        <div className="search-results">
          
          <div className="ai-summary-card card">
            <div className="ai-badge-header">
              <Sparkles size={18} className="text-purple"/> 
              <span className="gradient-text font-bold">AI Summary</span>
            </div>
            <p><strong>Spring Boot</strong> is an open-source Java-based framework used to create microservices. It is developed by the Pivotal Team and is used to build stand-alone and production-ready spring applications.</p>
            <p>To get started, you'll need a basic understanding of Java and the Spring framework. Below is a curated learning path specifically designed for beginners.</p>
          </div>

          <div className="results-grid">
            {/* Main Results */}
            <div className="results-main">
              <div className="results-section">
                <h3><Compass className="text-blue" size={20}/> Learning Roadmap</h3>
                <div className="roadmap-card card">
                  <div className="roadmap-step">
                    <div className="step-circle active">1</div>
                    <div className="step-content">
                      <h4>Core Java Concepts</h4>
                      <p>Understand OOP, Collections, and Streams.</p>
                    </div>
                  </div>
                  <div className="roadmap-step">
                    <div className="step-circle">2</div>
                    <div className="step-content">
                      <h4>Spring Basics</h4>
                      <p>Dependency Injection and IoC.</p>
                    </div>
                  </div>
                  <div className="roadmap-step">
                    <div className="step-circle">3</div>
                    <div className="step-content">
                      <h4>Spring Boot & REST</h4>
                      <p>Building your first API.</p>
                    </div>
                  </div>
                  <button className="btn btn-outline w-100 mt-16">View Full Roadmap</button>
                </div>
              </div>

              <div className="results-section mt-32">
                <h3><FileText className="text-blue" size={20}/> Top Articles</h3>
                <div className="article-list">
                  {[1,2].map(i => (
                    <div key={i} className="card list-card" onClick={() => navigate(`/article/${i}`)}>
                      <div className="list-card-content">
                        <h4>Building a RESTful Web Service with Spring Boot</h4>
                        <p>A step-by-step guide to creating your first Spring Boot application.</p>
                      </div>
                      <ChevronRight size={20} className="text-muted"/>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Results */}
            <aside className="results-sidebar">
              <div className="card">
                <h3><Video className="text-purple" size={20}/> Video Tutorials</h3>
                <ul className="video-list mt-16">
                  <li>
                    <div className="video-thumb"><PlayCircle size={24} className="text-white"/></div>
                    <div className="video-info">
                      <h4>Spring Boot in 100 Seconds</h4>
                      <span>Fireship • 1.2M views</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card mt-24">
                <h3><HelpCircle className="accent-cyan" size={20}/> Practice Questions</h3>
                <ul className="faq-list mt-16">
                  <li>What is the difference between Spring and Spring Boot?</li>
                  <li>How does auto-configuration work?</li>
                  <li>Explain the @SpringBootApplication annotation.</li>
                </ul>
                <button className="btn btn-outline w-100 mt-16 small">Start Quiz</button>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISearch;
