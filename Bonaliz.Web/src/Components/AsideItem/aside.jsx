import React from "react";
import Icones from "../Icons";
import { cn } from "@/Utils/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import { Container } from './styles';

function AsideItem({
  item,
  isExpanded,
  activeItem,
  setActiveItem,
  expandedItems,
  toggleExpandedItem,
}) {
  const isExpendedItem = expandedItems.includes(item.id);
  const hasChildren = item.subItems && item.subItems.length > 0;
  const isActive = activeItem === item.id;
  const router = useRouter();

  const handleClick = () => {
    if (item.id == "Inicio") {
      router.replace(item.href);
      return;
    }
    if (hasChildren) {
      toggleExpandedItem(item.id);
    } else {
      setActiveItem(item.id);
    }
  };
  return (
    <li className="mb-1">
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center w-full bg-white px-3 py-2 text-sm transition-colors rounded-md aside-transition",
          isActive && !hasChildren && "bg-accent text-accent-foreground"
        )}
      >
        <Icones
          name={item.icon}
          className={cn("h-4 w-4 mr-2 shrink-0", isExpanded ? "" : "mx-auto")}
        />
        <span className="flex-grow text-left">{item.label}</span>
        {hasChildren && (
          <div className="ml-auto">
            {isExpendedItem ? (
              <Icones name={"chevron-down"} className="h-4 w-4" />
            ) : (
              <Icones name={"chevron-right"} className="h-4 w-4" />
            )}
          </div>
        )}
      </button>
      {hasChildren && isExpendedItem && isExpanded && (
        <ul className="pl-6 mt-1 space-y-1">
          {item.subItems.map((child, index) => (
            <li key={index}>
              <button
                onClick={() => router.replace(child.href)}
                className={`flex items-center w-full px-4 py-2 text-sm transition-colors rounded-md aside-transition cursor-pointer
                  ${
                    activeItem === child.id &&
                    "bg-accent text-accent-foreground"
                  }`}
              >
                <Icones name={child.icon} className="h-4 w-4 mr-2 shrink-0" />
                <span>{child.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default AsideItem;
