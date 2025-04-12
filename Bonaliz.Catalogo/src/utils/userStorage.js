export function loadUserFromStorage(setUser) {
  const nome = localStorage.getItem("nome") || "";
  const telefone = localStorage.getItem("telefone") || "";

  setUser({ nome, telefone });
}
