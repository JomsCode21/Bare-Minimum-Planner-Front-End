import InputField from "@/components/ui/InputField";
import axios, { isAxiosError } from "axios";
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

      await axios.post("/api/users/forgotpassword", {
        email,
      });
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
    <div className="bg-bg w-87.5 rounded-[20px] p-8 flex flex-col items-center shadow-lg text-center">
      <h3 className="font-bold text-txt text-[16.4px] mb-4">
        "It happens. Let's get you back in."
      </h3>
      <p className="text-xl mb-8 font-extrabold">¯\_(ツ)_/¯</p>

      <div className="w-full mb-8">
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
      />
    </div>
  );
}

export default ForgotPasswordCard;
