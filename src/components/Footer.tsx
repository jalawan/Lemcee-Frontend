import React from 'react'
import { Link } from "react-router";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">🚗</div>
            <span className="text-2xl font-bold text-white">Lemcee Executive</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Experience comfort and class with every ride.
            Our premium vehicles are well-maintained, stylish, and ready for your next journey because you deserve a travel experience that feels exceptional
          </p>
        </div>

        {/* Navigation */}
        <div style={{ justifyContent:'space-between'}}>
          <h3 className="text-lg font-semibold text-white mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-secondary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-secondary transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/vehicles"
                className="hover:text-secondary transition-colors"
              >
                Our vehicles
              </Link>
            </li>
              <li>
              <Link
                to="/vehicles"
                className="hover:text-secondary transition-colors"
              >
                Rental Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-secondary transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

         {/* Support */}
        <div>
            <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
            <ul className="space-y-2">
                <li>
                    <Link
                        to="/carRentalFAQS"
                        className="hover:text-secondary transition-colors"
                    >
                    FAQS
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contactUs"
                        className="hover:text-secondary transition-colors"
                    >
                    Contact Us
                    </Link>
                </li>
                <li>
                    <Link
                        to="/makeMoney"
                        className="hover:text-secondary transition-colors"
                    >
                        Make money
                    </Link>
                </li>
                <li>
                    <Link
                        to="/Partnership"
                        className="hover:text-secondary transition-colors"
                    >
                    Partnership
                    </Link>
                </li>
                <li>
                    <Link
                        to="/Review"
                        className="hover:text-secondary transition-colors"
                    >
                    Reviews
                    </Link>
                </li>
            </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Email
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                Tiktok
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-secondary transition-colors">
                
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">
            © 2025 <span className="text-secondary font-semibold">Lemcee Executive</span>. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-secondary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
