import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import yardImg from '../assets/Yard.jpg'
import { Book, CarFront, HotelIcon, Phone } from 'lucide-react'
import { Link, useNavigate } from "react-router";


const About: React.FC = () => {
   


  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-primary to-emerald-950 text-white py-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">About Us</h1>
      </div>

      {/* OUR STORY */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-black mb-9"><Book/>  Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Lemcee Executive Concierge is a premium lifestyle management and concierge service dedicated to
              offering curated luxury experiences across Kenya and beyond. We specialize in executive mobility,
              event lifestyle management, hospitality, and corporate services.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={yardImg}
              alt="Vehicles in a yard"
              className="w-full max-w-md h-[300px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="py-20 px-6 bg-base-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-primary mb-3">✨ Our Services</h2>
          <p className="text-lg text-gray-600 mb-12">
            What drives us every day to create exceptional experience
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Airport Transfers' },
              { title: 'Hotel Transfers', icon: <HotelIcon /> },
              { title: 'Corporate Transportation' },
              { title: 'Car Hire' },
              { title: 'Diplomat Transportation' },
              { title: 'Wedding Vehicles' },
              { title: 'Ruracio Vehicles' },
              { title: 'Executive Car Hire' }
            ].map((service, index) => (
              <div
                key={index}
                className="
                  group card bg-base-100 p-6 rounded-2xl shadow-xl
                  transition-all duration-300 transform
                  hover:-translate-y-3 hover:rotate-x-[6deg] hover:rotate-y-[6deg]
                "
              >
                <div className="text-4xl text-warning mb-4">
                  {service.icon ?? '🚘'}
                </div>
                <h3 className="text-xl font-bold text-primary">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-black mb-6">
            ⭐ Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            We provide unmatched convenience, flexibility, and premium customer service in every ride you book.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Transparent Pricing",
                description: "No hidden charges — everything is clear and upfront so you can book confidently."
              },
              {
                title: "Flexible Pick-up & Drop-off",
                description: "Choose where and when to get your car. Your schedule, your rules."
              },
              {
                title: "24/7 Customer Support",
                description: "We’re always available for questions, emergencies, or last-minute changes."
              },
              {
                title: "Wide Fleet Selection",
                description: "Sedans, SUVs, luxury — pick the perfect vehicle for your journey."
              },
              {
                title: "Fast & Easy Booking",
                description: "Book your ride in under 2 minutes with our smooth and simple process."
              },
              {
                title: "Professional & Trusted Service",
                description: "All vehicles are regularly serviced, insured, and safety-checked."
              }
            ].map((item, index) => (
              <div
                key={index}
                className="
                  group card bg-base-100 p-8 shadow-xl rounded-2xl
                  transition-all duration-300 transform
                  hover:-translate-y-3 hover:rotate-x-[6deg] hover:rotate-y-[6deg]
                "
              >
                <div className="text-3xl text-warning mb-4">★</div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* MISSION & VISION */}
<div className="py-20 px-6 bg-gray-100">
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-center">

    {/* MISSION */}
    <div
      className="
        bg-white text-gray-800 shadow-2xl p-10 rounded-3xl
        transition-all duration-300 transform
        hover:-translate-y-2 hover:shadow-3xl
      "
    >
      <h2 className="text-3xl font-bold mb-4 text-emerald-700">
        Our Mission
      </h2>
      <p className="text-lg leading-relaxed text-gray-600">
        Our mission is to deliver excellence, trust, and prestige for every client whether
        individual, corporate, or diplomatic.
      </p>
    </div>

    {/* VISION */}
    <div
      className="
        bg-white text-gray-800 shadow-2xl p-10 rounded-3xl
        transition-all duration-300 transform
        hover:-translate-y-2 hover:shadow-3xl
      "
    >
      <h2 className="text-3xl font-bold mb-4 text-emerald-700">
        Our Vision
      </h2>
      <p className="text-lg leading-relaxed text-gray-600">
        To become the leading vehicle rental provider in the region, known for innovation,
        quality, and unmatched customer satisfaction.
      </p>
    </div>

  </div>

      {/* CALL TO ACTION */}
      <div className="py-20 px-6 bg-gradient-to-br from-primary to-emerald-950 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            🌟 Ready to Experience Lemcee Executive Concierge?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Where luxury meets lifestyle. Book with us today and enjoy curated premium experience.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/vehicles"  className="btn btn-warning btn-lg flex gap-2" >

             <CarFront />
              View Our Vehicles
            </Link>
            

            <Link to= "/contact" className="btn btn-outline btn-warning btn-lg flex gap-2">
              <Phone />
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </div>
  )
}

export default About
