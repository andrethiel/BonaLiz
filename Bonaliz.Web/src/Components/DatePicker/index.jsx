import React from "react";
import Icones from "../Icons";
import Datepicker from "tailwind-datepicker-react";
import Input from "../Input";

const options = {
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  todayBtnText: "Hoje",
  clearBtnText: "Limpar",
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <Icones icon={"chevron-left"} size={18} />,
    next: () => <Icones icon={"chevron-right"} size={18} />,
  },
  datepickerClassNames: "top-12",
  language: "br",
  disabledDates: [],
  weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Selecione uma data",
  inputDateFormatProp: {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  },
  autoSelectToday: false,
};

const DataPicker = ({
  onChange,
  value,
  show,
  setIsOpen,
  icon,
  onFocus,
  ...res
}) => {
  return (
    <div>
      <Datepicker
        options={options}
        onChange={onChange}
        show={show}
        setShow={setIsOpen}
      >
        <Input
          placeholder={"Selecione uma data"}
          icon={"calendar"}
          name={"DataCompra"}
          id={"DataCompra"}
          value={value}
          onFocus={onFocus}
          readOnly
        />
      </Datepicker>
    </div>
  );
};

export default DataPicker;
