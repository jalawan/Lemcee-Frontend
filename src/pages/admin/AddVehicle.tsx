import { useState } from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { toast, Toaster } from 'sonner'
import { useAddvehicleMutation, useGetAllVehicleSpecsQuery } from '../../features/api/VehicleApi'

const AddVehicle = () => {
  const { data: specs = [] } = useGetAllVehicleSpecsQuery()
  const [addVehicle] = useAddvehicleMutation()

  const [vehicleSpecId, setVehicleSpecId] = useState('')
  const [rentalRate, setRentalRate] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await addVehicle({
        vehicle_spec_id: Number(vehicleSpecId),
        rental_rate: Number(rentalRate),
        availability: true
      } as any).unwrap()

      toast.success('Vehicle Created Successfully')

      setVehicleSpecId('')
      setRentalRate('')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create vehicle')
    }
  }

  return (
    <AdminDashboardLayout>
        <Toaster richColors/>
      <h1 className="text-2xl font-bold mb-4">Add New Vehicle</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">

        <select
        value={vehicleSpecId}
        onChange={(e) => setVehicleSpecId(e.target.value)}
        className="select select-bordered w-full"
        required
        >
        <option value="">Select Vehicle Specification</option>
        {specs.length === 0 ? (
            <option disabled>Loading specs...</option>
        ) : (
            specs.map((spec: any) => (
            <option key={spec.vehicleSpec_id} value={spec.vehicleSpec_id}>
                {spec.manufacturer} {spec.model} ({spec.year})
            </option>
            ))
        )}
        </select>


        <input
          type="number"
          value={rentalRate}
          onChange={(e) => setRentalRate(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Rental Rate Per Day"
          required
        />

        <button className="btn bg-black text-gold w-full">Save Vehicle</button>
      </form>
    </AdminDashboardLayout>
  )
}

export default AddVehicle
