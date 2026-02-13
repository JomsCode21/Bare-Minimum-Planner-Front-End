import UniversalButton from "@/components/UniversalButton";
import { useState } from "react";
import { FaFacebook, FaKey } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdMail } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-bg w-87.5 rounded-[20px] p-8 flex flex-col items-center shadow-lg">
      {/* Toggle Button for Login and Register */}
      <div className="flex bg-gray-300 rounded-full w-full mb-6 overflow-hidden">
        <div className="bg-primary text-txt flex-1 py-2 text-center font-bold rounded-[20px]">
          Login
        </div>
        <div
          className="text-[#333333] flex-1 py-2 text-center font-bold opacity-50"
          onClick={() => navigate("/register")}
        >
          Register
        </div>
      </div>
      {/* Form and Input Fields */}
      <div className="w-full space-y-4">
        <InputField
          icon={<IoMdMail />}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          icon={<FaKey />}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={() => navigate("/forgotpassword")}
        className="text-red-500 text-[14px] font-semibold self-end mt-2 mb-6"
      >
        Forgot Password
      </button>
      <UniversalButton
        content="Login"
        type="submit"
        onClick={() => navigate("/dashboard")}
      />

      <p className="text-sm my-4 font-bold"> --OR--</p>

      {/* For Socials Login Section */}
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
