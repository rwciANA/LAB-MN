/*
 * Módulo 2 · Sistemas de ecuaciones lineales
 * Funciones puras: reciben datos y devuelven resultados, pasos, estado y mensaje.
 */

const PIVOT_WARNING = 1e-6;  // |pivote| por debajo de este valor se advierte
const PIVOT_SINGULAR = 1e-12; // |pivote| por debajo de este valor el sistema se considera singular

function validateSystem(A, b) {
  if (!Array.isArray(A) || !Array.isArray(b)) return "La matriz y el vector son obligatorios.";
  const n = A.length;
  if (n < 2 || n > 3) return "El tamaño debe ser 2 o 3 (sistemas pequeños).";
  if (b.length !== n) return `El vector b debe tener ${n} componentes.`;
  for (let i = 0; i < n; i += 1) {
    if (!Array.isArray(A[i]) || A[i].length !== n) return `La fila ${i + 1} debe tener ${n} columnas.`;
    for (const v of A[i]) if (!Number.isFinite(v)) return "Todos los coeficientes deben ser números finitos.";
  }
  for (const v of b) if (!Number.isFinite(v)) return "Todos los términos independientes deben ser finitos.";
  return null;
}

function infNorm(v) {
  return Math.max(...v.map(Math.abs));
}

function residual(A, x, b) {
  return b.map((bi, i) => bi - A[i].reduce((s, a, j) => s + a * x[j], 0));
}

/**
 * Eliminación gaussiana con pivoteo parcial y sustitución hacia atrás.
 * Devuelve pasos (matrices intermedias e intercambios) y la solución.
 */
function gaussPartialPivot(A, b) {
  const error = validateSystem(A, b);
  if (error) return { status: "error", message: error, steps: [], x: null };

  const n = A.length;
  const M = A.map((row, i) => [...row, b[i]]); // matriz aumentada
  const steps = [];
  const warnings = [];
  const snapshot = (titulo, intercambio = null) =>
    steps.push({ titulo, intercambio, matriz: M.map(r => [...r]) });

  snapshot("Matriz aumentada inicial");

  for (let k = 0; k < n - 1; k += 1) {
    // Pivoteo parcial: fila con mayor |valor| en la columna k
    let p = k;
    for (let i = k + 1; i < n; i += 1) if (Math.abs(M[i][k]) > Math.abs(M[p][k])) p = i;
    if (p !== k) {
      [M[k], M[p]] = [M[p], M[k]];
      snapshot(`Paso ${k + 1}: intercambio de filas ${k + 1} y ${p + 1}`, [k + 1, p + 1]);
    }
    if (Math.abs(M[k][k]) < PIVOT_SINGULAR) {
      return { status: "singular", message: "Sistema singular: el pivote es cero; no hay solución única.", steps, x: null, warnings };
    }
    if (Math.abs(M[k][k]) < PIVOT_WARNING) {
      warnings.push(`Pivote pequeño en la columna ${k + 1} (|pivote| = ${M[k][k].toExponential(2)} < ${PIVOT_WARNING}).`);
    }
    for (let i = k + 1; i < n; i += 1) {
      const factor = M[i][k] / M[k][k];
      for (let j = k; j <= n; j += 1) M[i][j] -= factor * M[k][j];
    }
    snapshot(`Eliminación en la columna ${k + 1}`);
  }

  if (Math.abs(M[n - 1][n - 1]) < PIVOT_SINGULAR) {
    return { status: "singular", message: "Sistema singular: el último pivote es cero; no hay solución única.", steps, x: null, warnings };
  }

  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i -= 1) {
    let s = M[i][n];
    for (let j = i + 1; j < n; j += 1) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
  }
  const res = infNorm(residual(A, x, b));
  return { status: "ok", message: "Solución única encontrada.", steps, x, residualInf: res, warnings };
}

/**
 * Gauss-Seidel desde x0 (por defecto vector cero).
 * Criterio de parada: norma infinita del residuo <= tol, o agotamiento de maxIter.
 */
function gaussSeidel(A, b, { x0 = null, tol = 1e-6, maxIter = 100 } = {}) {
  const error = validateSystem(A, b);
  if (error) return { status: "error", message: error, rows: [], x: null };

  const n = A.length;
  if (A.some((row, i) => Math.abs(row[i]) < PIVOT_SINGULAR)) {
    return { status: "error", message: "Gauss-Seidel requiere diagonal no nula.", rows: [], x: null };
  }

  let x = x0 ? [...x0] : new Array(n).fill(0);
  const rows = [];
  const dominant = A.every((row, i) =>
    Math.abs(row[i]) > row.reduce((s, a, j) => (j === i ? s : s + Math.abs(a)), 0));

  for (let it = 1; it <= maxIter; it += 1) {
    const prev = [...x];
    for (let i = 0; i < n; i += 1) {
      let s = b[i];
      for (let j = 0; j < n; j += 1) if (j !== i) s -= A[i][j] * x[j];
      x[i] = s / A[i][i];
    }
    const resNorm = infNorm(residual(A, x, b));
    rows.push({ iteracion: it, x: [...x], residuo: resNorm, cambio: infNorm(x.map((v, i) => v - prev[i])) });
    if (resNorm <= tol) {
      return { status: "ok", message: `Convergencia en ${it} iteraciones.`, rows, x, dominant };
    }
  }
  return {
    status: "limite",
    message: `Se alcanzó el máximo de ${maxIter} iteraciones sin cumplir la tolerancia; no se afirma convergencia.`,
    rows, x, dominant,
  };
}

module.exports = { gaussPartialPivot, gaussSeidel, residual, infNorm, validateSystem };
