const axios = require("axios");
const URL = `https://swapi.dev/api/people`;

// Estou usando async porque vou manipular promisses internamente nessa função
async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const response = await axios.get(url);
  return response.data;
}

// Exportando esta função deste arquivo para que seja possível usar ela dentro de outro arquivo
// Como se fosse fazer um método public no java
module.exports = {
  obterPessoas,
};

// Somente para testes
// obterPessoas('r2')
//   .then(function (resultado) {
//     console.log(resultado);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
