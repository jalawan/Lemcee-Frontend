import { useState } from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { toast, Toaster } from 'sonner'
import { useAddVehicleSpecMutation } from '../../features/api/VehicleApi'
import axios from "axios";

const AddVehicleSpecification = () => {


  const preset_key = "carRental";
    const cloud_name = "dwkwtexgk";
    
    const [image1, setImage1] = useState<string>("");
    // const [image2, setImage2] = useState<string>("");
    // const [image3, setImage3] = useState<string>("");

  const handleFile1 = async (e: any) => {
       const file = e.target.files[0];
         const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", preset_key);
            try {
                const res = await axios(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                    method: "POST",
                    data: formData
                });
                const data = res.data;
                setImage1(data.secure_url);
                console.log(data.secure_url);
            } catch (err: any) {
                console.log(err);
            }
    };
  const [addSpec] = useAddVehicleSpecMutation()

  const [formData, setFormData] = useState({
    manufacturer: '',
    model: '',
    year: '',
    fuel_type: '',
    engine_capacity: '',
    transmission: '',
    seating_capacity: '',
    color: '',
    features: ''
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await addSpec({
        ...formData,
        year: Number(formData.year),
        seating_capacity: Number(formData.seating_capacity)
      } as any).unwrap()

      toast.success('Vehicle Specification Created')

      setFormData({
        manufacturer: '',
        model: '',
        year: '',
        fuel_type: '',
        engine_capacity: '',
        transmission: '',
        seating_capacity: '',
        color: '',
        features: ''
      })
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create spec')
    }
  }

  return (
    <AdminDashboardLayout>
        <Toaster/>
      <h1 className="text-2xl font-bold mb-4">Add Vehicle Specification</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl">

        <input name="manufacturer" value={formData.manufacturer} onChange={handleChange}
          className="input input-bordered w-full" placeholder="Manufacturer" required />

        <input name="model" value={formData.model} onChange={handleChange}
          className="input input-bordered w-full" placeholder="Model" required />

        <input name="year" type="number" value={formData.year} onChange={handleChange}
          className="input input-bordered w-full" placeholder="Year" required />

        <input name="fuel_type" value={formData.fuel_type} onChange={handleChange}
          className="input input-bordered w-full" placeholder="Fuel Type" required />

        <input name="engine_capacity" value={formData.engine_capacity} onChange={handleChange}
          className="input input-bordered w-full" placeholder="Engine Capacity" required />

        <input name="transmission" value={formData.transmission} onChange={handleChange}
          className="input input-bordered w-full" placeholder="Transmission" required />

        <input name="seating_capacity" type="number" value={formData.seating_capacity} onChange={handleChange}
          className="input input-bordered w-full" placeholder="Seating Capacity" required />

        <input name="color" value={formData.color} onChange={handleChange}
          className="input input-bordered w-full" placeholder="Color" required />

        <textarea name="features" value={formData.features} onChange={handleChange}
          className="textarea textarea-bordered w-full" placeholder="Features" required />
          <div>
            <label className="block text-sm font-medium text-gray-700">Image 1 URL</label>
            <input type="file" onChange={handleFile1} className="input input-bordered w-full" placeholder="Enter image 1 URL" required />
            <br />
            <img src={image1} alt="image1" width="75" height="75" />
          </div>

        <button className="btn bg-black text-gold w-full">Save Specification</button>
      </form>
    </AdminDashboardLayout>
  )
}

export default AddVehicleSpecification
