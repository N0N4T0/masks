/**
 * Retorna uma string modificada no formato de um CPF
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */
function cpf(v) {
    // Tamanho maximo
    if (v.length > 14) {
        v = v.slice(0, -1);
    }
    //
    v = v.replace(/\D/g, "");
    // Coloca um ponto a cada tres caracteres
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1-$2");

    return v;
}

/**
 * Retorna uma string modificada no formato de um telefone fixo
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */
function telefone(v) {
    // Tamanho maximo
    if (v.length > 14) {
        v = v.slice(0, -1);
    }
    //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    //Coloca hífen entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2");

    return v;
}

/**
 * Retorna uma string modificada no formato de um celular
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */
function celular(v) {
    
    // Apenas numeros
    v = v.replace(/\D/g, "");

    if (v.length > 11) {
        v = v.slice(0, -1);
    }

    //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    //Coloca hífen entre o quarto e o quinto dígitos
    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    return v;
}

/**
 * Retorna uma string modificada apenas com numeros
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */

function apenasNumeros(v) {
    v = v.replace(/\D/g, "");
    return v;
}

/**
 * Retorna uma string modificada com formatação de CEP
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */
function cep(v) {
    v = v.replace(/\D/g, "");

    if (v.length > 8) {
        v = v.slice(0, -1);
    }

    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    return v;
}

/**
 * Retorna uma string modificada com formatação para cartão de credito/debito
 * @param {string} v - entrada
 * @param {number} maxDigits - quantidad maxima de digitos do cartão
 * @returns {string} - entrada alterada
 */
function cartao(v, maxDigits) {
    // Apenas numeros
    v = v.replace(/[^\d]+/g, "");

    //Trata se a quantidade de dígitos
    if (v.length > maxDigits) {
        v = v.slice(0, -1);
    }

    //Exemplo: 1111222233334444
    v = v.replace(/(\d{4})(\d)/, "$1 $2");
    //Exemplo: 1111 222233334444
    v = v.replace(/(\d{4})(\d)/, "$1 $2");
    //Exemplo: 1111 2222 33334444
    v = v.replace(/(\d{4})(\d)/, "$1 $2");
    //Exemplo: 1111 2222 3333 4444

    return v;
}

/**
 * Retorna uma string modificada com formatação para moeda brasileira
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */
function brl(v) {
    // Apenas digitos
    v = v.replace(/\D/g, "");

    // Conversão para real
    v = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v / 100);

    return v;
}

/**
 * Retorna uma string modificada com formatação para CNPJ
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */
function cnpj(v) {
    // Apenas digitos
    v = v.replace(/\D/g, "");

    //Trata se a quantidade de dígitos
    if (v.length > 14) {
        v = v.slice(0, -1);
    }

    v = v.replace(/(\d{2})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");

    return v;
}

export { apenasNumeros, brl, cartao, celular, cep, cnpj, cpf, telefone };
