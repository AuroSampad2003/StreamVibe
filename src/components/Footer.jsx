// eslint-disable-next-line no-unused-vars
import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-[#a3a3a3] p-10">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
       
        <div>
          <h3 className="font-bold mb-4 text-[17px] text-white">Home</h3>
          <ul className="space-y-2">
            <li><a href="#">Categories</a></li>
            <li><a href="#">Devices</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-bold mb-4 text-[17px] text-white">Movies</h3>
          <ul className="space-y-2">
            <li><a href="#">Genres</a></li>
            <li><a href="#">Trending</a></li>
            <li><a href="#">New Release</a></li>
            <li><a href="#">Popular</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-bold mb-4 text-[17px] text-white">Shows</h3>
          <ul className="space-y-2">
            <li><a href="#">Genres</a></li>
            <li><a href="#">Trending</a></li>
            <li><a href="#">New Release</a></li>
            <li><a href="#">Popular</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-bold mb-4 text-[17px] text-white">Support</h3>
          <ul className="space-y-2">
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

     
        <div>
          <h3 className="font-bold mb-4 text-[17px] text-white">Subscription</h3>
          <ul className="space-y-2">
            <li><a href="#">Plans</a></li>
            <li><a href="#">Features</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-bold mb-4 text-[17px] text-white">Connect With Us</h3>
          <div className="flex space-x-4 text-white">
            <a href="#" className="hover:text-gray-400">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.98 9.95v-7.03h-2.12v-2.92h2.12V9.7c0-2.1 1.26-3.26 3.19-3.26.93 0 1.91.17 1.91.17v2.1h-1.08c-1.07 0-1.4.67-1.4 1.36v1.64h2.38l-.38 2.92h-2v7.03A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-400">
             
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.5.6-2.3.72a3.94 3.94 0 0 0 1.7-2.17 7.93 7.93 0 0 1-2.49.95 4.1 4.1 0 0 0-6.98 3.75 11.66 11.66 0 0 1-8.57-4.5 4.07 4.07 0 0 0 1.27 5.46 4 4 0 0 1-1.86-.52v.06a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.85.07 4.09 4.09 0 0 0 3.83 2.88 8.28 8.28 0 0 1-5.15 1.77 11.62 11.62 0 0 0 6.29 1.85c7.55 0 11.68-6.26 11.68-11.69v-.53a8.3 8.3 0 0 0 2.05-2.14Z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-400">
            
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 1 0-4 0v6h-4v-6a6 6 0 0 1 6-6ZM6 9H2v12h4V9ZM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

     
      <div className="mt-8 border-t border-gray-700 pt-4 text-xs md:text-sm flex justify-between items-center">
        <p className="mb-0">Code By Auro Sampad</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Terms of Use</a>
          <span>|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer
