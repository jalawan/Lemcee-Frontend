import React from "react";
import comfortCar from "../../assets/comfortcar.jpg"; // your uploaded image

const ComfortSection: React.FC = () => {
  return (
    // OUTER WHITE BACKGROUND FOR MARGINS
    <div className="bg-white py-10 px-4 lg:px-10">

      {/* DARK MAIN SECTION */}
      <section className="bg-[#0c0a08] text-white rounded-3xl p-10 lg:p-16 max-w-7xl mx-auto mt-4">

        {/* TOP ROW: TEXT LEFT + IMAGE RIGHT */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

          {/* LEFT TEXT */}
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Discover a new level of comfort
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              We’re here to make the car-renting process as easy and stress-free as
              possible. Contact us today to schedule a test drive or to learn more
              about our financing and service options.
            </p>
          </div>

          {/* RIGHT IMAGE — NOW INLINE + REDUCED SIZE */}
          <img
            src={comfortCar}
            alt="Car Interior"
            className="w-full max-w-sm rounded-2xl shadow-xl border border-[#1d1a16]"
          />
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-14">
          {[
            "Easy online booking",
            "Professional drivers",
            "Big fleet of vehicles",
            "Online payment",
            "Commercial system",
            "Smart charging",
          ].map((title, index) => (
            <div key={index}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#1f1a14] p-4 rounded-full"></div>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                Vestibulum efficitur se sit amet sem semper luctus pellentesque
                auctor tristique ornare Ut porta ut.
              </p>

              <div className="border-b border-[#2a2520] mt-6"></div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default ComfortSection;
