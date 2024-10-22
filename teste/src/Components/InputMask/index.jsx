import React from "react";
import Icons from "../Icons";
import { IMaskInput } from "react-imask";

const MaskInput = ({ icon, mask, placeholder, onChange, value, name, id }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <Icons icon={icon} />
      </div>

      <IMaskInput
        name={name}
        id={id}
        mask={mask}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default MaskInput;
