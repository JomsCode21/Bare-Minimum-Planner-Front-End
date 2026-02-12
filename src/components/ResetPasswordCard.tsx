import { useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa6";
import InputField from "./InputField";
import UniversalButton from "./UniversalButton";

function ResetPasswordCard() {
    const navigate = useNavigate();
    return (
        <div className="bg-bg w-87.5 rounded-[20px] p-8 flex flex-col items-center shadow-lg text-center">
            <h3 className="font-bold text-[#333333] text-[16.4px] mb-4">"It happens. Let's get you back in."</h3>
            <p className="text-xl mb-8 font-extrabold">¯\_(ツ)_/¯</p>

            <InputField icon={<FaKey/>} type="password" placeholder="Enter your new password"/>
            <InputField icon={<FaKey/>} type="password" placeholder="Confirm your new password"/>
            <UniversalButton type="submit" content="Reset Password" onClick={() => navigate("/login")}/>
        </div>
        
    );
}

export default ResetPasswordCard;