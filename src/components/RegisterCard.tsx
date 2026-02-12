import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import { IoMdPerson } from "react-icons/io";
import { IoMdMail,  } from "react-icons/io";
import { FaKey, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import UniversalButton from "./UniversalButton";

function RegisterCard() {
    const navigate = useNavigate();
    return (
        <div className="bg-[#f5f5f5] w-87.5 rounded-[40px] p-10 flex flex-col items-center shadow-lg">

            {/* Toggle Button for Login and Register */}
            <div className="flex bg-gray-300 rounded-full w-full mb-6 overflow-hidden">
                <div className="text-[#333333] flex-1 py-2 text-center font-bold opacity-50" onClick={() => navigate("/login")}>Login</div>
                <div className="bg-[#4a90e2] text-[#333333] flex-1 py-2 text-center font-bold rounded-[20px]" >Register</div>
            </div>

            {/* Form and Input Fields */}
            <div className="w-full">
               <InputField icon={<IoMdPerson/>} type="text" placeholder="Enter your name" />
               <InputField icon={<IoMdMail/>} type="email" placeholder="Enter your email" />
               <InputField icon={<FaKey/>} type="password" placeholder="Enter your password" />
               <InputField icon={<FaKey/>} type="password" placeholder="Confirm your password" />
            </div>
            <button onClick={() => navigate("/terms&condition")} className="text-black-500 text-[14px] font-semibold self-start mb-6">Terms And Condition</button>
            <UniversalButton type="submit" content="Sign Up" onClick={() => navigate("/login")}/>

            <p className="text-sm my-4 font-bold"> --OR--</p>

            {/* For Socials Login Section */}
            <div className="flex space-x-11 text-4xl">
                <button className="hover:opacity-70"><FcGoogle/></button>
                <button className="hover:opacity-70"><FaFacebook/></button>
                <button className="hover:opacity-70"><SiApple/></button>
            </div>
        </div>

        
    );
}

export default RegisterCard;