import React from "react";

// import { Container } from './styles';

export default function ImageArquivo({ arquivo, onClick }) {
  return (
    <div className="py-4 relative text-gray-800 rounded-full">
      <span
        class="absolute inset-0 object-left-top -mr-6 cursor-pointer"
        onClick={() => onClick(arquivo)}
      >
        <div class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
          X
        </div>
      </span>
      <img
        src={arquivo}
        className="w-[150px] h-[150px] object-cover rounded-md"
      />
    </div>
  );
}
