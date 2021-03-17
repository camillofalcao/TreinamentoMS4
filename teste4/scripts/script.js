const numeroVezes = document.querySelector("#numeroVezes");
const error = document.querySelector(".error");

function numeroValido() {
    const num = Number(numeroVezes.value);
    return num > 0 && num < 6;
}

numeroVezes.addEventListener("input", function (event) {
    // Each time the user tries to send the data, we check
    // if the email field is valid.
    
    if (numeroValido()) {
        numeroVezes.className="valido";
        error.innerHTML = "";
        error.className = "error";
    } else {
        numeroVezes.className="invalido";
        error.innerHTML = "Número inválido!";
        error.className = "error active";
    }
  }, false);