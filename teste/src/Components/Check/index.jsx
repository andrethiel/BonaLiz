import React from "react";

function Check({ children, onChange, value }) {
  return (
    <div className="flex items-center ps-4 bg-gray-50 border border-gray-300 p-2.5 rounded-lg">
      <input className="" type="checkbox" onChange={onChange} checked={value} />
      <label className="ms-2 text-sm font-medium">{children}</label>
    </div>
  );
}

export default Check;
