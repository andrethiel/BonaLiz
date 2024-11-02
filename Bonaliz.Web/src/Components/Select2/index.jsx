import React from "react";
import Select from "react-select";

function Select2({ onChange, data, placeholder }) {
  return (
    <Select
      options={data}
      placeholder={<div>{placeholder}</div>}
      onChange={onChange}
    />
  );
}

export default Select2;
