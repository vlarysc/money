export function adicionaZero(numero) {
  if (numero <= 9) return "0" + numero;
  else return numero;
}
let dataAtual = new Date("2020-1-29"); //29/01/2020
let dataAtualFormatada =
  adicionaZero(dataAtual.getDate().toString()) +
  "/" +
  adicionaZero(dataAtual.getMonth() + 1).toString() +
  "/" +
  dataAtual.getFullYear();
console.log(dataAtualFormatada);
// saída: 29/01/2020
let dataAtual2 = new Date("2020-10-2"); //02/10/2020
let dataAtualFormatada2 =
  adicionaZero(dataAtual2.getDate().toString()) +
  "/" +
  adicionaZero(dataAtual2.getMonth() + 1).toString() +
  "/" +
  dataAtual2.getFullYear();
console.log(dataAtualFormatada2);
// saída: 02/10/2020
