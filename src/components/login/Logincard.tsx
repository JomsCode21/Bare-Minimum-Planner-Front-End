import { isAxiosError } from "axios";
import React, { useState } from "react";
import { FaFacebook, FaKey } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdMail } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../ui/InputField";
import UniversalButton from "../ui/UniversalButton";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";

import { useAuthStore } from "@/store/authStore";
import { login as loginApi, googleLogin as googleLoginApi } from "@/api/auth";

function LoginCard() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // State for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Tracks successful login

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
      const response = await loginApi(email, password);

      // Save user to Zustand store
      login(response.data.user);
      
      // Trigger success states!
      setSuccess(true);
      toast.success("Welcome back! Let's do the bare minimum.");

      // Wait 1 second so the user can see the "Success" button before teleporting
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000); 

    } catch (error: unknown) {
      console.error("Login Error:", error);
      setLoading(false); // Only stop loading if there's an error (if success, keep it locked)

      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } 
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        // Send the Google access token to your backend
        const response = await googleLoginApi(tokenResponse.access_token);
        
        // Save user to Zustand store
        login(response.data.user);
        
        // Trigger success states
        setSuccess(true);
        toast.success("Welcome back via Google!");

        // Wait 1 second before navigating
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000); 
      } catch (error) {
        console.error("Google Login Error:", error);
        setLoading(false);
        toast.error("Failed to authenticate with Google.");
      }
    },
    onError: () => {
      toast.error("Google login was canceled or failed.");
    }
  });

  return (
    <div className="bg-bg w-87.5 rounded-[20px] p-8 flex flex-col items-center shadow-lg">
      
      {/* Toggle Button (Sliding Animation) */}
      <div className="relative flex bg-gray-300 rounded-full w-full mb-6 p-1 shadow-inner h-11">
        {/* The Sliding Background Pill */}
        <motion.div
          initial={{ x: "100%" }} // Fakes coming from the Register side (right)
          animate={{ x: 0 }}      // Slides perfectly into the Login side (left)
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-primary rounded-full shadow-md"
        />

        {/* Login Text (Active) */}
        <div className="relative z-10 flex-1 flex items-center justify-center text-txt font-bold cursor-default">
          Login
        </div>
        
        {/* Register Text (Inactive) */}
        <div
          className="relative z-10 flex-1 flex items-center justify-center text-txt opacity-50 font-bold cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/register")}
        >
          Register
        </div>
      </div>

      {/* Form Inputs */}
      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col items-center"
      >
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
          type="button" 
          onClick={() => navigate("/forgotpassword")}
          disabled={loading || success}
          className="text-red-500 text-[14px] cursor-pointer font-semibold self-end mt-2 mb-6 hover:underline"
        >
          Forgot Password
        </button>

        {/* Login Button */}
        <UniversalButton
          // Shows a simple success message upon logging in
          content={success ? "Login Successful!" : loading ? "Logging in..." : "Login"}
          type="submit"
          disabled={loading || success} 
        />
      </form>

      <p className="text-sm my-4 font-bold"> --OR--</p>

      {/* Socials */}
      <div className="flex space-x-11 text-4xl">
        <button className="hover:opacity-70 disabled:opacity-50" 
          disabled={loading || success} onClick={() => handleGoogleLogin()}>
          <FcGoogle />
        </button>
        <button className="hover:opacity-70 disabled:opacity-50" disabled={loading || success}>
          <FaFacebook />
        </button>
        <button className="hover:opacity-70 disabled:opacity-50" disabled={loading || success}>
          <SiApple />
        </button>
      </div>
    </div>
  );
}

export default LoginCard;