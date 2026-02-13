import { FaFacebook, FaKey } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdMail, IoMdPerson } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import UniversalButton from "../components/UniversalButton";
import { useState } from "react";
import axios from "axios";

function RegisterCard() {
  const navigate = useNavigate();

  // State for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false); // For prevention of multiple clicks

  // Handling Logic for  Registration
  const handleRegister = async () => {
    // Validation
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password do not much");
      return;
    }

    try {
      setLoading(true);

      //Send data to the backend
      const response = await axios.post("api/users/register", {
        name, email, password,
      });

      // Success Notification
      alert("Registration successful! Please login.");

    }catch (error: any) {
    console.error("Registration Error.", error);
    alert(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg w-87.5 rounded-[40px] p-10 flex flex-col items-center shadow-lg">
      {/* Toggle Button for Login and Register */}
      <div className="flex bg-gray-300 rounded-full w-full mb-6 overflow-hidden">
        <div
          className="text-txt flex-1 py-2 text-center font-bold opacity-50 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </div>
        <div className="bg-[#4a90e2] text-txt flex-1 py-2 text-center font-bold rounded-[20px]">
          Register
        </div>
      </div>

      {/* Form and Input Fields */}
      <div className="w-full space-y-3">
        <InputField
          icon={<IoMdPerson />}
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <InputField
          icon={<IoMdMail />}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <InputField
          icon={<FaKey />}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <InputField
          icon={<FaKey />}
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button
        onClick={() => navigate("/terms&condition")}
        className="text-black-500 text-[14px] font-semibold self-start mb-6 hover:cursor-pointer mt-2"
      >
        Terms And Condition
      </button>

      {/* Universal Button triggers handleRegister */}
      <UniversalButton
        type="submit"
        content={loading ? "Signing Up..." : "Sign Up"}
        onClick={handleRegister} 
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

export default RegisterCard;
