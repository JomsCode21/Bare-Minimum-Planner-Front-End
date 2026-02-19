import InputField from "@/components/ui/InputField";
import { isAxiosError } from "axios";
import { useState } from "react";
import { FaKey } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UniversalButton from "../ui/UniversalButton";
import type { ResetPasswordCardProps } from "@/types/forgotpassword";
import { resetPassword } from "@/api/auth";

function ResetPasswordCard({ userId }: ResetPasswordCardProps) {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    // Basic Validation
    if (!newPassword || !confirmPassword) {
      toast.warn("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warn("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(userId, newPassword);

      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error: unknown) {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Error resetting password.",
        );
      } else {
        toast.error("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg w-87.5 rounded-[20px] p-8 flex flex-col items-center shadow-lg text-center">
      <h3 className="font-bold text-txt text-[16.4px] mb-4">
        "It happens. Let's get you back in."
      </h3>
      <p className="text-xl mb-8 font-extrabold">¯\_(ツ)_/¯</p>

      {/* New Password Input */}
      <div className="w-full mb-4">
        <InputField
          icon={<FaKey />}
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
        />
      </div>

      {/* Confirm Password Input */}
      <div className="w-full mb-8">
        <InputField
          icon={<FaKey />}
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
      </div>

      <UniversalButton
        type="submit"
        content={loading ? "Resetting..." : "Reset Password"}
        onClick={handleReset}
        disabled={loading}
      />
    </div>
  );
}

export default ResetPasswordCard;
