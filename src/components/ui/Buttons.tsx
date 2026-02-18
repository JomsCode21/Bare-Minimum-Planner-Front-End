import { useNavigate } from "react-router-dom";

export default function LandingPageButton() {
    const navigateLoginButton = useNavigate();
    return (
        <div>
            <button onClick={() => navigateLoginButton("/login")} className="bg-bg w-60 h-12 rounded-2xl mt-40 p-3 text-center hover:bg-gray-400 transition-colors">
                <h3>Do Just Enough</h3>
            </button>
        </div>
    );
}