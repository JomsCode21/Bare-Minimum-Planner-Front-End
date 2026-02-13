import RegisterCard from "@/utils/RegisterCard";
import logo from "../assets/Logo+tagline.png";

function RegisterPage() {
  return (
    <div className="bg-linear-to-b from-bg to-primary to-50% h-screen flex flex-col items-center justify-center font-['Poppins']">
      <div>
        <img src={logo} alt="Bare Minimum Planner Logo" className="mb-10" />
      </div>
      <RegisterCard />
    </div>
  );
}

export default RegisterPage;
