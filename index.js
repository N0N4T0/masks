function formatCpf(value){
    value = value.replace(/[^\d]+/g,'');

    //  Trata se a quantidade de dígitos 
    if(value.length > 11) {
        value = value.slice(0, -1)
    }

    //  Valida o CPF 
    function validadorCPF(cpf){
        let Soma = 0;
        let Resto;

        if (cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999" ) return false;

        for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10)) )  return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11) ) )  return false;

        return true;
    }

    //  Aplica máscara 
    function aplicaMascaraCPF(){
        //  Exemplo: 11122233380 
        //  Iteração i.) 111.22233380 
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        //  Iteração ii.) 111.222.33380 
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        //  Iteração iii.) 111.222.333-80 
        value = value.replace(/(\d{3})(\d)/, "$1-$2")

        return value
    }

    aplicaMascaraCPF()

    //  Exibe mensagem baseada no retorno da validação de CPF 
    function alertPorRetorno(alertInfo){
        alertInfo == false ?  alert("CPF inválido") : "";
    }

    //  Caso seja maio que 14 digitos ou zeja 0 digitos 
    if(value.length == 14){
        //  Limpa os . e - e / para comparar 
        value = value.replace(/\.|\-|\//g, '')

        validadorCPF(value)
        const alertValue = validadorCPF(value)
        alertPorRetorno(alertValue)
        aplicaMascaraCPF()
    }
    return value
}