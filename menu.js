function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

  function rolarParaContato() {
    const contatoSection = document.getElementById('contato');
    contatoSection.scrollIntoView({ behavior: 'smooth' });
}

function rolarParaCardapio() {
  const cardapioSection = document.getElementById('cardapio');
  cardapioSection.scrollIntoView({ behavior: 'smooth' });
}
