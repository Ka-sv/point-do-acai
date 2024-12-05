async function loadSpecial() {
  try {
      const response = await fetch('/api/prato-do-dia');
      const pratoDoDia = await response.json();
      document.querySelector('.prato-do-dia .nome').innerText = pratoDoDia.name;
      document.querySelector('.prato-do-dia .descricao').innerText = pratoDoDia.description;
      document.querySelector('.prato-do-dia .imagem').src = pratoDoDia.image;
      document.querySelector('.prato-do-dia .mensagem').innerText = "Hoje temos uma deliciosa opção para você!";
  } catch (error) {
      console.error('Erro ao carregar o prato do dia:', error);
  }
}

async function loadMenu(category) {
  try {
      const response = await fetch(`/api/menu/${category}`);
      const items = await response.json();

      const container = document.querySelector(`.menu-${category}`);
      container.innerHTML = ""; // Limpa itens antigos

      items.forEach(item => {
          const itemElement = `
              <div class="menu-item">
                  <img src="${item.image}" alt="${item.name}">
                  <h3>${item.name}</h3>
                  <p>${item.description}</p>
                  <span class="price">R$ ${item.price.toFixed(2)}</span>
              </div>
          `;
          container.innerHTML += itemElement;
      });
  } catch (error) {
      console.error(`Erro ao carregar a categoria ${category}:`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadSpecial();
  loadMenu('Entradas');
  loadMenu('Pratos Principais');
});
