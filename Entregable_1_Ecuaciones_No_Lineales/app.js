const state = { method: "biseccion", iterations: [], chart: null, heroChart: null };
const $ = (selector) => document.querySelector(selector);

function f(x) { return (x ** 3) - x - 2; }
function df(x) { return (3 * x ** 2) - 1; }

function solveBisection(a, b, tolerance, maxIterations) {
  if (f(a) * f(b) >= 0) throw new Error("Los extremos deben tener signos opuestos.");
  const rows = [];
  for (let iteration = 1; iteration <= maxIterations; iteration += 1) {
    const midpoint = (a + b) / 2;
    const value = f(midpoint);
    const error = Math.abs(b - a) / 2;
    rows.push({ iteration, a, b, x: midpoint, fx: value, error });
    if (Math.abs(value) <= tolerance || error <= tolerance) return rows;
    if (f(a) * value < 0) b = midpoint; else a = midpoint;
  }
  return rows;
}

function solveNewton(x, tolerance, maxIterations) {
  const rows = [];
  for (let iteration = 1; iteration <= maxIterations; iteration += 1) {
    const value = f(x);
    const derivative = df(x);
    if (derivative === 0) throw new Error("La derivada se anuló; prueba otro valor inicial.");
    const next = x - (value / derivative);
    const error = Math.abs(next - x);
    rows.push({ iteration, x, fx: value, derivative, next, error });
    if (Math.abs(f(next)) <= tolerance || error <= tolerance) return rows;
    x = next;
  }
  return rows;
}

function formatNumber(value) { return Number(value).toFixed(8).replace(/0+$/, "").replace(/\.$/, ""); }
function scientific(value) { return Number(value).toExponential(2).replace("e-", " × 10⁻").replace("e+", " × 10"); }

function updateResults(rows) {
  state.iterations = rows;
  const last = rows[rows.length - 1];
  const root = state.method === "biseccion" ? last.x : last.next;
  const error = last.error;
  $("#resultValue").textContent = formatNumber(root);
  $("#resultIterations").textContent = last.iteration;
  $("#resultError").textContent = scientific(error);
  $("#resultResidual").textContent = scientific(Math.abs(f(root)));
  $("#convergence").innerHTML = `<i class="fa-solid fa-circle-check"></i> ${last.iteration < Number($("#inputIterations").value) ? "Convergió" : "Límite alcanzado"}`;
  renderTable(rows);
  renderResultChart(rows);
}

function renderTable(rows) {
  const head = $("#tableHead");
  const body = $("#iterationBody");
  if (state.method === "biseccion") {
    head.innerHTML = "<tr><th>ITERACIÓN</th><th>a</th><th>b</th><th>c</th><th>f(c)</th><th>ERROR</th></tr>";
    body.innerHTML = rows.slice(-8).map(row => `<tr><td>${row.iteration}</td><td>${formatNumber(row.a)}</td><td>${formatNumber(row.b)}</td><td>${formatNumber(row.x)}</td><td>${scientific(row.fx)}</td><td>${scientific(row.error)}</td></tr>`).join("");
  } else {
    head.innerHTML = "<tr><th>ITERACIÓN</th><th>xₙ</th><th>f(xₙ)</th><th>f'(xₙ)</th><th>xₙ₊₁</th><th>ERROR</th></tr>";
    body.innerHTML = rows.slice(-8).map(row => `<tr><td>${row.iteration}</td><td>${formatNumber(row.x)}</td><td>${scientific(row.fx)}</td><td>${formatNumber(row.derivative)}</td><td>${formatNumber(row.next)}</td><td>${scientific(row.error)}</td></tr>`).join("");
  }
}

function renderResultChart(rows) {
  const labels = rows.map(row => row.iteration);
  const values = rows.map(row => row.error);
  if (state.chart) state.chart.destroy();
  state.chart = new Chart($("#resultChart"), { type: "line", data: { labels, datasets: [{ data: values, borderColor: "#ef6c45", backgroundColor: "rgba(239,108,69,.1)", fill: true, tension: .35, pointRadius: 2 }] }, options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false, type: "logarithmic" } } } });
}

function runCalculator() {
  try {
    const tolerance = Number($("#inputTolerance").value);
    const maxIterations = Number($("#inputIterations").value);
    const rows = state.method === "biseccion" ? solveBisection(Number($("#inputA").value), Number($("#inputB").value), tolerance, maxIterations) : solveNewton(Number($("#inputX0").value), tolerance, maxIterations);
    updateResults(rows);
    $("#formMessage").textContent = "Cálculo completado correctamente.";
  } catch (error) { $("#formMessage").textContent = error.message; }
}

function initHeroChart() {
  const labels = Array.from({ length: 41 }, (_, index) => (0.2 + index * .1).toFixed(1));
  state.heroChart = new Chart($("#heroChart"), { type: "line", data: { labels, datasets: [{ data: labels.map(Number).map(f), borderColor: "#ef6c45", borderWidth: 3, pointRadius: 0, tension: .35 }] }, options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: "#e6e5df" }, ticks: { maxTicksLimit: 6, color: "#70777a" } }, y: { grid: { color: "#e6e5df" }, ticks: { color: "#70777a" } } } } });
}

function switchView(view) { document.querySelectorAll(".view").forEach(section => section.classList.toggle("active-view", section.dataset.section === view)); document.querySelectorAll(".nav a").forEach(link => link.classList.toggle("active", link.dataset.view === view)); $("#mainNav").classList.remove("open"); window.scrollTo({ top: 0, behavior: "smooth" }); }

document.querySelectorAll("[data-view]").forEach(link => link.addEventListener("click", event => { event.preventDefault(); switchView(link.dataset.view); history.replaceState(null, "", `#${link.dataset.view}`); }));
$("#menuToggle").addEventListener("click", () => $("#mainNav").classList.toggle("open"));
$("#calculatorForm").addEventListener("submit", event => { event.preventDefault(); runCalculator(); });
document.querySelectorAll(".calc-tab").forEach(tab => tab.addEventListener("click", () => { state.method = tab.dataset.calculator; document.querySelectorAll(".calc-tab").forEach(item => item.classList.toggle("active", item === tab)); $("#methodPill").textContent = state.method.toUpperCase(); $("#bisectionInputs").classList.toggle("hidden", state.method !== "biseccion"); $("#newtonInputs").classList.toggle("hidden", state.method !== "newton"); runCalculator(); }));
document.querySelectorAll(".exercise-answer").forEach(button => button.addEventListener("click", () => { const feedback = button.parentElement.querySelector(".feedback"); feedback.textContent = "Correcto. La respuesta debe justificarse usando el signo, el residuo o la fórmula del método."; button.innerHTML = "Respuesta revisada <i class=\"fa-solid fa-check\"></i>"; }));
$("#downloadCsv").addEventListener("click", () => { const header = state.method === "biseccion" ? "iteracion,a,b,c,fx,error" : "iteracion,x,fx,derivada,siguiente,error"; const lines = state.iterations.map(row => state.method === "biseccion" ? [row.iteration,row.a,row.b,row.x,row.fx,row.error] : [row.iteration,row.x,row.fx,row.derivative,row.next,row.error]); const blob = new Blob([[header, ...lines.map(line => line.join(","))].join("\n")], { type: "text/csv" }); const anchor = document.createElement("a"); anchor.href = URL.createObjectURL(blob); anchor.download = `iteraciones-${state.method}.csv`; anchor.click(); URL.revokeObjectURL(anchor.href); });
$("#printActa").addEventListener("click", () => window.print());

initHeroChart();
runCalculator();