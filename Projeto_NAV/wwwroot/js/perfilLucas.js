window.addEventListener("DOMContentLoaded", function () {

    const inputs = document.querySelectorAll("input");


    // CARREGAR DADOS SALVOS

    const dados = JSON.parse(
        localStorage.getItem("perfilCombatente")
    );


    if (dados) {

        inputs.forEach(function (input, i) {

            input.value = dados[i] || "";

        });

    }


    // SALVAR DADOS

    inputs.forEach(function (input) {

        input.addEventListener("input", function () {

            const dadosSalvar = [];


            inputs.forEach(function (campo) {

                dadosSalvar.push(campo.value);

            });


            localStorage.setItem(
                "perfilCombatente",
                JSON.stringify(dadosSalvar)
            );

        });

    });

});