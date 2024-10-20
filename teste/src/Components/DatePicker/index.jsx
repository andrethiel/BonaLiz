import React from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DataPicker = ({ onChange, value, placeholder }) => {
  return (
    <Datepicker
      inputClassName="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5"
      i18n={"pt"}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      showShortcuts={false}
      asSingle={true}
      useRange={false}
      displayFormat="DD/MM/YYYY"
    />
  );
};

export default DataPicker;
