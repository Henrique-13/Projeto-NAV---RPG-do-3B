// Função para alternar as imagens e atualizar os botões ativos
function mudarImagem(tipo, direcao, url) {
    document.getElementById(`img-${tipo}`).src = url;
    document.getElementById(`btn-${tipo}-frente`).classList.remove('active');
    document.getElementById(`btn-${tipo}-tras`).classList.remove('active');
    document.getElementById(`btn-${tipo}-${direcao}`).classList.add('active');
}

// EDITAR DADOS AQUI: Modifique os textos abaixo para salvar os ataques diretamente no código
const ataquesIniciais = [
    { id: 'A', nome: 'Manopla', dano: '5', descricao: 'Para cada soco com a manopla utilizado em sequência (turnos consecutivos), adicione +1 de dano acumulativo ao ataque.' },
    { id: '2', nome: 'Manopla', dano: '5', descricao: 'Para cada soco com a manopla utilizado em sequência (turnos consecutivos), adicione +1 de dano acumulativo ao ataque.' },
    { id: '3', nome: '', dano: '', descricao: '' },
    { id: '4', nome: '', dano: '', descricao: '' },
    { id: '5', nome: '', dano: '', descricao: '' },
    { id: '6', nome: '', dano: '', descricao: '' },
    { id: '7', nome: '', dano: '', descricao: '' },
    { id: '8', nome: '', dano: '', descricao: '' },
    { id: '9', nome: 'Manopla', dano: '5', descricao: 'Para cada soco com a manopla utilizado em sequência (turnos consecutivos), adicione +1 de dano acumulativo ao ataque.' },
    { id: '10', nome: 'Manopla', dano: '5', descricao: 'Para cada soco com a manopla utilizado em sequência (turnos consecutivos), adicione +1 de dano acumulativo ao ataque.' },
    { id: 'J', nome: '', dano: '', descricao: '' },
    { id: 'Q', nome: 'Guincho', dano: '0', descricao: 'Se a vida estiver menos ou igual a 50%, O jogador escolhe uma carta de dano que já foi usada na sua pilha de descarte e causa o dano dela 2x. Se for maior, O efeito falha. O item apenas cura o próprio usuário em 4 de vida.' },
    { id: 'K', nome: '', dano: '', descricao: '' }
];

// Inicialização da Tabela de Ataques
document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.getElementById('tabela-ataques');

    // Cria as linhas da tabela dinamicamente usando os dados do objeto acima (Sem a coluna Nome)
    ataquesIniciais.forEach(ataque => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="col-id">${ataque.id}</td>
            <td class="col-tipo"><div class="textarea-cell" contenteditable="true" placeholder="Tipo...">${ataque.nome}</div></td>
            <td class="col-dano"><div class="textarea-cell" contenteditable="true" placeholder="Dano...">${ataque.dano}</div></td>
            <td class="col-desc"><div class="textarea-cell" contenteditable="true" placeholder="Descrição do ataque...">${ataque.descricao}</div></td>
        `;
        tabela.appendChild(tr);
    });

    // Ajusta o tamanho das células preenchidas logo na inicialização da página
    document.querySelectorAll('.textarea-cell').forEach(cell => {
        if (cell.innerText.trim() !== "") {
            cell.style.height = (cell.scrollHeight) + 'px';
        }
    });

    // Evento de auto-ajuste de altura dinâmico ao digitar (Estilo chat)
    document.addEventListener('input', function (e) {
        if (e.target.classList.contains('textarea-cell')) {
            e.target.style.height = 'auto';
            e.target.style.height = (e.target.scrollHeight) + 'px';
        }
    });
});