import React from "react";
import Select from "react-select";

function Select2({ name, id, onChange, data, placeholder, value, icon }) {
  return (
    <Select
      options={data}
      placeholder={<div>{placeholder}</div>}
      onChange={onChange}
      value={value}
      name={name}
      id={id}
    />
  );
}

export default Select2;
