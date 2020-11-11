const service = require("./service");

// Criando meu proprio reduce
Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
  for (let index = 0; index <= this.length - 1; index++) {
    valorFinal = callback(valorFinal, this[index], this);
  }
};

async function main() {
  try {
    const { results } = await service.obterPessoas(`a`);
    const pesos = results.map((peso) => parseInt(peso.height));
    const total = pesos.reduce((anterior, proximo) => {
      return anterior + proximo;
    });

    console.log("Total", total);

    // Usando meu proprio reduce
    const minhaLista = [
      ["Rodrigo", "Rossi"],
      ["Valentina", "Isis"],
    ];

    const lista = minhaLista
      .reduce((anterior, proximo) => {
        return anterior.concat(proximo);
      }, [])
      .join(", ");

    console.log("lista :>> ", lista);
  } catch (error) {
    console.error(`Erro ao retornar as pessoas: ${error}`);
  }
}
main();
