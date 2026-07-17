import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useAudioPlayer } from '../components/AudioPlayerContext';
import { 
  Play, Headphones, Calendar, Clock, ChevronLeft, 
  ChevronRight, Mail, 
  Users, Award, Sparkles, Send, ShieldAlert, ArrowUpRight 
} from 'lucide-react';


const Home = () => {
  const { playTrack } = useAudioPlayer();
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [currentGuestPage, setCurrentGuestPage] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Track window scroll for background parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background images for the Hero sliding crossfade
  const heroBackgrounds = [
    'https://talkiepedia.forgealumnus.com/image/HOME.png',
    'https://talkiepedia.forgealumnus.com/image/mike.jpg',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80'
  ];

  const collaborationLogos = [
    { name: 'Collins Aerospace', url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Collins_logo.svg' },
    { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Deloitte', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_Deloitte.svg' },
    { name: 'Amazon', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Philips', url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo_new.svg' },
    { name: 'Mercedes-Benz', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Mercedes-Benz_%282025%29.svg' }
  ];

  // Guest list data
  const guests = [
    {
      name: 'Sumanvitha KannamReddy',
      company: 'Collins Aerospace',
      img: 'https://talkiepedia.forgealumnus.com/image/sumanvitha.jpeg',
      linkedin: 'https://www.linkedin.com/in/sumanvitha/',
      youtube: 'https://www.youtube.com/watch?v=5oZ_GtRx6S0&t=151s',
    },
    {
      name: 'Vijay Kumar Renikuntla',
      company: 'Forge Alumnus',
      img: 'https://talkiepedia.forgealumnus.com/image/vijay.jpeg',
      linkedin: 'https://www.linkedin.com/in/vijay-kumar-renikuntla-4a3360135/',
      youtube: 'https://www.youtube.com/@Talkiepedia',
    },
    {
      name: 'Bharat Chandra',
      company: 'Microsoft',
      img: 'https://talkiepedia.forgealumnus.com/image/bharat.jpeg',
      linkedin: 'https://www.linkedin.com/in/bharat-chandra26/',
      youtube: 'https://www.youtube.com/watch?v=hhckoit3fKk&t=125s',
    },
    {
      name: 'Vishnu Das',
      company: 'Microsoft',
      img: 'https://talkiepedia.forgealumnus.com/image/Vishnu_das.jpeg',
      linkedin: 'https://www.linkedin.com/in/vishnudaskunjibettu/',
      youtube: 'https://www.youtube.com/@Talkiepedia',
    },
    {
      name: 'Harish Kotra',
      company: 'Gaia',
      img: 'https://talkiepedia.forgealumnus.com/image/Harish.jpeg',
      linkedin: 'https://www.linkedin.com/in/harishkotra/',
      youtube: 'https://www.youtube.com/@Talkiepedia',
    },
    {
      name: 'Kiran Kumar',
      company: 'Forge Alumnus',
      img: 'https://talkiepedia.forgealumnus.com/image/kiran.jpg',
      linkedin: 'https://www.linkedin.com/in/kirankumar-perka-35525821/',
      youtube: 'https://www.youtube.com/@Talkiepedia',
    },
  ];

  const itemsPerPage = 3;
  const totalGuestPages = Math.ceil(guests.length / itemsPerPage);

  const nextGuestPage = () => {
    setCurrentGuestPage((prev) => (prev + 1) % totalGuestPages);
  };

  const prevGuestPage = () => {
    setCurrentGuestPage((prev) => (prev - 1 + totalGuestPages) % totalGuestPages);
  };

  // Autoplay for Guest List Carousel
  useEffect(() => {
    const guestTimer = setInterval(nextGuestPage, 5000);
    return () => clearInterval(guestTimer);
  }, []);

  // Autoplay for Hero Background (resets when index changes manually)
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(bgTimer);
  }, [currentBgIndex]);

  const nextHeroBg = () => {
    setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
  };

  const prevHeroBg = () => {
    setCurrentBgIndex((prev) => (prev - 1 + heroBackgrounds.length) % heroBackgrounds.length);
  };

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
    <div className="home-page-container animate-fade-in">
      
      {/* HERO SECTION */}
      <section className="position-relative overflow-hidden d-flex align-items-center hero-full-viewport" style={{ minHeight: 'calc(100vh - 76px)' }}>
        {/* Glowing blob effect */}
        <div className="hero-glow-blob"></div>

        {/* Sliding Background Images with Parallax */}
        <div className="hero-slider-container" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          {heroBackgrounds.map((bgUrl, index) => (
            <div
              key={bgUrl}
              className={`hero-slide ${currentBgIndex === index ? 'active' : ''}`}
              style={{
                backgroundImage: `url('${bgUrl}')`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Subtle, responsive gradient overlay */}
        <div className="hero-gradient-overlay"></div>

        {/* Hero Slider Left/Right Arrows */}
        <button className="hero-slider-arrow left" onClick={prevHeroBg} aria-label="Previous Slide">
          <ChevronLeft size={24} />
        </button>
        <button className="hero-slider-arrow right" onClick={nextHeroBg} aria-label="Next Slide">
          <ChevronRight size={24} />
        </button>

        {/* Hero Slider Dot Capsule Bar */}
        <div className="hero-slider-dots">
          {heroBackgrounds.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${currentBgIndex === i ? 'active' : ''}`}
              onClick={() => setCurrentBgIndex(i)}
              aria-label={`Go to hero slide ${i+1}`}
            ></button>
          ))}
        </div>
        
        <div className="container position-relative" style={{ zIndex: 5 }}>
          <div className="row">
            <div className="col-12 col-lg-7">
              <div className="d-flex flex-column gap-3 py-5 hero-content-panel">
                <div className="d-inline-flex align-items-center gap-2 badge glassmorphism align-self-start py-2 px-3 text-cyan-accent mb-2 reveal-item reveal-delay-1">
                  <Sparkles size={14} />
                  <span>Interactive Learning Platform</span>
                </div>
                
                <h1 className="fw-bold mb-2 leading-tight reveal-item reveal-delay-2 hero-main-heading hero-title-text">
                  Talkiepedia <br />
                  <span className="accent-color">Voices That Lead</span>
                </h1>
                
                <p className="text-secondary mb-4 reveal-item reveal-delay-3 hero-description" style={{ maxWidth: '580px' }}>
                  Unlock career insights and executive experiences from top industry leaders. Turn professional wisdom into your learning path.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center reveal-item reveal-delay-4">
                  <a href="#about-section" className="btn btn-primary btn-gradient py-3 px-4 fw-semibold rounded-pill hero-cta-btn">
                    LEARN MORE
                  </a>
                  <div className="d-flex align-items-center gap-3">
                    <button
                      type="button"
                      className="btn request-loader"
                      onClick={() => openVideoModal('https://www.youtube.com/embed/hhckoit3fKk?autoplay=1')}
                      title="Play Trailer Video"
                    >
                      <Play size={18} fill="currentColor" />
                    </button>
                    <button
                      onClick={() =>
                        handlePlayAudio(
                          'Trailer Intro',
                          'Talkiepedia Team',
                          'https://talkiepedia.forgealumnus.com/image/trailer.png',
                          'hhckoit3fKk'
                        )
                      }
                      className="btn fw-bold d-inline-flex align-items-center gap-2 p-0 bg-transparent border-0 start-listening-btn hero-secondary-btn-text"
                    >
                      <Headphones size={18} className="listening-icon" />
                      <span>START LISTENING</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS / STATS SECTION */}
      <section className="position-relative py-4 px-3" style={{ marginTop: '-60px', zIndex: 10 }}>
        <div className="container">
          <div className="glassmorphism p-4 rounded-4 shadow-lg border-color">
            <div className="row g-4 text-center">
              
              <div className="col-12 col-md-4 border-end border-color-mobile">
                <div className="p-2">
                  <h2 className="display-6 fw-bold m-0 gradient-text">100+</h2>
                  <p className="text-secondary m-0 mt-1 font-heading font-medium">Subscribers Connected</p>
                </div>
              </div>

              <div className="col-12 col-md-4 border-end border-color-mobile">
                <div className="p-2">
                  <h2 className="display-6 fw-bold m-0 gradient-text">20+</h2>
                  <p className="text-secondary m-0 mt-1 font-heading font-medium">Expert Episodes</p>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="p-2">
                  <h2 className="display-6 fw-bold m-0 gradient-text">83+</h2>
                  <p className="text-secondary m-0 mt-1 font-heading font-medium">LinkedIn Followers</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* MOST FAVORITE PODCASTS GRID */}
      <section className="py-5 mt-4">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2 text-white">
              Most Favorite <span className="accent-color">Podcasts</span>
            </h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '640px' }}>
              Discover our most popular career-driven podcasts. Dive into expert advice, industry secrets, and inspiring stories.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            
            {/* Podcast Card 1 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 bg-card border-color p-3 rounded-4 shadow-sm hover-elevate">
                <div className="podcast-thumb-container">
                  <img
                    src="https://talkiepedia.forgealumnus.com/image/collinionsaeroscope.png"
                    alt="The World of Aerospace"
                    className="podcast-thumb-img"
                    onError={(e) => {
                      e.target.src = 'https://talkiepedia.forgealumnus.com/image/logo.png';
                    }}
                  />
                  <div className="podcast-thumb-overlay">
                    <button
                      type="button"
                      className="card-play-btn"
                      onClick={() => openVideoModal('https://www.youtube.com/embed/5oZ_GtRx6S0?autoplay=1')}
                      title="Watch Video"
                    >
                      <Play size={22} fill="currentColor" style={{ marginLeft: '4px' }} />
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Clock size={12} className="text-cyan-accent" />
                    <span>135m</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Calendar size={12} className="text-cyan-accent" />
                    <span>Jan 2025</span>
                  </div>
                </div>

                <h5 className="fw-bold text-white mb-1">The World of Aerospace</h5>
                <p className="text-secondary small m-0">Sumanvitha | Collins Aerospace</p>

                <div className="mt-3 pt-3 border-top border-color d-flex align-items-center">
                  <button
                    onClick={() =>
                      handlePlayAudio(
                        'The World of Aerospace',
                        'Sumanvitha | Collins Aerospace',
                        'https://talkiepedia.forgealumnus.com/image/collinionsaeroscope.png',
                        '5oZ_GtRx6S0'
                      )
                    }
                    className="btn-listen-audio"
                    title="Listen Audio"
                  >
                    <Headphones size={14} />
                    <span>LISTEN EPISODE</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Podcast Card 2 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 bg-card border-color p-3 rounded-4 shadow-sm hover-elevate">
                <div className="podcast-thumb-container">
                  <img
                    src="https://talkiepedia.forgealumnus.com/image/microsoft.png"
                    alt="Dream Your Career Into a Big MNC"
                    className="podcast-thumb-img"
                    onError={(e) => {
                      e.target.src = 'https://talkiepedia.forgealumnus.com/image/logo.png';
                    }}
                  />
                  <div className="podcast-thumb-overlay">
                    <button
                      type="button"
                      className="card-play-btn"
                      onClick={() => openVideoModal('https://www.youtube.com/embed/hhckoit3fKk?autoplay=1')}
                      title="Watch Video"
                    >
                      <Play size={22} fill="currentColor" style={{ marginLeft: '4px' }} />
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Clock size={12} className="text-cyan-accent" />
                    <span>28m 39s</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Calendar size={12} className="text-cyan-accent" />
                    <span>Dec 2024</span>
                  </div>
                </div>

                <h5 className="fw-bold text-white mb-1">Dream Your Career Into a Big MNC</h5>
                <p className="text-secondary small m-0">Bharat Chandra | Microsoft</p>

                <div className="mt-3 pt-3 border-top border-color d-flex align-items-center">
                  <button
                    onClick={() =>
                      handlePlayAudio(
                        'Dream Your Career Into a Big MNC',
                        'Bharat Chandra | Microsoft',
                        'https://talkiepedia.forgealumnus.com/image/microsoft.png',
                        'hhckoit3fKk'
                      )
                    }
                    className="btn-listen-audio"
                    title="Listen Audio"
                  >
                    <Headphones size={14} />
                    <span>LISTEN EPISODE</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Podcast Card 3 */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 bg-card border-color p-3 rounded-4 shadow-sm hover-elevate">
                <div className="podcast-thumb-container">
                  <img
                    src="https://talkiepedia.forgealumnus.com/image/trailer.png"
                    alt="Navigating Corporate Success"
                    className="podcast-thumb-img"
                    onError={(e) => {
                      e.target.src = 'https://talkiepedia.forgealumnus.com/image/logo.png';
                    }}
                  />
                  <div className="podcast-thumb-overlay">
                    <button
                      type="button"
                      className="card-play-btn"
                      onClick={() => openVideoModal('https://www.youtube.com/embed/rsG-bZZ4vCs?autoplay=1')}
                      title="Watch Video"
                    >
                      <Play size={22} fill="currentColor" style={{ marginLeft: '4px' }} />
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Clock size={12} className="text-cyan-accent" />
                    <span>10s</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <Calendar size={12} className="text-cyan-accent" />
                    <span>Oct 2024</span>
                  </div>
                </div>

                <h5 className="fw-bold text-white mb-1">Navigating Corporate Success</h5>
                <p className="text-secondary small m-0">Dhananjay Dubey | Forge Alumnus</p>

                <div className="mt-3 pt-3 border-top border-color d-flex align-items-center">
                  <button
                    onClick={() =>
                      handlePlayAudio(
                        'Navigating Corporate Success',
                        'Dhananjay Dubey | Forge Alumnus',
                        'https://talkiepedia.forgealumnus.com/image/trailer.png',
                        'rsG-bZZ4vCs'
                      )
                    }
                    className="btn-listen-audio"
                    title="Listen Audio"
                  >
                    <Headphones size={14} />
                    <span>LISTEN EPISODE</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="py-5 bg-card border-top border-bottom border-color" id="about-section">
        <div className="container">
          <div className="row align-items-center g-5">
            
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-3">
                <span className="text-cyan-accent fw-bold text-uppercase tracking-wider">About Us</span>
                <h3 className="fw-bold text-white mb-2">
                  Turning Insights into Inspiring <span className="accent-color">Podcasts</span>
                </h3>
                <p className="text-secondary" style={{ lineHeight: 1.7 }}>
                  Talkiepedia is a flagship initiative by Forge Alumnus, crafted to bridge the gap between aspiring professionals and the corporate world. We bring you insightful podcasts featuring real voices from top companies, leaders, and industry experts — all aimed at career growth, corporate readiness, and professional development. Tune in and take your next big step with Talkiepedia.
                </p>
                
                <h6 className="fw-bold text-white mt-3">Listen Our Podcast On</h6>
                <div className="d-flex gap-4 align-items-center mt-2">
                  <a href="https://www.youtube.com/@Talkiepedia" target="_blank" rel="noreferrer" className="partner-logo-link">
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/youtube.png"
                      style={{ height: '40px', objectFit: 'contain' }}
                      alt="YouTube Logo"
                    />
                  </a>
                  <a href="https://www.instagram.com/talkiepedia/" target="_blank" rel="noreferrer" className="partner-logo-link">
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/instagram.png"
                      style={{ height: '40px', objectFit: 'contain' }}
                      alt="Instagram Logo"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="position-relative">
                <div
                  className="position-absolute top-0 end-0 bg-primary-blue px-4 py-3 rounded-3 shadow-lg"
                  style={{ zIndex: 3, marginTop: '-20px', marginRight: '-10px', background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--primary-blue) 100%)' }}
                >
                  <div className="text-center text-dark">
                    <span className="small d-block text-uppercase fw-bold">Released</span>
                    <h3 className="fw-bold m-0 text-dark">3 Episodes</h3>
                  </div>
                </div>

                <div className="position-relative me-4 overflow-hidden rounded-4 border-color">
                  <div className="position-absolute start-0 top-0 w-100 h-100 bg-black-overlay d-flex justify-content-center align-items-center" style={{ zIndex: 2 }}>
                    <button
                      type="button"
                      className="btn request-loader"
                      onClick={() => openVideoModal('https://www.youtube.com/embed/5oZ_GtRx6S0?start=149&autoplay=1')}
                      aria-label="Play About Video"
                    >
                      <Play size={20} fill="currentColor" />
                    </button>
                  </div>
                  <img
                    src="https://talkiepedia.forgealumnus.com/image/aboutus.jpg"
                    alt="Episode illustration"
                    className="w-100 h-100 object-fit-cover"
                    style={{ minHeight: '320px' }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SUBSCRIBE NEWSLETTER CARD */}
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

      {/* MEET OUR GUESTS CAROUSEL */}
      <section className="py-5 bg-card border-top border-bottom border-color" id="guests-section">
        <div className="container">
          <div className="text-center mb-5 position-relative">
            <span className="text-cyan-accent small fw-bold text-uppercase tracking-wider">Meet Our Guests</span>
            <h2 className="fw-bold text-white mb-2 mt-1">
              Listen to the <span className="accent-color">Experts</span>
            </h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '640px' }}>
              Meet the voices behind the stories. Our guests bring fresh perspectives, real experiences, and powerful insights that spark curiosity.
            </p>

            {/* Custom Sliding Container */}
            <div className="position-relative overflow-hidden px-4 mt-5">
              <div className="row g-4 justify-content-center">
                {guests
                  .slice(currentGuestPage * itemsPerPage, (currentGuestPage + 1) * itemsPerPage)
                  .map((guest) => (
                    <div className="col-12 col-md-4 key-guest animate-fade-up" key={guest.name}>
                      <div className="card h-100 bg-sidebar border-color p-4 text-center d-flex flex-column align-items-center hover-elevate">
                        
                        <div className="mb-3 rounded-circle overflow-hidden border border-2 border-color" style={{ width: '110px', height: '110px' }}>
                          <img src={guest.img} alt={guest.name} className="w-100 h-100 object-fit-cover" />
                        </div>

                        <h5 className="fw-bold text-white m-0">{guest.name}</h5>
                        <span className="text-cyan-accent small d-block mb-3" style={{ fontSize: '0.8rem' }}>
                          {guest.company}
                        </span>

                        <div className="d-flex justify-content-center gap-3 mt-auto pt-2">
                          <a href={guest.linkedin} target="_blank" rel="noreferrer" className="social-icon-wrapper" aria-label="LinkedIn">
                            <i className="fa-brands fa-linkedin-in"></i>
                          </a>
                          <a href={guest.youtube} target="_blank" rel="noreferrer" className="social-icon-wrapper" aria-label="YouTube">
                            <i className="fa-brands fa-youtube"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Slider Dots / Controls */}
            <div className="d-flex justify-content-center gap-2 mt-4">
              {Array.from({ length: totalGuestPages }).map((_, i) => (
                <button
                  key={i}
                  className="rounded-circle border-0"
                  style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: currentGuestPage === i ? 'var(--primary-blue)' : 'var(--border-color)',
                    transition: 'background-color 0.3s',
                  }}
                  onClick={() => setCurrentGuestPage(i)}
                  aria-label={`Go to slide ${i+1}`}
                ></button>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              className="position-absolute start-0 top-50 translate-middle-y btn bg-dark text-white rounded-circle d-none d-md-flex align-items-center justify-content-center"
              style={{ width: '42px', height: '42px', zIndex: 10, border: '1px solid var(--border-color)' }}
              onClick={prevGuestPage}
              aria-label="Previous Guests Slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="position-absolute end-0 top-50 translate-middle-y btn bg-dark text-white rounded-circle d-none d-md-flex align-items-center justify-content-center"
              style={{ width: '42px', height: '42px', zIndex: 10, border: '1px solid var(--border-color)' }}
              onClick={nextGuestPage}
              aria-label="Next Guests Slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* COLLABORATIONS INFINITE TICKER */}
      <section className="py-5 bg-card border-bottom border-color" id="gallery-section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="text-cyan-accent small fw-bold text-uppercase tracking-wider">Our Collaborations</span>
            <h3 className="fw-bold text-white mb-2 mt-1">
              In Collaboration <span className="accent-color">With</span>
            </h3>
            <p className="text-secondary mx-auto" style={{ maxWidth: '640px' }}>
              We’re proud to collaborate with forward-thinking brands, corporate teams, and creative communities.
            </p>
          </div>

          <div className="marquee-container mt-4">
            <div className="marquee-content">
              {[...collaborationLogos, ...collaborationLogos].map((logo, index) => (
                <div className="marquee-item" key={`${logo.name}-${index}`}>
                  <img
                    src={logo.url}
                    alt={`${logo.name} Logo`}
                    className="logo-partner"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOGS AND UPCOMING EPISODES */}
      <section className="py-5" id="faq-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            
            <div className="col-12 col-lg-7">
              <div className="row g-4">
                
                {/* Blog Card 1 */}
                <div className="col-12 col-md-6">
                  <div className="card h-100 bg-card border-color p-3 rounded-4 shadow-sm hover-elevate">
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/podcast2.jpg"
                      className="w-100 rounded-3 mb-3 object-fit-cover"
                      style={{ height: '160px' }}
                      alt="Talkiepedia Upcoming Episode Blog"
                    />
                    <h6 className="fw-bold text-white mb-2">
                      Talkiepedia: What’s Coming Next on Our Podcast?
                    </h6>
                    <p className="text-secondary small m-0" style={{ lineHeight: 1.5 }}>
                      In our upcoming episode, rising changemakers open up about their bold journeys, challenges, and dreams that fuel their drive. Tune in for a raw, real, and inspiring session you won't want to miss.
                    </p>
                  </div>
                </div>

                {/* Blog Card 2 */}
                <div className="col-12 col-md-6">
                  <div className="card h-100 bg-card border-color p-3 rounded-4 shadow-sm hover-elevate">
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/microphone.jpg"
                      className="w-100 rounded-3 mb-3 object-fit-cover"
                      style={{ height: '160px' }}
                      alt="Moundy Rose Blog"
                    />
                    <h6 className="fw-bold text-white mb-2">
                      Moundy Rose: The Real State of Modern Entrepreneurship
                    </h6>
                    <p className="text-secondary small m-0" style={{ lineHeight: 1.5 }}>
                      Join Moundy Rose as she unpacks the realities of today’s startup world—where resilience meets disruption. From funding struggles to visionary breakthroughs, discover what it truly takes to build something that lasts.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="d-flex flex-column gap-3">
                <span className="text-cyan-accent small fw-bold text-uppercase tracking-wider">Latest News</span>
                <h3 className="fw-bold text-white m-0">
                  Upcoming Podcasts For <span className="accent-color">You</span>
                </h3>
                <p className="text-secondary" style={{ lineHeight: 1.7 }}>
                  We’re excited to share that over 1,000+ listeners have already tuned in to Talkiepedia! Now, we’re proud to introduce our new podcast series: <em>Voices Unplugged</em>—a deep dive into untold stories, creative journeys, and conversations with emerging creators.
                </p>
                <div className="mt-2">
                  <Link to="/podcasts" className="btn btn-outline py-2 px-4 rounded-pill d-inline-flex align-items-center gap-1">
                    <span>Browse All Podcasts</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VIDEO LIGHTBOX OVERLAY */}
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

export default Home;
