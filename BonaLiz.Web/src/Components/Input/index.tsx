import React from "react";
import Icons from "../Icons";

const Input: React.FC<InputProps> = ({
  icon,
  placeholder,
  onChange,
  value,
  name,
  id,
}) => {
  return (
    <div className="relative mb-6 w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <Icons icon={icon} />
      </div>
      <input
        name={name}
        id={id}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
