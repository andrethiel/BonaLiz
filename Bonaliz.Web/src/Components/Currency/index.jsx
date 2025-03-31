import React from "react";
import Icones from "../Icons";
import { CurrencyInput } from "react-currency-mask";

// import { Container } from './styles';

function InputMoney({ icon, placeholder, onChange, value, name, id, onBlur }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <Icones
          icon={icon}
          size={18}
          className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
          color={"gray"}
        />
      </div>

      <CurrencyInput
        name={name}
        id={id}
        placeholder={placeholder}
        className="border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2"
        onChangeValue={onChange}
        value={value}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputMoney;
