/*
 * Comportamiento flotante del teclado matemático (ITERA): minimizar, cerrar, reabrir y arrastrar.
 * Uso: activarTecladoFlotante(elementoTeclado, botonFlotante)
 */

function activarTecladoFlotante(dock, fab) {
  if (!dock || !fab) return;
  const cabecera = dock.querySelector(".keypad-head");

  if (!cabecera.querySelector(".kp-controles")) {
    const controles = document.createElement("div");
    controles.className = "kp-controles";
    controles.innerHTML =
      '<button type="button" class="kp-ctrl" data-kp="min" aria-label="Minimizar teclado" title="Minimizar"><i class="fa-solid fa-minus" aria-hidden="true"></i></button>' +
      '<button type="button" class="kp-ctrl" data-kp="close" aria-label="Cerrar teclado" title="Cerrar"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>';
    cabecera.appendChild(controles);
  }

  const mostrar = () => {
    dock.classList.remove("kp-oculto", "kp-min");
    fab.classList.add("kp-fab-oculto");
  };
  const minimizar = () => {
    const minimizado = dock.classList.toggle("kp-min");
    cabecera.querySelector('[data-kp="min"] i').className = minimizado ? "fa-solid fa-plus" : "fa-solid fa-minus";
  };
  const cerrar = () => {
    dock.classList.add("kp-oculto");
    fab.classList.remove("kp-fab-oculto");
  };

  cabecera.querySelector('[data-kp="min"]').addEventListener("click", minimizar);
  cabecera.querySelector('[data-kp="close"]').addEventListener("click", cerrar);
  fab.addEventListener("click", () => {
    if (dock.classList.contains("kp-oculto")) mostrar(); else minimizar();
  });

  // Arrastre desde la cabecera, dentro de la ventana.
  let arrastre = null;
  cabecera.addEventListener("pointerdown", e => {
    if (e.target.closest("button")) return;
    const r = dock.getBoundingClientRect();
    arrastre = { dx: e.clientX - r.left, dy: e.clientY - r.top };
    cabecera.setPointerCapture(e.pointerId);
    cabecera.classList.add("kp-arrastrando");
  });
  cabecera.addEventListener("pointermove", e => {
    if (!arrastre) return;
    const x = Math.max(0, Math.min(window.innerWidth - dock.offsetWidth, e.clientX - arrastre.dx));
    const y = Math.max(0, Math.min(window.innerHeight - 48, e.clientY - arrastre.dy));
    dock.style.left = `${x}px`;
    dock.style.top = `${y}px`;
    dock.style.right = "auto";
    dock.style.bottom = "auto";
  });
  const soltar = () => {
    arrastre = null;
    cabecera.classList.remove("kp-arrastrando");
  };
  cabecera.addEventListener("pointerup", soltar);
  cabecera.addEventListener("pointercancel", soltar);

  mostrar();
}
