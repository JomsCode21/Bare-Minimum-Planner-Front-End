import LandingPageButton from "@/components/ui/Buttons";
import logo from "../assets/Logo+tagline.png";

function LandingPage() {
  return (
    <div className="min-h-dvh bg-linear-to-b from-bg to-primary to-50% font-['Poppins']">
      <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center gap-8 px-4 py-8 text-center sm:px-6 sm:py-10">
        <img
          src={logo}
          alt="Bare Minimum Planner Logo"
          className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px]"
        />
        <LandingPageButton />
      </div>
    </div>
  );
}

export default LandingPage;
