import LandingPageButton from "@/components/ui/Buttons";
import logo from "../assets/Logo+tagline.png";

function LandingPage() {
  return (
    <div className="min-h-dvh bg-linear-to-b from-bg to-primary to-50% font-['Poppins']">
      <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 py-6 text-center sm:px-6 sm:py-8">
        <img
          src={logo}
          alt="Bare Minimum Planner Logo"
          className="w-full max-w-70 sm:max-w-[320px] md:max-w-90 lg:max-w-95"
        />
        <LandingPageButton />
      </div>
    </div>
  );
}

export default LandingPage;
