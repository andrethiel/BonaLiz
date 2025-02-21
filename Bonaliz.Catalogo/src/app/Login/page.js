import React from "react";

// import { Container } from './styles';

function Cadastrar() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="h-20 w-20 flex flex-col border-2">
        <input placeholder="telefone" />
        <input placeholder="Nome" />
        <button>Entrar</button>
      </div>
    </div>
  );
}

export default Cadastrar;
