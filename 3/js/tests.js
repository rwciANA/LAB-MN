/*
 * Matriz de pruebas del módulo 3 (ocho pruebas: cuatro normales, dos de frontera, dos inválidas).
 */

const CASOS = [
  {
    id: "P01", metodo: "Lagrange", tipo: "Normal",
    entrada: "Nodos (0,1), (1,2), (2,2), (3,4); x = 1.5", esperado: "P(1.5) = 1.9375",
    run() {
      const r = lagrange([0, 1, 2, 3], [1, 2, 2, 4], 1.5);
      return { ok: r.status === "ok" && Math.abs(r.value - 1.9375) < 1e-12, observado: `P(1.5) = ${r.value}` };
    },
  },
  {
    id: "P02", metodo: "Regresión lineal", tipo: "Normal",
    entrada: "Mismos cuatro datos", esperado: "y = 0.9 + 0.9x; predice 2.25 en x = 1.5; SCR = 0.70",
    run() {
      const r = linearRegression([0, 1, 2, 3], [1, 2, 2, 4]);
      const ok = Math.abs(r.intercepto - 0.9) < 1e-12 && Math.abs(r.pendiente - 0.9) < 1e-12
        && Math.abs(r.predecir(1.5) - 2.25) < 1e-12 && Math.abs(r.scr - 0.7) < 1e-12;
      return { ok, observado: `y = ${r.intercepto.toFixed(4)} + ${r.pendiente.toFixed(4)}x; SCR = ${r.scr.toFixed(4)}` };
    },
  },
  {
    id: "P03", metodo: "Regresión lineal", tipo: "Normal",
    entrada: "Dos puntos exactos (0,1), (1,3)", esperado: "Pendiente 2, intercepto 1, SCR 0",
    run() {
      const r = linearRegression([0, 1], [1, 3]);
      const ok = Math.abs(r.pendiente - 2) < 1e-12 && Math.abs(r.intercepto - 1) < 1e-12 && Math.abs(r.scr) < 1e-12;
      return { ok, observado: `pendiente ${r.pendiente}, intercepto ${r.intercepto}, SCR ${r.scr}` };
    },
  },
  {
    id: "P04", metodo: "Lagrange", tipo: "Normal",
    entrada: "Consulta en un nodo: x = 2 con los cuatro datos", esperado: "P(2) = 2 (pasa por el dato)",
    run() {
      const r = lagrange([0, 1, 2, 3], [1, 2, 2, 4], 2);
      return { ok: r.status === "ok" && Math.abs(r.value - 2) < 1e-12, observado: `P(2) = ${r.value}` };
    },
  },
  {
    id: "P05", metodo: "Lagrange", tipo: "Frontera",
    entrada: "Dos nodos (mínimo): (0,1), (2,5); x = 1", esperado: "P(1) = 3",
    run() {
      const r = lagrange([0, 2], [1, 5], 1);
      return { ok: r.status === "ok" && Math.abs(r.value - 3) < 1e-12, observado: `P(1) = ${r.value}` };
    },
  },
  {
    id: "P06", metodo: "Lagrange", tipo: "Frontera",
    entrada: "Seis nodos (máximo) con x = 0..5", esperado: "Cálculo válido; aviso si la consulta está fuera del intervalo",
    run() {
      const xs = [0, 1, 2, 3, 4, 5];
      const ys = xs.map(x => x * x);
      const dentro = lagrange(xs, ys, 2.5);
      const fuera = lagrange(xs, ys, 6);
      const ok = dentro.status === "ok" && Math.abs(dentro.value - 6.25) < 1e-9 && fuera.dentro === false;
      return { ok, observado: `P(2.5) = ${dentro.value}; fuera de intervalo: ${fuera.dentro === false ? "sí" : "no"}` };
    },
  },
  {
    id: "P07", metodo: "Lagrange", tipo: "Inválida",
    entrada: "Abscisa 1 repetida con dos valores de y", esperado: "Rechazo de la entrada, sin eliminar nodos",
    run() {
      const r = lagrange([0, 1, 1, 2], [1, 2, 3, 4], 1.5);
      return { ok: r.status === "error" && r.value === null, observado: `estado: ${r.status}; "${r.message}"` };
    },
  },
  {
    id: "P08", metodo: "Regresión lineal", tipo: "Inválida",
    entrada: "Todas las abscisas iguales (x = 2)", esperado: "Error: pendiente no definida",
    run() {
      const r = linearRegression([2, 2, 2], [1, 2, 3]);
      return { ok: r.status === "error", observado: `estado: ${r.status}; "${r.message}"` };
    },
  },
];

if (typeof module !== "undefined") module.exports = { CASOS };
