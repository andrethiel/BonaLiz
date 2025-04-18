"use client";
import React, { useContext, useState } from "react";
import Icones from "../Icons";
import AsideItem from "../AsideItem/aside";
import { MenuContext } from "@/Hooks/Menu";
import { AuthContext } from "@/Hooks/Login";
import { getTenantConfig } from "@/lib/tenantConfig";

function Header() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Inicio");
  const [expandedItems, setExpandedItems] = useState([]);

  const { user, menu } = useContext(MenuContext);
  const { sair } = useContext(AuthContext);

  const config = getTenantConfig();

  const toggleExpandedItem = (id) => {
    setExpandedItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  if (!config) return null;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 md:hidden animate-fade-in"
          onClick={toggleMobileSidebar}
        />
      )}
      <button
        onClick={toggleMobileSidebar}
        className={`fixed top-4 ${
          isMobileOpen ? "left-64" : "left-4"
        }  p-2 rounded-md bg-white border border-border md:hidden aside-transition`}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <Icones name="x" className="h-5 w-5" />
        ) : (
          <Icones name="menu" className="h-5 w-5" />
        )}
      </button>

      <aside
        className={`bg-white fixed top-0 bottom-0 left-0 flex flex-col border-r border-border bg-sidebar shadow-sm transition-all duration-300 ease-in-out w-64 ${
          isMobileOpen
            ? "translate-x-0 w-[calc(100%-14rem)]"
            : "-translate-x-full md:translate-x-0"
        } animate-slide-in-left md:animate-none `}
      >
        <div className="flex items-center justify-center h-40 p-4 border-b border-border">
          <img
            src={config.logoUrl}
            alt="Logo"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menu &&
              menu.map((item, index) => (
                <AsideItem
                  key={index}
                  item={item}
                  isExpanded={isExpanded}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  expandedItems={expandedItems}
                  toggleExpandedItem={toggleExpandedItem}
                />
              ))}
          </ul>
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-sm font-medium">{user.nome}</span>
            </div>
            <div className="ml-3 cursor-pointer">
              <p className="text-sm font-medium">Usuário</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="ml-auto" onClick={() => sair()}>
              <div className="flex flex-col items-center cursor-pointer">
                <Icones name={"log-out"} size={16} />
                <p className="text-xs text-muted-foreground">Sair</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Header;
