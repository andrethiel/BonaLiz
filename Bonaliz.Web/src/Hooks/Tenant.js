"use client";
import { ObterTenant } from "@/Api/Controllers/Tenant";
import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalState";
import { setTenantConfig } from "@/lib/tenantConfig";
import { usePathname } from "next/navigation";

const TenantConfigContext = createContext(null);

export function TenantConfigProvider({ children }) {
  const { setIsLoading, alert, setAlert } = useContext(GlobalContext);
  const [config, setConfig] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/pages/Adm") {
      Listar();
    }
  }, []);

  async function Listar() {
    try {
      const response = await ObterTenant();
      if (response.success) {
        setTenantConfig(response.data);
        setConfig(response.data);
      }
    } catch (e) {
      setAlert({
        ...alert,
        type: "Danger",
        message: JSON.parse(e.request.response).message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TenantConfigContext.Provider value={{ config }}>
      {children}
    </TenantConfigContext.Provider>
  );
}
