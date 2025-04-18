import React from "react";

// import { Container } from './styles';

const Button = ({ color, children, onClick, disabled }) => {
  return (
    <button
      className={`${
        color == "primary" ? "bg-primery" : "bg-secondary"
      } w-full flex font-medium rounded-lg text-sm px-5 py-2.5 mb-2 justify-center`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
