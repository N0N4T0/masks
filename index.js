window.addEventListener("load", () => {
    cartao() 
    celular() 
    cep() 
    cnpj() 
    cpf()
    floatMask()
    moeda()
    number() 
    telefoneFixo() 
    telefone() 
})


//Objeto Mask 
const Mask = {
    /*     input = e.target 
        func = função, que pode ser o format */
    apply(input, func) {
        input.value = Mask[func](input.value);  //Mask.formatBRL.(valor) 
    },

    //Mascara para formatar valor Float 
    float(value) {
        value = value.replace(',', '.');
        value = parseFloat(value).round().toFixed(2);


        //Tratamento para não retornar Nan ou undefined no input 
        if (value === 'NaN' || value === 'undefined') {
            value = ' ';
            return value;
        }

        return value;
    },

    //Mascara para formatar valor para moeda brasileira R$ 
    moeda(value) {
        value = value.replace(/\D/g, "");

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100)
    },

    //Mascara para formatar CPF 
    cpf(value) {
        value = value.replace(/[^\d]+/g, '');

        //Trata se a quantidade de dígitos 
        if (value.length > 11) {
            value = value.slice(0, -1);
        }

        //Valida o CPF 
        function validadorCPF(cpf) {
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
                cpf == "99999999999") return false;

            for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11)) Resto = 0;
            if (Resto != parseInt(cpf.substring(9, 10))) return false;

            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto == 10) || (Resto == 11)) Resto = 0;
            if (Resto != parseInt(cpf.substring(10, 11))) return false;

            return true;
        }

        //Aplica máscara 
        function aplicaMascaraCPF() {
            //Exemplo: 11122233380 
            //Iteração i.) 111.22233380 
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            //Iteração ii.) 111.222.33380 
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            //Iteração iii.) 111.222.333-80 
            value = value.replace(/(\d{3})(\d)/, "$1-$2");

            return value;
        }

        aplicaMascaraCPF();

        //Exibe mensagem baseada no retorno da validação de CPF 
        function alertPorRetorno(alertInfo) {
            alertInfo == false ? alert("CPF inválido") : "";
            // if(alertInfo == false){
            // 	Swal.fire({
            //// 		title: "CPF inválido",  Titulo 
            //// 		text: "",  Mensagem 
            //// 		icon: "warning",  Tipo 
            //// 		allowOutsideClick: false  Bloqueia o clique fora para fechar 
            // 	});
            // }
        }

        //Caso seja maio que 14 digitos ou zeja 0 digitos 
        if (value.length >= 14) {
            //Limpa os . e - e / para comparar 
            value = value.replace(/\.|\-|\//g, '');

            validadorCPF(value);
            const alertValue = validadorCPF(value);
            alertPorRetorno(alertValue);
            aplicaMascaraCPF();
        }
        return value;
    },

    //Mascara para formatar CNPJ 
    cnpj(value) {
        value = value.replace(/[^\d]+/g, '');

        //Trata se a quantidade de dígitos 
        if (value.length > 14) {
            value = value.slice(0, -1)
        }

        //Valida CNPJ 
        function validadorCNPJ(cnpj) {
            if (cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999") return false;

            tamanho = cnpj.length - 2;
            numeros = cnpj.substring(0, tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;

            return true;
        }

        //Aplica máscara 
        function aplicaMascaraCNPJ() {
            //Exemplo: 11222333444455 
            //Iteração i.) 11.222333444455 
            value = value.replace(/(\d{2})(\d)/, "$1.$2");
            //Iteração ii.) 11.222.333444455 
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            //Iteração iii.) 11.222.333/444455 
            value = value.replace(/(\d{3})(\d)/, "$1/$2");
            //Iteração iv.) 11.222.333/4444-55 
            value = value.replace(/(\d{4})(\d)/, "$1-$2");
        }

        aplicaMascaraCNPJ();

        //Exibe mensagem baseada no retorno da validação de CPF 
        function alertPorRetorno(alertInfo) {
            alertInfo == false ? alert("CNPJ inválido") : "";
        }

        //                          
        if (value.length == 18) {
            //Limpa os . e - e / para comparar 
            value = value.replace(/\.|\-|\//g, '');

            validadorCNPJ(value);
            const alertValue = validadorCNPJ(value);
            alertPorRetorno(alertValue);
            aplicaMascaraCNPJ();
        }

        return value;
    },

    //Mascara para formatar CEP 
    cep(value) {
        value = value.replace(/\D/g, "");

        if (value.length > 8) {
            value = value.slice(0, -1);
        };

        return value.replace(/(\d{5})(\d)/, "$1-$2");
    },

    //Mascara para formatar Celular 
    celular(value) {
        value = value.replace(/\D/g, "");

        //Trata se a quantidade de dígitos
        if (value.length > 11) {
            value = value.slice(0, -1);
        };

        //Aplica máscara
        function aplicaMascaraCelular() {
            //Coloca parênteses em volta dos dois primeiros dígitos
            value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
            //Coloca hífen entre o quarto e o quinto dígitos
            value = value.replace(/(\d{5})(\d)/, "$1-$2");

            return value;
        };

        aplicaMascaraCelular();

        return value;
    },

    //Mascara para formatar Telefone Fixo 
    fixo(value) {
        value = value.replace(/\D/g, "");

        //Trata se a quantidade de dígitos 
        if (value.length > 10) {
            value = value.slice(0, -1);
        };

        //Aplica máscara 
        function aplicaMascaraTelefone() {
            //Coloca parênteses em volta dos dois primeiros dígitos 
            value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
            //Coloca hífen entre o terceiro e o quarto dígitos 
            value = value.replace(/(\d{4})(\d)/, "$1-$2");

            return value;
        };

        aplicaMascaraTelefone();

        return value;
    },

    onlyNumber(value) {
        value = value.replace(/\D/g, "");
        value = value.slice(0, -1);

        return value;
    },

    //Mascara para formatar Cartão 
    cartao(value) {
        value = value.replace(/[^\d]+/g, '');

        //Trata se a quantidade de dígitos  
        if (value.length > 16) {
            value = value.slice(0, -1)
        };

        //Aplica máscara  
        function aplicaMascaraCartao() {
            //Exemplo: 1111222233334444  
            value = value.replace(/(\d{4})(\d)/, "$1 $2");
            //Iteração i.) 1111 222233334444  
            value = value.replace(/(\d{4})(\d)/, "$1 $2");
            //Iteração ii.) 1111 2222 33334444  
            value = value.replace(/(\d{4})(\d)/, "$1 $2");
            //Iteração iii.) 1111 2222 3333 4444  
        };

        aplicaMascaraCartao();

        return value;
    }
}

//Obter valor para mascara de formatar Float 
function floatMask() {
    const inputs = Array.from(document.querySelectorAll("input[float=yes]"))

    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'float')
        })
    })
}
//Obter valor para mascara de formatar Float 
/* const floatMask = document.querySelectorAll("input[float=yes]")
for (let i = 0; i < floatMask.length; i++) {
    if (floatMask[i]) {
        floatMask[i].addEventListener("change", function (e) {
            Mask.apply(this, 'float');
        });
    }
} */


//Obter valor para mascara de formatar Moeda
function moeda(){
    const inputs = Array.from(document.querySelectorAll("input[moeda=yes]"))

    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'moeda')
        })
    })
} 
// const moeda = document.querySelectorAll("input[moeda=yes]")
// for (let i = 0; i < moeda.length; i++) {
//     if (moeda[i]) {
//         moeda[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'moeda');
//         });
//     }
// }


//Obter valor para mascara de formatar CPF 
function cpf(){
    const inputs = Array.from(document.querySelectorAll("input[cpf=yes]"))
    
    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'cpf')
        })
    })

}
// const cpf = document.querySelectorAll("input[cpf=yes]")
// for (let i = 0; i < cpf.length; i++) {
//     if (cpf[i]) {
//         cpf[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'cpf');
//         });
//     }
// }

//Obter valor para mascara de formatar CNPJ 
function cnpj() {
    const inputs = Array.from(document.querySelectorAll("input[cnpj=yes]"))
    
    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'cnpj')
        })
    })
}
// const cnpj = document.querySelectorAll("input[cnpj=yes]")
// for (let i = 0; i < cnpj.length; i++) {
//     if (cnpj[i]) {
//         cnpj[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'cnpj');
//         });
//     }
// }

//Obter valor para mascara de formatar CEP 
function cep() {
    const inputs = Array.from(document.querySelectorAll("input[cep=yes]"))
    const inputs1 = Array.from(document.querySelectorAll("input[type=cep]"))
    
    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'cep')
        })
    })

    inputs1.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'cep')
        })
    })
}
// const cep = document.querySelectorAll("input[cep=yes]")
// for (let i = 0; i < cep.length; i++) {
//     if (cep[i]) {
//         cep[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'cep')
//         });
//     }
// }

//Obter valor para mascara de formatar CEP 
// const cep1 = document.querySelectorAll("input[type=cep]")
// for (let i = 0; i < cep1.length; i++) {
//     if (cep1[i]) {
//         cep1[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'cep')
//         });
//     }
// }

//Obter valor para mascara de formatar Celular 
function celular() {
    const inputs = Array.from(document.querySelectorAll("input[celular=yes]"))
    
    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'celular')
        })
    })
}
// const celular = document.querySelectorAll("input[celular=yes]")
// for (let i = 0; i < celular.length; i++) {
//     if (celular[i]) {
//         celular[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'celular')
//         });
//     }
// }


function cartao() {
    const inputs = Array.from(document.querySelectorAll("input[cartao=yes]"))
    
    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'cartao')
        })
    })
}
//Obter valor para mascara de formatar Cartão 
// const cartao = document.querySelectorAll("input[cartao=yes]")
// for (let i = 0; i < cartao.length; i++) {
//     if (cartao[i]) {
//         cartao[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'cartao')
//         });
//     }
// }

//Obter valor para mascara de formatar Telefone Fixo 
function telefoneFixo() {
    const inputs = Array.from(document.querySelectorAll("input[fixo=yes]"))
    
    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'fixo')
        })
    })
}
// const telefoneFixo = document.querySelectorAll("input[fixo=yes]")
// for (let i = 0; i < telefoneFixo.length; i++) {
//     if (telefoneFixo[i]) {
//         telefoneFixo[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'fixo')
//         });
//     }
// }

function telefone() {
    const inputs = Array.from(document.querySelectorAll("input[phone=yes]"))
    const inputs1 = Array.from(document.querySelectorAll("input[type=phone]"))
    
    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'telefone')
        })
    })
    inputs1.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'telefone')
        })
    })
}
// const telefone1 = document.querySelectorAll("input[phone=yes]")
// for (let i = 0; i < telefone1.length; i++) {
//     if (telefone1[i]) {
//         telefone1[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'telefone')
//         });
//     }
// }

// const telefone2 = document.querySelectorAll("input[type=phone]")
// for (let i = 0; i < telefone2.length; i++) {
//     if (telefone2[i]) {
//         telefone2[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'telefone')
//         });
//     }
// }


function number() {
    const inputs = Array.from(document.querySelectorAll("input[number=yes]"))
    
    inputs.forEach(input =>{
        input.addEventListener("input", (e)=>{
            Mask.apply(e.target, 'onlyNumber')
        })
    })
}
//Only numbers 
// const onlyNumber = document.querySelectorAll("input[number=yes]")
// for (let i = 0; i < onlyNumber.length; i++) {
//     if (onlyNumber[i]) {
//         onlyNumber[i].addEventListener("keydown", function (e) {
//             Mask.apply(this, 'onlyNumber')
//         });
//     }
// }
