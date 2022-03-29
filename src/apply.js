import * as masks from "./unit-masks.js";

window.addEventListener("load", () => {
    inicializar();
});

export default function inicializar() {
    aplicarCpf();
    aplicarTelefone();
    aplicarCep();
    aplicarCnpf();
    aplicarMoedaBRL();
    aplicarCelular();
    aplicarCartao();
}

function aplicarCpf() {
    const inputs = document.querySelectorAll("input[cpf=yes]");

    Array.from(inputs).forEach((input) => {
        input.addEventListener("input", (event) => {
            event.target.value = masks.cpf(event.target.value);
        });
    });
}

function aplicarTelefone() {
    const inputs = document.querySelectorAll("input[telefone=yes]");

    Array.from(inputs).forEach((input) => {
        input.addEventListener("input", (event) => {
            event.target.value = masks.telefone(event.target.value);
        });
    });
}

function aplicarCep() {
    const inputs = document.querySelectorAll("input[cep=yes]");

    Array.from(inputs).forEach((input) => {
        input.addEventListener("input", (event) => {
            event.target.value = masks.cep(event.target.value);
        });
    });
}

function aplicarCnpf() {
    const inputs = document.querySelectorAll("input[cnpj=yes]");

    Array.from(inputs).forEach((input) => {
        input.addEventListener("input", (event) => {
            event.target.value = masks.cnpj(event.target.value);
        });
    });
}

function aplicarMoedaBRL() {
    const inputs = document.querySelectorAll("input[moeda=yes]");

    Array.from(inputs).forEach((input) => {
        input.addEventListener("input", (event) => {
            event.target.value = masks.brl(event.target.value);
        });
    });
}

function aplicarCelular() {
    const inputs = document.querySelectorAll("input[celular=yes]");

    Array.from(inputs).forEach((input) => {
        input.addEventListener("input", (event) => {
            event.target.value = masks.celular(event.target.value);
        });
    });
}

function aplicarCartao(){
    const inputs = document.querySelectorAll("input[cartao=yes]");

    Array.from(inputs).forEach((input) => {
        input.addEventListener("input", (event) => {
            event.target.value = masks.cartao(event.target.value, 16);
        });
    });
}