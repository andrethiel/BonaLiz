import React from "react";
import { Calendar } from "../ui/calendar";
import Icones from "../Icons";
import { meses } from "@/constants/calendario";
import { ptBR } from "date-fns/locale";

const DataPicker = ({
  onChange,
  value,
  valueInput,
  isOpen,
  setIsOpen,
  icon,
  ...res
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <Icones
          icon={icon}
          size={18}
          className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
          color={"gray"}
        />
      </div>
      <input
        type="text"
        readOnly
        value={valueInput}
        placeholder="Selecione uma data"
        className="border border-gray-300 text-sm rounded-lg block w-full ps-10 p-2"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg z-10">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(newDate) => {
              onChange(newDate);
              setIsOpen(false);
            }}
            captionLayout="dropdown-years"
            locale={ptBR}
            {...res}
          />
        </div>
      )}
    </div>
  );
};

export default DataPicker;
