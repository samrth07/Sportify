import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} TravelMate. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-gray-300 transition">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition">Terms</a>
          <a href="#" className="hover:text-gray-300 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
