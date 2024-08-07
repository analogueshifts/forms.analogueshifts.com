"use client";
import { useState } from "react";

interface FormInputProps {
  label: string;
  value: string;
  type: string;
  placeholder: string;
  icon: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  icon,
  value,
  type,
  placeholder,
  onChange,
}) => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordType = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div className="w-full pb-5 flex flex-col gap-2.5">
      <p className="text-base font-normal text-content-grayText">{label}</p>
      <div className={`w-full relative flex items-center h-12`}>
        <i
          className={
            "absolute left-5  text-base text-content-grayText w-8 " + icon
          }
        ></i>

        <input
          className={`password-input w-full rounded-2xl bg-white border border-black/10 outline-1 outline-background-lightYellow h-full pl-12  text-base font-normal text-gray-400 ${
            type === "password" ? "pr-10" : "pr-4"
          }`}
          placeholder={placeholder}
          value={value}
          type={type === "password" ? passwordType : type}
          onChange={onChange}
          required
        />
        {type === "password" && (
          <button
            onClick={togglePasswordType}
            type="button"
            className="w-[40px] absolute right-2 flex justify-center text-gray-400"
          >
            <i
              className={`fa-solid ${
                passwordType === "password" ? "fa-eye-slash" : "fa-eye"
              }`}
            ></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
