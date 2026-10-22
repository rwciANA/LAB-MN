/*
 * Matriz de pruebas del módulo 2 (ocho pruebas: cuatro normales, dos de frontera, dos inválidas).
 * Cada prueba devuelve { ok, observado } para registrar la salida real.
 */

const CASOS = [
  {
    id: "P01", metodo: "Eliminación gaussiana", tipo: "Normal",
    entrada: "A=[4,1,1;1,5,1;1,1,6], b=(9,14,21)", esperado: "x = (1, 2, 3)",
    run() {
      const r = gaussPartialPivot([[4, 1, 1], [1, 5, 1], [1, 1, 6]], [9, 14, 21]);
      const ok = r.status === "ok" && r.x.every((v, i) => Math.abs(v - [1, 2, 3][i]) < 1e-9);
      return { ok, observado: r.x ? `x = (${r.x.map(v => v.toFixed(6)).join(", ")})` : r.message };
    },
  },
  {
    id: "P02", metodo: "Gauss-Seidel", tipo: "Normal",
    entrada: "A=[4,1,1;1,5,1;1,1,6], b=(9,14,21), x0=0, tol=1e-6", esperado: "x ≈ (1, 2, 3)",
    run() {
      const r = gaussSeidel([[4, 1, 1], [1, 5, 1], [1, 1, 6]], [9, 14, 21], { tol: 1e-6, maxIter: 100 });
      const ok = r.status === "ok" && r.x.every((v, i) => Math.abs(v - [1, 2, 3][i]) < 1e-5);
      return { ok, observado: `${r.rows.length} iteraciones, x = (${r.x.map(v => v.toFixed(6)).join(", ")})` };
    },
  },
  {
    id: "P03", metodo: "Gauss-Seidel", tipo: "Normal",
    entrada: "Primera iteración desde cero", esperado: "(2.25, 2.35, 2.7333333333)",
    run() {
      const r = gaussSeidel([[4, 1, 1], [1, 5, 1], [1, 1, 6]], [9, 14, 21], { maxIter: 1 });
      const ref = [2.25, 2.35, 2.7333333333];
      const ok = r.rows[0].x.every((v, i) => Math.abs(v - ref[i]) < 1e-9);
      return { ok, observado: `(${r.rows[0].x.map(v => v.toFixed(10)).join(", ")})` };
    },
  },
  {
    id: "P04", metodo: "Eliminación gaussiana", tipo: "Normal",
    entrada: "Tamaño 2: A=[2,1;1,3], b=(3,5)", esperado: "x = (0.8, 1.4)",
    run() {
      const r = gaussPartialPivot([[2, 1], [1, 3]], [3, 5]);
      const ok = r.status === "ok" && Math.abs(r.x[0] - 0.8) < 1e-12 && Math.abs(r.x[1] - 1.4) < 1e-12;
      return { ok, observado: r.x ? `x = (${r.x.map(v => v.toFixed(4)).join(", ")})` : r.message };
    },
  },
  {
    id: "P05", metodo: "Eliminación gaussiana", tipo: "Frontera",
    entrada: "Pivote pequeño: A=[1e-7,1;1e-7,2], b=(1,2)", esperado: "Advertencia de pivote pequeño y solución calculada",
    run() {
      const r = gaussPartialPivot([[1e-7, 1], [1e-7, 2]], [1, 2]);
      const ok = r.status === "ok" && r.warnings.length > 0;
      return { ok, observado: `${r.status}; advertencias: ${r.warnings.length}` };
    },
  },
  {
    id: "P06", metodo: "Gauss-Seidel", tipo: "Frontera",
    entrada: "Caso base con máximo de 1 iteración", esperado: "Estado 'limite'; no se afirma convergencia",
    run() {
      const r = gaussSeidel([[4, 1, 1], [1, 5, 1], [1, 1, 6]], [9, 14, 21], { tol: 1e-6, maxIter: 1 });
      return { ok: r.status === "limite", observado: `estado: ${r.status}` };
    },
  },
  {
    id: "P07", metodo: "Eliminación gaussiana", tipo: "Inválida",
    entrada: "A=[1,2;2,4], b=(3,6)", esperado: "Advertencia de singularidad, sin solución única",
    run() {
      const r = gaussPartialPivot([[1, 2], [2, 4]], [3, 6]);
      return { ok: r.status === "singular" && r.x === null, observado: `${r.status}: ${r.message}` };
    },
  },
  {
    id: "P08", metodo: "Ambos", tipo: "Inválida",
    entrada: "Tamaño 4 y valor no finito en b", esperado: "Error de validación con mensaje",
    run() {
      const grande = gaussPartialPivot([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], [1, 1, 1, 1]);
      const noFinito = gaussSeidel([[4, 1], [1, 5]], [NaN, 1]);
      const ok = grande.status === "error" && noFinito.status === "error";
      return { ok, observado: `tamaño 4: "${grande.message}"` };
    },
  },
];

if (typeof module !== "undefined") module.exports = { CASOS };
