/* Módulo 3 · interfaz: editor de datos, Lagrange, regresión, gráfico comparativo y pruebas. */

const PRESETS = {
  base: { xs: [0, 1, 2, 3], ys: [1, 2, 2, 4], x: 1.5 },
  repetida: { xs: [0, 1, 1, 3], ys: [1, 2, 5, 4], x: 1.5 },
  iguales: { xs: [2, 2, 2, 2], ys: [1, 2, 3, 4], x: 1.5 },
};

const $ = id => document.getElementById(id);
let chart = null;

function fmt(v, d = 6) {
  return Number.isFinite(v) ? v.toFixed(d) : String(v);
}

// Crea n filas de (x, y) con los valores dados o vacíos.
function buildPoints(n, xs = [], ys = []) {
  const box = $("pointsInputs");
  box.innerHTML = "";
  for (let i = 0; i < n; i += 1) {
    const row = document.createElement("div");
    row.className = "point-row";
    row.innerHTML = `<span class="idx">${i + 1}</span>` +
      `<input type="number" step="any" aria-label="x del dato ${i + 1}" value="${xs[i] ?? ""}">` +
      `<input type="number" step="any" aria-label="y del dato ${i + 1}" value="${ys[i] ?? ""}">`;
    box.appendChild(row);
  }
}

function readPoints() {
  const rows = [...$("pointsInputs").querySelectorAll(".point-row")];
  const xs = [];
  const ys = [];
  let vacio = false;
  for (const row of rows) {
    const [xi, yi] = row.querySelectorAll("input");
    if (xi.value.trim() === "" || yi.value.trim() === "") vacio = true;
    xs.push(Number(xi.value));
    ys.push(Number(yi.value));
  }
  return { xs, ys, vacio };
}

function setMessage(text, tipo = "info") {
  const el = $("message");
  el.textContent = text;
  el.className = `message ${tipo}`;
}

function renderBases(r) {
  const head = $("basesTable").querySelector("thead");
  const body = $("basesTable").querySelector("tbody");
  head.innerHTML = "<tr><th>i</th><th>xᵢ</th><th>yᵢ</th><th>Lᵢ(x)</th><th>Contribución Lᵢ(x)·yᵢ</th></tr>";
  body.innerHTML = r.bases.map(b =>
    `<tr><td>${b.i}</td><td>${b.xi}</td><td>${b.yi}</td><td>${fmt(b.L, 6)}</td><td>${fmt(b.contribucion, 6)}</td></tr>`
  ).join("") + `<tr><td colspan="4"><strong>Suma = P(x)</strong></td><td><strong>${fmt(r.value, 6)}</strong></td></tr>`;
}

function renderResiduals(reg, xs, ys) {
  const head = $("resTable").querySelector("thead");
  const body = $("resTable").querySelector("tbody");
  head.innerHTML = "<tr><th>x</th><th>y</th><th>ŷ = a + b·x</th><th>Residuo y − ŷ</th></tr>";
  body.innerHTML = xs.map((x, i) =>
    `<tr><td>${x}</td><td>${ys[i]}</td><td>${fmt(reg.predecir(x), 6)}</td><td>${fmt(reg.residuos[i], 6)}</td></tr>`
  ).join("");
}

function drawChart(xs, ys, lag, reg) {
  if (typeof Chart === "undefined") return;
  if (chart) chart.destroy();

  const min = Math.min(...xs) - 0.5;
  const max = Math.max(...xs) + 0.5;
  const puntos = [];
  for (let k = 0; k <= 120; k += 1) puntos.push(min + ((max - min) * k) / 120);

  const datasets = [
    { type: "scatter", label: "Datos", data: xs.map((x, i) => ({ x, y: ys[i] })), backgroundColor: "#14232e", pointRadius: 5 },
  ];
  if (lag) {
    datasets.push({
      type: "line", label: "Lagrange (pasa por los datos)",
      data: puntos.map(x => ({ x, y: lagrange(xs, ys, x).value })),
      borderColor: "#ef6c45", backgroundColor: "#ef6c45", pointRadius: 0, tension: 0.2,
    });
  }
  if (reg) {
    datasets.push({
      type: "line", label: "Regresión lineal (tendencia)",
      data: [{ x: min, y: reg.predecir(min) }, { x: max, y: reg.predecir(max) }],
      borderColor: "#185e73", backgroundColor: "#185e73", pointRadius: 0, borderDash: [6, 4],
    });
  }

  chart = new Chart($("curveChart"), {
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      parsing: false,
      scales: {
        x: { type: "linear", title: { display: true, text: "Carga normalizada x" } },
        y: { title: { display: true, text: "Latencia y (ms)" } },
      },
      plugins: { legend: { labels: { color: "#14232e" } } },
    },
  });
}

function calculate() {
  const { xs, ys, vacio } = readPoints();
  if (vacio) {
    setMessage("Completa todos los valores de x e y.", "error");
    return;
  }
  const q = Number($("xQuery").value);
  if (!Number.isFinite(q)) {
    setMessage("La consulta x debe ser un número.", "error");
    return;
  }
  const method = $("method").value;
  const showLag = method !== "reg";
  const showReg = method !== "lagrange";

  const lag = showLag ? lagrange(xs, ys, q) : null;
  const reg = showReg ? linearRegression(xs, ys) : null;

  if (showLag && lag.status === "error") { setMessage(lag.message, "error"); $("results").hidden = true; return; }
  if (showReg && reg.status === "error") { setMessage(reg.message, "error"); $("results").hidden = true; return; }

  $("results").hidden = false;
  $("valLagrange").textContent = showLag ? fmt(lag.value, 6) : "—";
  $("valReg").textContent = showReg ? fmt(reg.predecir(q), 6) : "—";
  $("coefReg").textContent = showReg ? `${fmt(reg.pendiente, 6)} / ${fmt(reg.intercepto, 6)}` : "—";
  $("scr").textContent = showReg ? fmt(reg.scr, 6) : "—";

  if (showLag) renderBases(lag); else $("basesTable").querySelector("tbody").innerHTML = "";
  if (showReg) renderResiduals(reg, xs, ys); else $("resTable").querySelector("tbody").innerHTML = "";
  drawChart(xs, ys, showLag ? lag : null, showReg ? reg : null);

  const partes = [];
  if (showLag) partes.push(lag.message);
  if (showReg) partes.push("Regresión calculada.");
  if (showLag && showReg) partes.push("Lagrange y la recta no coinciden: Lagrange busca pasar por cada dato, la recta describe la tendencia.");
  const aviso = showLag && !lag.dentro;
  setMessage(partes.join(" "), aviso ? "warn" : "ok");
}

function loadPreset(nombre) {
  const p = PRESETS[nombre];
  $("nCount").value = String(p.xs.length);
  $("xQuery").value = String(p.x);
  buildPoints(p.xs.length, p.xs, p.ys);
  $("results").hidden = true;
  setMessage("");
}

function renderTests() {
  $("testsBody").innerHTML = CASOS.map(c => {
    const r = c.run();
    return `<tr><td>${c.id}</td><td>${c.metodo}</td><td>${c.tipo}</td><td>${c.entrada}</td><td>${c.esperado}</td>` +
      `<td class="${r.ok ? "pass" : "fail"}">${r.ok ? "Cumple" : "No cumple"}<br><small>${r.observado}</small></td></tr>`;
  }).join("");
}

// Carga un ejercicio en la calculadora, lo calcula y muestra la vista de la calculadora.
function cargarEjercicioEnCalculadora(ej) {
  const { xs, ys, x } = ej.datos;
  $("nCount").value = String(xs.length);
  buildPoints(xs.length, xs, ys);
  $("xQuery").value = String(x);
  $("method").value = ej.tipo === "regresion" ? "reg" : ej.tipo === "comparacion" ? "both" : "lagrange";
  calculate();
  switchView("calculadora");
}

document.addEventListener("DOMContentLoaded", () => {
  $("nCount").addEventListener("change", () => {
    const n = Math.min(6, Math.max(2, Math.round(Number($("nCount").value)) || 2));
    $("nCount").value = String(n);
    const { xs, ys } = readPoints();
    buildPoints(n, xs, ys);
  });
  document.querySelectorAll("[data-preset]").forEach(btn => btn.addEventListener("click", () => loadPreset(btn.dataset.preset)));
  $("reset").addEventListener("click", () => loadPreset("base"));
  $("solve").addEventListener("click", calculate);
  loadPreset("base");
  renderTests();
  $("ejemplosExtra").innerHTML = EJEMPLOS_EXTRA_3;
  renderSolvedExercises($("ejercicios-lista"), [...EJERCICIOS_3, ...EJERCICIOS_3_MAS], { generar: generarSolucion, resolver: cargarEjercicioEnCalculadora });
  renderQuiz($("quiz"), AUTOEVALUACION_3);
});
