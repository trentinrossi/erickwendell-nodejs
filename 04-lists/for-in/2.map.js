const service = require("./service");

Array.prototype.meuMap = function (callback) {
  const novoArraymapeado = [];
  for (let index = 0; index < this.length - 1; index++) {
    const resultado = callback(this[index], index);
    novoArraymapeado.push(resultado);
  }

  return novoArraymapeado;
};

async function main() {
  try {
    const results = await service.obterPessoas("a");
    // const names = [];

    // Usando o forEach
    // results.results.forEach(function (item) {
    //   names.push(item.name);
    // });

    // Usando o map
    // const names = results.results.map(function (pessoa) {
    //   return pessoa.name;
    // });

    // Usando o map de uma forma mais elegante
    // const names = results.results.map((pessoa) => pessoa.name);

    const names = results.results.meuMap(function (pessoa, indice) {
      return `[${indice}]${pessoa.name}`;
    });

    console.log(names);
  } catch (error) {
    console.error(error);
  }
}

main();
