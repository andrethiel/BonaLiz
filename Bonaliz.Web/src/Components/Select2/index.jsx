import React from "react";
import Select from "react-select";

function Select2({ onChange, data, placeholder, value }) {
  return (
    <Select
      options={data}
      placeholder={<div>{placeholder}</div>}
      onChange={onChange}
      value={value}
    />
  );
}

export default Select2;
