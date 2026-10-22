/*
 * Módulo 3 · Interpolación y ajuste de curvas
 * Funciones puras: datos de entrada → pasos, resultado, estado y mensaje.
 */

function validateNodes(xs, ys) {
  if (!Array.isArray(xs) || !Array.isArray(ys)) return "Las abscisas y las ordenadas son obligatorias.";
  if (xs.length !== ys.length) return "Cada abscisa debe tener una ordenada.";
  if (xs.length < 2 || xs.length > 6) return "Lagrange admite entre 2 y 6 nodos.";
  for (const v of [...xs, ...ys]) if (!Number.isFinite(v)) return "Todos los valores deben ser finitos.";
  const seen = new Set();
  for (const x of xs) {
    if (seen.has(x)) return `La abscisa x = ${x} está repetida; Lagrange la rechaza para no eliminar datos en silencio.`;
    seen.add(x);
  }
  return null;
}

/**
 * Interpolación de Lagrange. Devuelve el valor en x y la contribución de cada base L_i(x)·y_i.
 */
function lagrange(xs, ys, x) {
  const error = validateNodes(xs, ys);
  if (error) return { status: "error", message: error, bases: [], value: null };
  if (!Number.isFinite(x)) return { status: "error", message: "La consulta debe ser un número finito.", bases: [], value: null };

  const n = xs.length;
  const bases = [];
  let value = 0;
  for (let i = 0; i < n; i += 1) {
    let L = 1;
    const factores = [];
    for (let j = 0; j < n; j += 1) {
      if (j === i) continue;
      L *= (x - xs[j]) / (xs[i] - xs[j]);
      factores.push(`(${x} − ${xs[j]})/(${xs[i]} − ${xs[j]})`);
    }
    const contribucion = L * ys[i];
    value += contribucion;
    bases.push({ i, xi: xs[i], yi: ys[i], L, contribucion, factores });
  }
  const dentro = x >= Math.min(...xs) && x <= Math.max(...xs);
  return {
    status: "ok",
    message: dentro ? "Consulta dentro del intervalo de los datos." : "Aviso: la consulta está fuera del intervalo de los datos (extrapolación).",
    bases, value, dentro,
  };
}

/**
 * Regresión lineal por mínimos cuadrados: y = a + b·x.
 */
function linearRegression(xs, ys) {
  if (!Array.isArray(xs) || !Array.isArray(ys) || xs.length !== ys.length) {
    return { status: "error", message: "Cada abscisa debe tener una ordenada." };
  }
  if (xs.length < 2) return { status: "error", message: "La regresión requiere al menos 2 datos." };
  for (const v of [...xs, ...ys]) if (!Number.isFinite(v)) return { status: "error", message: "Todos los valores deben ser finitos." };
  if (new Set(xs).size === 1) {
    return { status: "error", message: "Todas las abscisas son iguales: la pendiente no está definida." };
  }

  const n = xs.length;
  const mx = xs.reduce((s, v) => s + v, 0) / n;
  const my = ys.reduce((s, v) => s + v, 0) / n;
  let sxy = 0;
  let sxx = 0;
  for (let i = 0; i < n; i += 1) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
  }
  const pendiente = sxy / sxx;
  const intercepto = my - pendiente * mx;
  const residuos = xs.map((x, i) => ys[i] - (intercepto + pendiente * x));
  const scr = residuos.reduce((s, r) => s + r * r, 0);
  return {
    status: "ok",
    message: "Ajuste calculado.",
    pendiente, intercepto, residuos, scr,
    predecir: x => intercepto + pendiente * x,
  };
}

if (typeof module !== "undefined") module.exports = { lagrange, linearRegression, validateNodes };
