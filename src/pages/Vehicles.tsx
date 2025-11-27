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

  const { data: vehicles, error, isLoading } = VehicleApi.useGetAllvehicleQuery();
  const [createBooking, { isLoading: isBookingLoading }] = BookingApi.useAddNewBookingMutation();

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
        booking_status: "Pending",
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

      {/* Vehicle Grid */}
      <div className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <p>Loading vehicles...</p>
        ) : error ? (
          <p className="text-red-500">Error loading vehicles</p>
        ) : (
          vehicles?.map((vehicle: any) => (
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
                Ksh {vehicle.rental_rate.toLocaleString()}/day
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
              <span className="font-bold text-green-700">Ksh {totalPrice.toLocaleString()}</span>
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
