/* Ejercicios adicionales del módulo 3 (se suman a EJERCICIOS_3). */

const EJERCICIOS_3_MAS = [
  {
    nivel: "Intermedio",
    tipo: "lagrange",
    datos: { xs: [1, 2, 4], ys: [1, 4, 2], x: 3 },
    enunciado: "Construye el polinomio de Lagrange que pasa por (1, 1), (2, 4) y (4, 2), y evalúalo en x = 3. Muestra cada base y verifica que el polinomio reproduce los tres datos.",
    solucion: `<p><strong>Bases en x = 3.</strong> L₁(3) = (3−2)(3−4)/[(1−2)(1−4)] = −1/3; L₂(3) = (3−1)(3−4)/[(2−1)(2−4)] = 1; L₃(3) = (3−1)(3−2)/[(4−1)(4−2)] = 1/3.</p>
      <p><strong>Valor.</strong> P(3) = 1·(−1/3) + 4·1 + 2·(1/3) = <strong>13/3 ≈ 4.333333</strong>.</p>
      <p><strong>Verificación.</strong> En x = 2 la base L₂ vale 1 y las demás 0, así que P(2) = 4 ✓. Lo mismo ocurre en los otros nodos.</p>`,
  },
  {
    nivel: "Intermedio",
    tipo: "regresion",
    datos: { xs: [0, 1, 2, 3], ys: [2, 2.9, 5.1, 7.2], x: 4 },
    enunciado: "Ajusta por mínimos cuadrados los datos (0, 2), (1, 2.9), (2, 5.1), (3, 7.2). Calcula pendiente, intercepto, la suma de cuadrados de residuos y predice en x = 4.",
    solucion: `<p><strong>Medias.</strong> x̄ = 1.5, ȳ = 4.3.</p>
      <p><strong>Sumas.</strong> S<sub>xy</sub> = 8.9 y S<sub>xx</sub> = 5.</p>
      <p><strong>Recta.</strong> b = 8.9 / 5 = 1.78; a = 4.3 − 1.78·1.5 = 1.63. Así, ŷ = 1.63 + 1.78x.</p>
      <p><strong>SCR y predicción.</strong> SCR ≈ 0.458. Predicción: ŷ(4) = 1.63 + 1.78·4 = <strong>8.75</strong>.</p>`,
  },
  {
    nivel: "Avanzado",
    tipo: "lagrange",
    datos: { xs: [0, 1, 2], ys: [1, 0.5, 1 / 3], x: 0.5 },
    enunciado: "Se aproxima f(x) = 1/(x + 1) con tres datos exactos: (0, 1), (1, 1/2), (2, 1/3). Calcula la interpolación en x = 0.5, compárala con el valor exacto y explica por qué el error no es cero.",
    solucion: `<p><strong>Valor interpolado.</strong> P(0.5) = 17/24 ≈ 0.708333.</p>
      <p><strong>Valor exacto.</strong> f(0.5) = 1/1.5 = 2/3 ≈ 0.666667.</p>
      <p><strong>Error.</strong> |f − P| = 1/24 ≈ 0.041667.</p>
      <p><strong>Por qué no es cero.</strong> Interpolar con tres nodos reproduce exactamente un polinomio de grado ≤ 2, pero 1/(x + 1) no es un polinomio. La fórmula del error, f'''(ξ)/3!·(x−0)(x−1)(x−2), explica su tamaño: el producto x(x−1)(x−2) en x = 0.5 vale +0.375 y f''' es negativa, así que f − P &lt; 0: el polinomio queda por encima de la función.</p>`,
  },
  {
    nivel: "Avanzado",
    tipo: "regresion",
    datos: { xs: [1, 2, 3, 4], ys: [2, 4, 6, 30], x: 5 },
    enunciado: "Un dato atípico (4, 30) aparece entre valores casi lineales (1, 2), (2, 4), (3, 6). Ajusta la recta, predice en x = 5 y compara con el ajuste sin el atípico (4, 8). ¿Qué enseña el ejercicio?",
    solucion: `<p><strong>Con el atípico.</strong> b = 8.6, a = −11, predicción en x = 5: 32. SCR = 145.2.</p>
      <p><strong>Sin el atípico (4, 8).</strong> La recta es y = 2x; predicción en x = 5: 10.</p>
      <p><strong>Lección.</strong> Un solo punto cambia la pendiente de 2 a 8.6 y la predicción de 10 a 32. Los mínimos cuadrados penalizan los residuos al cuadrado, así que un valor extremo domina el ajuste. Hay que revisar los datos atípicos antes de confiar en la recta.</p>`,
  },
];

if (typeof module !== "undefined") module.exports = { EJERCICIOS_3_MAS };
