// Controles de reproducción (los gestiona assets/js/motion.js).
const PLAY_HTML = `<div class="btn-wrap"><button type="button" class="ghost-btn btn-reproducir" data-play><i class="fa-solid fa-play" aria-hidden="true"></i> Reproducir paso a paso</button></div><div class="barra-progreso"><span></span></div>`;

/*
 * Solucionador paso a paso de los ejercicios del módulo 3.
 * Usa las mismas funciones que la calculadora (lagrange, linearRegression).
 */

function fmtM(v, d = 6) {
  if (!Number.isFinite(v)) return String(v);
  return String(Number(v.toFixed(d)));
}

function tablaM(encabezados, filas) {
  const head = encabezados.map(h => `<th>${h}</th>`).join("");
  const body = filas.map(f => `<tr>${f.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
  return `<div class="table-scroll"><table class="calc-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

// Puntos de la curva de Lagrange en un rango, para graficar.
function curvaLagrange(xs, ys, desde, hasta, pasos = 120) {
  const puntos = [];
  for (let k = 0; k <= pasos; k += 1) {
    const x = desde + ((hasta - desde) * k) / pasos;
    puntos.push({ x, y: lagrange(xs, ys, x).value });
  }
  return puntos;
}

function rangoGrafico(xs, x) {
  const todos = [...xs, x];
  return [Math.min(...todos) - 0.5, Math.max(...todos) + 0.5];
}

function solucionLagrange(ej) {
  const { xs, ys, x } = ej.datos;
  const r = lagrange(xs, ys, x);
  let html = "<h4>Nodos</h4>" + tablaM(["i", "xᵢ", "yᵢ"], xs.map((v, i) => [i + 1, v, ys[i]]));
  html += `<h4>Base de Lagrange en x = ${x}, nodo por nodo</h4>` + PLAY_HTML + "<div data-reproducir>";
  r.bases.forEach(b => {
    html += `<div class="step">
      <p><strong>L${b.i + 1}(${x}) = ${b.factores.join(" · ")} = ${fmtM(b.L)}</strong></p>
      <p>Contribución: L${b.i + 1}(${x})·y${b.i + 1} = ${fmtM(b.L)} · ${b.yi} = ${fmtM(b.contribucion)}</p>
    </div>`;
  });
  html += "</div>";
  html += `<p>Suma de contribuciones: P(${x}) = ${r.bases.map(b => fmtM(b.contribucion)).join(" + ")} = <strong>${fmtM(r.value)}</strong>.</p>`;
  html += `<p>${escapeHtml(r.message)}</p>`;

  const [desde, hasta] = rangoGrafico(xs, x);
  const chart = canvas => new Chart(canvas, {
    type: "scatter",
    data: {
      datasets: [
        { type: "scatter", label: "Nodos", data: xs.map((v, i) => ({ x: v, y: ys[i] })), backgroundColor: "#14232e", pointRadius: 5 },
        { type: "line", label: "Polinomio de Lagrange", data: curvaLagrange(xs, ys, desde, hasta), borderColor: "#ef6c45", pointRadius: 0, tension: 0.2 },
        { type: "scatter", label: `P(${x})`, data: [{ x, y: r.value }], backgroundColor: "#185e73", pointRadius: 7 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, parsing: false, scales: { x: { type: "linear", title: { display: true, text: "x" } }, y: { title: { display: true, text: "y" } } } },
  });
  return { html, charts: [chart] };
}

function solucionRegresion(ej) {
  const { xs, ys, x } = ej.datos;
  const n = xs.length;
  const mx = xs.reduce((s, v) => s + v, 0) / n;
  const my = ys.reduce((s, v) => s + v, 0) / n;
  const filas = xs.map((xi, i) => {
    const dx = xi - mx;
    const dy = ys[i] - my;
    return [i + 1, xi, ys[i], fmtM(dx, 4), fmtM(dy, 4), fmtM(dx * dy, 4), fmtM(dx * dx, 4)];
  });
  const sxy = xs.reduce((s, xi, i) => s + (xi - mx) * (ys[i] - my), 0);
  const sxx = xs.reduce((s, xi) => s + (xi - mx) ** 2, 0);
  const reg = linearRegression(xs, ys);

  let html = `<h4>Medias y sumas</h4><p>x̄ = ${fmtM(mx)}, ȳ = ${fmtM(my)}.</p>`;
  html += tablaM(["i", "xᵢ", "yᵢ", "xᵢ − x̄", "yᵢ − ȳ", "(xᵢ − x̄)(yᵢ − ȳ)", "(xᵢ − x̄)²"], filas);
  html += `<p>S<sub>xy</sub> = ${fmtM(sxy, 4)} y S<sub>xx</sub> = ${fmtM(sxx, 4)}.</p>`;
  html += `<h4>Pendiente e intercepto</h4>
    <p>b = S<sub>xy</sub> / S<sub>xx</sub> = ${fmtM(sxy, 4)} / ${fmtM(sxx, 4)} = <strong>${fmtM(reg.pendiente)}</strong></p>
    <p>a = ȳ − b·x̄ = ${fmtM(my)} − ${fmtM(reg.pendiente)}·${fmtM(mx)} = <strong>${fmtM(reg.intercepto)}</strong></p>
    <p>Recta: <strong>ŷ = ${fmtM(reg.intercepto)} + ${fmtM(reg.pendiente)}·x</strong></p>`;
  html += `<h4>Residuos y suma de cuadrados</h4>` + tablaM(
    ["i", "xᵢ", "yᵢ", "ŷᵢ = a + b·xᵢ", "rᵢ = yᵢ − ŷᵢ", "rᵢ²"],
    xs.map((xi, i) => {
      const yhat = reg.predecir(xi);
      return [i + 1, xi, ys[i], fmtM(yhat), fmtM(reg.residuos[i]), fmtM(reg.residuos[i] ** 2)];
    })
  );
  html += `<p>SCR = Σ rᵢ² = <strong>${fmtM(reg.scr)}</strong>.</p>`;
  html += `<p>Predicción en x = ${x}: ŷ(${x}) = ${fmtM(reg.intercepto)} + ${fmtM(reg.pendiente)}·${x} = <strong>${fmtM(reg.predecir(x))}</strong>.</p>`;

  const [desde, hasta] = rangoGrafico(xs, x);
  const chart = canvas => new Chart(canvas, {
    type: "scatter",
    data: {
      datasets: [
        { type: "scatter", label: "Datos", data: xs.map((v, i) => ({ x: v, y: ys[i] })), backgroundColor: "#14232e", pointRadius: 5 },
        { type: "line", label: "Recta de mínimos cuadrados", data: [{ x: desde, y: reg.predecir(desde) }, { x: hasta, y: reg.predecir(hasta) }], borderColor: "#185e73", borderDash: [6, 4], pointRadius: 0 },
        { type: "scatter", label: `ŷ(${x})`, data: [{ x, y: reg.predecir(x) }], backgroundColor: "#ef6c45", pointRadius: 7 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, parsing: false, scales: { x: { type: "linear", title: { display: true, text: "x" } }, y: { title: { display: true, text: "y" } } } },
  });
  return { html, charts: [chart] };
}

function solucionComparacion(ej) {
  const { xs, ys, x } = ej.datos;
  const lag = lagrange(xs, ys, x);
  const reg = linearRegression(xs, ys);
  const dentro = lag.dentro;
  let html = "<h4>Mismos datos, dos modelos</h4>";
  html += tablaM(["Modelo", "Valor en x = " + x, "¿Dentro del intervalo?"], [
    ["Lagrange (pasa por los datos)", fmtM(lag.value), dentro ? "Sí" : "No: extrapolación"],
    ["Recta de mínimos cuadrados", fmtM(reg.predecir(x)), "—"],
  ]);
  html += `<p>Diferencia: ${fmtM(Math.abs(lag.value - reg.predecir(x)))}.</p>`;
  html += `<p>${escapeHtml(lag.message)}</p>`;
  html += `<p>Dentro del intervalo, Lagrange sigue los datos con su curvatura; fuera de él, el polinomio puede crecer muy rápido. La recta solo extiende una tendencia lineal, así que su predicción es más conservadora. Ninguno de los dos elimina el error de medición.</p>`;

  const [desde, hasta] = rangoGrafico(xs, x);
  const chart = canvas => new Chart(canvas, {
    type: "scatter",
    data: {
      datasets: [
        { type: "scatter", label: "Datos", data: xs.map((v, i) => ({ x: v, y: ys[i] })), backgroundColor: "#14232e", pointRadius: 5 },
        { type: "line", label: "Lagrange", data: curvaLagrange(xs, ys, desde, hasta), borderColor: "#ef6c45", pointRadius: 0, tension: 0.2 },
        { type: "line", label: "Recta", data: [{ x: desde, y: reg.predecir(desde) }, { x: hasta, y: reg.predecir(hasta) }], borderColor: "#185e73", borderDash: [6, 4], pointRadius: 0 },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false, parsing: false, scales: { x: { type: "linear", title: { display: true, text: "x" } }, y: { title: { display: true, text: "y" } } } },
  });
  return { html, charts: [chart] };
}

// Despacho según el tipo del ejercicio.
function generarSolucion(ej) {
  if (ej.tipo === "regresion") return solucionRegresion(ej);
  if (ej.tipo === "comparacion") return solucionComparacion(ej);
  return solucionLagrange(ej);
}
