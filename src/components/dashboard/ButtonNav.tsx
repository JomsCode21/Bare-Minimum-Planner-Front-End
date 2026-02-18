import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { ImExit } from "react-icons/im";

function ButtomNav() {
    const navigate = useNavigate();

    return(
        <div className="relative buttom-0 w-full">
            <svg 
              viewBox="0 0 375 80" 
              className="w-full h-24 drop-shadow-lg" 
              preserveAspectRatio="none"
            >
              {/* This path draws the curve/triangle shape */}
              <path d="M0,80 L0,40 Q187.5,0 375,40 L375,80 Z" fill="#F5F5F5" />
            </svg>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-end justify-center pb-6 space-x-12">
                <button className="bg-primary text-white p-3 rounded-xl shadow-md hover:scale-110 transition-transform">
                    <FaPlus/>
                </button>
                <button className="bg-[#EF4444] text-txt p-3 rounded-xl shadow-md hover:scale-110 transition-transform" onClick={() => navigate("/login")}>
                    <ImExit/>
                </button>
            </div>
        </div>
    );
}

export default ButtomNav;