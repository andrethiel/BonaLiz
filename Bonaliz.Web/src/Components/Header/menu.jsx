"use client";
import React, { useState } from "react";
import Icones from "../Icons";
import { MenuItens } from "@/constants/menu";
import AsideItem from "../AsideItem/aside";

function Header() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedItems, setExpandedItems] = useState([]);

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

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden animate-fade-in"
          onClick={toggleMobileSidebar}
        />
      )}
      <button
        onClick={toggleMobileSidebar}
        className={`fixed top-4 ${
          isMobileOpen ? "left-64" : "left-4"
        }  z-50 p-2 rounded-md bg-white border border-border md:hidden aside-transition`}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <Icones name="x" className="h-5 w-5" />
        ) : (
          <Icones name="menu" className="h-5 w-5" />
        )}
      </button>

      <aside
        className={`bg-white fixed top-0 bottom-0 left-0 z-40 flex flex-col border-r border-border bg-sidebar shadow-sm transition-all duration-300 ease-in-out w-64 ${
          isMobileOpen
            ? "translate-x-0 w-[calc(100%-14rem)]"
            : "-translate-x-full md:translate-x-0"
        } animate-slide-in-left md:animate-none `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <span className="text-lg font-semibold truncate">App Name</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {MenuItens.map((item, index) => (
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
          {isExpanded ? (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-sm font-medium">AU</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Usuário</p>
                <p className="text-xs text-muted-foreground">
                  admin@exemplo.com
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-sm font-medium">AU</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Header;
