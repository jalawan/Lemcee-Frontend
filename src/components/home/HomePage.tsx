import { Calendar, LocateIcon, Pin, Search } from "lucide-react";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div
      className="hero min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* TEXT — Mobile: above search bar | Desktop: bottom-left */}
      <div
        className="
          z-20 text-white 
          px-5
          md:absolute md:bottom-8 md:left-10
          md:max-w-md
          flex flex-col
        "
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Ride with us</h1>
        <p className="text-base md:text-lg mb-5">
          Where Luxury meets comfort
        </p>

        {/* Only visible on small screens */}
        <div className="md:hidden mb-5">
          <button className="btn btn-primary px-6">Get Started</button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div
        className="
          absolute
          w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%]
          left-1/2 -translate-x-1/2
          bottom-[-90px]
          z-30
        "
      >
        <div
          className="
            bg-white shadow-xl rounded-3xl p-5 md:p-6
            flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap
            items-center gap-5
          "
        >
          {/* Location */}
          <div className="flex items-start gap-3 w-full sm:w-[48%] lg:w-full">
            <div className="text-red-500 text-xl"><LocateIcon/></div>
            <div className="flex-1">
              <p className="font-semibold text-gray-600 text-sm">Location</p>
              <input
                type="text"
                placeholder="Car Rental in Nairobi, Kenya"
                className="input w-full border-none focus:outline-none px-0"
              />
            </div>
          </div>

          {/* Pick-up */}
          <div className="flex items-start gap-3 w-full sm:w-[48%] lg:w-full">
            <div className="text-red-500 text-xl"><Calendar/></div>
            <div className="flex-1">
              <p className="font-semibold text-gray-600 text-sm">Pick-up</p>
              <input
                type="datetime-local"
                className="input w-full border-none focus:outline-none px-0"
              />
            </div>
          </div>

          {/* Drop-off */}
          <div className="flex items-start gap-3 w-full sm:w-[48%] lg:w-full">
            <div className="text-red-500 text-xl"><Calendar/></div>
            <div className="flex-1">
              <p className="font-semibold text-gray-600 text-sm">Drop-off</p>
              <input
                type="datetime-local"
                className="input w-full border-none focus:outline-none px-0"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="btn bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-2 text-lg w-full sm:w-auto">
            <Search className=""/> Search
          </button>
        </div>
      </div>

      {/* Button visible only on desktop */}
      <button
        className="
          hidden md:block
          btn btn-primary px-3  
          absolute bottom-2 left-15 z-20
          mt-3
        "
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
