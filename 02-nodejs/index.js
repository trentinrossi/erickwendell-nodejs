/*
    0 - Obter um usuário
    1 - Obter o numero de telefone de um usuario apartir de seu ID
    2 - Obter o endereco do usuario pelo Id
 */
// Importando um módulo interno do node.js para converter uma função em promise
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

// É criado uma promise para que ela devolva o resolve caso for com sucesso, ou reject caso der algum erro
// Caso for sucesso, é devolvido um usuário em JSON
function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      // return reject(new Error(`Agora sim deu pau`))

      return resolve({
        id: 1,
        nome: `Aladin`,
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

// Funções callback sempre devem ser o ultimo parametro passado
function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: `116654654`,
        ddd: 45,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: `Dos carai`,
      numero: 65465,
    });
  }, 2000);
}

// Colocando a palavra async automaticamente ela retornará uma promise
main();
async function main() {
  try {    
    const usuario = await obterUsuario();

    // Primeira forma de chamar as funções que não dependem umas das outras
    // const endereco = await obterEnderecoAsync(usuario.id);
    // const telefone = await obterTelefone(usuario.id);

    // Desta forma é mais performático, por ambas executam juntas, pois são apenas para retornar valores do BD por exemplo
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ]);
    
    const telefone = resultado[0];
    const endereco = resultado[1];

    console.log(`
      Nome: ${usuario.nome}
      Endereço: ${endereco.rua}, ${endereco.numero}
      Telefone: (${telefone.ddd}) ${telefone.telefone}
    `);
  } catch (error) {
    console.error(`Deu ruin ${error}`);
  }
}

/* Este código comentado abaixo é substituído pelo de cima

// Função que é executada quando a função obterUsuario for concluída
// function resolverUsuario(erro, usuario) {
//   // null || 0 || "" === false
//   if (erro) {
//     console.error(`Deu ruin em usuario`, erro);
//   }
//   console.log(`Usuário`, usuario);
// }

// chama a função obterUsuário e como ela retorna uma Promise, posso capturar o resolve com o .then
// e o reject com o .catch
// usuario => telefone => telefone, ou seja, o resultado retornado de uma promise sempre será a ultima execução
const usuarioPromise = obterUsuario()
  // dentro de usuarioRetornado será retornado o resultado da function obterUsuario
  .then(function (usuarioRetornado) {

    // Estou chamando a função obterTelefone passando o id do usuário retornado na promise anterior
    return obterTelefone(usuarioRetornado.id)

      // Caso retorne com sucesso, aqui dentro de result será o resultado retornado de obterTelefone
      .then(function resolverTelefone(enderecoRetornado) {

        // Fazendo assim, estou manipulando o objeto de retorno para retornar também o usuário
        // Senão retornaria para o proximo then somente o resultado de telefone
        return {
          usuario: {
            nome: usuarioRetornado.nome,
            id: usuarioRetornado.id
          },
          telefone: enderecoRetornado
        }
      })
  })
  .then(function (resultadoThenAnterior) {
    // https://erickwendel.teachable.com/courses/448292/lectures/6939053
    // Desta forma é usando o método já convertido -> const obterEnderecoAsync = util.promisify(obterEndereco);
    const endereco = obterEnderecoAsync(resultadoThenAnterior.usuario.id);
    return endereco.then(function resolverEndereco(resultadoEndereco) {
      return {
        usuario: resultadoThenAnterior.usuario,
        telefone: resultadoThenAnterior.telefone,
        endereco: resultadoEndereco
      }
    })
  })
  // Esse resultado é o callback/retorno do then de cima (caso for resolve)
  // Também como é o ultimo then, será impresso no console
  .then(function (resultadoThenAnterior) {
    console.log(`
      Nome: ${resultadoThenAnterior.usuario.nome}
      Endereço: ${resultadoThenAnterior.endereco.rua}, ${resultadoThenAnterior.endereco.numero}
      Telefone: (${resultadoThenAnterior.telefone.ddd}) ${resultadoThenAnterior.telefone.telefone}
    `);
  })
  // Esse error é o callback da obterUsuario (caso for reject)
  .catch(function (error) {
    console.error(`DEU RUIM`, error);
  });
*/
// Desta forma abaixo é a maneira mais simples, usando funções anônimas
// obterUsuario(function resolverUsuario(error, usuario) {
//   // null || 0 || "" === false
//   if (error) {
//     console.error(`Deu ruin em usuario`, error);
//     return;
//   }
//   console.log(`Usuário`, usuario);

//   // Chamando o telefone
//   obterTelefone(usuario.id, function resolverTelefone(error2, telefone) {
//     if (error2) {
//       console.error(`Deu ruin em telefone`, error2);
//       return;
//     }
//     console.log(`Telefone`, telefone);

//     // Chamando o endereço
//     obterEndereco(usuario.id, function resolverEndereco(error3, endereco) {
//       if (error3) {
//         console.error(`Deu ruin em endereco`, error3);
//         return;
//       }
//       console.log(`Endereco`, endereco);
//     });
//   });
// });
