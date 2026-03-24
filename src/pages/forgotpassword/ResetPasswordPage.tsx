import logo from "@/assets/Logo+tagline.png";
import ResetPasswordCard from "@/components/forgotpassword/ResetPasswordCard";
import { Navigate, useSearchParams } from "react-router-dom";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("id");

  if (!userId) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="min-h-dvh overflow-y-auto bg-linear-to-b from-bg to-primary to-50% font-['Poppins']">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <img
          src={logo}
          alt="Bare Minimum Planner Logo"
          className="w-full max-w-[300px] sm:max-w-[380px] md:max-w-[460px]"
        />
        <ResetPasswordCard userId={userId} />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
