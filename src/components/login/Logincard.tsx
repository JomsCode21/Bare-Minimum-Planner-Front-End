import axios from "axios"; // Import Axios
import { useState } from "react";
import { FaFacebook, FaKey } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdMail } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../ui/InputField";
import UniversalButton from "../ui/UniversalButton";

import { useAuthStore } from "@/store/authStore";

function LoginCard() {
  const navigate = useNavigate();

  const { login } = useAuthStore();

  // State for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Login Logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);

      // Send Login Request to Backend
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      login(response.data.user);
      toast.success("Login Successful!");
      // Navigate to Dashboard
      navigate("/dashboard");

    } catch (error: unknown) {
      console.error("Login Error:", error);

      if (axios.isAxiosError(error)) {
        // Show specific error from backend
        toast.error(error.response?.data?.message || "Login failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg w-87.5 rounded-[20px] p-8 flex flex-col items-center shadow-lg">
      {/* Toggle Button */}
      <div className="flex bg-gray-300 rounded-full w-full mb-6 overflow-hidden">
        <div className="bg-primary text-txt flex-1 py-2 text-center font-bold rounded-[20px]">
          Login
        </div>
        <div
          className="text-txt flex-1 py-2 text-center font-bold opacity-50 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </div>
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
        <div className="w-full space-y-4">
          <InputField
            icon={<IoMdMail />}
            type="email"
            placeholder="Enter your email"
            value={email}
            name="email"
            id="email"
            autoComplete="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <InputField
            icon={<FaKey />}
            type="password"
            placeholder="Enter your password"
            value={password}
            name="password"
            id="password"
            autoComplete="current-password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <button
          onClick={() => navigate("/forgotpassword")}
          className="text-red-500 text-[14px] font-semibold self-end mt-2 mb-6 hover:underline"
        >
          Forgot Password
        </button>

        {/* Login Button */}
        <UniversalButton
          content={loading ? "Logging in..." : "Login"}
          type="submit"
        />
      </form>

      <p className="text-sm my-4 font-bold"> --OR--</p>

      {/* Socials */}
      <div className="flex space-x-11 text-4xl">
        <button className="hover:opacity-70">
          <FcGoogle />
        </button>
        <button className="hover:opacity-70">
          <FaFacebook />
        </button>
        <button className="hover:opacity-70">
          <SiApple />
        </button>
      </div>
    </div>
  );
}

export default LoginCard;
