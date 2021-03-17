const mensagem = document.getElementById("mensagem");
const nome = document.querySelector("#nome");
const botao = document.getElementById("botao");

botao.addEventListener('click', apresentarMensagem);

function apresentarMensagem(e) {
    e.preventDefault();
    mensagem.innerText = `Olá ${nome.value}!`;
}
