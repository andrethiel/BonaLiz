import React from "react";

// import { Container } from './styles';

const Button = ({ color, children, onClick, ...res }) => {
  return (
    <button
      type="button"
      className={`${
        color == "primary" ? "bg-primery" : "bg-secondary"
      } w-full font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
      onClick={onClick}
      {...res}
    >
      {children}
    </button>
  );
};

export default Button;
