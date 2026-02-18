import logo from "@/assets/Logo+tagline.png";
import ForgotPasswordCard from "../../components/forgotpassword/ForgotPasswordCard";

function ForgotPasswordPage() {
  return (
    <div className="bg-linear-to-b from-bg to-primary to-50% h-screen flex flex-col items-center justify-center font-['Poppins']">
      <img src={logo} alt="Bare Minimum Planner Logo" className="" />

      <div className="mb-30 flex flex-col items-center justify-center">
        <ForgotPasswordCard />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
