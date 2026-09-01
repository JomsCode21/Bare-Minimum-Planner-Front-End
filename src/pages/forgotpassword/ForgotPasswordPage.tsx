import logo from "@/assets/Logo+tagline.png";
import ForgotPasswordCard from "../../components/forgotpassword/ForgotPasswordCard";

function ForgotPasswordPage() {
  return (
    <div className="min-h-dvh overflow-y-auto bg-linear-to-b from-bg to-primary to-50% font-['Poppins']">
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col items-center justify-center gap-4 px-4 py-6 sm:gap-5 sm:px-6 sm:py-8">
        <img
          src={logo}
          alt="Bare Minimum Planner Logo"
          className="w-full max-w-45 sm:max-w-55 md:max-w-60"
        />
        <ForgotPasswordCard />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
