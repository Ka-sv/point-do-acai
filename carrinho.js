let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    
    itensCarrinho.innerHTML = '';
    total = 0;
    
    carrinho.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} 
            <button onclick="removerItem(${index})">Remover</button>`;
        itensCarrinho.appendChild(itemDiv);
        total += item.preco;
    });

    totalCarrinho.innerText = total.toFixed(2);
}

function finalizarCompra() {
    if (carrinho.length > 0) {
        alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}`);
        carrinho = [];
        atualizarCarrinho();
    } else {
        alert('O carrinho está vazio!');
    }
}

// Função para mostrar ou esconder o carrinho
function toggleCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    if (carrinhoDiv.style.display === 'none') {
        carrinhoDiv.style.display = 'block';
        // Adicionar evento para fechar com 'ESC'
        document.addEventListener('keydown', fecharComEsc);
    } else {
        carrinhoDiv.style.display = 'none';
        // Remover evento quando o carrinho estiver fechado
        document.removeEventListener('keydown', fecharComEsc);
    }
}

// Função para fechar o carrinho com a tecla 'ESC'
function fecharComEsc(event) {
    if (event.key === 'Escape') {
        toggleCarrinho();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarCardapio();
});

function carregarCardapio() {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const menuSecao = document.querySelector('.menu-secao');
            menuSecao.innerHTML = ""; // Limpa a seção para evitar duplicação

            data.menu.forEach(categoria => {
                // Adiciona o título da categoria
                const categoriaDiv = document.createElement('div');
                categoriaDiv.className = 'categoria';
                categoriaDiv.innerHTML = `<h3 class="categoria-titulo">${categoria.categoria}</h3>`;

                const pratosContainer = document.createElement('div');
                pratosContainer.className = 'pratos-container';

                // Adiciona os itens com imagem
                categoria.itens.forEach(item => {
                    const pratoItem = document.createElement('article');
                    pratoItem.className = 'prato-item';
                    pratoItem.innerHTML = `
                        <img src="${item.imagem}" alt="${item.nome}" class="prato-img">
                        <h4 class="prato-nome">${item.nome}</h4>
                        <p class="prato-descricao">${item.descricao}</p>
                        <p>R$ ${item.preco.toFixed(2)}</p>
                        <button class="btn-add-cart" onclick="adicionarAoCarrinho('${item.nome}', ${item.preco})">
                            Adicionar ao Carrinho
                        </button>
                    `;
                    pratosContainer.appendChild(pratoItem);
                });

                categoriaDiv.appendChild(pratosContainer);
                menuSecao.appendChild(categoriaDiv);
            });
        })
        .catch(error => console.error("Erro ao carregar o cardápio:", error));
}
