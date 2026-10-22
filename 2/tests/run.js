// Ejecuta la matriz de pruebas del módulo 2: node 2/tests/run.js
const alg = require("../js/algorithms.js");
Object.assign(global, alg);
const { CASOS } = require("../js/tests.js");

let fallos = 0;
for (const c of CASOS) {
  const r = c.run();
  if (!r.ok) fallos += 1;
  console.log(`${c.id} ${r.ok ? "CUMPLE" : "NO CUMPLE"} · ${c.metodo} (${c.tipo}) · ${r.observado}`);
}
console.log(`\n${CASOS.length - fallos}/${CASOS.length} pruebas cumplen.`);
process.exitCode = fallos ? 1 : 0;
