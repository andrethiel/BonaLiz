import React from "react";

// import { Container } from './styles';

function Card({ texto, imagem, onClick }) {
  return (
    <div
      className="rounded overflow-hidden shadow-md flex items-center cursor-pointer"
      onClick={onClick}
    >
      {imagem && (
        <img className="w-32" src={imagem} alt="Sunset in the mountains" />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{texto}</div>
      </div>
    </div>
  );
}

export default Card;
