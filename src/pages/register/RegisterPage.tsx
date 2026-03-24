import RegisterCard from "@/components/register/RegisterCard";
import logo from "@/assets/Logo+tagline.png";

function RegisterPage() {
  return (
    <div className="min-h-dvh overflow-y-auto bg-linear-to-b from-bg to-primary to-50% font-['Poppins']">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <img
          src={logo}
          alt="Bare Minimum Planner Logo"
          className="h-auto w-auto max-h-full max-w-full object-contain sm:max-h-full sm:max-w-full"
        />
        <RegisterCard />
      </div>
    </div>
  );
}

export default RegisterPage;
