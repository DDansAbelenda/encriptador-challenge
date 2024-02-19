/* Encriptacion
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/

const encriptador = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

const regex = /[A-ZÁÉÍÓÚáéíóú+*·'¨^]/;

/*Agregando eventos a los botones*/
const btnEncriptar = document.querySelector(".encriptar-btn");
const btnDesencriptar = document.querySelector(".desencriptar-btn");
const btnClipboard = document.querySelector(".clipboard");

btnEncriptar.addEventListener("click", encriptar);
btnDesencriptar.addEventListener("click", desencriptar);
btnClipboard.addEventListener("click", copiar);


function encriptar() {
    let texto = document.getElementById("input").value;
    if (!regex.test(texto)) {
        for (let letra in encriptador) {
            texto = texto.replaceAll(letra, encriptador[letra]);
        }
        escribirSalida(texto);
        borrarEntrada();
    } else {
        alert("El texto no debe contener mayúsculas, acentos ni caracteres especiales");
    }
}

function desencriptar() {
    let texto = document.getElementById("input").value;
    if (!regex.test(texto)) {
        for (let letra in encriptador) {
            texto = texto.replaceAll(encriptador[letra], letra);
        }
        escribirSalida(texto);
        borrarEntrada();
    } else {
        alert("El texto no debe contener mayúsculas, acentos ni caracteres especiales");
    }

}

function copiar() {
    const textarea = document.getElementById("output");
    navigator.clipboard.writeText(textarea.value).then(function () {
        alert('Texto copiado al portapapeles');
    });
}


function escribirSalida(text) {
    const output = document.getElementById("output");
    output.style.display = "block";
    output.value = text;

    const img = document.querySelector(".contenedor-mensaje");
    img.style.display = "none";

    const clipboard = document.querySelector(".clipboard");
    clipboard.style.display = "block";
}


function borrarEntrada() {
    document.getElementById("input").value = "";
}


