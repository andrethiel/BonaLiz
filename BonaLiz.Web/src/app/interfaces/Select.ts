import { ChangeEvent, InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";

declare interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  placeholder: string;
  icon: IconBaseProps;
  data: [];
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
  value: string | number;
  name: string;
  id: string;
}
