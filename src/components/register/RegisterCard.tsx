import InputField from "@/components/ui/InputField";
import axios from "axios";
import { useState } from "react";
import { FaFacebook, FaKey } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdMail, IoMdPerson } from "react-icons/io";
import { SiApple } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UniversalButton from "../ui/UniversalButton";

function RegisterCard() {
  const navigate = useNavigate();

  // State for input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // For prevention of multiple clicks

  // State for terms and condition
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // State for chicking if email is existing
  const [emailError, setEmailError] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // Email checking function
  const handleBlur = async () => {
    if (!email) return;
    if (!email.includes("@")) {
      setEmailError("Invalid email format.");
      return;
    }

    try {
      setIsCheckingEmail(true);
      const response = await axios.post("/api/users/check-email", { email });

      if (response.data.exists) {
        setEmailError("This email is already used.");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error("Email check failed:", error);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Handling Logic for  Registration
  const handleRegister = async () => {
    // Validation
    if (!name || !email || !password) {
      toast.warn("Please fill in all fields.");
      return;
    }

    if (!agreedToTerms) {
      toast.warning("You must agree to the Terms and Condition");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Password do not match");
      return;
    }

    try {
      setLoading(true);

      //Send data to the backend
      await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      // Success Notification
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed.");
        console.log(name, email, password);
      } else {
        toast.error("An unexpected error occured.");
      }
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
          name="name"
          id="name"
          autoComplete="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <InputField
          icon={<IoMdMail />}
          type="email"
          placeholder="Enter your email"
          value={email}
          name="email"
          id="email"
          autoComplete="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          onBlur={handleBlur}
        />

        {/* Loading Spinner for Email */}
        {isCheckingEmail && !password && (
          <p className="text-xs text-gray-500 text-left mt-1">
            Checking availability...
          </p>
        )}
        {/* Error Message */}
        {emailError && (
          <p className="text-xs text-red-500 font-bold text-left mt-1">
            ✗ {emailError}
          </p>
        )}

        <InputField
          icon={<FaKey />}
          type="password"
          placeholder="Enter your password"
          value={password}
          name="password"
          id="password"
          autoComplete="new-password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        {/* For Visual Password Validation */}
        {password && !confirmPassword && (
          <div className="text-xs text-left mt-2 ml-1 space-y-1 bg-gray-100 p-3 rounded-md border border-gray-200 transition-all duration-300 ease-in-out">
            <p className="font-bold text-gray-500 mb-2">Password Strength:</p>

            <div
              className={`flex items-center gap-2 ${password.length >= 8 ? "text-green-600 font-bold" : "text-gray-400"}`}
            >
              <span>{password.length >= 8 ? "✓" : "○"}</span> At least 8
              characters
            </div>

            <div
              className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? "text-green-600 font-bold" : "text-gray-400"}`}
            >
              <span>{/[A-Z]/.test(password) ? "✓" : "○"}</span> 1 Uppercase
              letter
            </div>

            <div
              className={`flex items-center gap-2 ${/[a-z]/.test(password) ? "text-green-600 font-bold" : "text-gray-400"}`}
            >
              <span>{/[a-z]/.test(password) ? "✓" : "○"}</span> 1 Lowercase
              letter
            </div>

            <div
              className={`flex items-center gap-2 ${/[0-9]/.test(password) ? "text-green-600 font-bold" : "text-gray-400"}`}
            >
              <span>{/[0-9]/.test(password) ? "✓" : "○"}</span> 1 Number
            </div>

            <div
              className={`flex items-center gap-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-600 font-bold" : "text-gray-400"}`}
            >
              <span>{/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "✓" : "○"}</span>{" "}
              1 Special Character
            </div>
          </div>
        )}

        <InputField
          icon={<FaKey />}
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          name="confirmPassword"
          id="confirmPassword"
          autoComplete="new-password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />

        {/* Checking if the password is match */}
        {confirmPassword && (
          <div
            className={`text-xs text-left mt-2 ml-1 font-bold flex items-center gap-2 
                ${password === confirmPassword ? "text-green-600" : "text-red-500"}`}
          >
            {password === confirmPassword ? (
              <>
                <span>✓</span> Passwords match!
              </>
            ) : (
              <>
                <span>✗</span> Passwords do not match
              </>
            )}
          </div>
        )}
      </div>

      <div className="w-full flex items-start gap-2 mb-6 px-1">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAgreedToTerms(e.target.checked)
          }
          className="mt-1 cursor-pointer accent-primary w-4 h-4"
        />{" "}
        <label
          htmlFor="terms"
          className="text-xs text-left text-txt/80 cursor-pointer select-none"
        >
          I agree to the{" "}
          <span className="text-primary font-bold hover:underline">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="text-primary font-bold hover:underline">
            Privacy Policy
          </span>
          .
        </label>
      </div>

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
