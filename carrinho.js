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
