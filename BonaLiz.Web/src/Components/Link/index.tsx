import Link from "next/link";
import React from "react";

// import { Container } from './styles';

const Linked: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className=" bg-primery font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {children}
    </Link>
  );
};

export default Linked;
