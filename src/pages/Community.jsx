import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Plus, TrendingUp, Users } from 'lucide-react';
import './Community.css';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="community-page container animate-fade-up">
      <div className="community-header">
        <h1>Community & Discussions</h1>
        <button className="btn btn-primary"><Plus size={18}/> New Discussion</button>
      </div>

      <div className="community-grid">
        {/* Main Feed */}
        <div className="community-main">
          <div className="tabs">
            <button className={`tab ${activeTab === 'feed' ? 'active' : ''}`} onClick={() => setActiveTab('feed')}>Discussion Feed</button>
            <button className={`tab ${activeTab === 'expert' ? 'active' : ''}`} onClick={() => setActiveTab('expert')}>Expert Answers</button>
            <button className={`tab ${activeTab === 'polls' ? 'active' : ''}`} onClick={() => setActiveTab('polls')}>Live Polls</button>
          </div>

          <div className="discussion-feed mt-24">
            {[1,2,3].map(i => (
              <div key={i} className="discussion-card card">
                <div className="author-row">
                  <img src={`https://i.pravatar.cc/150?img=${i+30}`} alt="User" className="avatar"/>
                  <div>
                    <h4>John Doe</h4>
                    <span>2 hours ago in System Design</span>
                  </div>
                </div>
                <h3>What is the best way to handle authentication in microservices?</h3>
                <p>I've been looking into JWT and OAuth2, but I'm not sure which approach scales better when dealing with 10+ microservices...</p>
                <div className="discussion-actions">
                  <button className="icon-text-btn"><ThumbsUp size={16}/> 124 Votes</button>
                  <button className="icon-text-btn"><MessageSquare size={16}/> 32 Answers</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="community-sidebar">
          <div className="card">
            <h3><TrendingUp className="text-orange" size={20}/> Trending Questions</h3>
            <ul className="trending-list mt-16">
              <li>How to prepare for AWS Solutions Architect?</li>
              <li>React Context vs Redux in 2026?</li>
              <li>Understanding Kubernetes Pods</li>
            </ul>
          </div>

          <div className="card mt-24">
            <h3><Users className="text-blue" size={20}/> Top Contributors</h3>
            <ul className="contributor-list mt-16">
              {[1,2].map(i => (
                <li key={i}>
                  <img src={`https://i.pravatar.cc/150?img=${i+40}`} alt="User" className="avatar"/>
                  <div className="user-info">
                    <h4>Maria Garcia</h4>
                    <span>1.2K Points</span>
                  </div>
                  <button className="btn btn-outline small">Follow</button>
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
