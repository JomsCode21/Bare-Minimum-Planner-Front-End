import LoginCard from "@/components/login/Logincard";
import logo from "@/assets/Logo+tagline.png";

function LoginPage() {
  return (
    <div className="min-h-dvh overflow-y-auto bg-linear-to-b from-bg to-primary to-50% font-['Poppins']">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-6">
        <img
          src={logo}
          alt="Bare Minimum Planner Logo"
          className="h-auto w-auto max-h-full max-w-full object-contain sm:max-h-full sm:max-w-full"
        />
        <LoginCard />
      </div>
    </div>
  );
}

export default LoginPage;
