import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAudioPlayer } from '../components/AudioPlayerContext';
import { 
  Search, Play, Headphones, Clock, Calendar, 
  ChevronRight, AlertCircle, Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Podcasts = () => {
  const { playTrack } = useAudioPlayer();
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Extended podcast episodes list
  const episodes = [
    {
      id: 'rec-0',
      title: 'The World of Aerospace',
      artist: 'Sumanvitha | Collins Aerospace',
      category: 'Aerospace',
      company: 'Collins Aerospace',
      duration: '135m',
      date: 'January 2025',
      img: 'https://talkiepedia.forgealumnus.com/image/collinionsaeroscope.png',
      videoUrl: 'https://www.youtube.com/embed/5oZ_GtRx6S0?autoplay=1',
      audioFileId: '5oZ_GtRx6S0',
    },
    {
      id: 'rec-1',
      title: 'Dream Your Career Into a Big MNC',
      artist: 'Bharat Chandra | Microsoft',
      category: 'Tech',
      company: 'Microsoft',
      duration: '28m 39s',
      date: 'December 2024',
      img: 'https://talkiepedia.forgealumnus.com/image/microsoft.png',
      videoUrl: 'https://www.youtube.com/embed/hhckoit3fKk?autoplay=1',
      audioFileId: 'hhckoit3fKk',
    },
    {
      id: 'rec-2',
      title: 'Navigating Corporate Success',
      artist: 'Dhananjay Dubey | Forge Alumnus',
      category: 'Corporate',
      company: 'Forge Alumnus',
      duration: '10s',
      date: 'October 2024',
      img: 'https://talkiepedia.forgealumnus.com/image/trailer.png',
      videoUrl: 'https://www.youtube.com/embed/rsG-bZZ4vCs?autoplay=1',
      audioFileId: 'rsG-bZZ4vCs',
    },
  ];

  // Filtering logic
  const filteredEpisodes = episodes.filter((ep) => {
    const matchesSearch =
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.artist.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'All') return matchesSearch;
    return matchesSearch && ep.category === activeFilter;
  });

  const openVideoModal = (url) => {
    setActiveVideoUrl(url);
  };

  const closeVideoModal = () => {
    setActiveVideoUrl(null);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput) return;

    Swal.fire({
      icon: 'success',
      title: 'Subscribed!',
      text: `Thank you for subscribing with: ${emailInput}`,
      confirmButtonColor: '#16a34a',
      background: 'var(--bg-sidebar)',
      color: 'var(--text-primary)',
      customClass: {
        popup: 'glassmorphism border-color'
      }
    });
    setEmailInput('');
  };

  const handlePlayAudio = (title, artist, imageUrl, videoId) => {
    playTrack({
      title,
      artist,
      imageUrl,
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-${videoId === '5oZ_GtRx6S0' ? '1' : videoId === 'hhckoit3fKk' ? '2' : '3'}.mp3`,
    });
  };

  return (
    <div className="podcasts-page-container animate-fade-in">
      
      {/* BANNER HEADER */}
      <section
        className="section py-5 position-relative overflow-hidden border-bottom border-color"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(6, 9, 19, 0.85) 0%, rgba(14, 19, 38, 0.9) 100%), url('https://talkiepedia.forgealumnus.com/image/banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0',
        }}
      >
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex flex-column">
            <h2 className="display-5 fw-bold text-white mb-2">
              <span className="text-white">Our </span>
              <span className="accent-color">Podcasts</span>
            </h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb m-0 font-heading">
                <li className="breadcrumb-item">
                  <Link to="/" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active text-white" aria-current="page">
                  Podcasts
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* RECENT EPISODES & INTERACTIVE FILTERS */}
      <section className="py-5" id="episodes-section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="text-cyan-accent small fw-bold text-uppercase tracking-wider">Our Repository</span>
            <h3 className="fw-bold text-white mb-2 mt-1">
              Explore <span className="accent-color">Episodes</span>
            </h3>
            <p className="text-secondary mx-auto" style={{ maxWidth: '640px' }}>
              Access full recorded discussions. Filter by categories or query specific speakers.
            </p>
          </div>

          {/* Interactive Filters and Search Bar Row */}
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center mb-5 w-100 p-3 glassmorphism rounded-4 border-color">
            
            {/* Category Tabs */}
            <div className="d-flex gap-2 flex-wrap m-0">
              {['All', 'Tech', 'Aerospace', 'Corporate'].map((filter) => (
                <button
                  key={filter}
                  className={`btn rounded-pill px-3 py-2 text-sm fw-medium ${activeFilter === filter ? 'btn-primary btn-gradient' : 'btn-outline'}`}
                  onClick={() => setActiveFilter(filter)}
                  style={activeFilter === filter ? { color: '#0a0e1a' } : {}}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Local Search input */}
            <div className="position-relative w-100 w-md-auto" style={{ minWidth: '300px' }}>
              <Search size={16} className="position-absolute start-3 top-50 translate-middle-y text-muted" style={{ left: '16px' }} />
              <input
                type="text"
                placeholder="Search episode or speaker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-100 bg-hover border border-color text-white rounded-pill px-5 py-2 text-sm outline-none"
                style={{
                  paddingLeft: '44px',
                  outline: 'none',
                  background: 'rgba(255,255,255,0.02)',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* List Grid */}
          <div className="row g-4">
            {filteredEpisodes.length > 0 ? (
              filteredEpisodes.map((ep) => (
                <div className="col-12 col-md-6 col-lg-4 animate-fade-up" key={ep.id}>
                  <div className="card h-100 bg-card border-color p-3 rounded-4 shadow-sm hover-elevate">
                    
                    <div className="position-relative overflow-hidden rounded-3 mb-3 aspect-video group">
                      <img
                        src={ep.img}
                        alt={ep.title}
                        className="w-100 h-100 object-fit-cover transition-transform duration-500 scale-on-hover"
                        onError={(e) => {
                          e.target.src = 'https://talkiepedia.forgealumnus.com/image/logo.png';
                        }}
                      />
                      <div className="position-absolute start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center bg-black-overlay opacity-0-hover transition-opacity">
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn request-loader"
                            onClick={() => openVideoModal(ep.videoUrl)}
                            title="Watch Video"
                          >
                            <Play size={16} fill="currentColor" />
                          </button>
                          <button
                            type="button"
                            className="btn bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '45px', height: '45px', border: '1px solid rgba(255,255,255,0.1)' }}
                            onClick={() =>
                              handlePlayAudio(ep.title, ep.artist, ep.img, ep.audioFileId)
                            }
                            title="Listen Audio"
                          >
                            <Headphones size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                      <div className="d-flex align-items-center gap-1 text-muted small">
                        <Clock size={12} className="text-cyan-accent" />
                        <span>{ep.duration}</span>
                      </div>
                      <div className="d-flex align-items-center gap-1 text-muted small">
                        <Calendar size={12} className="text-cyan-accent" />
                        <span>{ep.date}</span>
                      </div>
                    </div>

                    <h5 className="fw-bold text-white mb-1">{ep.title}</h5>
                    <p className="text-secondary small m-0">{ep.artist}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <AlertCircle size={40} className="text-muted mb-3" />
                <p className="text-muted">No episodes found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PLATFORMS BADGES SECTION */}
      <section className="py-5 bg-card border-top border-bottom border-color">
        <div className="container">
          <div className="text-center">
            <h5 className="fw-bold text-white mb-4">Listen Our Podcast On</h5>
            <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center">
              <a href="https://www.youtube.com/@Talkiepedia" target="_blank" rel="noreferrer" className="partner-logo-link">
                <img
                  src="https://talkiepedia.forgealumnus.com/image/youtube.png"
                  alt="YouTube"
                  style={{ maxHeight: '44px', objectFit: 'contain' }}
                />
              </a>
              <a href="https://www.instagram.com/talkiepedia/" target="_blank" rel="noreferrer" className="partner-logo-link">
                <img
                  src="https://talkiepedia.forgealumnus.com/image/instagram.png"
                  alt="Instagram"
                  style={{ maxHeight: '44px', objectFit: 'contain' }}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SUBSCRIBE */}
      <section className="py-5">
        <div className="container">
          <div
            className="p-5 rounded-4 overflow-hidden position-relative border-color"
            style={{
              backgroundImage: "linear-gradient(135deg, rgba(6, 9, 19, 0.9) 0%, rgba(14, 19, 38, 0.95) 100%), url('https://talkiepedia.forgealumnus.com/image/trailer.png')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div className="row align-items-center g-4 position-relative" style={{ zIndex: 2 }}>
              
              <div className="col-12 col-lg-6">
                <h3 className="fw-bold text-white mb-2">
                  <span className="accent-color">Subscribe</span> For The Latest Episodes
                </h3>
                <p className="text-secondary m-0">
                  Get the latest podcasts, behind-the-scenes stories, and exclusive content delivered straight to your inbox. Let the conversations continue beyond the mic.
                </p>
              </div>

              <div className="col-12 col-lg-6">
                <div className="d-flex flex-column gap-2">
                  <span className="small fw-semibold text-white">Join our newsletter list</span>
                  <form className="w-100" onSubmit={handleSubscribe}>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control py-3 px-4 text-white bg-transparent border-color"
                        placeholder="Enter your email address"
                        style={{ background: 'rgba(255,255,255,0.02)', borderRight: 'none', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                      />
                      <button className="btn btn-primary px-4 fw-bold" type="submit" style={{ borderTopRightRadius: '30px', borderBottomRightRadius: '30px', background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--primary-blue) 100%)', color: '#0a0e1a' }}>
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* VIDEO OVERLAY MODAL */}
      {activeVideoUrl && (
        <div
          className="modal show d-block bg-overlay animate-fade-in"
          style={{ zIndex: 2000, display: 'block', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={closeVideoModal}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-dark border-color shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header border-0 d-flex justify-content-end p-3">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeVideoModal}
                  aria-label="Close video overlay"
                ></button>
              </div>
              <div className="modal-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    className="ifr-video"
                    src={activeVideoUrl}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Podcast Video Player"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Podcasts;
