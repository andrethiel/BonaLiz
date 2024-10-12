import React from "react";
import { IconBaseProps } from "react-icons";
import Icons from "../Icons";
import Link from "next/link";

declare interface ButtonProp {
  children: string;
  icon: IconBaseProps;
  href: string;
}

export default function AsideItem(prosp: ButtonProp) {
  return (
    <Link
      href={`${prosp.href}`}
      className="w-full flex gap-4 items-center py-3 px-6 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
    >
      <Icons icon={prosp.icon} />
      <span className="mx-1 font-medium">{prosp.children}</span>
    </Link>
  );
}
