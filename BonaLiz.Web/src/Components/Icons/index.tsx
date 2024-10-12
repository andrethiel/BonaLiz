import React from "react";
import { IconBaseProps } from "react-icons";

declare interface IconsProps {
  icon: IconBaseProps;
}

export default function Icons(props: IconsProps) {
  return <>{props.icon}</>;
}
