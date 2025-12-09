import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthApi } from "../features/api/AuthApi";
import { toast, Toaster } from "sonner";
import { Link } from "react-router";

type ForgotPasswordValues = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } =
    useForm<ForgotPasswordValues>();

  const [forgotPassword, { isLoading }] =
    AuthApi.useForgotPasswordMutation();

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    try {
      const res = await forgotPassword(data).unwrap();
      toast.success(res.message || "Reset link sent to your email.");
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to send reset link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-6">
      <Toaster position="top-right" richColors />

      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })}
              type="email"
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-amber-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold transition"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center">
            <Link to="/login" className="text-amber-600 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
