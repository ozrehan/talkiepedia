import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AudioPlayerProvider } from './components/AudioPlayerContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Podcasts from './pages/Podcasts';
import AISearch from './pages/AISearch';
import Article from './pages/Article';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import './talkiepedia.css';

function App() {
  return (
    <AudioPlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="podcasts" element={<Podcasts />} />
            <Route path="search" element={<AISearch />} />
            <Route path="article/:id" element={<Article />} />
            <Route path="community" element={<Community />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AudioPlayerProvider>
  );
}

export default App;
