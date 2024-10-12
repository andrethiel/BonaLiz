import { InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";

declare interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  icon: IconBaseProps;
  mask: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void | undefined;
  value: string | number;
  name: string;
  id: string;
}
