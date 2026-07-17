import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAudioPlayer } from '../components/AudioPlayerContext';

const Home = () => {
  const { playTrack } = useAudioPlayer();
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [currentGuestPage, setCurrentGuestPage] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background images for the Hero sliding crossfade
  const heroBackgrounds = [
    'https://talkiepedia.forgealumnus.com/image/HOME.png',
    'https://talkiepedia.forgealumnus.com/image/mike.jpg',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80'
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

  // Divide guests into pages of 3
  const itemsPerPage = 3;
  const totalGuestPages = Math.ceil(guests.length / itemsPerPage);

  const nextGuestPage = () => {
    setCurrentGuestPage((prev) => (prev + 1) % totalGuestPages);
  };

  const prevGuestPage = () => {
    setCurrentGuestPage((prev) => (prev - 1 + totalGuestPages) % totalGuestPages);
  };

  // Auto-play timers
  useEffect(() => {
    const guestTimer = setInterval(nextGuestPage, 5000);
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);

    return () => {
      clearInterval(guestTimer);
      clearInterval(bgTimer);
    };
  }, []);

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
    <div className="home-page-container">
      <section
        className="section position-relative overflow-hidden"
        style={{
          height: '90vh',
        }}
      >
        {/* Sliding Background Images */}
        <div className="hero-slider-container">
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
        <div className="image-overlay" style={{ zIndex: 1.5 }}></div>
        <div className="r-container h-100 position-relative" style={{ zIndex: 2 }}>
          <div className="row row-cols-1 row-cols-lg-2 w-100 h-100">
            <div className="col h-100 p-lg-0">
              <div className="d-flex flex-column gap-3 justify-content-center h-100">
                <h1 className="font-1 fw-bold lh-1 text-white">
                  Talkiepedia <span className="accent-color">Voices That Lead</span>
                </h1>
                <p className="text-gray fs-5">
                  Unlock career insights from top industry leaders.
                </p>
                <div className="d-flex flex-lg-row flex-column gap-lg-5 gap-4">
                  <a href="#about-section" className="btn button font-1 ls-2" style={{ color: '#ffffff' }}>
                    LEARN MORE
                  </a>
                  <div className="d-flex flex-row gap-3 align-items-center">
                    <button
                      type="button"
                      className="btn request-loader"
                      onClick={() => openVideoModal('https://www.youtube.com/embed/hhckoit3fKk?autoplay=1')}
                    >
                      <i className="fa-solid fa-play ms-1"></i>
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
                      className="btn bg-transparent p-0 border-0"
                    >
                      <span className="font-1 ls-2 fw-bold text-soft-white">START LISTENING</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <div className="position-relative py-5 px-3" style={{ marginTop: '-80px' }}>
        <div
          className="position-absolute top-0 start-0 w-75 h-100 rounded-end-3"
          style={{ backgroundColor: '#1c2326' }}
        ></div>
        <div className="r-container position-relative" style={{ zIndex: 2 }}>
          <div className="row row-cols-1 row-cols-lg-3 ps-5 ps-lg-0">
            <div className="col mb-4 mb-lg-0">
              <div className="d-flex flex-column">
                <h2 className="font-1 fw-bold m-0 text-soft-white">
                  100<sup>+</sup>
                </h2>
                <p className="fs-5 m-0" style={{ color: 'var(--accent-color)' }}>
                  Our Subscribers
                </p>
              </div>
            </div>
            <div className="col mb-4 mb-lg-0">
              <div className="d-flex flex-column">
                <h2 className="font-1 fw-bold m-0 text-soft-white">
                  20<sup>+</sup>
                </h2>
                <p className="fs-5 m-0" style={{ color: 'var(--accent-color)' }}>
                  Podcast Episodes
                </p>
              </div>
            </div>
            <div className="col mb-4 mb-lg-0">
              <div className="d-flex flex-column">
                <h2 className="font-1 fw-bold m-0 text-soft-white">
                  83<sup>+</sup>
                </h2>
                <p className="fs-5 m-0" style={{ color: 'var(--accent-color)' }}>
                  Our Followers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Most Favorite Podcasts */}
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
                  <h5 class="font-1 fw-bold lh-1 text-soft-dark">Dream Your Career Into a Big MNC</h5>
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
                  <h5 class="font-1 fw-bold lh-1 text-soft-dark">Navigating Corporate Success</h5>
                  <p className="text-soft-dark">Dhananjay Dubey | Forge Alumnus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-secondary-color" id="about-section">
        <div className="r-container">
          <div className="row row-cols-1 row-cols-lg-2 w-100">
            <div className="col mb-lg-0 mb-5">
              <div className="d-flex flex-column gap-3 h-100 justify-content-center">
                <span className="fs-5 text-soft-white">About Us</span>
                <h3 className="font-1 fw-bold lh-1 text-soft-white">
                  Turning Insights into Inspiring <span className="accent-color">Podcasts</span>
                </h3>
                <p className="text-gray text-soft-white">
                  Talkiepedia is a flagship initiative by Forge Alumnus, crafted to bridge the gap between aspiring professionals and the corporate world. We bring you insightful podcasts featuring real voices from top companies, leaders, and industry experts — all aimed at career growth, corporate readiness, and professional development. Tune in and take your next big step with Talkiepedia.
                </p>
                <h5 className="font-1 fw-bold text-soft-white">Listen Our Podcast On</h5>
                <div className="d-flex gap-4 align-items-center mt-3">
                  <a href="https://www.youtube.com/@Talkiepedia" target="_blank" rel="noreferrer">
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/youtube.png"
                      style={{ height: '50px' }}
                      alt="YouTube"
                    />
                  </a>
                  <a href="https://www.instagram.com/talkiepedia/" target="_blank" rel="noreferrer">
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/instagram.png"
                      style={{ height: '50px' }}
                      alt="Instagram"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="col mb-3">
              <div className="position-relative">
                <div
                  className="position-absolute top-0 end-0 bg-accent-color px-5 py-4 rounded-3 shadow"
                  style={{ zIndex: 3, marginTop: '-50px' }}
                >
                  <div className="d-flex flex-column text-center">
                    <p className="fs-5 m-0 text-soft-white">Episode</p>
                    <h2 className="font-1 fw-bold m-0 text-soft-white">3</h2>
                  </div>
                </div>

                <div className="position-relative me-5">
                  <div className="image-overlay-2 rounded-4"></div>
                  <div className="position-absolute start-0 top-0 w-100 h-100" style={{ zIndex: 2 }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <button
                        type="button"
                        className="btn request-loader"
                        onClick={() => openVideoModal('https://www.youtube.com/embed/5oZ_GtRx6S0?start=149&autoplay=1')}
                      >
                        <i className="fa-solid fa-play ms-1"></i>
                      </button>
                    </div>
                  </div>
                  <img
                    src="https://talkiepedia.forgealumnus.com/image/aboutus.jpg"
                    alt="Episode image"
                    className="img-fluid w-100 rounded-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Newsletter */}
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

      {/* Meet Our Guests Sliding Carousel */}
      <section className="section" id="guests-section">
        <div className="r-container">
          <div className="d-flex flex-column gap-3 text-center position-relative">
            <span className="fs-5 text-dark">Our Guests</span>
            <h3 className="font-1 fw-bold">
              <span className="text-dark">Meet Our </span>
              <span className="accent-color">Guests</span>
            </h3>
            <p className="mx-auto text-dark" style={{ maxWidth: '768px' }}>
              Meet the voices behind the stories. Our guests bring fresh perspectives, real experiences, and powerful conversations that spark curiosity and leave a lasting impact.
            </p>

            {/* Custom Sliding Container */}
            <div className="position-relative overflow-hidden px-lg-5 py-3">
              <div className="row g-4 justify-content-center">
                {guests
                  .slice(currentGuestPage * itemsPerPage, (currentGuestPage + 1) * itemsPerPage)
                  .map((guest, idx) => (
                    <div className="col-12 col-md-4 key-guest animate-fade-up" key={guest.name}>
                      <div className="guest-card-wrapper text-center">
                        <div className="guest-img-box">
                          <img src={guest.img} alt={guest.name} />
                        </div>
                        <h5 className="font-1 guest-name-text m-0">{guest.name}</h5>
                        <span className="accent-color d-block mt-1 mb-3" style={{ fontSize: '0.85rem' }}>
                          {guest.company}
                        </span>
                        <div className="d-flex justify-content-center gap-2 mt-auto pb-1">
                          <a href={guest.linkedin} target="_blank" rel="noreferrer" className="social-circle">
                            <i className="fa-brands fa-linkedin-in"></i>
                          </a>
                          <a href={guest.youtube} target="_blank" rel="noreferrer" className="social-circle">
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
                    width: '12px',
                    height: '12px',
                    backgroundColor: currentGuestPage === i ? '#0d6efd' : '#ffffff40',
                    transition: 'background-color 0.3s',
                  }}
                  onClick={() => setCurrentGuestPage(i)}
                ></button>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              className="position-absolute start-0 top-50 translate-middle-y btn bg-dark text-white rounded-circle d-none d-md-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px', zIndex: 10 }}
              onClick={prevGuestPage}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="position-absolute end-0 top-50 translate-middle-y btn bg-dark text-white rounded-circle d-none d-md-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px', zIndex: 10 }}
              onClick={nextGuestPage}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Collaboration Marquee Logo Ticker */}
      <section className="section bg-secondary-color" id="gallery-section">
        <div className="r-container">
          <div className="d-flex flex-column text-center gap-3">
            <span className="fs-5 text-soft-white">Our Partners</span>
            <h3 className="font-1 fw-bold lh-1 text-soft-white">
              In Collaboration <span className="accent-color">With</span>
            </h3>
            <p className="mx-auto text-gray" style={{ maxWidth: '768px' }}>
              Talkiepedia thrives on the power of partnerships. We’re proud to collaborate with forward-thinking brands, creative communities, and passionate individuals who believe in the magic of meaningful conversations.
            </p>

            {/* Infinite Horizontal Sliding Marquee */}
            <div className="marquee-container">
              <div className="marquee-content">
                {[
                  'aerospace.png',
                  'microsofts.png',
                  'Deloitte.png',
                  'amazon.png',
                  'phillips.png',
                  'benz.png',
                  // Duplicate array items for seamless infinite loop effect
                  'aerospace.png',
                  'microsofts.png',
                  'Deloitte.png',
                  'amazon.png',
                  'phillips.png',
                  'benz.png',
                ].map((logo, index) => (
                  <div className="marquee-item" key={`${logo}-${index}`}>
                    <img
                      src={`https://talkiepedia.forgealumnus.com/image/${logo}`}
                      alt="Partner logo"
                      className="img-fluid logo-partner"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs / Upcoming Podcasts */}
      <section className="section" id="faq-section">
        <div className="r-container">
          <div className="d-flex flex-lg-row flex-column-reverse gap-5">
            <div className="col col-lg-7 mb-3">
              <div className="row row-cols-1 row-cols-lg-2 g-4">
                <div className="col">
                  <div className="card border-0 bg-secondary-color p-3 shadow h-100 card-hover">
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/podcast2.jpg"
                      className="img-fluid rounded-3 mb-3"
                      alt="Talkiepedia Blog"
                    />
                    <div className="card-body p-0">
                      <h5 className="font-1 fw-bold text-white mb-2">
                        Talkiepedia: What’s Coming Next on Our Podcast?
                      </h5>
                      <p className="card-text text-gray" style={{ fontSize: '0.9rem' }}>
                        In our upcoming episode, rising changemakers open up about their bold journeys, challenges, and dreams that fuel their drive. Tune in for a raw, real, and inspiring session you won't want to miss.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card border-0 bg-secondary-color p-3 shadow h-100 card-hover">
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/microphone.jpg"
                      className="img-fluid rounded-3 mb-3"
                      alt="Moundy Rose Blog"
                    />
                    <div className="card-body p-0">
                      <h5 className="font-1 fw-bold text-white mb-2">
                        Moundy Rose: The Real State of Modern Entrepreneurship
                      </h5>
                      <p className="card-text text-gray" style={{ fontSize: '0.9rem' }}>
                        Join Moundy Rose as she unpacks the realities of today’s startup world—where resilience meets disruption. From funding struggles to visionary breakthroughs, discover what it truly takes to build something that lasts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-lg-5 ps-lg-4 mb-3">
              <div className="d-flex flex-column h-100 justify-content-center gap-3">
                <span className="fs-5 text-dark">Upcoming Podcast</span>
                <h3 className="font-1 fw-bold lh-1 text-black">
                  Latest News For <span className="accent-color">You</span>
                </h3>
                <p className="text-dark" style={{ maxWidth: '768px' }}>
                  We’re excited to share that over 1,000+ listeners have already tuned in to Talkiepedia! Now, we’re proud to introduce our new podcast series: <em>Voices Unplugged</em>—a deep dive into untold stories, creative journeys, and conversations with emerging creators.
                </p>
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

export default Home;
