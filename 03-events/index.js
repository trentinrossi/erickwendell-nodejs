const EventEmitter = require("events");

class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();

const nomeEvento = "usuario:click";

// É executado toda vez que for emitido um evento conforme o nome definido
meuEmissor.on(nomeEvento, function (click) {
  console.log("Um usuário clicou", click);
});

// Emite o evento
meuEmissor.emit(nomeEvento, "na barra de rolagem..");
meuEmissor.emit(nomeEvento, "no ok..");

// Emite a cada segundo
let count = 0;
setInterval(() => {
  meuEmissor.emit(nomeEvento, "no ok" + count++);
}, 1000);
