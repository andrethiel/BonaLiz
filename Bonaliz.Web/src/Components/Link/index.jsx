import { getTenantConfig } from "@/lib/tenantConfig";
import Link from "next/link";
import React from "react";

// import { Container } from './styles';

const Linked = ({ href, children }) => {
  const config = getTenantConfig();
  return (
    <Link
      href={href}
      className="font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      style={{ backgroundColor: config.corPrimaria }}
    >
      {children}
    </Link>
  );
};

export default Linked;
