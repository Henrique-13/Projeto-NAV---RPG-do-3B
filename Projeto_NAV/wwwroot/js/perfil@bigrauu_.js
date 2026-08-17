const cartas = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Q",
    "J",
    "K"
];


const tbody = document.querySelector("#tabela tbody");



/* ==========================
   TABELA
========================== */


function criarTabela() {

    tbody.innerHTML = "";


    cartas.forEach(carta => {


        const tr = document.createElement("tr");


        tr.innerHTML = `

            <td>${carta}</td>


            <td>
                <input type="text" placeholder="Nome do golpe">
            </td>


            <td>
                <input type="number" min="0" placeholder="0">
            </td>


            <td>
                <input type="text" placeholder="Descrição do golpe">
            </td>

        `;


        tbody.appendChild(tr);


    });


}


criarTabela();





/* ==========================
   CARDS
========================== */


function virar(id) {


    const card =
        document.getElementById(id);


    if (card) {

        card.classList.toggle("virado");

    }

}





/* ==========================
   MODAL
========================== */


let acaoModal = null;



function abrirModal(titulo, mensagem, callback = null) {


    const modal =
        document.getElementById("modal");


    document.getElementById("modalTitulo")
        .textContent = titulo;


    document.getElementById("modalMensagem")
        .textContent = mensagem;



    acaoModal = callback;


    modal.classList.add("show");


}





function fecharModal() {


    const modal =
        document.getElementById("modal");


    modal.classList.remove("show");


    acaoModal = null;


}





document
    .getElementById("btnConfirmar")
    .addEventListener("click", () => {


        if (acaoModal) {

            acaoModal();

        }


        fecharModal();


    });







/* ==========================
   BOTÕES DO HTML
========================== */


function confirmarSalvar() {


    abrirModal(

        "Salvar ficha",

        "Deseja salvar essa ficha?",


        () => {

            salvarFicha();

        }

    );


}





function confirmarLimpar() {


    abrirModal(

        "Limpar ficha",

        "Todos os dados serão apagados. Continuar?",


        () => {

            limparFicha();

        }

    );


}







/* ==========================
   SALVAR
========================== */


function salvarFicha() {



    const dados = [];



    document
        .querySelectorAll("#tabela tbody tr")
        .forEach(tr => {


            const inputs =
                tr.querySelectorAll("input");



            dados.push({

                carta:
                    tr.children[0].textContent,


                nome:
                    inputs[0].value,


                forca:
                    inputs[1].value,


                descricao:
                    inputs[2].value

            });



        });





    const ficha = {


        personagem:
            document.getElementById("personagem").value,



        mecha:
            document.getElementById("mecha").value,



        atributos: {


            vida:
                document.getElementById("vida").value,


            agilidade:
                document.getElementById("agilidade").value,


            danoExtra:
                document.getElementById("danoExtra").value


        },



        golpes: dados,



        cards: {


            personagemVirado:
                document
                    .getElementById("cardPersonagem")
                    .classList.contains("virado"),



            mechaVirado:
                document
                    .getElementById("cardMecha")
                    .classList.contains("virado")


        }


    };





    localStorage.setItem(

        "fichaRPG",

        JSON.stringify(ficha)

    );



    abrirModal(

        "Sucesso",

        "Ficha salva com sucesso!"

    );


}







/* ==========================
   CARREGAR
========================== */


function carregarFicha() {


    const ficha =
        JSON.parse(
            localStorage.getItem("fichaRPG")
        );



    if (!ficha) return;





    document.getElementById("personagem").value =
        ficha.personagem || "";



    document.getElementById("mecha").value =
        ficha.mecha || "";





    if (ficha.atributos) {


        document.getElementById("vida").value =
            ficha.atributos.vida || 20;


        document.getElementById("agilidade").value =
            ficha.atributos.agilidade || 1;



        document.getElementById("danoExtra").value =
            ficha.atributos.danoExtra || 0;


    }






    const linhas =
        document.querySelectorAll("#tabela tbody tr");



    if (ficha.golpes) {


        ficha.golpes.forEach((golpe, index) => {


            if (!linhas[index]) return;



            const inputs =
                linhas[index].querySelectorAll("input");



            inputs[0].value =
                golpe.nome || "";



            inputs[1].value =
                golpe.forca || "";



            inputs[2].value =
                golpe.descricao || "";


        });


    }







    if (ficha.cards) {



        if (ficha.cards.personagemVirado) {


            document
                .getElementById("cardPersonagem")
                .classList.add("virado");


        }





        if (ficha.cards.mechaVirado) {


            document
                .getElementById("cardMecha")
                .classList.add("virado");


        }



    }


}



carregarFicha();








/* ==========================
   LIMPAR
========================== */


function limparFicha() {



    localStorage.removeItem("fichaRPG");



    document.getElementById("personagem").value = "";


    document.getElementById("mecha").value = "";


    document.getElementById("vida").value = 20;


    document.getElementById("agilidade").value = 1;


    document.getElementById("danoExtra").value = 0;





    document
        .querySelectorAll("#tabela input")
        .forEach(input => {


            input.value = "";


        });





    document
        .getElementById("cardPersonagem")
        .classList.remove("virado");



    document
        .getElementById("cardMecha")
        .classList.remove("virado");




    abrirModal(

        "Ficha limpa",

        "Todos os dados foram removidos."

    );


}