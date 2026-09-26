/**
 * ITERA - Módulo 1: Ecuaciones No Lineales y Errores
 * Implementación de Métodos Cerrados (Bisección) y Métodos Abiertos (Newton-Raphson)
 * UNSA - Escuela Profesional de Ingeniería de Sistemas
 */

const state = {
  method: "biseccion",
  iterations: [],
  chart: null,
  heroChart: null,
  comparisonChart: null,
  mullerChart: null
};

const $ = (selector) => document.querySelector(selector);

// Función base del caso aplicado (calibración de servidor: g(x) = x³ - x = 2 -> f(x) = x³ - x - 2)
function f(x) {
  return (x ** 3) - x - 2.0;
}

// Derivada analítica f'(x) = 3x² - 1
function df(x) {
  return (3.0 * (x ** 2)) - 1.0;
}

// ==========================================
// ALGORITMOS NUMÉRICOS
// ==========================================

/**
 * Método Cerrado: Bisección
 * @param {number} a - Límite inferior
 * @param {number} b - Límite superior
 * @param {number} tolerance - Criterio de parada
 * @param {number} maxIterations - Límite de seguridad
 */
function solveBisection(a, b, tolerance, maxIterations) {
  if (isNaN(a) || isNaN(b) || isNaN(tolerance) || isNaN(maxIterations)) {
    throw new Error("Por favor ingresa valores numéricos válidos en todos los campos.");
  }
  if (a >= b) {
    throw new Error("El extremo inferior 'a' debe ser estrictamente menor que 'b' (a < b).");
  }
  if (tolerance <= 0) {
    throw new Error("La tolerancia debe ser un valor positivo mayor a 0 (ej. 1e-6).");
  }
  if (maxIterations < 1) {
    throw new Error("El número máximo de iteraciones debe ser al menos 1.");
  }

  const fa = f(a);
  const fb = f(b);
  if (fa * fb >= 0) {
    throw new Error("Los extremos deben tener signos opuestos (f(a) · f(b) < 0) según el Teorema de Bolzano.");
  }

  const rows = [];
  let currentA = a;
  let currentB = b;

  for (let iteration = 1; iteration <= maxIterations; iteration += 1) {
    const midpoint = (currentA + currentB) / 2.0;
    const value = f(midpoint);
    const error = Math.abs(currentB - currentA) / 2.0;

    rows.push({
      iteration,
      a: currentA,
      b: currentB,
      x: midpoint,
      fx: value,
      error
    });

    if (!isFinite(midpoint) || !isFinite(value)) {
      throw new Error("Se detectaron valores no finitos (desbordamiento numérico).");
    }

    // Criterio de parada: residuo menor a tol o cota de error menor a tol
    if (Math.abs(value) <= tolerance || error <= tolerance) {
      return rows;
    }

    if (f(currentA) * value < 0) {
      currentB = midpoint;
    } else {
      currentA = midpoint;
    }
  }
  return rows;
}

/**
 * Método Abierto: Newton-Raphson
 * @param {number} x0 - Semilla inicial
 * @param {number} tolerance - Criterio de parada
 * @param {number} maxIterations - Límite de seguridad
 */
function solveNewton(x0, tolerance, maxIterations) {
  if (isNaN(x0) || isNaN(tolerance) || isNaN(maxIterations)) {
    throw new Error("Por favor ingresa valores numéricos válidos.");
  }
  if (tolerance <= 0) {
    throw new Error("La tolerancia debe ser un valor positivo mayor a 0 (ej. 1e-6).");
  }
  if (maxIterations < 1) {
    throw new Error("El número máximo de iteraciones debe ser al menos 1.");
  }

  const rows = [];
  let x = x0;

  for (let iteration = 1; iteration <= maxIterations; iteration += 1) {
    const value = f(x);
    const derivative = df(x);

    if (Math.abs(derivative) < 1e-12) {
      throw new Error("La derivada se anuló o es demasiado pequeña (|f'(x)| < 1e-12); prueba otro valor inicial.");
    }

    const next = x - (value / derivative);
    const error = Math.abs(next - x);

    rows.push({
      iteration,
      x,
      fx: value,
      derivative,
      next,
      error
    });

    if (!isFinite(next) || !isFinite(value)) {
      throw new Error("Se detectaron valores no finitos durante el cálculo.");
    }

    // Criterio de parada dual
    if (Math.abs(f(next)) <= tolerance || error <= tolerance) {
      return rows;
    }

    x = next;
  }
  return rows;
}

function cubicExample(x) {
  return (x ** 3) - (3 * x) + 1;
}

function solveMuller(initialPoints, tolerance = 1e-8, maxIterations = 50) {
  let [x0, x1, x2] = initialPoints;
  const rows = [];

  for (let iteration = 1; iteration <= maxIterations; iteration += 1) {
    const h1 = x1 - x0;
    const h2 = x2 - x1;
    if (Math.abs(h1) < 1e-14 || Math.abs(h2) < 1e-14 || Math.abs(h1 + h2) < 1e-14) {
      throw new Error("La terna inicial de Müller debe contener tres puntos distintos.");
    }

    const delta1 = (cubicExample(x1) - cubicExample(x0)) / h1;
    const delta2 = (cubicExample(x2) - cubicExample(x1)) / h2;
    const a = (delta2 - delta1) / (h1 + h2);
    const b = (a * h2) + delta2;
    const c = cubicExample(x2);
    const discriminant = (b ** 2) - (4 * a * c);
    if (discriminant < 0) {
      throw new Error("Esta terna produjo una raíz compleja; prueba valores iniciales más cercanos a la raíz real buscada.");
    }

    const squareRoot = Math.sqrt(discriminant);
    const denominator = Math.abs(b + squareRoot) >= Math.abs(b - squareRoot) ? b + squareRoot : b - squareRoot;
    if (Math.abs(denominator) < 1e-14) {
      throw new Error("El denominador de Müller es demasiado pequeño para continuar con esta terna.");
    }

    const next = x2 - ((2 * c) / denominator);
    const error = Math.abs(next - x2);
    rows.push({ iteration, x0, x1, x2, a, b, c, discriminant, next, error });
    if (!Number.isFinite(next)) throw new Error("Müller produjo un valor no finito.");
    if (error < tolerance || Math.abs(cubicExample(next)) < tolerance) return { rows, root: next };

    [x0, x1, x2] = [x1, x2, next];
  }

  throw new Error("Müller alcanzó el máximo de iteraciones sin converger.");
}

function renderMullerExample() {
  const resultContainer = $("#mullerResults");
  const initialTriples = [
    { label: "Raíz negativa", points: [-2, -1.9, -1.8] },
    { label: "Raíz cercana a cero", points: [0, 0.25, 0.5] },
    { label: "Raíz positiva", points: [1.3, 1.5, 1.7] }
  ];
  const solutions = initialTriples.map(item => ({ ...item, ...solveMuller(item.points) }));

  resultContainer.innerHTML = solutions.map(solution => `
    <section class="muller-root-result">
      <h5>${solution.label} · terna inicial (${solution.points.join(", ")})</h5>
      <div class="muller-table-wrap">
        <table class="muller-table">
          <thead><tr><th>Iteración</th><th>$x_2$</th><th>$a$</th><th>$b$</th><th>$c=f(x_2)$</th><th>$x_3$</th><th>$|x_3-x_2|$</th></tr></thead>
          <tbody>${solution.rows.map(row => `<tr><td>${row.iteration}</td><td>${formatNumber(row.x2)}</td><td>${formatNumber(row.a)}</td><td>${formatNumber(row.b)}</td><td>${scientific(row.c)}</td><td>${formatNumber(row.next)}</td><td>${scientific(row.error)}</td></tr>`).join("")}</tbody>
        </table>
      </div>
      <span class="muller-root-value">Raíz aproximada: ${formatNumber(solution.root)} · residuo: ${scientific(Math.abs(cubicExample(solution.root)))}</span>
    </section>
  `).join("");

  const roots = solutions.map(solution => solution.root).sort((left, right) => left - right);
  const curve = Array.from({ length: 121 }, (_, index) => {
    const x = -2.5 + (index * 5 / 120);
    return { x, y: cubicExample(x) };
  });
  const canvas = $("#mullerChart");
  if (state.mullerChart) state.mullerChart.destroy();
  state.mullerChart = new Chart(canvas.getContext("2d"), {
    type: "scatter",
    data: {
      datasets: [
        { label: "f(x) = x³ - 3x + 1", data: curve, showLine: true, borderColor: "#185e73", borderWidth: 3, pointRadius: 0, tension: 0.2 },
        { label: "Raíces aproximadas", data: roots.map(x => ({ x, y: 0 })), backgroundColor: "#ef6c45", borderColor: "#ffffff", borderWidth: 2, pointRadius: 7, pointHoverRadius: 9 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", labels: { usePointStyle: true, font: { family: "DM Sans", size: 12 } } },
        tooltip: { callbacks: { label: context => context.datasetIndex === 1 ? `Raíz: (${context.parsed.x.toFixed(8)}, 0)` : `(${context.parsed.x.toFixed(2)}, ${context.parsed.y.toFixed(3)})` } }
      },
      scales: {
        x: { type: "linear", min: -2.5, max: 2.5, title: { display: true, text: "x" }, grid: { color: context => context.tick.value === 0 ? "#20252a" : "#e6e5df", lineWidth: context => context.tick.value === 0 ? 1.5 : 1 } },
        y: { min: -9, max: 9, title: { display: true, text: "f(x)" }, grid: { color: context => context.tick.value === 0 ? "#20252a" : "#e6e5df", lineWidth: context => context.tick.value === 0 ? 1.5 : 1 } }
      }
    }
  });
  $("#mullerConclusion").innerHTML = `Las tres raíces reales son aproximadamente $${roots.map(formatNumber).join(",\; ")}$. El método de Müller es abierto: no exige una derivada ni un intervalo con cambio de signo, pero depende de elegir ternas iniciales adecuadas.`;
  triggerMathJax();
}

// ==========================================
// FORMATEO Y RENDERIZADO
// ==========================================

function formatNumber(value) {
  if (value === undefined || value === null || isNaN(value)) return "—";
  return Number(value).toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
}

function scientific(value) {
  if (value === undefined || value === null || isNaN(value)) return "—";
  return Number(value).toExponential(2).replace("e-", " × 10⁻").replace("e+", " × 10⁺");
}

function triggerMathJax() {
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise().catch((err) => console.warn("MathJax render:", err));
  }
}

function updateResults(rows) {
  state.iterations = rows;
  if (!rows || rows.length === 0) return;

  const last = rows[rows.length - 1];
  const root = state.method === "biseccion" ? last.x : last.next;
  const error = last.error;
  const maxIter = Number($("#inputIterations").value);
  const converged = last.iteration < maxIter || (Math.abs(f(root)) <= Number($("#inputTolerance").value) || error <= Number($("#inputTolerance").value));

  $("#resultValue").textContent = formatNumber(root);
  $("#resultIterations").textContent = `${last.iteration} / ${maxIter}`;
  $("#resultError").textContent = scientific(error);
  $("#resultResidual").textContent = scientific(Math.abs(f(root)));

  const convBadge = $("#convergence");
  if (converged) {
    convBadge.className = "converged";
    convBadge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Convergió`;
  } else {
    convBadge.className = "limit-reached";
    convBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Límite alcanzado`;
  }

  renderTable(rows);
  renderResultChart(rows);
  renderComparisonChart();
  triggerMathJax();
}

function renderTable(rows) {
  const head = $("#tableHead");
  const body = $("#iterationBody");

  if (state.method === "biseccion") {
    head.innerHTML = `
      <tr>
        <th>$i$</th>
        <th>$a$</th>
        <th>$b$</th>
        <th>$c = \\frac{a+b}{2}$</th>
        <th>$f(c)$</th>
        <th>Cota $\\frac{|b-a|}{2}$</th>
      </tr>
    `;
    body.innerHTML = rows.map(row => `
      <tr>
        <td><strong>${row.iteration}</strong></td>
        <td>${formatNumber(row.a)}</td>
        <td>${formatNumber(row.b)}</td>
        <td><strong>${formatNumber(row.x)}</strong></td>
        <td>${scientific(row.fx)}</td>
        <td>${scientific(row.error)}</td>
      </tr>
    `).join("");
  } else {
    head.innerHTML = `
      <tr>
        <th>$i$</th>
        <th>$x_n$</th>
        <th>$f(x_n)$</th>
        <th>$f'(x_n)$</th>
        <th>$x_{n+1}$</th>
        <th>Cambio $|x_{n+1} - x_n|$</th>
      </tr>
    `;
    body.innerHTML = rows.map(row => `
      <tr>
        <td><strong>${row.iteration}</strong></td>
        <td>${formatNumber(row.x)}</td>
        <td>${scientific(row.fx)}</td>
        <td>${formatNumber(row.derivative)}</td>
        <td><strong>${formatNumber(row.next)}</strong></td>
        <td>${scientific(row.error)}</td>
      </tr>
    `).join("");
  }
}

function renderResultChart(rows) {
  const labels = rows.map(row => `Iter ${row.iteration}`);
  const values = rows.map(row => row.error);

  if (state.chart) state.chart.destroy();

  const ctx = $("#resultChart").getContext("2d");
  state.chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Error (En)",
        data: values,
        borderColor: "#ef6c45",
        backgroundColor: "rgba(239,108,69,0.12)",
        fill: true,
        tension: 0.25,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#ef6c45"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `Error: ${Number(context.raw).toExponential(3)}`
          }
        }
      },
      scales: {
        x: {
          grid: { color: "#e6e5df" },
          ticks: { color: "#70777a", font: { size: 10 } }
        },
        y: {
          type: "logarithmic",
          grid: { color: "#e6e5df" },
          ticks: {
            color: "#70777a",
            font: { size: 10 },
            callback: (val) => Number(val).toExponential(0)
          }
        }
      }
    }
  });
}

function renderComparisonChart() {
  const compCanvas = $("#comparisonChart");
  if (!compCanvas) return;

  const bisectionRows = solveBisection(1.0, 2.0, 1e-6, 100);
  const newtonRows = solveNewton(1.5, 1e-6, 100);

  const maxLen = Math.max(bisectionRows.length, newtonRows.length);
  const labels = Array.from({ length: maxLen }, (_, i) => `Iter ${i + 1}`);

  const bisectionData = bisectionRows.map(r => r.error);
  const newtonData = newtonRows.map(r => r.error);

  if (state.comparisonChart) state.comparisonChart.destroy();

  const ctx = compCanvas.getContext("2d");
  state.comparisonChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Bisección (Método Cerrado, Lineal)",
          data: bisectionData,
          borderColor: "#185e73",
          backgroundColor: "rgba(24,94,115,0.08)",
          fill: false,
          tension: 0.1,
          pointRadius: 4,
          pointBackgroundColor: "#185e73"
        },
        {
          label: "Newton-Raphson (Método Abierto, Cuadrático)",
          data: newtonData,
          borderColor: "#ef6c45",
          backgroundColor: "rgba(239,108,69,0.08)",
          fill: false,
          tension: 0.1,
          pointRadius: 6,
          pointBackgroundColor: "#ef6c45"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: { boxWidth: 14, font: { family: "DM Sans", size: 12, weight: 600 } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${Number(ctx.raw).toExponential(3)}`
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: "Iteración", color: "#70777a" },
          grid: { color: "#e6e5df" }
        },
        y: {
          type: "logarithmic",
          title: { display: true, text: "Error Absoluto / Cota (Escala Log)", color: "#70777a" },
          grid: { color: "#e6e5df" },
          ticks: { callback: (val) => Number(val).toExponential(0) }
        }
      }
    }
  });
}

function initHeroChart() {
  const labels = Array.from({ length: 41 }, (_, i) => (0.5 + i * 0.05).toFixed(2));
  const data = labels.map(Number).map(f);

  if (state.heroChart) state.heroChart.destroy();

  const ctx = $("#heroChart").getContext("2d");
  state.heroChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "f(x) = x³ - x - 2",
          data,
          borderColor: "#ef6c45",
          borderWidth: 3,
          pointRadius: 0,
          tension: 0.35
        },
        {
          label: "Raíz exacta (1.5214, 0)",
          data: labels.map(x => (Math.abs(Number(x) - 1.52) < 0.03 ? 0 : null)),
          borderColor: "#327c62",
          backgroundColor: "#327c62",
          pointRadius: 7,
          showLine: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `x: ${ctx.label}, f(x): ${Number(ctx.raw).toFixed(4)}`
          }
        }
      },
      scales: {
        x: {
          grid: { color: "#e6e5df" },
          ticks: { maxTicksLimit: 8, color: "#70777a" }
        },
        y: {
          grid: { color: "#e6e5df" },
          ticks: { color: "#70777a" }
        }
      }
    }
  });
}

function runCalculator() {
  try {
    const tolerance = Number($("#inputTolerance").value);
    const maxIterations = Number($("#inputIterations").value);
    let rows;

    if (state.method === "biseccion") {
      const a = Number($("#inputA").value);
      const b = Number($("#inputB").value);
      rows = solveBisection(a, b, tolerance, maxIterations);
    } else {
      const x0 = Number($("#inputX0").value);
      rows = solveNewton(x0, tolerance, maxIterations);
    }

    updateResults(rows);
    $("#formMessage").textContent = "✓ Cálculo completado exitosamente.";
    $("#formMessage").className = "form-message success";
  } catch (error) {
    $("#formMessage").textContent = error.message;
    $("#formMessage").className = "form-message error";
  }
}

function resetBaseCase() {
  $("#inputTolerance").value = "0.000001";
  $("#inputIterations").value = "100";
  if (state.method === "biseccion") {
    $("#inputA").value = "1";
    $("#inputB").value = "2";
  } else {
    $("#inputX0").value = "1.5";
  }
  runCalculator();
}

// ==========================================
// NAVEGACIÓN Y VISTAS (SPA)
// ==========================================

function switchView(view) {
  document.querySelectorAll(".view").forEach(section => {
    section.classList.toggle("active-view", section.dataset.section === view);
  });
  document.querySelectorAll(".nav a").forEach(link => {
    link.classList.toggle("active", link.dataset.view === view);
  });
  $("#mainNav").classList.remove("open");
  $("#navBackdrop").classList.remove("show");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (view === "comparacion") {
    setTimeout(renderComparisonChart, 100);
  }
  setTimeout(triggerMathJax, 50);
}

document.querySelectorAll("[data-view]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const view = link.dataset.view;
    switchView(view);
    history.replaceState(null, "", `#${view}`);
  });
});

function toggleNav(open) {
  $("#mainNav").classList.toggle("open", open);
  $("#navBackdrop").classList.toggle("show", open);
}

$("#menuToggle").addEventListener("click", () => toggleNav(!$("#mainNav").classList.contains("open")));
$("#navClose").addEventListener("click", () => toggleNav(false));
$("#navBackdrop").addEventListener("click", () => toggleNav(false));

$("#calculatorForm").addEventListener("submit", event => {
  event.preventDefault();
  runCalculator();
});

$("#btnResetBase").addEventListener("click", resetBaseCase);

document.querySelectorAll(".calc-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    state.method = tab.dataset.calculator;
    document.querySelectorAll(".calc-tab").forEach(item => item.classList.toggle("active", item === tab));
    $("#methodPill").textContent = state.method === "biseccion" ? "MÉTODO CERRADO: BISECCIÓN" : "MÉTODO ABIERTO: NEWTON-RAPHSON";
    $("#bisectionInputs").classList.toggle("hidden", state.method !== "biseccion");
    $("#newtonInputs").classList.toggle("hidden", state.method !== "newton");
    runCalculator();
  });
});

// ============ EXPORTACIÓN A CSV ============
$("#downloadCsv").addEventListener("click", () => {
  if (!state.iterations || state.iterations.length === 0) {
    alert("No hay iteraciones para exportar.");
    return;
  }
  let header, lines;
  if (state.method === "biseccion") {
    header = "iteracion,a,b,c_punto_medio,f_c,cota_error";
    lines = state.iterations.map(r => [r.iteration, r.a, r.b, r.x, r.fx, r.error]);
  } else {
    header = "iteracion,x_n,f_x_n,derivada_f_prime,x_siguiente,error_paso";
    lines = state.iterations.map(r => [r.iteration, r.x, r.fx, r.derivative, r.next, r.error]);
  }
  const csvContent = [header, ...lines.map(l => l.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const anchor = document.createElement("a");
  anchor.href = URL.createObjectURL(blob);
  anchor.download = `iteraciones_${state.method}_itera.csv`;
  anchor.click();
  URL.revokeObjectURL(anchor.href);
});

// ============ SOLUCIONES DE EJERCICIOS ============
document.querySelectorAll(".solution-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const solution = button.nextElementSibling;
    const open = solution.classList.toggle("open");
    button.classList.toggle("open", open);
    button.innerHTML = open ? 'Ocultar solución <i class="fa-solid fa-chevron-up"></i>' : 'Ver solución completa <i class="fa-solid fa-chevron-down"></i>';
    if (open) triggerMathJax();
  });
});

$("#mullerToggle").addEventListener("click", event => {
  const button = event.currentTarget;
  const solution = $("#mullerSolution");
  const open = solution.classList.toggle("open");
  button.classList.toggle("open", open);
  button.setAttribute("aria-expanded", String(open));
  button.innerHTML = open ? 'Ocultar solución <i class="fa-solid fa-chevron-up"></i>' : 'Ver solución paso a paso <i class="fa-solid fa-chevron-down"></i>';
  if (open) {
    try {
      renderMullerExample();
    } catch (error) {
      $("#mullerResults").textContent = error.message;
    }
    triggerMathJax();
  }
});

// ============ AUTOEVALUACIÓN (6 preguntas) ============
const quizDone = new Set();
function updateQuizScore() {
  document.querySelectorAll(".quiz-score").forEach(el => {
    el.textContent = `${quizDone.size} / 6`;
  });
}

document.querySelectorAll(".quiz-card").forEach((card, i) => {
  const feedback = card.querySelector(".quiz-feedback");
  card.querySelector(".quiz-check").addEventListener("click", () => {
    let ok = false;
    if (card.dataset.type === "numerica") {
      const given = parseFloat(card.querySelector(".quiz-input").value);
      if (isNaN(given)) {
        feedback.textContent = "Por favor escribe un número antes de comprobar.";
        feedback.className = "quiz-feedback warn";
        return;
      }
      ok = Math.abs(given - parseFloat(card.dataset.answer)) <= parseFloat(card.dataset.tol);
    } else {
      const sel = card.querySelector("input:checked");
      if (!sel) {
        feedback.textContent = "Selecciona una opción antes de comprobar.";
        feedback.className = "quiz-feedback warn";
        return;
      }
      ok = sel.value === card.dataset.answer;
    }
    if (ok) {
      quizDone.add(i);
      updateQuizScore();
      feedback.textContent = "✓ ¡Correcto! " + card.dataset.explain;
      feedback.className = "quiz-feedback good";
    } else {
      feedback.textContent = "✗ Respuesta incorrecta. " + card.dataset.explain;
      feedback.className = "quiz-feedback bad";
    }
    triggerMathJax();
  });
});

$(".quiz-reset").addEventListener("click", () => {
  quizDone.clear();
  updateQuizScore();
  document.querySelectorAll(".quiz-card").forEach(card => {
    const feedback = card.querySelector(".quiz-feedback");
    feedback.textContent = "";
    feedback.className = "quiz-feedback";
    card.querySelectorAll("input").forEach(inp => {
      inp.value = "";
      inp.checked = false;
    });
  });
});

// Inicialización general al cargar
window.addEventListener("DOMContentLoaded", () => {
  initHeroChart();
  runCalculator();
  renderComparisonChart();
  triggerMathJax();
});
