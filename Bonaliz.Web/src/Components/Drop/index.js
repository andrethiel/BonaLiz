import Image from "next/image";
import React, { useContext, useState } from "react";
import Icones from "../Icons";
import Button from "../Button";
import { DragDropContext } from "@/Hooks/DragDrop";
import ImageArquivo from "../Image";
import { ProdutoContext } from "@/Hooks/Produto";

// import { Container } from './styles';

function Drop() {
  const {
    handleButtonClick,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemovePhotoFile,
  } = useContext(DragDropContext);

  const { isActive, fileURLs } = useContext(ProdutoContext);

  return (
    <div
      className={`w-full flex flex-col items-center justify-center border-2 ${
        isActive ? "border-gray-500" : "border-dashed border-gray-500"
      } rounded-md transition-all duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="p-4">
          <Icones icon={"circle-plus"} size={50} color={"gray"} />
        </div>
        <header className="text-center text-[30px] font-medium text-gray-500">
          Arraste e sorte imagens
        </header>
        <div className="py-4">
          <button
            className="px-6 py-2 text-[16px] bg-primery font-medium rounded-md cursor-pointer"
            onClick={handleButtonClick}
          >
            Browse File
          </button>
        </div>
      </div>
      <input
        id="fileInput"
        type="file"
        hidden
        multiple
        onChange={handleFileChange}
      />
      {fileURLs.length > 0 && (
        <div className="relative flex flex-wrap gap-4 p-8">
          {fileURLs.map((fileURL, index) => (
            <ImageArquivo
              key={index}
              arquivo={fileURL}
              onClick={() => handleRemovePhotoFile(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Drop;
