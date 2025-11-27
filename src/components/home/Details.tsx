import React from 'react'
import carImage from '../../assets/Aboutt.jpg'

const Details: React.FC = () => {
  return (
    // OUTER WHITE BACKGROUND FOR MARGINS  
    <div className="bg-white py-10 px-4 lg:px-10">

      {/* INNER SECTION (DaisyUI Hero) */}
      <div className="hero bg-base-200 rounded-3xl min-h-[70vh] lg:min-h-[60vh] shadow-xl">
        
        <div className="hero-content flex-col lg:flex-row-reverse gap-10 lg:gap-20 p-10">

          {/* Image */}
          <img
            src={carImage}
            className="max-w-xs md:max-w-sm rounded-2xl shadow-2xl"
            alt="Car rental"
          />

          {/* Text */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Get to Know Us!
            </h1>

            <p className="py-6 text-white-700 text-lg leading-relaxed">
              At Lemcee Executive, we make vehicle renting easy, reliable, and convenient.
              Whether you’re traveling for business, leisure, or daily errands, our fleet is 
              designed to give you comfort, safety, and flexibility anytime you need it.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Details
