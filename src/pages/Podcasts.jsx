import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAudioPlayer } from '../components/AudioPlayerContext';

const Podcasts = () => {
  const { playTrack } = useAudioPlayer();
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Extended podcast episodes list for filter demonstration
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
      confirmButtonColor: '#0d6efd',
      background: '#21282b',
      color: '#fff',
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
    <div className="podcasts-page-container">
      {/* BANNER */}
      <section
        className="section position-relative"
        style={{
          backgroundImage: "url('https://talkiepedia.forgealumnus.com/image/banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0',
        }}
      >
        <div className="image-overlay"></div>
        <div className="r-container position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex flex-column">
            <h2 className="font-1 fw-bold text-white">
              <span className="text-white">About </span>
              <span className="text-white">Our </span>
              <span className="accent-color">Podcasts</span>
            </h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb font-2">
                <li className="breadcrumb-item">
                  <a href="/" style={{ color: '#0d6efd', textDecoration: 'none' }}>
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item active text-white" aria-current="page">
                  Podcasts
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Favorite Podcasts */}
      <section className="section">
        <div className="r-container">
          <div className="d-flex flex-column gap-3 text-center">
            <h3 className="font-1 fw-bold text-black">
              Most Favorite <span className="accent-color">Podcasts</span>
            </h3>
            <p className="mx-auto text-black" style={{ maxWidth: '768px' }}>
              Discover the most popular career-driven podcasts. Dive into expert advice, industry secrets, and inspiring stories that help you level up in your professional journey.
            </p>
            <div className="row row-cols-1 row-cols-lg-3 w-100 text-start">
              {/* Card 1 */}
              <div className="col mb-3">
                <div
                  className="d-flex flex-column gap-3 h-100 card-hover"
                  style={{
                    boxShadow: '0 2px 8px rgb(0 0 0 / 5%)',
                    padding: '10px',
                    borderRadius: '16px',
                  }}
                >
                  <div className="position-relative h-100 podcast-card-shadow">
                    <div className="image-overlay-2"></div>
                    <div className="position-absolute start-0 top-0 w-100 h-100" style={{ zIndex: 2 }}>
                      <div className="d-flex justify-content-center align-items-center h-100 gap-2">
                        <button
                          type="button"
                          className="btn request-loader"
                          onClick={() => openVideoModal('https://www.youtube.com/embed/5oZ_GtRx6S0?autoplay=1')}
                          title="Watch Video"
                        >
                          <i className="fa-solid fa-play ms-1"></i>
                        </button>
                        <button
                          type="button"
                          className="btn request-loader bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '45px', height: '45px' }}
                          onClick={() =>
                            handlePlayAudio(
                              'The World of Aerospace',
                              'Sumanvitha | Collins Aerospace',
                              'https://talkiepedia.forgealumnus.com/image/collinionsaeroscope.png',
                              '5oZ_GtRx6S0'
                            )
                          }
                          title="Listen Audio"
                        >
                          <i className="fa-solid fa-headphones"></i>
                        </button>
                      </div>
                    </div>
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/collinionsaeroscope.png"
                      alt="The World of Aerospace"
                      className="img-fluid rounded-3"
                      onError={(e) => {
                        e.target.src = 'https://talkiepedia.forgealumnus.com/images/fallback-podcast.jpg';
                      }}
                    />
                  </div>
                  <div className="d-flex flex-row gap-5">
                    <div className="d-flex flex-row align-items-center gap-2">
                      <i className="fa-regular fa-clock accent-color"></i>
                      <span className="text-soft-dark">135m</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <i className="fa-solid fa-calendar-days accent-color"></i>
                      <span className="text-soft-dark">January 2025</span>
                    </div>
                  </div>
                  <h5 className="font-1 fw-bold lh-1 text-soft-dark">The World of Aerospace</h5>
                  <p className="text-soft-dark">Sumanvitha | Collins Aerospace</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="col mb-3">
                <div
                  className="d-flex flex-column gap-3 h-100 card-hover"
                  style={{
                    boxShadow: '0 2px 8px rgb(0 0 0 / 5%)',
                    padding: '10px',
                    borderRadius: '16px',
                  }}
                >
                  <div className="position-relative h-100">
                    <div className="image-overlay-2"></div>
                    <div className="position-absolute start-0 top-0 w-100 h-100" style={{ zIndex: 2 }}>
                      <div className="d-flex justify-content-center align-items-center h-100 gap-2">
                        <button
                          type="button"
                          className="btn request-loader"
                          onClick={() => openVideoModal('https://www.youtube.com/embed/hhckoit3fKk?autoplay=1')}
                          title="Watch Video"
                        >
                          <i className="fa-solid fa-play ms-1"></i>
                        </button>
                        <button
                          type="button"
                          className="btn request-loader bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '45px', height: '45px' }}
                          onClick={() =>
                            handlePlayAudio(
                              'Dream Your Career Into a Big MNC',
                              'Bharat Chandra | Microsoft',
                              'https://talkiepedia.forgealumnus.com/image/microsoft.png',
                              'hhckoit3fKk'
                            )
                          }
                          title="Listen Audio"
                        >
                          <i className="fa-solid fa-headphones"></i>
                        </button>
                      </div>
                    </div>
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/microsoft.png"
                      alt="Dream Your Career Into a Big MNC"
                      className="img-fluid rounded-3"
                      onError={(e) => {
                        e.target.src = 'https://talkiepedia.forgealumnus.com/images/fallback-podcast.jpg';
                      }}
                    />
                  </div>
                  <div className="d-flex flex-row gap-5">
                    <div className="d-flex flex-row align-items-center gap-2">
                      <i className="fa-regular fa-clock accent-color"></i>
                      <span className="text-soft-dark">28m 39s</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <i className="fa-solid fa-calendar-days accent-color"></i>
                      <span className="text-soft-dark">December 2024</span>
                    </div>
                  </div>
                  <h5 className="font-1 fw-bold lh-1 text-soft-dark">Dream Your Career Into a Big MNC</h5>
                  <p className="text-soft-dark">Bharat Chandra | Microsoft</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col mb-3">
                <div
                  className="d-flex flex-column gap-3 h-100 card-hover"
                  style={{
                    boxShadow: '0 2px 8px rgb(0 0 0 / 5%)',
                    padding: '10px',
                    borderRadius: '16px',
                  }}
                >
                  <div className="position-relative h-100">
                    <div className="image-overlay-2"></div>
                    <div className="position-absolute start-0 top-0 w-100 h-100" style={{ zIndex: 2 }}>
                      <div className="d-flex justify-content-center align-items-center h-100 gap-2">
                        <button
                          type="button"
                          className="btn request-loader"
                          onClick={() => openVideoModal('https://www.youtube.com/embed/rsG-bZZ4vCs?autoplay=1')}
                          title="Watch Video"
                        >
                          <i className="fa-solid fa-play ms-1"></i>
                        </button>
                        <button
                          type="button"
                          className="btn request-loader bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '45px', height: '45px' }}
                          onClick={() =>
                            handlePlayAudio(
                              'Navigating Corporate Success',
                              'Dhananjay Dubey | Forge Alumnus',
                              'https://talkiepedia.forgealumnus.com/image/trailer.png',
                              'rsG-bZZ4vCs'
                            )
                          }
                          title="Listen Audio"
                        >
                          <i className="fa-solid fa-headphones"></i>
                        </button>
                      </div>
                    </div>
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/trailer.png"
                      alt="Navigating Corporate Success"
                      className="img-fluid rounded-3"
                      onError={(e) => {
                        e.target.src = 'https://talkiepedia.forgealumnus.com/images/fallback-podcast.jpg';
                      }}
                    />
                  </div>
                  <div className="d-flex flex-row gap-5">
                    <div className="d-flex flex-row align-items-center gap-2">
                      <i className="fa-regular fa-clock accent-color"></i>
                      <span className="text-soft-dark">10s</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <i className="fa-solid fa-calendar-days accent-color"></i>
                      <span className="text-soft-dark">October 2024</span>
                    </div>
                  </div>
                  <h5 className="font-1 fw-bold lh-1 text-soft-dark">Navigating Corporate Success</h5>
                  <p className="text-soft-dark">Dhananjay Dubey | Forge Alumnus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Episodes Section */}
      <section className="section" style={{ marginTop: '-80px' }} id="episodes-section">
        <div className="r-container">
          <div className="d-flex flex-column gap-3 text-center">
            <span className="fs-5 text-black">Our Podcast</span>
            <h3 className="font-1 fw-bold lh-1 text-black">
              Recent <span className="accent-color">Episodes</span>
            </h3>
            <p className="mx-auto text-black" style={{ maxWidth: '768px' }}>
              Check out our latest episodes featuring inspiring conversations.
            </p>

            {/* Interactive Filters and Search Bar */}
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center my-4 w-100">
              {/* Category Tabs */}
              <div className="filter-tabs m-0">
                {['All', 'Tech', 'Aerospace', 'Corporate'].map((filter) => (
                  <button
                    key={filter}
                    className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search input with animated bottom bar */}
              <div className="position-relative" style={{ minWidth: '280px' }}>
                <input
                  type="text"
                  placeholder="Search episode or speaker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ced4da',
                    borderRadius: '20px',
                    padding: '8px 20px',
                    fontSize: '0.9rem',
                    color: '#212529',
                  }}
                />
                <i
                  className="fa-solid fa-magnifying-glass position-absolute end-0 top-50 translate-middle-y me-3 text-muted"
                  style={{ pointerEvents: 'none' }}
                ></i>
              </div>
            </div>

            {/* List Grid */}
            <div className="row row-cols-1 row-cols-lg-3 w-100 text-start">
              {filteredEpisodes.length > 0 ? (
                filteredEpisodes.map((ep) => (
                  <div className="col mb-3 animate-fade-up" key={ep.id}>
                    <div
                      className="d-flex flex-column gap-3 h-100 card-hover"
                      style={{
                        boxShadow: '0 2px 8px rgb(0 0 0 / 5%)',
                        padding: '10px',
                        borderRadius: '16px',
                      }}
                    >
                      <div className="position-relative h-100 podcast-card-shadow">
                        <div className="image-overlay-2"></div>
                        <div className="position-absolute start-0 top-0 w-100 h-100" style={{ zIndex: 2 }}>
                          <div className="d-flex justify-content-center align-items-center h-100 gap-2">
                            <button
                              type="button"
                              className="btn request-loader"
                              onClick={() => openVideoModal(ep.videoUrl)}
                              title="Watch Video"
                            >
                              <i className="fa-solid fa-play ms-1"></i>
                            </button>
                            <button
                              type="button"
                              className="btn request-loader bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '45px', height: '45px' }}
                              onClick={() =>
                                handlePlayAudio(ep.title, ep.artist, ep.img, ep.audioFileId)
                              }
                              title="Listen Audio"
                            >
                              <i className="fa-solid fa-headphones"></i>
                            </button>
                          </div>
                        </div>
                        <img
                          src={ep.img}
                          alt={ep.title}
                          className="img-fluid rounded-3"
                          onError={(e) => {
                            e.target.src = 'https://talkiepedia.forgealumnus.com/images/fallback-podcast.jpg';
                          }}
                        />
                      </div>
                      <div className="d-flex flex-row gap-5">
                        <div className="d-flex flex-row align-items-center gap-2">
                          <i className="fa-regular fa-clock accent-color"></i>
                          <span className="text-soft-dark">{ep.duration}</span>
                        </div>
                        <div className="d-flex flex-row align-items-center gap-2">
                          <i className="fa-solid fa-calendar-days accent-color"></i>
                          <span className="text-soft-dark">{ep.date}</span>
                        </div>
                      </div>
                      <h5 className="font-1 fw-bold lh-1 text-soft-dark">{ep.title}</h5>
                      <p className="text-soft-dark">{ep.artist}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="fa-solid fa-circle-exclamation fs-1 text-muted mb-3"></i>
                  <p className="text-muted">No episodes found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORMS SECTION */}
      <section className="section bg-secondary-color">
        <div className="r-container">
          <div className="d-flex flex-column gap-3 text-center">
            <h5 className="font-1 fw-bold text-white">Listen Our Podcast On</h5>
            <div className="row row-cols-2 justify-content-center align-items-center gap-4">
              <div className="col-auto mb-3 platform-card">
                <a href="https://www.youtube.com/@Talkiepedia" target="_blank" rel="noreferrer">
                  <img
                    src="https://talkiepedia.forgealumnus.com/image/youtube.png"
                    alt="youtube"
                    className="img-fluid"
                    style={{ maxHeight: '60px' }}
                  />
                </a>
              </div>
              <div className="col-auto mb-3 platform-card">
                <a href="https://www.instagram.com/talkiepedia/" target="_blank" rel="noreferrer">
                  <img
                    src="https://talkiepedia.forgealumnus.com/image/instagram.png"
                    alt="instagram"
                    className="img-fluid"
                    style={{ maxHeight: '60px' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="section">
        <div className="r-container">
          <div
            className="section position-relative rounded-4 overflow-hidden bg-attach-fixed"
            style={{
              backgroundImage: "url('https://talkiepedia.forgealumnus.com/image/trailer.png')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="image-overlay-2"></div>
            <div className="row row-cols-1 row-cols-lg-2 position-relative" style={{ zIndex: 2 }}>
              <div className="col mb-3">
                <h3 className="font-1 fw-bold lh-1 text-soft-white">
                  <span className="accent-color">Subscribe</span> For The Latest Episodes
                </h3>
                <p className="text-gray text-soft-white">
                  Get the latest podcasts, behind-the-scenes stories, and exclusive content delivered straight to your inbox. Let the conversations continue beyond the mic.
                </p>
              </div>

              <div className="col mb-3">
                <div className="d-flex h-100 flex-column justify-content-center">
                  <h5 className="font-1 fw-bold text-soft-white">Newsletter</h5>
                  <form className="w-100 form newsletter-form" onSubmit={handleSubscribe}>
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control py-3 px-4 form-white"
                        placeholder="Your Email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                      />
                      <button className="btn button btn_submit-subscribe font-1 fw-bold px-5" type="submit">
                        <span className="text-soft-white">Subscribe</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal component */}
      {activeVideoUrl && (
        <div
          className="modal show d-block bg-overlay"
          style={{ zIndex: 2000, display: 'block' }}
          onClick={closeVideoModal}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-dark-color">
              <div className="modal-header border-0 d-flex justify-content-end p-2">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeVideoModal}
                  aria-label="Close"
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
                    title="Podcast Video"
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
