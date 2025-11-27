import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { AuthApi } from '../features/api/AuthApi';
import { toast, Toaster } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/slice/authSlice';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [loginUser, { isLoading }] = AuthApi.useLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginForm: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      dispatch(setCredentials({ token: response.token, user: response.user }));
       if (response.user.user_type=== "admin") {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard'); 
        }
    } catch (error: any) {
      toast.error(error?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-black">
      <Toaster position="top-right" richColors />
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT – Luxury Branding */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white p-14">
              <h1 className="text-4xl font-extrabold tracking-widest mb-4 text-amber-500">
                ELITE DRIVE
              </h1>
              <p className="text-lg text-gray-300 text-center leading-relaxed max-w-sm">
                Experience premium luxury, seamless reservations, and world-class vehicles at your fingertips.
              </p>
            </div>

            {/* RIGHT – Login Form */}
            <div className="flex items-center justify-center p-12 bg-white">
              <div className="w-full max-w-md">

                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center tracking-wide">
                  Member Login
                </h2>
                <p className="text-center text-gray-500 mb-8">
                  Access your luxury experience
                </p>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleLoginForm)}>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      {...register('email', {
                        required: "Email is required",
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                    <input
                      {...register('password', {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                      })}
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                  </div>

                  {/* Forgot password */}
                  <div className="text-right">
                    <Link to="#" className="text-amber-600 text-sm hover:underline font-medium">
                      Forgot your password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg shadow-[0_10px_30px_rgba(245,158,11,0.45)] transition transform hover:scale-[1.02]"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>

                  {/* Links */}
                  <div className="text-center mt-2 flex flex-col gap-2">
                    <Link to="/" className="text-gray-700 hover:text-black hover:underline text-sm">
                      ← Back to Home
                    </Link>
                    <Link to="/register" className="text-amber-600 hover:underline text-sm font-medium">
                      Don’t have an account? Register
                    </Link>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
