// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-[#999999] px-6 py-12 sm:py-20">
      <div className="container mx-auto px-0 sm:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-8 text-base xl-max:text-sm md-max:text-xs">

          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Home</h3>
            <ul className="space-y-2">
              <li><a href="#">Categories</a></li>
              <li><a href="#">Devices</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Movies</h3>
            <ul className="space-y-2">
              <li><a href="#">Genres</a></li>
              <li><a href="#">Trending</a></li>
              <li><a href="#">New Release</a></li>
              <li><a href="#">Popular</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Shows</h3>
            <ul className="space-y-2">
              <li><a href="#">Genres</a></li>
              <li><a href="#">Trending</a></li>
              <li><a href="#">New Release</a></li>
              <li><a href="#">Popular</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Support</h3>
            <ul className="space-y-2">
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Subscription</h3>
            <ul className="space-y-2">
              <li><a href="#">Plans</a></li>
              <li><a href="#">Features</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg xl-max:text-base md-max:text-base text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white border border-[#262626] p-2 rounded bg-[#1A1A1A]"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white border border-[#262626] p-2 rounded bg-[#1A1A1A]"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-white border border-[#262626] p-2 rounded bg-[#1A1A1A]"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#262626] pt-4 text-base xl-max:text-sm md-max:text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <p className="mb-2">@2025 StreamVibe, All Rights Reserved</p>
          <div className="flex flex-wrap space-x-4 sm:space-x-4 mt-2 sm:mt-0">
            <a href="#" className="hover:underline pr-4 border-r border-[#262626] last:border-none">Terms of Use</a>
            <a href="#" className="hover:underline pr-4 border-r border-[#262626] last:border-none">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
