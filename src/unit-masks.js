/**
 * Retorna uma string modificada no formato de um CPF
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */
function cpf(v) {
    // Coloca um ponto no terceiro caracter
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    // Coloca um ponto no sexto caracter
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    // Adiciona um traço antes dos três ultimos caracters
    v = v.replace(/(\d{3})(\d)/, "$1-$2");

    return v;
}

/**
 * Retorna uma string modificada no formato de um telefone fixo
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */
function telefone(v) {
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
 * Retorna uma string modificada com formatação de numero flutuante
 * @param {string} v - entrada
 * @returns {string} - entrada alterada
 */
function float(v) {
    // Conversão de virgulas para pontos
    v = v.replace(",", ".");
    // Parsionamento para float
    v = parseFloat(v).round().toFixed(2);

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
    //Exemplo: 11.222333444455
    v = v.replace(/(\d{2})(\d)/, "$1.$2");
    //Exemplo:  11.222.333444455
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    //Exemplo: ) 11.222.333/444455
    v = v.replace(/(\d{3})(\d)/, "$1/$2");
    //Exemplo:  11.222.333/4444-55
    v = v.replace(/(\d{4})(\d)/, "$1-$2");

    return v;
}

export{
    apenasNumeros,
    brl,
    cartao,
    celular,
    cep,
    cnpj,
    cpf,
    float,
    telefone
}
