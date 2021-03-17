const mensagens = document.getElementById("mensagens");
const nome = document.querySelector("#nome");
const botao = document.getElementById("botao");

botao.addEventListener('click', apresentarMensagem);

nome.focus();

function apresentarMensagem(e) {
    e.preventDefault();
    
    if (nome.value) {
        mensagens.innerHTML += `<p>Olá ${nome.value}!</p>`;
    }
}
