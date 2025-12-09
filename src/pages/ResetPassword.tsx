import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router";
import { AuthApi } from "../features/api/AuthApi";
import { toast, Toaster } from "sonner";

type ResetPasswordValues = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } =
    useForm<ResetPasswordValues>();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] =
    AuthApi.useResetPasswordMutation();

  const onSubmit: SubmitHandler<ResetPasswordValues> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await resetPassword({
        token,
        password: data.password
      }).unwrap();

      toast.success(res.message || "Password reset successful!");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.error || "Password reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-6">
      <Toaster position="top-right" richColors />

      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          Create New Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              New Password
            </label>
            <input
              {...register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Min 6 characters" }
              })}
              type="password"
              className="w-full px-5 py-3 rounded-xl border bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", { required: true })}
              type="password"
              className="w-full px-5 py-3 rounded-xl border bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold"
          >
            {isLoading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
