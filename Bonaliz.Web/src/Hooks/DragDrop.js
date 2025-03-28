"use client";
import { createContext, useContext, useState } from "react";
import { ProdutoContext } from "./Produto";

export const DragDropContext = createContext(null);

export function DragDropProvider({ children }) {
  const {
    setForm,
    isActive,
    setIsActive,
    files,
    setFiles,
    fileURLs,
    setFileURLs,
  } = useContext(ProdutoContext);

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    setForm((prevForm) => ({
      ...prevForm,
      Arquivo: [...prevForm.Arquivo, ...files],
    }));
    files.forEach((file) => showFile(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsActive(true);
  };

  const handleDragLeave = () => {
    setIsActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setForm((prevForm) => ({
      ...prevForm,
      Arquivo: [...prevForm.Arquivo, ...droppedFiles],
    }));
    droppedFiles.forEach((file) => showFile(file));
  };

  const showFile = (file) => {
    const fileType = file.type;
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];

    if (validExtensions.includes(fileType)) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileURL = fileReader.result;
        setFileURLs((prevURLs) => [...prevURLs, fileURL]);
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("This is not an Image File!");
      setIsActive(false);
      setDragText("Drag & Drop to Upload File");
    }
  };

  function handleRemovePhotoFile(index) {
    setFileURLs((prev) => prev.filter((_, i) => i !== index));

    setForm((prevForm) => ({
      ...prevForm,
      Arquivo: prevForm.Arquivo.filter((_, i) => i !== index),
    }));
  }
  return (
    <DragDropContext.Provider
      value={{
        isActive,
        files,
        fileURLs,
        handleButtonClick,
        handleFileChange,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleRemovePhotoFile,
        setFileURLs,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
}
