"use client";
import React from "react";
import Icones from "../Icons";

const Select = ({ icon, onChange, value, placeholder, data, name, id }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <Icones
          icon={icon}
          size={18}
          className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
          color={"gray"}
        />
      </div>
      <select
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2.5"
        onChange={onChange}
        value={value}
      >
        <option value={""}>{placeholder}</option>
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
