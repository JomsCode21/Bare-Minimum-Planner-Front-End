import logo from "@/assets/Logo+tagline.png";
import ForgotPasswordCard from "../../components/forgotpassword/ForgotPasswordCard";

function ForgotPasswordPage() {
  return (
    <div className="min-h-dvh overflow-y-auto bg-linear-to-b from-bg to-primary to-50% font-['Poppins']">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <img
          src={logo}
          alt="Bare Minimum Planner Logo"
          className="w-full max-w-[300px] sm:max-w-[380px] md:max-w-[460px]"
        />
        <ForgotPasswordCard />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
