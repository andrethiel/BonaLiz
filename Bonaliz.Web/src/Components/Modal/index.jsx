"use client";
import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Input from "../Input";
import Button from "../Button";
import Select2 from "../Select2";
import { SelectListClientes } from "@/Hooks/ClienteSelect";

function Modal({ onClick, open, close, form, setForm }) {
  const { selectClientes } = SelectListClientes(open);

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[300]">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-2xl font-semibold">Realizar venda</h3>
                  <div className="mt-2">
                    <div className="flex flex-col gap-5">
                      <Select2
                        placeholder={"Digite o nome do cliente"}
                        data={selectClientes}
                        onChange={(e) =>
                          setForm({ ...form, ClienteId: e.value })
                        }
                      />
                      <Input
                        icon={<FaCartPlus />}
                        placeholder={"Quantidade"}
                        type={"number"}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            Quantidade: e.target.value,
                          })
                        }
                      />
                      <Button color={"primary"} onClick={onClick}>
                        Vender
                      </Button>
                      <Button color={"secondary"} onClick={close}>
                        Voltar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
