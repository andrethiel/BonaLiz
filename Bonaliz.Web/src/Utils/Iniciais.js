export function Iniciais(nome) {
  var inicial = nome.split(" ");
  if (inicial.length >= 3) {
    inicial.pop();
    return inicial.map((item) => item[0].toUpperCase()).join("");
  } else {
    return inicial.map((item) => item[0].toUpperCase()).join("");
  }
}
