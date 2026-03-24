import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import type { InputFieldProps } from "@/types/ui";

const InputField: React.FC<InputFieldProps> = ({
  icon,
  type = "text",
  placeholder,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex w-full items-center rounded-full border border-black/10 bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">
      {icon && <span className="mr-2 shrink-0 text-base sm:text-lg">{icon}</span>}
      <input
        type={inputType}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-base outline-none sm:text-sm"
        {...rest}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-3 shrink-0 cursor-pointer text-base sm:text-lg"
        >
          {showPassword ? (
            <AiFillEye size={18} />
          ) : (
            <AiFillEyeInvisible size={18} />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;
