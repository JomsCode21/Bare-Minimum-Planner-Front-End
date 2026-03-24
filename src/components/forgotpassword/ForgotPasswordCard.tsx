import InputField from "@/components/ui/InputField";
import { forgotPassword } from "@/api/auth";
import Email from "@/assets/dotlottie/email.lottie?url";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { isAxiosError } from "axios";
import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UniversalButton from "../ui/UniversalButton";

function ForgotPasswordCard() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFindAccount = async () => {
    if (!email) {
      toast.warning("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email);
      navigate("/login");
    } catch (error: unknown) {
      console.error(error);
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "User not found using this email",
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
      <div className="mb-2 h-28 w-28 sm:h-32 sm:w-32">
        <DotLottieReact
          src={Email}
          loop
          autoplay
          className="h-full w-full"
        />
      </div>
      <h3 className="mb-4 text-base font-bold text-txt sm:text-lg">
        "It happens. Let's get you back in."
      </h3>
      <p className="mb-6 text-lg font-extrabold sm:mb-8 sm:text-xl">¯\_(ツ)_/¯</p>

      <div className="mb-8 w-full">
        <InputField
          type="email"
          icon={<IoMdMail />}
          placeholder="Enter your email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </div>

      <UniversalButton
        type="submit"
        content={loading ? "Checking..." : "Find Account"}
        onClick={handleFindAccount}
        disabled={loading}
      />
    </div>
  );
}

export default ForgotPasswordCard;
