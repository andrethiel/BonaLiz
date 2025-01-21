import React from "react";

// import { Container } from './styles';

export default function ImageArquivo({ arquivo, onClick }) {
  console.log(arquivo);
  return (
    <div
      className="flex justify-center items-center"
      onClick={() => onClick(arquivo)}
    >
      <span></span>
      <img src={arquivo} className="h-20" />
    </div>
  );
}
