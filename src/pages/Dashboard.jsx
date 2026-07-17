import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  Target, Flame, Medal, Award, Clock, ArrowRight, 
  PlayCircle, BookMarked, Bell, Calendar, User, 
  BookOpen, ChevronRight, CheckSquare, Sparkles 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
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
  const navigate = useNavigate();
  const [weeklyGoal, setWeeklyGoal] = useState(15);
  const [learningHours, setLearningHours] = useState(12);
  
  // Bookmarks state (interactive delete)
  const [bookmarks, setBookmarks] = useState([
    { id: 1, topic: 'System Design', title: 'Scaling Microservices at Uber', saved: '2 days ago' },
    { id: 2, topic: 'React', title: 'Mastering Server Components in React 19', saved: '5 days ago' }
  ]);

  // Notifications timeline list
  const [activities, setActivities] = useState([
    { id: 1, type: 'article', text: "Completed reading 'Understanding Next-Gen State Management'", date: 'Today, 2:40 PM' },
    { id: 2, type: 'podcast', text: "Started listening to 'Sumanvitha | Collins Aerospace'", date: 'Yesterday' },
    { id: 3, type: 'forum', text: "Posted a query in 'System Design' discussion feed", date: '3 days ago' },
    { id: 4, type: 'achievement', text: "Unlocked the '7 Day Streak' award badge", date: '1 week ago' }
  ]);

  const handleRemoveBookmark = (bId, title) => {
    Swal.fire({
      title: 'Remove Bookmark?',
      text: `Do you want to remove "${title}" from your saved list?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: 'var(--text-muted)',
      confirmButtonText: 'Yes, remove',
      background: 'var(--bg-sidebar)',
      color: 'var(--text-primary)'
    }).then((result) => {
      if (result.isConfirmed) {
        setBookmarks(prev => prev.filter(b => b.id !== bId));
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Removed!',
          showConfirmButton: false,
          timer: 1800,
          background: 'var(--bg-sidebar)',
          color: 'var(--text-primary)'
        });
      }
    });
  };

  const handleAdjustGoal = () => {
    Swal.fire({
      title: 'Adjust Weekly Goal',
      input: 'number',
      inputLabel: 'Set your target learning hours:',
      inputValue: weeklyGoal,
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      background: 'var(--bg-sidebar)',
      color: 'var(--text-primary)',
      inputValidator: (value) => {
        if (!value || value <= 0) {
          return 'Please enter a valid number of hours!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setWeeklyGoal(parseFloat(result.value));
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `Goal set to ${result.value} hours!`,
          showConfirmButton: false,
          timer: 2000,
          background: 'var(--bg-sidebar)',
          color: 'var(--text-primary)'
        });
      }
    });
  };

  return (
    <div className="dashboard-page container animate-fade-in">
      
      {/* Header Profile Info */}
      <header className="dashboard-header mb-4 flex-wrap gap-3">
        <div>
          <h1 className="fw-bold text-white mb-1">Welcome back, Alex!</h1>
          <p className="text-secondary m-0">You're on a <strong className="text-cyan-accent">14-day learning streak</strong>. Keep up the great work!</p>
        </div>
        <button 
          className="btn btn-primary btn-gradient rounded-pill px-4"
          onClick={() => navigate('/article/1')}
        >
          <PlayCircle size={16} />
          <span>Resume Learning</span>
        </button>
      </header>

      {/* Grid structure */}
      <div className="dashboard-grid">
        
        {/* Left Column */}
        <div className="dashboard-main-col">
          
          {/* Quick Metrics */}
          <div className="row g-3">
            
            <div className="col-12 col-md-4">
              <div className="card p-3 border-color bg-card shadow-sm hover-elevate d-flex flex-row align-items-center gap-3">
                <div className="stat-circle-icon bg-orange-light">
                  <Flame className="text-orange" size={20} />
                </div>
                <div>
                  <h5 className="fw-bold text-white m-0">14 Days</h5>
                  <span className="text-muted small">Current Streak</span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4" onClick={handleAdjustGoal} style={{ cursor: 'pointer' }}>
              <div className="card p-3 border-color bg-card shadow-sm hover-elevate d-flex flex-row align-items-center gap-3">
                <div className="stat-circle-icon bg-blue-light">
                  <Target className="text-blue" size={20} />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold text-white m-0">{learningHours} hrs</h5>
                    <span className="text-muted small">Goal: {weeklyGoal}h</span>
                  </div>
                  <div className="progress-bar-track rounded-pill mt-1" style={{ height: '4px', background: 'var(--border-color)' }}>
                    <div className="progress-bar-fill rounded-pill" style={{ height: '100%', width: `${Math.min(100, (learningHours/weeklyGoal)*100)}%`, background: 'var(--primary-blue)' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card p-3 border-color bg-card shadow-sm hover-elevate d-flex flex-row align-items-center gap-3">
                <div className="stat-circle-icon bg-purple-light">
                  <Medal className="text-purple" size={20} />
                </div>
                <div>
                  <h5 className="fw-bold text-white m-0">Top 5%</h5>
                  <span className="text-muted small">Community Rank</span>
                </div>
              </div>
            </div>

          </div>

          {/* Recharts progress chart */}
          <div className="card border-color bg-card p-4 mt-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <h4 className="fw-bold text-white m-0">Weekly Learning Log</h4>
              <select className="filter-select rounded-pill px-3 py-1 text-sm bg-hover border border-color text-white outline-none">
                <option>This Week</option>
                <option>Last Week</option>
              </select>
            </div>
            
            <div className="chart-container" style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--divider)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 11}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 11}} />
                  <Tooltip contentStyle={{background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)'}}/>
                  <Area type="monotone" dataKey="hours" stroke="var(--primary-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" dot={{r: 4, fill: 'var(--bg-main)', stroke: 'var(--primary-blue)', strokeWidth: 2}} activeDot={{r: 6}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Saved Articles List */}
          <div className="card border-color bg-card p-4 mt-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold text-white m-0">Saved Resources</h4>
              <button onClick={() => navigate('/search')} className="btn btn-outline border-0 p-0 text-sm hover-text-blue">Browse Search</button>
            </div>

            {bookmarks.length > 0 ? (
              <ul className="bookmark-list-group list-unstyled m-0 d-flex flex-column gap-3">
                {bookmarks.map((item) => (
                  <li key={item.id} className="p-3 rounded-3 bg-hover border border-color d-flex justify-content-between align-items-center hover-elevate">
                    <div onClick={() => navigate('/article/1')} style={{ cursor: 'pointer', flex: 1 }}>
                      <span className="badge mb-2">{item.topic}</span>
                      <h6 className="fw-bold text-white mb-1">{item.title}</h6>
                      <div className="d-flex align-items-center gap-1 text-muted small">
                        <Clock size={12} />
                        <span>Saved {item.saved}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveBookmark(item.id, item.title)} 
                      className="btn btn-outline border-0 p-2 text-cyan-accent"
                      title="Remove Bookmark"
                    >
                      <BookMarked size={18} fill="currentColor" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-4">
                <BookOpen size={30} className="text-muted mb-2" />
                <p className="text-muted small m-0">You have no saved resources. Click bookmark on articles to save them here.</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Column */}
        <aside className="dashboard-sidebar-col">
          
          {/* Achievements badge board */}
          <div className="card p-4 mb-4 border-color">
            <h4 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
              <Award className="text-yellow" size={18} />
              <span>Badge Achievements</span>
            </h4>
            <div className="achievements-card-grid mt-3">
              
              <div className="badge-wrapper earned" title="Completed 7 consecutive learning days">
                <Award size={32} className="text-yellow" />
                <span className="small text-white mt-1">7 Day Streak</span>
              </div>

              <div className="badge-wrapper earned" title="Posted a response in discussions">
                <Medal size={32} className="text-primary-blue" />
                <span className="small text-white mt-1">Review Master</span>
              </div>

              <div className="badge-wrapper locked" title="Complete 30 consecutive learning days">
                <Award size={32} className="text-muted" />
                <span className="small text-muted mt-1">30 Day Streak</span>
              </div>

              <div className="badge-wrapper locked" title="Submit 10 expert accepted answers">
                <Medal size={32} className="text-muted" />
                <span className="small text-muted mt-1">Top Contributor</span>
              </div>

            </div>
          </div>

          {/* Recent Activity timeline */}
          <div className="card p-4 border-color">
            <h4 className="fw-bold text-white mb-3 d-flex align-items-center gap-2">
              <Bell className="text-cyan-accent" size={18} />
              <span>Activity Log</span>
            </h4>
            <div className="activity-timeline-list mt-3">
              {activities.map((act) => (
                <div className="activity-item-block" key={act.id}>
                  <div className="activity-node-bullet"></div>
                  <div className="activity-content-box">
                    <p className="text-white small m-0">{act.text}</p>
                    <span className="text-muted small" style={{ fontSize: '0.72rem' }}>{act.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default Dashboard;
