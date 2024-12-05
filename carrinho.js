let carrinho = [];
let total = 0;
let numeroPedido = 1; // Para numerar os pedidos

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

// Função para remover um item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
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

    totalCarrinho.innerText = `Total: R$ ${total.toFixed(2)}`;
}

// Função para finalizar a compra e enviar o pedido para o WhatsApp
function finalizarCompra() {
    if (carrinho.length > 0) {
        const mensagem = criarMensagemWhatsApp();
        const telefoneRestaurante = "5511965779827"; // Substitua pelo número do restaurante
        const urlWhatsApp = `https://wa.me/${telefoneRestaurante}?text=${encodeURIComponent(mensagem)}`;
        
        // Abre o WhatsApp em uma nova aba
        window.open(urlWhatsApp, '_blank');

        // Incrementa o número do pedido e limpa o carrinho
        numeroPedido++;
        carrinho = [];
        atualizarCarrinho();
    } else {
        alert('O carrinho está vazio!');
    }
}

// Função para criar a mensagem de WhatsApp com os detalhes do pedido
function criarMensagemWhatsApp() {
    let mensagem = `*Pedido Nº ${numeroPedido}*\n\n*Itens do Pedido:*`;
    carrinho.forEach(item => {
        mensagem += `\n- ${item.nome} (R$ ${item.preco.toFixed(2)})`;
    });
    mensagem += `\n\n*Total: R$ ${total.toFixed(2)}*`;
    mensagem += `\n\nObrigado pelo pedido!`;
    return mensagem;
}

// Função para mostrar ou esconder o carrinho
function toggleCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    if (carrinhoDiv.style.display === 'none') {
        carrinhoDiv.style.display = 'block';
        document.addEventListener('keydown', fecharComEsc);
    } else {
        carrinhoDiv.style.display = 'none';
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

// Função para carregar o cardápio dinâmico a partir de menu.json
function carregarCardapio() {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const menuSecao = document.querySelector('.menu-secao');
            menuSecao.innerHTML = "";

            data.menu.forEach(categoria => {
                const categoriaDiv = document.createElement('div');
                categoriaDiv.className = 'categoria';
                categoriaDiv.innerHTML = `<h3 class="categoria-titulo">${categoria.categoria}</h3>`;

                const pratosContainer = document.createElement('div');
                pratosContainer.className = 'pratos-container';

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
