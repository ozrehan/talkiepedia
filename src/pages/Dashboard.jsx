import React from 'react';
import { Target, Flame, Medal, Award, Clock, ArrowRight, PlayCircle, BookMarked } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Mon', hours: 1.5 },
  { name: 'Tue', hours: 2 },
  { name: 'Wed', hours: 1 },
  { name: 'Thu', hours: 3 },
  { name: 'Fri', hours: 2.5 },
  { name: 'Sat', hours: 4 },
  { name: 'Sun', hours: 3.5 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-page container animate-fade-up">
      <header className="dashboard-header">
        <div>
          <h1>Welcome back, Alex!</h1>
          <p className="subtitle">You're on a 14-day learning streak. Keep it up!</p>
        </div>
        <button className="btn btn-primary">
          <PlayCircle size={18} /> Resume Learning
        </button>
      </header>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-main">
          
          <div className="stats-cards">
            <div className="stat-card card">
              <div className="stat-icon bg-orange-light"><Flame className="text-orange" size={24}/></div>
              <div className="stat-info">
                <h4>14 Days</h4>
                <span>Learning Streak</span>
              </div>
            </div>
            <div className="stat-card card">
              <div className="stat-icon bg-blue-light"><Target className="text-blue" size={24}/></div>
              <div className="stat-info">
                <h4>12 hrs</h4>
                <span>Weekly Goal: 15h</span>
              </div>
            </div>
            <div className="stat-card card">
              <div className="stat-icon bg-purple-light"><Medal className="text-purple" size={24}/></div>
              <div className="stat-info">
                <h4>Top 5%</h4>
                <span>Community Rank</span>
              </div>
            </div>
          </div>

          <div className="chart-card card mt-24">
            <div className="section-header">
              <h3>Learning Progress</h3>
              <select className="filter-select">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)'}} />
                  <Tooltip contentStyle={{background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px'}}/>
                  <Line type="monotone" dataKey="hours" stroke="var(--primary-blue)" strokeWidth={3} dot={{r: 4, fill: 'var(--primary-blue)', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card mt-24">
            <div className="section-header">
              <h3>Saved Articles & Bookmarks</h3>
              <button className="btn btn-outline small">View All</button>
            </div>
            <ul className="bookmark-list">
              <li>
                <div className="bookmark-content">
                  <span className="badge">System Design</span>
                  <h4>Scaling Microservices at Uber</h4>
                  <span className="meta"><Clock size={12}/> Saved 2 days ago</span>
                </div>
                <button className="icon-btn"><BookMarked size={18} className="text-primary"/></button>
              </li>
              <li>
                <div className="bookmark-content">
                  <span className="badge">React</span>
                  <h4>Mastering Server Components</h4>
                  <span className="meta"><Clock size={12}/> Saved 5 days ago</span>
                </div>
                <button className="icon-btn"><BookMarked size={18} className="text-primary"/></button>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column */}
        <aside className="dashboard-sidebar">
          <div className="card">
            <h3>Achievements</h3>
            <div className="achievements-grid mt-16">
              <div className="achievement-badge earned">
                <Award size={32} className="text-yellow"/>
                <span>7 Day Streak</span>
              </div>
              <div className="achievement-badge earned">
                <Award size={32} className="text-blue"/>
                <span>First Review</span>
              </div>
              <div className="achievement-badge locked">
                <Award size={32} className="text-muted"/>
                <span>30 Day Streak</span>
              </div>
              <div className="achievement-badge locked">
                <Award size={32} className="text-muted"/>
                <span>Top Contributor</span>
              </div>
            </div>
          </div>

          <div className="card mt-24">
            <h3>Recently Viewed</h3>
            <ul className="recent-list mt-16">
              {[1,2,3].map(i => (
                <li key={i}>
                  <div className="recent-img"></div>
                  <div className="recent-info">
                    <h4>Introduction to GraphQL</h4>
                    <span>By Sarah Drasner</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
