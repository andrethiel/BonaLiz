import React from "react";
import Icones from "../Icons";
import Link from "next/link";

export default function AsideItem({
  href,
  children,
  icon,
  colorIcon,
  sizeIcon,
}) {
  return (
    <Link
      href={`${href}`}
      className="w-full flex gap-4 items-center pl-6 md:pl-0 lg:pl-0 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 hover:rounded-md focus:outline-none"
    >
      <Icones icon={icon} color={colorIcon} size={sizeIcon} />
      <span className="mx-1 font-medium text-lg">{children}</span>
    </Link>
  );
}
