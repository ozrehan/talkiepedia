import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Sun, Moon, Search, Sparkles, BookOpen, 
  MessageSquare, LayoutDashboard, Radio, Info, MapPin, 
  Phone, Mail, Accessibility, Volume2, Type, HelpCircle, 
  Eye, CornerDownRight, Bell 
} from 'lucide-react';
import { BottomPlayer } from './BottomPlayer';
import AIAssistantWidget from './AIAssistantWidget';

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tollFreeOpen, setTollFreeOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [contrast, setContrast] = useState(localStorage.getItem('contrast') || 'normal');
  const [fontScale, setFontScale] = useState(parseFloat(localStorage.getItem('fontScale')) || 1.0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  // Scroll listener to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTollFreeNumber = () => setTollFreeOpen(!tollFreeOpen);
  const closeTollFreePopup = () => setTollFreeOpen(false);

  // Apply accessibility values on load & state changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', contrast);
    localStorage.setItem('contrast', contrast);
  }, [contrast]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale);
    localStorage.setItem('fontScale', fontScale.toString());
  }, [fontScale]);

  // Global Keyboard Shortcuts for WCAG Accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus Search input on Ctrl + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.focus();
        } else {
          navigate('/search');
        }
      }
      // Toggle Theme on Alt + T
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      }
      // Toggle High Contrast on Alt + C
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setContrast(prev => prev === 'high' ? 'normal' : 'high');
      }
      // Increase Font Size on Alt + Plus / Equal
      if (e.altKey && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        setFontScale(prev => Math.min(1.4, prev + 0.1));
      }
      // Decrease Font Size on Alt + Minus
      if (e.altKey && e.key === '-') {
        e.preventDefault();
        setFontScale(prev => Math.max(0.8, prev - 0.1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleGlobalSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Generate dynamic breadcrumbs based on pathname
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    if (paths.length === 0) return [{ label: 'Home', path: '/' }];
    
    const crumbs = [{ label: 'Home', path: '/' }];
    let currentPath = '';
    
    paths.forEach((p, idx) => {
      currentPath += `/${p}`;
      let label = p.charAt(0).toUpperCase() + p.slice(1);
      if (p === 'podcasts') label = 'Podcasts';
      if (p === 'search') label = 'AI Search';
      if (p === 'community') label = 'Community';
      if (p === 'dashboard') label = 'Dashboard';
      if (p === 'article') label = 'Article';
      
      // If it's a numeric ID (e.g., article ID)
      if (!isNaN(p)) {
        label = `Episode #${p}`;
      }
      
      crumbs.push({ label, path: currentPath });
    });
    
    return crumbs;
  };

  return (
    <div className={`app-layout-wrapper ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      
      {/* Dynamic Top Progress Bar for Accessibility & Navigation Feedback */}
      <div className="reading-progress-container">
        <div className="reading-progress-bar" id="global-progress-bar"></div>
      </div>

      {/* TOP HEADER (Sticky Glassmorphic Bar) */}
      <header className={`main-header glassmorphism sticky-top ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-left">
          <button 
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar Navigation"
          >
            <Menu size={30} />
          </button>
          
          <Link to="/" className="brand-logo-link">
            <img
              src="https://talkiepedia.forgealumnus.com/image/logo.png"
              alt="Talkiepedia Logo"
              className="brand-logo"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links" aria-label="Main Navigation">
            <NavLink to="/" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/podcasts" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
              Podcasts
            </NavLink>
            
            {/* Pages Dropdown with Section Links */}
            <div 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setPagesOpen(true)}
              onMouseLeave={() => setPagesOpen(false)}
            >
              <button 
                className={`nav-item-link dropdown-toggle-btn ${pagesOpen ? 'active' : ''}`}
                onClick={() => setPagesOpen(!pagesOpen)}
                aria-expanded={pagesOpen}
              >
                Pages <span className="dropdown-arrow">▼</span>
              </button>
              {pagesOpen && (
                <div className="nav-dropdown-menu animate-fade-in">
                  <a href="/#guests-section" className="dropdown-menu-item" onClick={() => setPagesOpen(false)}>Team</a>
                  <a href="/#gallery-section" className="dropdown-menu-item" onClick={() => setPagesOpen(false)}>Gallery</a>
                  <a href="/#faq-section" className="dropdown-menu-item" onClick={() => setPagesOpen(false)}>FAQs</a>
                </div>
              )}
            </div>

            <NavLink to="/search" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
              AI Search
            </NavLink>
            <NavLink to="/community" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
              Feed
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
              Dashboard
            </NavLink>
            
            {/* Contact Us Link */}
            <a href="#footer-section" className="nav-item-link">
              Contact Us
            </a>
          </nav>
        </div>

        <div className="header-right">
          {/* Global Search Box */}
          <form className="global-search-form" onSubmit={handleGlobalSearchSubmit}>
            <Search size={20} className="search-icon" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search Talkiepedia... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-field"
              aria-label="Global Search"
            />
          </form>

          {/* Action Icons & Profile Group */}
          <div className="action-icons-group">
            <div className="accessibility-panel">
              <button 
                className="action-icon-btn" 
                onClick={() => setFontScale(prev => prev >= 1.3 ? 0.9 : prev + 0.1)} 
                title="Adjust Font Size (Alt + / -)"
                aria-label="Adjust font size"
              >
                <Type size={30} />
              </button>

              <button 
                className="action-icon-btn" 
                onClick={() => setContrast(prev => prev === 'high' ? 'normal' : 'high')} 
                title="High Contrast Mode (Alt + C)"
                aria-label="Toggle high contrast"
              >
                <Eye size={30} className={contrast === 'high' ? 'text-yellow' : ''} />
              </button>

              {/* Interactive Hanging Study Lamp Theme Switcher */}
              <div 
                className={`study-lamp-wrapper ${theme === 'dark' ? 'lamp-on' : 'lamp-off'}`}
                onClick={() => {
                  setTheme(prev => prev === 'dark' ? 'light' : 'dark');
                  const container = document.getElementById('study-lamp-container');
                  if (container) {
                    container.classList.add('pulling');
                    setTimeout(() => container.classList.remove('pulling'), 600);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
                  }
                }}
                aria-label="Pull the lamp to switch theme"
              >
                <div id="study-lamp-container" className="study-lamp-container">
                  <div className="lamp-wire"></div>
                  <div className="lamp-shade">
                    <div className="lamp-bulb"></div>
                    <div className="lamp-glow"></div>
                  </div>
                  <div className="lamp-pull-chain">
                    <div className="pull-string"></div>
                    <div className="pull-bead"></div>
                  </div>
                </div>
                <span className="lamp-tooltip">Pull the lamp to switch theme</span>
              </div>
            </div>

            <div className="header-divider"></div>

            {/* Notification Bell */}
            <button className="action-icon-btn notification-btn" aria-label="Notifications" title="Notifications">
              <Bell size={30} />
              <span className="notification-dot"></span>
            </button>

            {/* User Profile Avatar */}
            <div className="profile-avatar-wrapper" title="User Profile">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
                alt="User profile avatar" 
                className="profile-avatar-img"
              />
            </div>
          </div>
        </div>
      </header>

      {/* APP WRAPPER: SIDEBAR + MAIN CONTENT */}
      <div className="app-body-container">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`main-sidebar ${sidebarOpen ? 'open' : 'closed'}`} aria-label="Sidebar Navigation">
          <div className="sidebar-inner">
            <div className="sidebar-brand-section">
              <span className="sidebar-subtitle">PREMIUM KNOWLEDGE</span>
              <span className="sidebar-title gradient-text">Talkiepedia Hub</span>
            </div>

            <nav className="sidebar-nav-menu" aria-label="Primary Navigation">
              <NavLink to="/" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end>
                <Radio size={18} />
                <span>Home / Insights</span>
              </NavLink>

              <NavLink to="/podcasts" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Volume2 size={18} />
                <span>Podcast Episodes</span>
              </NavLink>

              <NavLink to="/search" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <Sparkles size={18} />
                <span>AI Search & Roadmap</span>
              </NavLink>

              <NavLink to="/community" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <MessageSquare size={18} />
                <span>Discussions Feed</span>
              </NavLink>

              <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={18} />
                <span>My Dashboard</span>
              </NavLink>
            </nav>

            <div className="sidebar-separator"></div>

            {/* Quick stats / streak in sidebar */}
            <div className="sidebar-streak-badge">
              <Sparkles size={16} className="text-yellow" />
              <div>
                <span className="streak-title">Learning Streak</span>
                <span className="streak-value">🔥 14 Days Active</span>
              </div>
            </div>

            {/* Quick partners logos in sidebar */}
            <div className="sidebar-footer-info">
              <span>Presented by</span>
              <a href="https://portfolio.forgealumnus.com" target="_blank" rel="noreferrer">
                <strong>Forge Alumnus</strong>
              </a>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY PORT */}
        <div className="main-content-viewport">
          {location.pathname !== '/' && (
            <div className="content-breadcrumbs-container">
              <nav className="desktop-breadcrumbs" aria-label="Breadcrumbs">
                <ol className="breadcrumbs-list">
                  {getBreadcrumbs().map((crumb, idx) => (
                    <li key={crumb.path} className="breadcrumb-item-custom">
                      {idx > 0 && <span className="breadcrumb-separator">/</span>}
                      {idx === getBreadcrumbs().length - 1 ? (
                        <span className="crumb-active">{crumb.label}</span>
                      ) : (
                        <Link to={crumb.path} className="crumb-link">{crumb.label}</Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          )}
          <main className="content-layout-body">
            <Outlet />
          </main>

          {/* FOOTER */}
          <footer className="footer-modern" id="footer-section">
            <div className="footer-bg-overlay"></div>
            <div className="footer-content container">
              <div className="footer-grid">
                
                {/* Brand Column */}
                <div className="footer-col brand-col">
                  <img
                    src="https://talkiepedia.forgealumnus.com/image/logo.png"
                    alt="Talkiepedia"
                    className="footer-logo"
                  />
                  <p className="footer-desc">
                    At Talkiepedia, we believe every voice has a story worth sharing. Our mission is to bring you authentic, thought-provoking conversations that inspire change and foster connection. Dive deep into a variety of career-shaping topics.
                  </p>
                  <div className="footer-socials">
                    <a href="https://www.youtube.com/@Talkiepedia" target="_blank" rel="noreferrer" className="social-icon-wrapper" aria-label="YouTube">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a href="https://www.instagram.com/talkiepedia/" target="_blank" rel="noreferrer" className="social-icon-wrapper" aria-label="Instagram">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/dhananjay-dubey-35aa31169/" target="_blank" rel="noreferrer" className="social-icon-wrapper" aria-label="LinkedIn">
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="footer-col">
                  <h4 className="footer-heading">Navigation</h4>
                  <ul className="footer-links-list">
                    <li><Link to="/">Home / Insights</Link></li>
                    <li><a href="#about-section">About Us</a></li>
                    <li><Link to="/podcasts">Podcasts</Link></li>
                    <li><a href="#guests-section">Our Guests</a></li>
                    <li><Link to="/search">AI Knowledge Search</Link></li>
                  </ul>
                </div>

                {/* Partners Column */}
                <div className="footer-col">
                  <h4 className="footer-heading">Partners</h4>
                  <div className="footer-listed-badges">
                    <a href="https://www.instagram.com/talkiepedia/" target="_blank" rel="noreferrer">
                      <img src="https://talkiepedia.forgealumnus.com/image/instagram.png" alt="Instagram" />
                    </a>
                    <a href="https://www.youtube.com/@Talkiepedia" target="_blank" rel="noreferrer">
                      <img src="https://talkiepedia.forgealumnus.com/image/youtube.png" alt="YouTube" />
                    </a>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="footer-col contact-col">
                  <h4 className="footer-heading">Information</h4>
                  <div className="contact-details">
                    <div className="contact-item">
                      <MapPin size={16} className="text-cyan-accent" />
                      <a href="https://www.google.com/maps/search/6th+floor%2C+N-heights%2C+Hitech-City%2C+Hyderabad" target="_blank" rel="noreferrer">
                        6th floor, N-heights, Hitech-City, Hyderabad
                      </a>
                    </div>
                    <div className="contact-item">
                      <Phone size={16} className="text-cyan-accent" />
                      <a href="tel:080-31411741">080-31411741</a>
                    </div>
                    <div className="contact-item">
                      <Mail size={16} className="text-cyan-accent" />
                      <a href="mailto:talkiepedia@forgealumnus.com">talkiepedia@forgealumnus.com</a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Copyright Block */}
              <div className="footer-copyright-block">
                <p>Copyright 2026 © All Rights Reserved by Forge Alumnus Services Pvt. Ltd.</p>
                <p>
                  Crafted By 💜{' '}
                  <a href="https://portfolio.forgealumnus.com" target="_blank" rel="noopener noreferrer" className="creator-credit">
                    Forge Alumnus
                  </a>
                </p>
              </div>

              <div className="recaptcha-notice">
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="mobile-bottom-nav glassmorphism" aria-label="Mobile Navigation">
        <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} end>
          <Radio size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/podcasts" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <Volume2 size={20} />
          <span>Podcasts</span>
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <Sparkles size={20} />
          <span>AI Search</span>
        </NavLink>
        <NavLink to="/community" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <MessageSquare size={20} />
          <span>Feed</span>
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
      </nav>

      {/* CALL FLOATING WIDGET */}
      <div className="call-button-wrapper">
        <button 
          className="call-icon" 
          onClick={toggleTollFreeNumber}
          aria-label="Call Support"
          title="Toll Free Support"
        >
          <Phone style={{ color: '#0a0e1a' }} size={22} />
        </button>
        {tollFreeOpen && (
          <div className="toll-free-popup animate-fade-up">
            <div className="chat-bubble">
              <X className="close-icon" size={16} onClick={closeTollFreePopup} />
              <strong>Need Help?</strong>
              <p style={{ margin: '8px 0 0', fontSize: '0.8rem', opacity: 0.9 }}>
                Call us toll-free at{' '}
                <a href="tel:8031411741" style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>
                  080-3141-1741
                </a>{' '}
                — we're happy to assist you!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* GLOBAL AUDIO PLAYER */}
      <BottomPlayer />

      {/* GLOBAL CONTEXT-AWARE AI WIDGET */}
      <AIAssistantWidget />
    </div>
  );
};
