import { resetPassword } from "@/api/auth";
import type { ResetPasswordCardProps } from "@/types/forgotpassword";
import InputField from "@/components/ui/InputField";
import { isAxiosError } from "axios";
import { useState } from "react";
import { FaKey } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UniversalButton from "../ui/UniversalButton";

function ResetPasswordCard({ userId }: ResetPasswordCardProps) {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
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
    <div className="flex w-full max-w-sm flex-col items-center rounded-[20px] bg-bg p-5 text-center shadow-lg sm:max-w-md sm:p-8">
      <h3 className="mb-4 text-base font-bold text-txt sm:text-lg">
        "It happens. Let's get you back in."
      </h3>
      <p className="mb-6 text-lg font-extrabold sm:mb-8 sm:text-xl">¯\_(ツ)_/¯</p>

      <div className="mb-4 w-full">
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

      <div className="mb-8 w-full">
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
