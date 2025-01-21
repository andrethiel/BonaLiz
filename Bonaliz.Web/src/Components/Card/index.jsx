import React from "react";

// import { Container } from './styles';

function Card({ texto, imagem, onClick }) {
  return (
    <div
      className="rounded overflow-hidden shadow-md flex items-center cursor-pointer"
      onClick={onClick}
    >
      {imagem && imagem.length == 0 ? (
        ""
      ) : imagem.length > 1 ? (
        imagem.map((arquivo) => (
          <img className="w-32 object-cover" src={arquivo} />
        ))
      ) : (
        <img className="w-32 object-cover" src={imagem[0].nomeArquivo} />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{texto}</div>
      </div>
    </div>
  );
}

export default Card;
