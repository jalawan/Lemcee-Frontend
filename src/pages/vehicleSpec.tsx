// src/pages/VehicleSpecification.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { VehicleApi } from "../features/api/VehicleApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";
import type { VehicleSpecifications } from "../types/Types";

const VehicleSpecification: React.FC = () => {
  const params = useParams<{ vehicle_id: string }>();

  // ✅ convert param to number
  const vehicle_id = Number(params.vehicle_id);

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.authSlice);

  //scrollup
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // protect if there is invalid id
  const shouldFetch = !Number.isNaN(vehicle_id) && vehicle_id > 0;

  const { data: vehicle, isLoading, error } =
    VehicleApi.useGetvehicleByIdQuery(vehicle_id, { skip: !shouldFetch });

  // const handleBookingRedirect = () => {
  //   if (!isAuthenticated) {
  //     toast.error("Please login to continue");
  //     navigate(`/login?redirect=/booking/${vehicle_id}`);
  //     return;
  //   }

  //   navigate(`/booking/${vehicle_id}`);
  // };

  // ✅ back button handler
  const handleBack = () => {
    navigate("/vehicles"); // change this if your vehicles route is different
  };

  if (!shouldFetch) return <p className="p-10 text-red-500">Invalid vehicle ID</p>;
  if (isLoading) return <p className="p-10">Loading vehicle details...</p>;
  if (error || !vehicle)
    return <p className="text-red-500 p-10">Vehicle not found</p>;

  const v = vehicle as VehicleSpecifications;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-10 py-22">

        {/* ✅ BACK BUTTON */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text--700 hover:text-white transition"
        >
          ← Back to Vehicles
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT - image */}
          <div>
            <img
              src={v.imageURL ?? "/images/placeholder.png"}
              className="rounded-3xl shadow-2xl object-cover w-full h-96"
              alt={`${v.manufacturer} ${v.model}`}
              loading="lazy"
            />
          </div>

          {/* RIGHT - details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {v.manufacturer} {v.model}
            </h1>

            <p className="text-gray-500 mb-6">Luxury Vehicle Specifications</p>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div><strong>Year:</strong> {v.year}</div>
              <div><strong>Fuel:</strong> {v.fuel_type}</div>
              <div><strong>Transmission:</strong> {v.transmission}</div>
              <div><strong>Engine:</strong> {v.engine_capacity}</div>
              <div><strong>Seats:</strong> {v.seating_capacity}</div>
              <div><strong>Color:</strong> {v.color}</div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Features</h3>
              <p className="text-gray-700 whitespace-pre-line">{v.features}</p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-green-700">
                Ksh {v.rental_rate.toLocaleString()}/day
              </span>

              <span
                className={`px-4 py-1 rounded-full text-white text-sm ${
                  v.availability ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {v.availability ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* <button
              onClick={handleBookingRedirect}
              disabled={!v.availability}
              className="bg-black text-white w-full py-4 rounded-xl font-bold hover:bg-gray-900 transition disabled:opacity-60"
            >
              Book Now
            </button> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VehicleSpecification;