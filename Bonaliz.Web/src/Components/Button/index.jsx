import { getTenantConfig } from "@/lib/tenantConfig";
import React from "react";

const Button = ({ color, children, onClick, ...res }) => {
  const config = getTenantConfig();

  return (
    <button
      type="button"
      className="w-full font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      style={
        color === "primary"
          ? { backgroundColor: config.corPrimaria }
          : { backgroundColor: config.corSecundaria }
      }
      onClick={onClick}
      {...res}
    >
      {children}
    </button>
  );
};

export default Button;
