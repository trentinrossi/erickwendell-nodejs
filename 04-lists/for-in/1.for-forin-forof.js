const service = require("./service");

async function main() {
  try {
    const result = await service.obterPessoas("a");

    const names = [];

    // Usando o for
    console.time("for");
    for (let i = 0; i < result.results.length - 1; i++) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd("for");

    // Usando o forIn
    console.time("forIn");
    for (const i in result.results) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd("forIn");

    // Usando o forOf
    console.time("forOf");
    for (pessoa of result.results) {
      names.push(pessoa.name);
    }
    console.timeEnd("forOf");
  } catch (error) {
    console.error(error);
  }
}


main();
