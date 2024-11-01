// Função para carregar o prato do dia
function carregarPratoDoDia() {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const pratoDoDia = data.pratoDoDia;
            const pratoDiaSection = document.querySelector('.prato-dia');

            pratoDiaSection.innerHTML = `
                <section class="descricao-prato">
                    <h2>Prato do Dia</h2>
                    <p class="texto__prato-dia">${pratoDoDia.mensagem}</p>
                    <div class="prato-info">
                        <h3>${pratoDoDia.nome}</h3>
                        <p>${pratoDoDia.descricao}</p>
                    </div>
                </section>
                <section class="imagem-prato">
                    <img src="${pratoDoDia.imagem}" alt="Imagem do ${pratoDoDia.nome}">
                </section>
            `;
        })
        .catch(error => console.error("Erro ao carregar o prato do dia:", error));
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarPratoDoDia();
});
