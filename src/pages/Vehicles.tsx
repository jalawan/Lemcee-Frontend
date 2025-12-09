import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { VehicleApi } from "../features/api/VehicleApi";
import { BookingApi } from "../features/api/BookingApi";
import  type { Bookings } from "../types/Types";
import { toast, Toaster } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Car } from "lucide-react";



const Vehicles: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);
  const navigate = useNavigate();


   // ✅ Filter States
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("");

  
  const { data: vehicles, error, isLoading } = VehicleApi.useGetAllvehicleQuery();
  const [createBooking, { isLoading: isBookingLoading }] = BookingApi.useAddNewBookingStatusMutation();


  // ✅ FRONTEND FILTERING (DO NOT REMOVE ANY EXISTING CODE)
const filteredVehicles = useMemo(() => {
  if (!vehicles) return [];

  return vehicles
    .filter((v: any) => {
      const priceMatch =
        v.rental_rate >= minPrice && v.rental_rate <= maxPrice;

      const fuelMatch =
        !fuelType || v.fuel_type === fuelType;

      const transmissionMatch =
        !transmission || v.transmission === transmission;

      const availabilityMatch =
        !availableOnly || v.availability === true;

      return (
        priceMatch &&
        fuelMatch &&
        transmissionMatch &&
        availabilityMatch
      );
    })
    .sort((a: any, b: any) => {
      if (sort === "asc") return a.rental_rate - b.rental_rate;
      if (sort === "desc") return b.rental_rate - a.rental_rate;
      return 0;
    });
}, [vehicles, minPrice, maxPrice, fuelType, transmission, availableOnly, sort]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [driverType, setDriverType] = useState<"self_drive" | "chauffeur">("self_drive");
  const [serviceType, setServiceType] = useState<"standard_rental" | "hotel_transport">("standard_rental");

  const openModal = (vehicle: any) => {
    if (!isAuthenticated) {
      toast.error("Please login to book a vehicle");
      return;
    }
    if (!vehicle.availability) {
      toast.error("Vehicle not available");
      return;
    }

    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  
  const numberOfDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [pickupDate, returnDate]);


  const totalPrice = useMemo(() => {
    if (!selectedVehicle) return 0;
    let total = selectedVehicle.rental_rate * numberOfDays;
    if (driverType === "chauffeur") total += 3500;
    if (serviceType === "hotel_transport") total += 2500;
    return total;
  }, [selectedVehicle, driverType, serviceType, numberOfDays]);

  const handleBooking = async () => {
    if (!selectedVehicle || !pickupDate) {
      toast.error("Please select pickup date");
      return;
    }

    const toastId = toast.loading("Processing booking...");

    try {
      const bookingPayload: Partial<Bookings> = {
        user_id: user!.user_id,
        vehicle_id: selectedVehicle.vehicle_id,
        booking_date: new Date(pickupDate).toISOString(),
        return_date: returnDate ? new Date(returnDate).toISOString() :undefined,
        total_amount: totalPrice,
        booking_status: "paid",
      };

      const res = await createBooking(bookingPayload).unwrap();
      toast.success(res.message, { id: toastId });

      // ✅ Mark vehicle as unavailable (optional: call backend API)
      // await VehicleApi.useUpdateVehicleAvailability(selectedVehicle.vehicle_id);

      setIsModalOpen(false);
      setSelectedVehicle(null);
      setPickupDate("");
      setReturnDate("");
      setDriverType("self_drive");
      setServiceType("standard_rental");

      navigate("/dashboard/my-bookings");
    } catch (err) {
      console.error(err);
      toast.error("Booking failed", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster richColors position="top-right" />

{/* Hero */}
      <div className="bg-black text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">🚘 Executive Vehicle Booking</h1>
        <p className="opacity-90">Luxury rentals & hotel transportation</p>
      </div>

      {/* ✅ FILTER BAR */}
<div className="bg-white shadow p-4 mx-10 mt-6 rounded-xl grid grid-cols-1 md:grid-cols-6 gap-4">

 
          {/* ✅ Min Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Minimum Price</label>
            <input
              type="number"
              placeholder="Enter min price"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="input input-bordered"
            />
          </div>

          {/* ✅ Max Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Maximum Price</label>
            <input
              type="number"
              placeholder="Enter max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="input input-bordered"
            />
          </div>


          {/* Fuel Type */}
          <div className=" mt-6">
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
          </select>
         </div>
          {/* Transmission */}
          <div className=" mt-6">
          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          </div>
          {/* Sort */}

          <div className=" mt-6">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Sort By</option>
            <option value="asc">Price Low → High</option>
            <option value="desc">Price High → Low</option>
          </select>
          </div>

          {/* Availability */}
          {isAuthenticated &&(
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            Available Only
          </label>
          )}
        </div>

      {/* Vehicle Grid */}
      <div className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <p>Loading vehicles...</p>
        ) : error ? (
          <p className="text-red-500">Error loading vehicles</p>
        ) : (
          filteredVehicles?.map((vehicle: any) => (
            <div
              key={vehicle.vehicle_id}
              className="relative bg-white rounded-2xl shadow-xl hover:-translate-y-2 transition-all overflow-hidden"
            >
               <img
                src={vehicle.imageURL}
                alt={vehicle.model}
                className="w-full h-48 object-cover"
                                />

              {/* Luxury price badge */}
              <div className="absolute ml-35 mt-15 px-4 py-1 rounded-full text-white
                bg-gradient-to-r from-yellow-500 to-yellow-300 animate-pulse font-bold shadow-lg">
                Ksh {vehicle.rental_rate?.toLocaleString() ?? "N/A"}/day
              </div>

              <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                {vehicle.manufacturer} {vehicle.model}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {vehicle.transmission} | {vehicle.fuel_type}
              </p>
              {user && (
                <button
                  onClick={() => openModal(vehicle)}
                  disabled={!vehicle.availability}
                  className={`w-full py-3 mb-3 rounded-full font-bold transition
                    ${vehicle.availability
                      ? "bg-black text-white hover:bg-gray-900"
                      : "bg-gray-400 cursor-not-allowed"}`}
                >
                  {vehicle.availability ? "Book Now" : "Unavailable"}
                </button>
              )}
              <button
                onClick={() => navigate(`/vehicle_spec/${vehicle.vehicle_id}`)}
                className="w-full py-3 rounded-full font-bold transition bg-black text-white hover:bg-gray-900"
              >
                More Details
              </button>
            </div>

            </div>
          ))
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedVehicle && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-4">Complete Booking</h3>

            {/* Service Type */}
            <select
              className="select select-bordered w-full mb-3"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value as any)}
            >
              <option value="standard_rental">Standard Rental</option>
              <option value="hotel_transport">Hotel Transportation</option>
            </select>

            {/* Driver Type */}
            <select
              className="select select-bordered w-full mb-3"
              value={driverType}
              onChange={(e) => setDriverType(e.target.value as any)}
            >
              <option value="self_drive">Self Drive</option>
              <option value="chauffeur">With Driver</option>
            </select>

            {/* Pickup & Return Dates */}
            <input
              type="date"
              className="input input-bordered w-full mb-3"
              onChange={(e) => setPickupDate(e.target.value)}
            />
            <input
              type="date"
              className="input input-bordered w-full mb-4"
              onChange={(e) => setReturnDate(e.target.value)}
            />

            {/* Total Price */}
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span className="font-bold text-green-700">Ksh {totalPrice.toLocaleString() ?? "N/A"}</span>
            </div>

            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn bg-black text-white" onClick={handleBooking} disabled={isBookingLoading}>
                {isBookingLoading ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Vehicles;
