/*
 * Navegación de los módulos ITERA: vistas SPA, menú móvil y enlaces con ancla.
 * Mismo comportamiento que el módulo 1: cada sección es <section class="view" data-section="...">.
 */

function switchView(view) {
  const destino = document.querySelector(`.view[data-section="${view}"]`);
  if (!destino) return;
  document.querySelectorAll(".view").forEach(s => s.classList.toggle("active-view", s === destino));
  document.querySelectorAll(".nav a[data-view]").forEach(a => a.classList.toggle("active", a.dataset.view === view));
  toggleNav(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise();
}

function toggleNav(open) {
  document.getElementById("mainNav").classList.toggle("open", open);
  document.getElementById("navBackdrop").classList.toggle("show", open);
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(open));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-view]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const view = link.dataset.view;
      switchView(view);
      history.replaceState(null, "", `#${view}`);
    });
  });
  document.getElementById("menuToggle").addEventListener("click", () =>
    toggleNav(!document.getElementById("mainNav").classList.contains("open")));
  document.getElementById("navClose").addEventListener("click", () => toggleNav(false));
  document.getElementById("navBackdrop").addEventListener("click", () => toggleNav(false));

  const inicial = location.hash.replace("#", "");
  if (inicial && document.querySelector(`.view[data-section="${inicial}"]`)) switchView(inicial);
});
