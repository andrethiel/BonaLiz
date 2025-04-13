"use client";
import { ListarMenu } from "@/Api/Controllers/Menu";
import { createContext, useEffect, useState } from "react";

export const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nome = localStorage.getItem("nome");
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");

      setUser({ nome, email, role });

      if (role) {
        criarMenu(role);
      }
    }
  }, []);

  async function criarMenu(role) {
    const response = await ListarMenu(role);
    if (response.success) {
      setMenu(response.data);
    }
  }

  return (
    <MenuContext.Provider value={{ menu, user }}>
      {children}
    </MenuContext.Provider>
  );
}
