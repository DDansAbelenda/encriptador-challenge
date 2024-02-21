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
    "enter": "e",
    "imes": "i",
    "ai": "a",
    "ober": "o",
    "ufat": "u"
}

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
        let tempArray = dividirCadena(texto);
        texto = "";
        for (let cadena of tempArray) {
            if (desencriptador[cadena]) {
                texto += desencriptador[cadena];
            }
            else {
                texto += cadena
            }
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

/**
 * Función auxiliar para el proceso de desencriptar. Su procedimiento consiste en dividir el texto
 * recibido por parámetros y devolverlo en un arreglo. La división se hace a partir de las subcadenas 
 * encriptadas detectadas. Ejemplo para el texto: jaimenters -> return [j, ai, m, enter, s].
 * @param {*} texto cadena que se divide
 * @returns arreglo con el texto recibido dividio
 */
function dividirCadena(texto) {
    let tempArray = []
    for (let letra in encriptador) {
        //Caso inicial
        if (letra === "e") {
            tempArray = texto.split(encriptador[letra]);
            tempArray = completarArreglo(tempArray, encriptador[letra]);
        } else {
            //Resto de los casos
            tempArray = tempArray.map((text) => {
                text = text.split(encriptador[letra]);
                text = completarArreglo(text, encriptador[letra]);
                return text;
            }).flat();
        }
    }
    return tempArray;
}


/**
 * Función auxiliar para el proceso de desencriptar. Su procedimiento consiste en 
 * agregar la cadena recibida por parámetros en el arreglo de la siguiente forma:
 * Ejemplo: Sea arreglo = [a,b,b,c] y la cadena m, el arreglo resultante sería: [a,m,b,m,b,m,c]
 * 
 * @param {*} arreglo array al que se le agrega la cadena
 * @param {*} cadena cadena que se agrega luego de cada posición excepto la última
 * @returns arreglo con la cadena insertada
 */
function completarArreglo(arreglo, cadena) {
    let tempArray = [];
    if (arreglo.length !== 1) {
        let j = 0;
        for (let i = 0; i < arreglo.length - 1; i++) {
            tempArray[j] = arreglo[i];
            tempArray[j + 1] = cadena;
            j += 2;
        }
        tempArray[j] = arreglo[arreglo.length - 1];

    } else {
        tempArray = arreglo;
    }
    return tempArray;
}

