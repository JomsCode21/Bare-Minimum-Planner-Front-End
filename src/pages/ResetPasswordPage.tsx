import ResetPasswordCard from "@/utils/ResetPasswordCard";
import logo from "../assets/Logo+tagline.png";
import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("id");

  if (!userId) {
      return <Navigate to="/login" replace />;
  }
  return (
    <div className="bg-linear-to-b from-bg to-primary to-50% h-screen flex flex-col items-center justify-center font-['Poppins']">
      <img src={logo} alt="Bare Minimum Planner Logo" className="" />

      <div className="mb-30 flex flex-col items-center justify-center">
        <ResetPasswordCard userId={userId}/>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
