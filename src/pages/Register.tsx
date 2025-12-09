import React ,{useState} from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { AuthApi } from "../features/api/AuthApi";
import { Toaster, toast } from "sonner";
import { EyeClosedIcon } from "lucide-react";

type RegisterFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  contact_phone: number;
  password: string;
  address:string;
  terms:boolean;
};

const Register: React.FC = () => {
  const [registerUser, { isLoading }] = AuthApi.useRegisterMutation();
  const { register, handleSubmit,watch, formState: { errors } } = useForm<RegisterFormValues>();
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

  
  const termsAccepted = watch("terms");

  const handleSubmitForm: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const response = await registerUser(data).unwrap();
      console.log('Registration successful:', response);
      navigate('/login');
    } catch (error: any) {
      console.log('Registration unsuccessful', error);
      toast.error(error?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-black">
      <Navbar />
      <Toaster position="top-right" richColors />

      <div className="flex flex-grow items-center justify-center px-15 py-30">
        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT – Brand Section */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white p-14">
              <h1 className="text-4xl font-extrabold tracking-widest mb-4 text-amber-500">
                LEMCEE 
              </h1>
              <p className="text-lg text-gray-300 text-center leading-relaxed max-w-sm">
                Join an exclusive community of luxury vehicle enthusiasts and premium experiences.
              </p>
            </div>

            {/* RIGHT – Register Form */}
            <div className="flex items-center justify-center p-12 bg-white">
              <div className="w-full max-w-md">

                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center tracking-wide">
                  Create Your Account
                </h2>
                <p className="text-center text-gray-500 mb-8">
                  Begin your luxury journey with us
                </p>

                <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-5">

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                    <input
                      {...register('first_name', {
                        required: "First Name required",
                        minLength: { value: 3, message: "First Name must have 3 characters" }
                      })}
                      type="text"
                      placeholder="John"
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                    {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name.message}</p>}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                    <input
                      {...register('last_name', {
                        required: "Last Name required",
                        minLength: { value: 4, message: "Last Name must have 4 characters" }
                      })}
                      type="text"
                      placeholder="Doe"
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                    {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      {...register('email', {
                        required: "Email Required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                      })}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                  </div>

                 

                  
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        {...register('password', {
                          required: "Password is required",
                          minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full px-5 py-3 pr-14 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                      />

                      {/* Show/Hide Button */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-amber-600 hover:text-amber-700"
                      >
                        <EyeClosedIcon/>
                      </button>
                    </div>

                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                   {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">contact_phone</label>
                    <input
                      {...register('contact_phone', {
                        required: "Phone number required",
                        minLength: { value: 10, message: "Phone number must have at least 10 digits" }
                      })}
                      type="text"
                      placeholder="0712345678"
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                    {errors.contact_phone && <p className="text-sm text-red-600 mt-1">{errors.contact_phone.message}</p>}
                  </div>
                   {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">address</label>
                    <input
                      {...register('address', {
                        required: "Location name required",
                        minLength: { value: 3, message: "Location name must have at least 3 digits" }
                      })}
                      type="text"
                      placeholder="Nairobi"
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                    {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("terms", {
                          required: "You must agree to the terms and conditions"
                        })}
                        className="checkbox checkbox-amber-500"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{" "}
                        <Link to="/terms" className="text-amber-600 font-semibold hover:underline">
                          Terms & Conditions
                        </Link>
                      </span>
                    </label>

                    {errors.terms && (
                      <p className="text-sm text-red-600">{errors.terms.message}</p>
                    )}
                  </div>


                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!termsAccepted}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg shadow-[0_10px_30px_rgba(245,158,11,0.45)] transition transform hover:scale-[1.02]"
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </button>
                </form>

                {/* Login Redirect */}
                <div className="text-center mt-6">
                  <p className="text-gray-600 mb-2">Already have an account?</p>
                  <Link to="/login" className="text-amber-600 hover:underline font-semibold">
                    Login to your account
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
