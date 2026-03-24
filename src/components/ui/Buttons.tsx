import { useNavigate } from "react-router-dom";

export default function LandingPageButton() {
  const navigateLoginButton = useNavigate();

  return (
    <div className="flex w-full justify-center">
      <button
        onClick={() => navigateLoginButton("/login")}
        className="w-full max-w-xs rounded-2xl bg-bg px-6 py-3 text-center text-sm font-semibold shadow-sm transition-colors hover:bg-gray-300 sm:text-base"
      >
        Do Just Enough
      </button>
    </div>
  );
}
