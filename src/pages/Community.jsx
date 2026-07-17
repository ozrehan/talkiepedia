import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { 
  MessageSquare, ThumbsUp, Plus, TrendingUp, Users, 
  Search, CheckCircle, HelpCircle, UserPlus, UserCheck, 
  Send, X, Globe, BarChart2 
} from 'lucide-react';
import './Community.css';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Post inputs
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTopic, setNewTopic] = useState('System Design');

  // Discussions state
  const [discussions, setDiscussions] = useState([
    { id: 1, author: 'Sumanvitha K.', avatar: 'https://talkiepedia.forgealumnus.com/image/sumanvitha.jpeg', topic: 'Aerospace Systems', title: 'What is the best way to handle real-time sensor streams in flight telemetry?', desc: 'We are analyzing message queues that can handle high data throughput with sub-millisecond latencies. Looking at Kafka vs native C++ streams...', votes: 124, answers: 32, hasVoted: false },
    { id: 2, author: 'Bharat Chandra', avatar: 'https://talkiepedia.forgealumnus.com/image/bharat.jpeg', topic: 'MNC Recruitment', title: 'Key algorithms to focus on for Microsoft L61+ interviews?', desc: 'I am mapping out a roadmap for engineers targeting senior technical roles. Is dynamic programming still heavily evaluated, or is systems design the major component?', votes: 98, answers: 15, hasVoted: false },
    { id: 3, author: 'Kiran Kumar', avatar: 'https://talkiepedia.forgealumnus.com/image/kiran.jpg', topic: 'System Architecture', title: 'Managing distributed locks in serverless microservices', desc: 'When scaling AWS lambda nodes, local mutex locks fail. What are the best practices for setting up Redis-based Redlock algorithms?', votes: 56, answers: 9, hasVoted: false }
  ]);

  // Contributors state (handling follows)
  const [contributors, setContributors] = useState([
    { id: 101, name: 'David Chen', points: '1.4K Points', avatar: 'https://i.pravatar.cc/150?img=15', isFollowing: false },
    { id: 102, name: 'Maria Garcia', points: '1.2K Points', avatar: 'https://i.pravatar.cc/150?img=44', isFollowing: false }
  ]);

  // Live Poll state
  const [pollVoted, setPollVoted] = useState(false);
  const [pollOptions, setPollOptions] = useState([
    { id: 1, label: 'Zustand / Redux ToolKit', votes: 412 },
    { id: 2, label: 'React 19 Native Actions', votes: 289 },
    { id: 3, label: 'Signals / Valtio', votes: 124 }
  ]);

  const handleVote = (optId) => {
    if (pollVoted) return;
    setPollOptions(prev => prev.map(opt => 
      opt.id === optId ? { ...opt, votes: opt.votes + 1 } : opt
    ));
    setPollVoted(true);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Vote registered!',
      showConfirmButton: false,
      timer: 1800,
      background: 'var(--bg-sidebar)',
      color: 'var(--text-primary)'
    });
  };

  const handleUpvote = (postId) => {
    setDiscussions(prev => prev.map(p => {
      if (p.id === postId) {
        const nextVoteCount = p.hasVoted ? p.votes - 1 : p.votes + 1;
        return { ...p, votes: nextVoteCount, hasVoted: !p.hasVoted };
      }
      return p;
    }));
  };

  const handleFollowToggle = (cId) => {
    setContributors(prev => prev.map(c => 
      c.id === cId ? { ...c, isFollowing: !c.isFollowing } : c
    ));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newPost = {
      id: Date.now(),
      author: 'Alex (You)',
      avatar: 'https://i.pravatar.cc/150?img=53',
      topic: newTopic,
      title: newTitle,
      desc: newDesc,
      votes: 1,
      answers: 0,
      hasVoted: true
    };

    setDiscussions(prev => [newPost, ...prev]);
    setNewTitle('');
    setNewDesc('');
    setShowNewPostForm(false);

    Swal.fire({
      icon: 'success',
      title: 'Published!',
      text: 'Your discussion query has been added to the feed.',
      confirmButtonColor: '#16a34a',
      background: 'var(--bg-sidebar)',
      color: 'var(--text-primary)'
    });
  };

  // Filtered feed
  const filteredDiscussions = discussions.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPollVotes = pollOptions.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="community-page container animate-fade-in">
      
      {/* Page Header */}
      <header className="community-header mb-4">
        <div>
          <h1 className="fw-bold text-white mb-1">Community Hub</h1>
          <p className="text-secondary m-0">Join discussions, share queries, and check peer opinions.</p>
        </div>
        <button 
          className="btn btn-primary btn-gradient rounded-pill px-4"
          onClick={() => setShowNewPostForm(!showNewPostForm)}
        >
          {showNewPostForm ? <X size={16} /> : <Plus size={16} />}
          <span>{showNewPostForm ? 'Cancel' : 'New Discussion'}</span>
        </button>
      </header>

      {/* NEW POST FORM COLLAPSIBLE */}
      {showNewPostForm && (
        <div className="card p-4 mb-4 border-color animate-fade-up">
          <h4 className="fw-bold text-white mb-3">Ask the Community</h4>
          <form onSubmit={handleCreatePost} className="d-flex flex-column gap-3">
            <div className="row g-3">
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  placeholder="What is your discussion query?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-control bg-hover border-color text-white p-3 rounded-3 w-100"
                  required
                />
              </div>
              <div className="col-12 col-md-4">
                <select
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="form-select bg-hover border-color text-white p-3 rounded-3 w-100"
                  style={{ background: 'var(--bg-hover)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                >
                  <option value="System Design">System Design</option>
                  <option value="Aerospace Systems">Aerospace Systems</option>
                  <option value="React Framework">React Framework</option>
                  <option value="MNC Recruitment">MNC Recruitment</option>
                </select>
              </div>
            </div>
            <div>
              <textarea
                placeholder="Elaborate on your question... Provide context, code snippets, or configurations."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="form-control bg-hover border-color text-white p-3 rounded-3 w-100"
                rows="4"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary align-self-end rounded-pill px-4">
              <Send size={14} />
              <span>Publish Query</span>
            </button>
          </form>
        </div>
      )}

      {/* CORE GRID */}
      <div className="community-grid">
        
        {/* Main Feed Column */}
        <div className="community-main-feed">
          
          {/* Tab Selection Header */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 border-bottom border-color pb-2">
            <div className="tabs m-0 gap-3">
              <button 
                className={`tab ${activeTab === 'feed' ? 'active' : ''}`} 
                onClick={() => setActiveTab('feed')}
              >
                Discussions Feed
              </button>
              <button 
                className={`tab ${activeTab === 'expert' ? 'active' : ''}`} 
                onClick={() => setActiveTab('expert')}
              >
                Expert Answers
              </button>
              <button 
                className={`tab ${activeTab === 'polls' ? 'active' : ''}`} 
                onClick={() => setActiveTab('polls')}
              >
                Live Opinion Polls
              </button>
            </div>

            {/* Local search inside feed */}
            {activeTab === 'feed' && (
              <div className="position-relative" style={{ minWidth: '220px' }}>
                <Search size={14} className="position-absolute start-3 top-50 translate-middle-y text-muted" style={{ left: '12px' }} />
                <input
                  type="text"
                  placeholder="Filter queries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-hover border border-color text-white rounded-pill px-4 py-1 text-sm outline-none"
                  style={{ paddingLeft: '32px', fontSize: '0.85rem' }}
                />
              </div>
            )}
          </div>

          {/* TAB CONTENT: DISCUSSION FEED */}
          {activeTab === 'feed' && (
            <div className="discussion-feed d-flex flex-column gap-4">
              {filteredDiscussions.map((post) => (
                <div key={post.id} className="card p-4 border-color bg-card hover-elevate shadow-sm rounded-4 animate-fade-up">
                  
                  {/* Author Meta Row */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="author-row">
                      <img src={post.avatar} alt={post.author} className="avatar rounded-circle border border-color" style={{ width: '32px', height: '32px' }} />
                      <div>
                        <h6 className="fw-semibold text-white m-0">{post.author}</h6>
                        <span className="text-secondary small">Topic: <strong>{post.topic}</strong></span>
                      </div>
                    </div>
                    <span className="badge">Active</span>
                  </div>

                  <h4 className="fw-bold text-white mb-2">{post.title}</h4>
                  <p className="text-secondary small mb-4" style={{ fontSize: '0.92rem', lineHeight: '1.6' }}>{post.desc}</p>

                  {/* Actions */}
                  <div className="d-flex gap-3 border-top border-color pt-3">
                    <button 
                      className={`btn btn-outline border-0 p-0 text-sm gap-2 ${post.hasVoted ? 'text-primary' : 'text-muted'}`}
                      onClick={() => handleUpvote(post.id)}
                    >
                      <ThumbsUp size={16} fill={post.hasVoted ? "currentColor" : "none"} />
                      <span>{post.votes} Upvotes</span>
                    </button>
                    <button className="btn btn-outline border-0 p-0 text-sm gap-2 text-muted">
                      <MessageSquare size={16} />
                      <span>{post.answers} Answers</span>
                    </button>
                  </div>

                </div>
              ))}

              {filteredDiscussions.length === 0 && (
                <div className="text-center py-5">
                  <Globe size={32} className="text-muted mb-2" />
                  <p className="text-muted">No discussion queries match your filter.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: EXPERT ANSWERS */}
          {activeTab === 'expert' && (
            <div className="discussion-feed d-flex flex-column gap-4">
              <div className="card p-4 border-color bg-card shadow-sm rounded-4 animate-fade-up">
                <span className="badge mb-2">Aerospace Systems</span>
                <h4 className="fw-bold text-white mb-2">Q: How to prepare for Collins Aerospace principal engineer reviews?</h4>
                <div className="p-3 rounded bg-hover border-left border-2 border-primary-blue mt-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <img src="https://talkiepedia.forgealumnus.com/image/sumanvitha.jpeg" className="rounded-circle" style={{ width: '24px', height: '24px' }} alt="Sumanvitha" />
                    <span className="fw-semibold text-white small">Sumanvitha K. (Collins Aerospace Expert) Answered:</span>
                  </div>
                  <p className="text-secondary small m-0" style={{ lineHeight: 1.6 }}>
                    "Focus heavily on safety-critical architectures, RTOS scheduling logic, and verification plans. Demonstrating compliance standards like DO-178C is highly valued during evaluation."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: LIVE OPINION POLLS */}
          {activeTab === 'polls' && (
            <div className="discussion-feed d-flex flex-column gap-4">
              <div className="card p-4 border-color bg-card shadow-sm rounded-4 animate-fade-up">
                <div className="d-flex align-items-center gap-2 mb-3 text-cyan-accent">
                  <BarChart2 size={18} />
                  <span className="small fw-bold text-uppercase">Live Tech Poll</span>
                </div>
                <h4 className="fw-bold text-white mb-2">What is your primary state manager for new React projects in 2026?</h4>
                <p className="text-secondary small mb-4">Cast your vote to see community-wide patterns. One vote allowed per user.</p>

                <div className="d-flex flex-column gap-3">
                  {pollOptions.map((opt) => {
                    const percent = totalPollVotes > 0 ? Math.round((opt.votes / totalPollVotes) * 100) : 0;
                    return (
                      <div key={opt.id} className="poll-option-wrapper" onClick={() => handleVote(opt.id)}>
                        <div className="d-flex justify-content-between align-items-center mb-1 text-sm font-semibold">
                          <span className="text-white">{opt.label}</span>
                          <span className="text-muted">{percent}% ({opt.votes} votes)</span>
                        </div>
                        <div className="poll-bar-track rounded-pill" style={{ height: '8px', background: 'var(--border-color)', overflow: 'hidden' }}>
                          <div 
                            className="poll-bar-fill rounded-pill" 
                            style={{ 
                              height: '100%', 
                              width: pollVoted ? `${percent}%` : '0%', 
                              background: 'linear-gradient(90deg, var(--accent-color), var(--primary-blue))',
                              transition: 'width 0.8s ease-out'
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {pollVoted && (
                  <div className="text-center text-muted small mt-4">
                    ✓ Thank you for voting. Total registered votes: {totalPollVotes}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Column */}
        <aside className="community-sidebar">
          
          {/* Trending Questions */}
          <div className="card p-4 mb-4 border-color">
            <h4 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
              <TrendingUp className="text-orange" size={18} />
              <span>Trending Queries</span>
            </h4>
            <ul className="trending-queries-list list-unstyled m-0">
              <li onClick={() => { setSearchQuery('AWS'); setActiveTab('feed'); }}>How to prepare for AWS solutions architect?</li>
              <li onClick={() => { setSearchQuery('React Context'); setActiveTab('feed'); }}>React Context vs Redux in 2026?</li>
              <li onClick={() => { setSearchQuery('Kubernetes'); setActiveTab('feed'); }}>Understanding Kubernetes Pod lifecycles</li>
            </ul>
          </div>

          {/* Top Contributors */}
          <div className="card p-4 border-color">
            <h4 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
              <Users className="text-primary-blue" size={18} />
              <span>Top Contributors</span>
            </h4>
            <ul className="contributors-list-sidebar list-unstyled m-0 d-flex flex-column gap-3">
              {contributors.map((c) => (
                <li key={c.id} className="d-flex align-items-center justify-content-between gap-2">
                  <div className="d-flex align-items-center gap-2">
                    <img src={c.avatar} alt={c.name} className="rounded-circle border border-color" style={{ width: '32px', height: '32px' }} />
                    <div className="text-truncate" style={{ maxWidth: '100px' }}>
                      <h6 className="fw-semibold text-white m-0 text-truncate">{c.name}</h6>
                      <span className="text-muted small" style={{ fontSize: '0.75rem' }}>{c.points}</span>
                    </div>
                  </div>
                  <button 
                    className={`btn py-1 px-3 rounded-pill text-xs fw-semibold ${c.isFollowing ? 'btn-outline border-color text-muted' : 'btn-primary'}`}
                    onClick={() => handleFollowToggle(c.id)}
                    style={{ fontSize: '0.75rem', padding: '4px 12px' }}
                  >
                    {c.isFollowing ? <UserCheck size={12} /> : <UserPlus size={12} />}
                    <span>{c.isFollowing ? 'Following' : 'Follow'}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default Community;
