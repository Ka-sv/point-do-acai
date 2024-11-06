function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

  // menu-routes.js
function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

// Adiciona o event listener quando o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("menu-button").addEventListener("click", menuOnClick);
});


  
