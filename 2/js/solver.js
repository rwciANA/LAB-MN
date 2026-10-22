/*
 * Solucionador paso a paso de los ejercicios del módulo 2.
 * Usa los mismos algoritmos que la calculadora, así la solución mostrada y la calculadora coinciden.
 */

function fmtN(v, d = 6) {
  if (!Number.isFinite(v)) return String(v);
  return String(Number(v.toFixed(d)));
}

function tablaSimple(encabezados, filas) {
  const head = encabezados.map(h => `<th>${h}</th>`).join("");
  const body = filas.map(f => `<tr>${f.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
  return `<div class="table-scroll"><table class="calc-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function matrizHTML(M) {
  const n = M.length;
  const filas = M.map(fila => `<tr>${fila.map((v, j) => `<td${j === n ? ' class="aug"' : ""}>${fmtN(v, 4)}</td>`).join("")}</tr>`).join("");
  return `<table class="mini"><tbody>${filas}</tbody></table>`;
}

// Cálculo manual de la primera iteración de Gauss-Seidel, componente por componente.
function detalleIteracion1(A, b) {
  const n = A.length;
  const x = new Array(n).fill(0);
  const lineas = [];
  for (let i = 0; i < n; i += 1) {
    const terminos = [];
    let suma = b[i];
    for (let j = 0; j < n; j += 1) {
      if (j === i) continue;
      terminos.push(`${A[i][j]}·${fmtN(x[j], 4)}`);
      suma -= A[i][j] * x[j];
    }
    x[i] = suma / A[i][i];
    const resta = terminos.length ? ` − (${terminos.join(" + ")})` : "";
    lineas.push(`<li>x<sub>${i + 1}</sub> = (${b[i]}${resta}) / ${A[i][i]} = <strong>${fmtN(x[i], 6)}</strong></li>`);
  }
  return `<ol class="calc-steps">${lineas.join("")}</ol>`;
}

// Rectas a1·x + a2·y = b1 y su punto de corte (la solución), para sistemas 2 × 2.
function graficarRectas(A, b, x, canvas) {
  const xs = [x[0] - 3, x[0] + 3];
  const recta = fila => {
    const [a, c] = A[fila];
    return [{ x: xs[0], y: (b[fila] - a * xs[0]) / c }, { x: xs[1], y: (b[fila] - a * xs[1]) / c }];
  };
  return new Chart(canvas, {
    type: "line",
    data: { datasets: [
      { label: "Ecuación 1", data: recta(0), borderColor: "#185e73", pointRadius: 0 },
      { label: "Ecuación 2", data: recta(1), borderColor: "#327c62", pointRadius: 0 },
      { type: "scatter", label: "Solución", data: [{ x: x[0], y: x[1] }], backgroundColor: "#ef6c45", pointRadius: 7 },
    ] },
    options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear", title: { display: true, text: "x" } }, y: { title: { display: true, text: "y" } } } },
  });
}

// Evolución de cada componente xᵢ a lo largo de las iteraciones de Gauss-Seidel.
function graficarComponentes(filas, n, canvas) {
  const colores = ["#ef6c45", "#185e73", "#327c62"];
  return new Chart(canvas, {
    type: "line",
    data: {
      labels: filas.map(f => f.iteracion),
      datasets: Array.from({ length: n }, (_, i) => ({
        label: `x${i + 1}`, data: filas.map(f => f.x[i]), borderColor: colores[i], backgroundColor: colores[i], tension: 0.2,
      })),
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: "Iteración" } }, y: { title: { display: true, text: "Valor de la componente" } } } },
  });
}

/**
 * Devuelve { html, charts } para un ejercicio de tipo "gauss" o "gs".
 * chart (opcional) es una función que recibe un canvas y dibuja el residuo por iteración.
 */
function solucionSistema(ej) {
  const { A, b } = ej.datos;
  const n = A.length;

  if (ej.tipo === "gauss") {
    const r = gaussPartialPivot(A, b);
    let html = "<h4>Eliminación gaussiana con pivoteo parcial, paso a paso</h4>";
    html += r.steps.map((s, i) =>
      `<div class="step"><p><strong>Paso ${i + 1}. ${escapeHtml(s.titulo)}</strong></p>${matrizHTML(s.matriz)}</div>`
    ).join("");
    if (r.status === "ok") {
      html += `<p>Sustitución hacia atrás: <strong>x = (${r.x.map(v => fmtN(v)).join(", ")})</strong>.</p>`;
      html += `<p>Residuo ‖b − A·x‖∞ = ${r.residualInf.toExponential(2)}.</p>`;
    } else {
      html += `<p><strong>${escapeHtml(r.message)}</strong></p>`;
    }
    const charts = n === 2 ? [canvas => graficarRectas(A, b, r.x, canvas)] : [];
    return { html, charts };
  }

  // Gauss-Seidel
  const tol = 1e-6;
  const maxIter = ej.datos.maxIter || 100;
  const s = gaussSeidel(A, b, { tol, maxIter });
  const encabezados = ["k", ...Array.from({ length: n }, (_, i) => `x<sub>${i + 1}</sub>`), "Residuo ‖·‖∞", "Cambio ‖·‖∞"];
  const filas = s.rows.map(row => [
    row.iteracion, ...row.x.map(v => fmtN(v, 8)), row.residuo.toExponential(2), row.cambio.toExponential(2),
  ]);
  let html = "<h4>Primera iteración, componente por componente (desde x₀ = 0)</h4>";
  html += detalleIteracion1(A, b);
  html += "<h4>Tabla de iteraciones</h4>" + tablaSimple(encabezados, filas);
  html += `<p>${escapeHtml(s.message)}</p>`;
  html += `<p>Dominancia diagonal estricta: <strong>${s.dominant ? "sí, Gauss-Seidel converge" : "no; la convergencia no está garantizada por esta condición"}</strong>.</p>`;
  if (s.status === "ok") {
    html += `<p>Solución aproximada: <strong>x ≈ (${s.x.map(v => fmtN(v, 6)).join(", ")})</strong>.</p>`;
  }
  const etiquetas = s.rows.map(r => r.iteracion);
  const residuos = s.rows.map(r => r.residuo);
  const chart = canvas => new Chart(canvas, {
    type: "line",
    data: { labels: etiquetas, datasets: [{ label: "Residuo ‖b − A·x‖∞", data: residuos, borderColor: "#ef6c45", backgroundColor: "#ef6c45", tension: 0.2 }] },
    options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: "Iteración" } }, y: { type: "logarithmic", title: { display: true, text: "Residuo" } } } },
  });
  const componentes = canvas => graficarComponentes(s.rows, n, canvas);
  return { html, charts: [chart, componentes] };
}

