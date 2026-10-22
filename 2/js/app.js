/* Módulo 2 · interfaz: calculadora, gráfico del residuo y tabla de pruebas. */

const BASE = {
  A: [[4, 1, 1], [1, 5, 1], [1, 1, 6]],
  b: [9, 14, 21],
};

const PRESETS = {
  base: BASE,
  singular: { A: [[1, 2], [2, 4]], b: [3, 6] },
  pivote: { A: [[1e-7, 1], [1, 1]], b: [1, 2] },
};

const $ = id => document.getElementById(id);
let chart = null;

function fmt(v) {
  return Number.isFinite(v) ? v.toPrecision(10) : String(v);
}

function sizeNow() {
  return Number($("size").value);
}

// Crea las celdas de A y b según el tamaño, con los valores dados (o ceros).
function buildInputs(n, A = null, b = null) {
  const matrix = $("matrixInputs");
  const vector = $("vectorInputs");
  matrix.style.gridTemplateColumns = `repeat(${n}, minmax(64px, 1fr))`;
  matrix.innerHTML = "";
  vector.innerHTML = "";
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const input = document.createElement("input");
      input.type = "number";
      input.step = "any";
      input.value = A ? A[i][j] : 0;
      input.setAttribute("aria-label", `A fila ${i + 1}, columna ${j + 1}`);
      matrix.appendChild(input);
    }
    const input = document.createElement("input");
    input.type = "number";
    input.step = "any";
    input.value = b ? b[i] : 0;
    input.setAttribute("aria-label", `b fila ${i + 1}`);
    vector.appendChild(input);
  }
}

function readSystem() {
  const n = sizeNow();
  const cells = [...$("matrixInputs").querySelectorAll("input")].map(i => i.value.trim());
  const bCells = [...$("vectorInputs").querySelectorAll("input")].map(i => i.value.trim());
  const A = [];
  for (let i = 0; i < n; i += 1) A.push(cells.slice(i * n, i * n + n).map(Number));
  const b = bCells.map(Number);
  const vacio = [...cells, ...bCells].some(v => v === "");
  return { A, b, vacio };
}

function setMessage(text, tipo = "info") {
  const el = $("message");
  el.textContent = text;
  el.className = `message ${tipo}`;
}

function renderGauss(r) {
  $("xGauss").textContent = r.x ? `(${r.x.map(v => v.toFixed(6)).join(", ")})` : "—";
  $("resGauss").textContent = r.residualInf !== undefined ? r.residualInf.toExponential(2) : "—";
  $("gaussSteps").innerHTML = r.steps.map(s => {
    const filas = s.matriz.map(fila => `<tr>${fila.map(v => `<td>${fmt(Number(v.toFixed(6)))}</td>`).join("")}</tr>`).join("");
    return `<div class="step"><p><strong>${s.titulo}</strong></p><table class="mini"><tbody>${filas}</tbody></table></div>`;
  }).join("") || "<p class=\"hint\">Sin pasos disponibles.</p>";
}

function renderGs(r, n) {
  $("xGs").textContent = r.x ? `(${r.x.map(v => v.toFixed(6)).join(", ")})` : "—";
  const last = r.rows[r.rows.length - 1];
  $("resGs").textContent = last ? last.residuo.toExponential(2) : "—";

  const head = $("gsTable").querySelector("thead");
  const body = $("gsTable").querySelector("tbody");
  head.innerHTML = `<tr><th>Iteración</th>${Array.from({ length: n }, (_, i) => `<th>x${i + 1}</th>`).join("")}<th>Residuo ‖·‖∞</th><th>Cambio ‖·‖∞</th></tr>`;
  body.innerHTML = r.rows.map(row =>
    `<tr><td>${row.iteracion}</td>${row.x.map(v => `<td>${v.toFixed(8)}</td>`).join("")}<td>${row.residuo.toExponential(2)}</td><td>${row.cambio.toExponential(2)}</td></tr>`
  ).join("");

  drawResidual(r.rows);
}

function drawResidual(rows) {
  if (typeof Chart === "undefined") return;
  const ctx = $("residualChart");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: rows.map(r => r.iteracion),
      datasets: [{
        label: "Residuo ‖b − A·x‖∞",
        data: rows.map(r => r.residuo),
        borderColor: "#ef6c45",
        backgroundColor: "#ef6c45",
        pointRadius: 3,
        tension: 0.2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: "Iteración" } },
        y: { type: "logarithmic", title: { display: true, text: "Residuo (escala log)" } },
      },
      plugins: { legend: { labels: { color: "#14232e" } } },
    },
  });
}

function solve() {
  const { A, b, vacio } = readSystem();
  if (vacio) {
    setMessage("Completa todas las celdas de la matriz y del vector.", "error");
    return;
  }
  const method = $("method").value;
  const tol = Number($("tol").value);
  const maxIter = Number($("maxIter").value);
  if (!(tol > 0)) {
    setMessage("La tolerancia debe ser mayor que cero (ej. 0.000001).", "error");
    return;
  }
  if (!(maxIter >= 1)) {
    setMessage("El máximo de iteraciones debe ser al menos 1.", "error");
    return;
  }

  const n = A.length;
  const g = gaussPartialPivot(A, b);
  const s = gaussSeidel(A, b, { tol, maxIter });

  $("results").hidden = false;
  if (method !== "gs") renderGauss(g); else { $("xGauss").textContent = "—"; $("resGauss").textContent = "—"; $("gaussSteps").innerHTML = ""; }
  if (method !== "gauss") renderGs(s, n); else { $("xGs").textContent = "—"; $("resGs").textContent = "—"; $("gsTable").querySelector("tbody").innerHTML = ""; }

  const partes = [];
  if (method !== "gs") partes.push(g.message);
  if (method !== "gauss") partes.push(s.message);
  if (g.warnings) partes.push(...g.warnings);
  if (method !== "gauss" && !s.dominant) partes.push("La matriz no es estrictamente diagonal dominante: Gauss-Seidel puede no converger aquí.");
  const tipo = g.status === "singular" || s.status === "error" ? "error" : (s.status === "limite" || (g.warnings && g.warnings.length)) ? "warn" : "ok";
  setMessage(partes.join(" "), tipo);
}

function loadPreset(nombre) {
  const p = PRESETS[nombre];
  $("size").value = String(p.A.length);
  buildInputs(p.A.length, p.A, p.b);
  $("results").hidden = true;
  setMessage("");
}

function renderTests() {
  const body = $("testsBody");
  body.innerHTML = CASOS.map(c => {
    const r = c.run();
    return `<tr><td>${c.id}</td><td>${c.metodo}</td><td>${c.tipo}</td><td>${c.entrada}</td><td>${c.esperado}</td>` +
      `<td class="${r.ok ? "pass" : "fail"}">${r.ok ? "Cumple" : "No cumple"}<br><small>${r.observado}</small></td></tr>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  $("size").addEventListener("change", () => {
    const n = sizeNow();
    const cur = readSystem();
    const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (cur.A[i] && cur.A[i][j] !== undefined && !Number.isNaN(cur.A[i][j]) ? cur.A[i][j] : (i === j ? 1 : 0))));
    const b = Array.from({ length: n }, (_, i) => (cur.b[i] !== undefined && !Number.isNaN(cur.b[i]) ? cur.b[i] : 0));
    buildInputs(n, A, b);
  });
  document.querySelectorAll("[data-preset]").forEach(btn => btn.addEventListener("click", () => loadPreset(btn.dataset.preset)));
  $("reset").addEventListener("click", () => loadPreset("base"));
  $("solve").addEventListener("click", solve);
  loadPreset("base");
  renderTests();
  $("ejemplosExtra").innerHTML = EJEMPLOS_EXTRA_2;
  renderExercises($("ejercicios-lista"), EJERCICIOS_2);
  renderQuiz($("quiz"), AUTOEVALUACION_2);
});
