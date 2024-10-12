export function Iniciais(nome: string) {
  var inicial = nome.split(" ");
  if (inicial.length >= 2) {
    inicial.pop();
    return inicial.map((item) => item[0].toUpperCase()).join("");
  } else {
    return inicial.map((item) => item[0].toUpperCase()).join("");
  }
}
