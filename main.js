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

const desencriptador = {
    "ai": "a",
    "imes": "i",
    "enter": "e",
    "ober": "o",
    "ufat": "u"
}

const regex = /[A-ZÁÉÍÓÚáéíóú+*·'¨^]/;

/*Obteniendo elementos HTML*/
const btnEncriptar = document.querySelector(".encriptar-btn");
const btnDesencriptar = document.querySelector(".desencriptar-btn");
const btnClipboard = document.querySelector(".clipboard");
const textarea = document.getElementById("output");
const output = document.getElementById("output");
const img = document.querySelector(".contenedor-mensaje");
const clipboard = document.querySelector(".clipboard");

/*Agregando eventos a los botones*/
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
        for (let cadena in desencriptador) {
            texto = texto.replaceAll(cadena, desencriptador[cadena]);
        }
        escribirSalida(texto);
        borrarEntrada();
    } else {
        alert("El texto no debe contener mayúsculas, acentos ni caracteres especiales");
    }
}

function copiar() {
    navigator.clipboard.writeText(textarea.value).then(function () {
        alert('Texto copiado al portapapeles');
    });
}


function escribirSalida(text) {
    output.style.display = "block";
    output.value = text;
    img.style.display = "none";
    clipboard.style.display = "block";
}


function borrarEntrada() {
    document.getElementById("input").value = "";
}

