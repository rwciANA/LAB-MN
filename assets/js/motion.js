/*
 * Animaciones de ITERA (vanilla JS, sin dependencias):
 * - Revela los bloques al entrar en pantalla, con retraso escalonado entre hermanos.
 * - Marca los títulos de sección cuando aparecen.
 * - Reproduce paso a paso una solución o una tabla con el botón "Reproducir".
 * Se respeta prefers-reduced-motion (el CSS desactiva las transiciones).
 */

const SELECTORES_REVELAR = [
  ".stats > div", ".calc-table tbody tr", ".step", ".timeline li", ".ejemplo-extra", ".theory-card",
  ".paradigm-box", ".q", ".ejercicio", ".exercise-card", ".quiz-card", ".ref-list li", ".glossary dt",
  ".glossary dd", ".route-steps li", ".calc-aside > *", ".solucion > *", ".output-panel > *", ".ejemplo-extra",
  ".steps-list li", ".card-top", ".principle-card", ".method-card", ".team-card",
].join(",");

const HAY_OBSERVADOR = typeof IntersectionObserver !== "undefined";

const observadorVista = HAY_OBSERVADOR ? new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("vis");
      observadorVista.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }) : null;

function prepararRevelado(el) {
  if (el.dataset.motion === "1" || el.classList.contains("keypad-dock")) return;
  el.dataset.motion = "1";
  el.classList.add("anim-ready");
  // retraso según la posición entre hermanos (efecto escalonado)
  const hermanos = el.parentElement ? [...el.parentElement.children] : [el];
  const i = hermanos.indexOf(el) % 8;
  el.style.setProperty("--retraso", `${i * 70}ms`);
  if (HAY_OBSERVADOR) observadorVista.observe(el);
  else el.classList.add("vis");
}

function revelarExistentes(raiz = document) {
  raiz.querySelectorAll(SELECTORES_REVELAR).forEach(prepararRevelado);
  raiz.querySelectorAll(".section-heading").forEach(h => {
    if (!HAY_OBSERVADOR) { h.classList.add("visto"); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { h.classList.add("visto"); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (!h.dataset.motion) { h.dataset.motion = "1"; obs.observe(h); }
  });
}

// Reproduce, uno a uno, los hijos de un contenedor marcado con data-reproducir.
// Busca el contenedor de pasos que sigue al botón.
function contenedorDe(boton) {
  let n = (boton.closest(".btn-wrap") || boton).nextElementSibling;
  while (n) {
    if (n.matches("[data-reproducir]")) return n;
    const dentro = n.querySelector("[data-reproducir]");
    if (dentro) return dentro;
    n = n.nextElementSibling;
  }
  return null;
}

// Reproduce, uno a uno, las filas o pasos de un contenedor [data-reproducir].
function reproducir(boton) {
  const contenedor = contenedorDe(boton);
  if (!contenedor) return;
  const items = contenedor.querySelector("tbody")
    ? [...contenedor.querySelectorAll("tbody tr")]
    : [...contenedor.children];
  const barra = (boton.closest(".btn-wrap") || boton).parentElement.querySelector(".barra-progreso span");
  let k = 0;
  boton.classList.add("activo");
  items.forEach(it => it.classList.remove("paso-activo"));
  if (barra) barra.style.transform = "scaleX(0)";
  const tick = setInterval(() => {
    items.forEach(it => it.classList.remove("paso-activo"));
    if (k >= items.length) {
      clearInterval(tick);
      boton.classList.remove("activo");
      if (barra) barra.style.transform = "scaleX(1)";
      return;
    }
    items[k].classList.add("paso-activo");
    if (items[k].scrollIntoView) items[k].scrollIntoView({ block: "nearest", behavior: "smooth" });
    if (barra) barra.style.transform = "scaleX(" + ((k + 1) / items.length) + ")";
    k += 1;
  }, 750);
}

document.addEventListener("click", e => {
  const boton = e.target.closest("[data-play]");
  if (boton) reproducir(boton);
});

// Observa el contenido que se añade después (soluciones, resultados) y lo revela también.
const observadorDOM = new MutationObserver(mutaciones => {
  mutaciones.forEach(m => m.addedNodes.forEach(nodo => {
    if (nodo.nodeType !== 1) return;
    if (nodo.matches && nodo.matches(SELECTORES_REVELAR)) prepararRevelado(nodo);
    if (nodo.querySelectorAll) revelarExistentes(nodo);
  }));
});

document.addEventListener("DOMContentLoaded", () => {
  revelarExistentes();
  observadorDOM.observe(document.body, { childList: true, subtree: true });
});
