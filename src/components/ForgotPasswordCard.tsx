import InputField from "./InputField";
import { IoMdMail,  } from "react-icons/io";
import UniversalButton from "./UniversalButton";
import { useNavigate } from "react-router-dom";

function ForgotPasswordCard() {
    const navigate = useNavigate();
    return(
        <div className="bg-bg w-87.5 rounded-[20px] p-8 flex flex-col items-center shadow-lg text-center">
            <h3 className="font-bold text-txt text-[16.4px] mb-4">"It happens. Let's get you back in."</h3>
            <p className="text-xl mb-8 font-extrabold">¯\_(ツ)_/¯</p>

            <div className="w-full mb-8">
                <InputField type="email" icon={<IoMdMail/>} placeholder="Enter your email"/>
            </div>
            <UniversalButton type="submit" content="Send Email" onClick={() => navigate("/resetpassword")}/>
        </div>
    );
}

export default ForgotPasswordCard;