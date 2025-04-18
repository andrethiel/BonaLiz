import React from "react";

const Input = ({
  icon,
  placeholder,
  onChange,
  value,
  name,
  id,
  disabled,
  type,
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        {icon && icon}
      </div>
      <input
        disabled={disabled}
        name={name}
        id={id}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5"
        onChange={onChange}
        value={value}
        type={type}
      />
    </div>
  );
};

export default Input;
