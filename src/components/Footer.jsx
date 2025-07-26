import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  // Handles clicking a section link in the footer
  const handleSectionClick = (path, anchorId) => {
    // If we're already on this page, just scroll smoothly to the section
    if (window.location.pathname === path) {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    // Otherwise, navigate to the page and store the anchor for after load
    // (The target page is responsible for scrolling after loading)
    navigate(`${path}#${anchorId}`);
  };

  // For the bottom policy links (optional: you can leave as <a> or convert to <Link>)
  const handlePolicyLink = (e) => {
    e.preventDefault();
    // Example: just scroll to top, or handle as needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F0F0F] text-[#999999] px-6 py-12 sm:py-20 pb-28 sm:pb-20">
      <div className="container mx-auto px-0 sm:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-8 text-base xl-max:text-sm md-max:text-xs">

          {/* Home Sections */}
          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Home</h3>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleSectionClick('/', 'categories')}
                  className="cursor-pointer"
                >
                  Categories
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/', 'devices')}
                  className="cursor-pointer"
                >
                  Devices
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/', 'pricing')}
                  className="cursor-pointer"
                >
                  Pricing
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/', 'faq')}
                  className="cursor-pointer"
                >
                  FAQ
                </span>
              </li>
            </ul>
          </div>

          {/* Movies Sections */}
          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Movies</h3>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleSectionClick('/movies', 'movie-genres')}
                  className="cursor-pointer"
                >
                  Genres
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/movies', 'movie-popular')}
                  className="cursor-pointer"
                >
                  Popular
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/movies', 'movie-trending')}
                  className="cursor-pointer"
                >
                  Trending
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/movies', 'movie-new')}
                  className="cursor-pointer"
                >
                  New Release
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/movies', 'movie-top-rated')}
                  className="cursor-pointer"
                >
                  Top Rated
                </span>
              </li>
            </ul>
          </div>

          {/* Shows Sections */}
          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Shows</h3>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleSectionClick('/shows', 'tv-genres')}
                  className="cursor-pointer"
                >
                  Genres
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/shows', 'tv-popular')}
                  className="cursor-pointer"
                >
                  Popular
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/shows', 'tv-trending')}
                  className="cursor-pointer"
                >
                  Trending
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/shows', 'tv-new')}
                  className="cursor-pointer"
                >
                  New Release
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/shows', 'tv-top-rated')}
                  className="cursor-pointer"
                >
                  Top Rated
                </span>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleSectionClick('/support', 'contact-us')}
                  className="cursor-pointer"
                >
                  Contact Us
                </span>
              </li>
            </ul>
          </div>

          {/* Subscription Sections */}
          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Subscription</h3>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleSectionClick('/subscriptions', 'plans')}
                  className="cursor-pointer"
                >
                  Plans
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleSectionClick('/subscriptions', 'features')}
                  className="cursor-pointer"
                >
                  Features
                </span>
              </li>
            </ul>
          </div>

          {/* Socials (unchanged) */}
          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/auro.sampad.1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white border border-[#262626] p-2 rounded bg-[#1A1A1A]"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/auro_sampad_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white border border-[#262626] p-2 rounded bg-[#1A1A1A]"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/aurosampad-champatiray/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white border border-[#262626] p-2 rounded bg-[#1A1A1A]"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Policies */}
        <div className="mt-8 border-t border-[#262626] pt-4 text-base xl-max:text-sm md-max:text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <p className="mb-2">@2025 StreamVibe, All Rights Reserved</p>
          <div className="flex flex-wrap space-x-4 sm:space-x-4 mt-2 sm:mt-0">
            <span onClick={handlePolicyLink} className="hover:underline pr-4 border-r border-[#262626] last:border-none cursor-pointer">Terms of Use</span>
            <span onClick={handlePolicyLink} className="hover:underline pr-4 border-r border-[#262626] last:border-none cursor-pointer">Privacy Policy</span>
            <span onClick={handlePolicyLink} className="hover:underline cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
