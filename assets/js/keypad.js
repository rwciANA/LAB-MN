/*
 * Teclado matemático compartido (ITERA): mismo comportamiento que el del módulo 1.
 * - Los campos con atributo data-math aceptan expresiones: 1/3, sqrt(2), pi/6, 2^3, sin(pi/4).
 * - El teclado escribe en el campo activo (el último que recibió foco) y puede ejecutar el cálculo.
 * Requiere math.js (window.math) para evaluar; sin math.js, solo se aceptan números.
 */

const TECLAS_KP = [
  { t: "π", v: "pi", c: "kp-fn", aria: "pi" },
  { t: "e", v: "e", c: "kp-fn", aria: "número e" },
  { t: "√", v: "sqrt(", c: "kp-fn", aria: "raíz cuadrada" },
  { t: "xʸ", v: "^", c: "kp-fn", aria: "potencia" },
  { t: "sin", v: "sin(", c: "kp-fn", aria: "seno" },
  { t: "cos", v: "cos(", c: "kp-fn", aria: "coseno" },
  { t: "tan", v: "tan(", c: "kp-fn", aria: "tangente" },
  { t: "ln", v: "log(", c: "kp-fn", aria: "logaritmo natural" },
  { t: "(", v: "(", c: "kp-fn", aria: "paréntesis izquierdo" },
  { t: ")", v: ")", c: "kp-fn", aria: "paréntesis derecho" },
  { t: "÷", v: "/", c: "kp-op", aria: "dividir" },
  { t: "×", v: "*", c: "kp-op", aria: "multiplicar" },
  { t: "7", v: "7" }, { t: "8", v: "8" }, { t: "9", v: "9" }, { t: "−", v: "-", c: "kp-op", aria: "restar" },
  { t: "4", v: "4" }, { t: "5", v: "5" }, { t: "6", v: "6" }, { t: "+", v: "+", c: "kp-op", aria: "sumar" },
  { t: "1", v: "1" }, { t: "2", v: "2" }, { t: "3", v: "3" }, { t: "⌫", a: "back", c: "kp-warn", aria: "borrar" },
  { t: "0", v: "0" }, { t: ".", v: "." }, { t: "C", a: "clear", c: "kp-warn kp-clear", aria: "limpiar campo" },
  { t: "▶", a: "run", c: "kp-run", aria: "calcular" },
];

let campoActivo = null;
let accionEjecutar = () => {};

// Evalúa una expresión numérica escrita en un campo. Devuelve NaN si no es válida.
function evalNum(texto) {
  const s = String(texto ?? "").trim();
  if (s === "") return NaN;
  try {
    if (typeof math !== "undefined") {
      const v = math.evaluate(s.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-"));
      return typeof v === "number" ? v : Number(v);
    }
  } catch (e) {
    return NaN;
  }
  return Number(s);
}

function insertarEnCampo(campo, token) {
  const start = campo.selectionStart ?? campo.value.length;
  const end = campo.selectionEnd ?? campo.value.length;
  campo.value = campo.value.slice(0, start) + token + campo.value.slice(end);
  try { campo.setSelectionRange(start + token.length, start + token.length); } catch (e) { /* campo sin selección */ }
}

function etiquetaCampo(campo) {
  if (!campo) return "Sin campo";
  return campo.dataset.label || campo.getAttribute("aria-label") || "Campo activo";
}

/**
 * Monta el teclado dentro de `montaje` y crea el botón flotante para móvil.
 * opciones.onRun: función que ejecuta el cálculo del módulo.
 */
function initKeypad(montaje, opciones = {}) {
  accionEjecutar = opciones.onRun || (() => {});
  const dock = document.createElement("div");
  dock.className = "keypad-dock";
  dock.id = "keypadDock";
  dock.innerHTML = `
    <div class="keypad-head">
      <span class="panel-kicker">TECLADO MATEMÁTICO</span>
      <span class="keypad-target" id="keypadTarget">Campo activo</span>
    </div>
    <div class="keypad" id="keypad">
      ${TECLAS_KP.map(k => `<button type="button" class="${k.c || ""}"${k.a ? ` data-action="${k.a}"` : ` data-insert="${k.v}"`} aria-label="${k.aria || k.t}">${k.t}</button>`).join("")}
    </div>
    <p class="keypad-hint">Puedes escribir directamente: <code>1/3</code>, <code>sqrt(2)</code>, <code>pi/6</code>, <code>2^3</code>.</p>`;
  montaje.appendChild(dock);

  const fab = document.createElement("button");
  fab.className = "keypad-fab";
  fab.id = "keypadFab";
  fab.type = "button";
  fab.setAttribute("aria-label", "Abrir teclado matemático");
  fab.innerHTML = '<i class="fa-solid fa-calculator"></i>';
  fab.addEventListener("click", () => dock.classList.toggle("open"));
  document.body.appendChild(fab);

  document.addEventListener("focusin", e => {
    if (e.target.matches && e.target.matches("input[data-math]")) {
      campoActivo = e.target;
      document.getElementById("keypadTarget").textContent = etiquetaCampo(campoActivo);
    }
  });

  dock.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const campo = campoActivo || document.querySelector("input[data-math]");
      if (btn.dataset.action === "run") { accionEjecutar(); return; }
      if (!campo) return;
      if (btn.dataset.action === "back") campo.value = campo.value.slice(0, -1);
      else if (btn.dataset.action === "clear") campo.value = "";
      else insertarEnCampo(campo, btn.dataset.insert);
      campo.focus();
    });
  });
}
