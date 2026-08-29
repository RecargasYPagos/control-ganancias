/* =========================================
   CONTROL DE GANANCIAS
   FUNCIONES PRINCIPALES
========================================= */


// =========================================
// ELEMENTOS
// =========================================

const campos = document.querySelectorAll(".amount");

const inversionInput = document.getElementById("inversion");

const totalElement = document.getElementById("total");
const gananciaElement = document.getElementById("ganancia");
const diezPorcientoElement = document.getElementById("diezPorciento");

const summaryTotal = document.getElementById("summaryTotal");
const summaryInversion = document.getElementById("summaryInversion");
const summaryGanancia = document.getElementById("summaryGanancia");
const summaryPorcentaje = document.getElementById("summaryPorcentaje");

const btnLimpiar = document.getElementById("btnLimpiar");


// =========================================
// CONVERTIR VALOR A NÚMERO
// =========================================

function obtenerNumero(input) {

    const valor = parseFloat(input.value);

    if (isNaN(valor) || valor < 0) {
        return 0;
    }

    return valor;
}


// =========================================
// FORMATO DE DINERO
// =========================================

function formatoDinero(numero) {

    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numero);
}


// =========================================
// CALCULAR TOTAL
// =========================================

function calcularTotal() {

    let total = 0;

    campos.forEach(function(campo) {

        total += obtenerNumero(campo);

    });

    return total;
}


// =========================================
// ACTUALIZAR CALCULADORA
// =========================================

function actualizarCalculos() {

    // Obtener total
    const total = calcularTotal();

    // Obtener inversión
    const inversion = obtenerNumero(inversionInput);

    // Calcular ganancia
    const ganancia = total - inversion;

    // Calcular 10%
    const diezPorciento = ganancia * 0.10;


    // =====================================
    // MOSTRAR RESULTADOS
    // =====================================

    totalElement.textContent = formatoDinero(total);

    gananciaElement.textContent = formatoDinero(ganancia);

    diezPorcientoElement.textContent =
        formatoDinero(diezPorciento);


    // =====================================
    // RESUMEN
    // =====================================

    summaryTotal.textContent =
        formatoDinero(total);

    summaryInversion.textContent =
        formatoDinero(inversion);

    summaryGanancia.textContent =
        formatoDinero(ganancia);

    summaryPorcentaje.textContent =
        formatoDinero(diezPorciento);


    // =====================================
    // COLOR DE GANANCIA
    // =====================================

    if (ganancia < 0) {

        gananciaElement.parentElement.parentElement.style.background =
            "linear-gradient(135deg, #dc3545, #ef4444)";

        summaryGanancia.style.color = "#dc3545";

    } else {

        gananciaElement.parentElement.parentElement.style.background =
            "linear-gradient(135deg, #16a34a, #20c76a)";

        summaryGanancia.style.color = "#16a34a";

    }
}


// =========================================
// EVENTOS DE LOS CAMPOS
// =========================================

campos.forEach(function(campo) {

    campo.addEventListener("input", actualizarCalculos);

});

inversionInput.addEventListener(
    "input",
    actualizarCalculos
);


// =========================================
// LIMPIAR TODO
// =========================================

btnLimpiar.addEventListener("click", function() {

    campos.forEach(function(campo) {

        campo.value = "";

    });

    inversionInput.value = "";

    actualizarCalculos();

});


// =========================================
// INICIAR
// =========================================

actualizarCalculos();
