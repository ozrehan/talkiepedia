import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { BottomPlayer } from './BottomPlayer';

export const Layout = () => {
  const [tollFreeOpen, setTollFreeOpen] = useState(false);

  const toggleTollFreeNumber = () => {
    setTollFreeOpen(!tollFreeOpen);
  };

  const closeTollFreePopup = () => {
    setTollFreeOpen(false);
  };

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="bg-secondary-dark sticky-top">
        <div className="r-container">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <div className="logo-container">
                  <img
                    src="https://talkiepedia.forgealumnus.com/image/logo.png"
                    alt="logo"
                    className="img-fluid"
                    style={{ width: '70%', height: 'auto' }}
                  />
                </div>
              </Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ border: 'none', background: 'none', color: '#fff' }}
              >
                <i className="fa-solid fa-bars-staggered"></i>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      end
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#about-section">
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/podcasts"
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                      Podcasts
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown_3"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Pages
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown_3">
                      <li>
                        <a className="dropdown-item" href="#guests-section">
                          Team / Guests
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#gallery-section">
                          Gallery
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#faq-section">
                          FAQs
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#footer-section">
                      Contact Us
                    </a>
                  </li>
                </ul>

                <div className="social-container mb-lg-0 mb-3">
                  <a
                    href="https://www.youtube.com/@Talkiepedia"
                    target="_blank"
                    rel="noreferrer"
                    className="social-item"
                  >
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/talkiepedia/"
                    target="_blank"
                    rel="noreferrer"
                    className="social-item"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dhananjay-dubey-35aa31169/"
                    target="_blank"
                    rel="noreferrer"
                    className="social-item"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Router Outlet */}
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer id="footer-section">
        <div
          className="position-relative bg-attach-fixed"
          style={{
            backgroundImage: "url('https://talkiepedia.forgealumnus.com/image/mike.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="image-overlay"></div>
          <div className="r-container position-relative" style={{ zIndex: 2 }}>
            <div className="section border-bottom border-white">
              <div className="row row-cols-1 row-cols-lg-2 w-100">
                <div className="col col-lg-4 mb-3 px-sm-0 px-lg-4">
                  <div className="d-flex flex-column gap-3 h-100 align-items-start">
                    <img
                      src="https://talkiepedia.forgealumnus.com/image/logo.png"
                      alt="logo"
                      className="img-fluid w-25"
                      style={{ marginTop: '0px' }}
                    />
                    <p className="text-white">
                      At Talkiepedia, we believe every voice has a story worth sharing. Our mission is to bring you authentic, thought-provoking conversations that inspire change and foster connection. From emerging voices to seasoned experts, we dive deep into a variety of topics that matter. Join us on this journey, and let's keep the conversation going—because every story deserves to be heard.
                    </p>
                    <div className="social-container mb-lg-0 mb-3">
                      <a
                        href="https://www.youtube.com/@Talkiepedia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-item"
                      >
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                      <a
                        href="https://www.instagram.com/talkiepedia/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-item"
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/dhananjay-dubey-35aa31169/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-item"
                      >
                        <i className="fa-brands fa-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col col-lg-8 mb-3">
                  <div className="row row-cols-1 row-cols-lg-3 justify-content-center">
                    <div className="col col-lg-4 mb-3">
                      <div className="d-flex flex-column gap-3 px-0 px-lg-4">
                        <h5 className="font-1 fw-bold">Pages</h5>
                        <ul className="list">
                          <li className="d-flex flex-row align-items-center gap-3">
                            <i className="fa-solid fa-chevron-right accent-color"></i>
                            <Link to="/" className="link-white">
                              Home
                            </Link>
                          </li>
                          <li className="d-flex flex-row align-items-center gap-3">
                            <i className="fa-solid fa-chevron-right accent-color"></i>
                            <a href="#about-section" className="link-white">
                              About Us
                            </a>
                          </li>
                          <li className="d-flex flex-row align-items-center gap-3">
                            <i className="fa-solid fa-chevron-right accent-color"></i>
                            <Link to="/podcasts" className="link-white">
                              Podcasts
                            </Link>
                          </li>
                          <li className="d-flex flex-row align-items-center gap-3">
                            <i className="fa-solid fa-chevron-right accent-color"></i>
                            <a href="#guests-section" className="link-white">
                              Guests
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col col-lg-3 mb-3">
                      <div className="px-2">
                        <h5 className="font-1 fw-bold">Listed On</h5>
                        <div className="d-flex flex-wrap gap-3 align-items-center">
                          <a
                            href="https://www.instagram.com/talkiepedia/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src="https://talkiepedia.forgealumnus.com/image/instagram.png"
                              alt="instagram"
                              className="img-fluid listed-icon"
                            />
                          </a>
                          <a
                            href="https://www.youtube.com/@Talkiepedia"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src="https://talkiepedia.forgealumnus.com/image/youtube.png"
                              alt="youtube"
                              className="img-fluid listed-icon"
                            />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col col-lg-5 mb-3">
                      <div className="d-flex flex-column gap-3 psm-0">
                        <h5 className="font-1 fw-bold">Information</h5>

                        <div className="d-flex flex-row gap-3 align-items-start">
                          <div
                            className="rounded-circle bg-accent-color d-flex align-items-center justify-content-center"
                            style={{ width: '3rem', height: '3rem', flexShrink: 0 }}
                          >
                            <span className="text-white" style={{ fontSize: '1.25rem' }}>
                              <i className="fa-solid fa-location-dot"></i>
                            </span>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="font-1 fw-bold" style={{ fontSize: '18px' }}>
                              Address
                            </span>
                            <a
                              href="https://www.google.com/maps/search/6th+floor%2C+N-heights%2C+Hitech-City%2C+Hyderabad"
                              className="accent-color text-decoration-none"
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: '14px' }}
                            >
                              6th floor, N-heights, Hitech-City, Hyderabad
                            </a>
                          </div>
                        </div>

                        <div className="d-flex flex-row gap-3 align-items-start">
                          <div
                            className="rounded-circle bg-accent-color d-flex align-items-center justify-content-center"
                            style={{ width: '3rem', height: '3rem', flexShrink: 0 }}
                          >
                            <span className="text-white" style={{ fontSize: '1.25rem' }}>
                              <i className="fa-solid fa-phone"></i>
                            </span>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="font-1 fw-bold" style={{ fontSize: '18px' }}>
                              Call Us
                            </span>
                            <a
                              href="tel:080-31411741"
                              className="accent-color text-decoration-none"
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: '14px' }}
                            >
                              080-31411741
                            </a>
                          </div>
                        </div>

                        <div className="d-flex flex-row gap-3 align-items-start">
                          <div
                            className="rounded-circle bg-accent-color d-flex align-items-center justify-content-center"
                            style={{ width: '3rem', height: '3rem', flexShrink: 0 }}
                          >
                            <span className="text-white" style={{ fontSize: '1.25rem' }}>
                              <i className="fa-solid fa-envelope"></i>
                            </span>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="font-1 fw-bold" style={{ fontSize: '18px' }}>
                              Email
                            </span>
                            <a
                              href="mailto:talkiepedia@forgealumnus.com"
                              className="accent-color text-decoration-none"
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: '14px' }}
                            >
                              talkiepedia@forgealumnus.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Copyright */}
              <div className="py-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-center text-md-start text-light">
                  <p className="mb-0">
                    Copyright 2026 © All Rights Reserved by Forge Alumnus Services Pvt. Ltd.
                  </p>
                  <p className="mb-0">
                    Crafted By 💜{' '}
                    <a
                      href="https://portfolio.forgealumnus.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white fw-semibold text-decoration-none"
                    >
                      Forge Alumnus
                    </a>
                  </p>
                </div>
              </div>

              <div className="text-center text-white py-3" style={{ fontSize: '10px' }}>
                This site is protected by reCAPTCHA and the Google{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-decoration-underline"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-decoration-underline"
                >
                  Terms of Service
                </a>{' '}
                apply.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Call Button Floating Widget */}
      <div className="call-button-wrapper">
        <div className="call-icon" onClick={toggleTollFreeNumber}>
          <i className="fa-solid fa-phone-volume" style={{ color: '#fff' }}></i>
        </div>
        <div
          className="toll-free-popup"
          id="tollFreePopup"
          style={{ display: tollFreeOpen ? 'block' : 'none' }}
        >
          <div className="chat-bubble">
            <i className="fa-solid fa-xmark close-icon" onClick={closeTollFreePopup}></i>
            <i className="fa-solid fa-headset" style={{ color: '#fff' }}></i>
            <strong style={{ marginLeft: '-17px' }}>Need Help?</strong>
            <br />
            Call us toll-free at{' '}
            <a href="tel:8031411741" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
              080-3141-1741
            </a>{' '}
            — we're happy to assist you!
          </div>
        </div>
        <div
          className="toll-free-backdrop"
          id="tollFreeBackdrop"
          onClick={closeTollFreePopup}
          style={{ display: tollFreeOpen ? 'block' : 'none' }}
        ></div>
      </div>

      {/* Global Sliding Audio Player Bar */}
      <BottomPlayer />
    </div>
  );
};
