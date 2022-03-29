/**
 * Returns a cpf number converted to a formated string
 * @param {number} v - initial value
 * @returns {string} - modified value
 */
function cpf(v){
    //i. 111.22233380 
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    //ii. 111.222.33380 
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    //iii. 111.222.333-80 
    v = v.replace(/(\d{3})(\d)/, "$1-$2");

    return v;
}

