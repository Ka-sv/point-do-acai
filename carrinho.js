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
