/* Ejercicios adicionales del módulo 2 (se suman a EJERCICIOS_2). */

const EJERCICIOS_2_MAS = [
  {
    nivel: "Intermedio",
    tipo: "gauss",
    datos: { A: [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]], b: [8, -11, -3] },
    enunciado: "Resuelve el sistema 2x + y − z = 8, −3x − y + 2z = −11, −2x + y + 2z = −3 por eliminación gaussiana con pivoteo parcial. Indica en qué paso se intercambian filas y verifica la solución.",
    solucion: `<p><strong>Idea.</strong> En la columna 1 los valores absolutos son 2, 3 y 2: el mayor está en la fila 2, así que el primer paso intercambia las filas 1 y 2. Después se eliminan los elementos bajo el pivote −3.</p>
      <p><strong>Resultado.</strong> <strong>x = (2, 3, −1).</strong></p>
      <p><strong>Verificación.</strong> 2·2 + 3 − (−1) = 8 ✓; −3·2 − 3 + 2·(−1) = −11 ✓; −2·2 + 3 + 2·(−1) = −3 ✓.</p>`,
  },
  {
    nivel: "Intermedio",
    tipo: "gauss",
    datos: { A: [[0, 2, 1], [1, -1, 2], [3, 1, 1]], b: [5, 4, 6] },
    enunciado: "Resuelve el sistema 2y + z = 5, x − y + 2z = 4, 3x + y + z = 6. Observa que el primer elemento del primer pivote es cero: explica por qué el pivoteo es obligatorio aquí.",
    solucion: `<p><strong>Por qué pivotear.</strong> La entrada (1,1) es 0: sin pivoteo no se puede dividir entre ella. El pivoteo parcial busca en la columna 1 el mayor |valor| (que es 3, en la fila 3) e intercambia esas filas.</p>
      <p><strong>Resultado.</strong> <strong>x = 11/14 ≈ 0.785714, y = 19/14 ≈ 1.357143, z = 16/7 ≈ 2.285714.</strong></p>
      <p><strong>Verificación con fracciones.</strong> 2·(19/14) + 32/14 = 70/14 = 5 ✓; 11/14 − 19/14 + 64/14 = 56/14 = 4 ✓; 33/14 + 19/14 + 32/14 = 84/14 = 6 ✓.</p>`,
  },
  {
    nivel: "Avanzado",
    tipo: "gs",
    datos: { A: [[4, 1], [2, 3]], b: [1, 2] },
    enunciado: "Aplica Gauss-Seidel a 4x + y = 1, 2x + 3y = 2 desde cero con tolerancia 10⁻⁶ en el residuo. Justifica la convergencia y comenta cuántas iteraciones necesita y por qué.",
    solucion: `<p><strong>Convergencia.</strong> Ambas filas son estrictamente dominantes: |4| &gt; |1| y |3| &gt; |2|. Por tanto el método converge.</p>
      <p><strong>Solución exacta.</strong> x = 0.1 e y = 0.6: 4(0.1) + 0.6 = 1 ✓; 2(0.1) + 3(0.6) = 2 ✓.</p>
      <p><strong>Velocidad.</strong> El factor de reducción por iteración es pequeño porque la dominancia es fuerte; la calculadora muestra cuántas iteraciones hacen falta para cumplir la tolerancia en el residuo.</p>`,
  },
  {
    nivel: "Avanzado",
    tipo: "gauss",
    datos: { A: [[1, 2, 3], [2, 4, 6], [1, 0, 1]], b: [1, 2, 3] },
    enunciado: "Analiza el sistema x + 2y + 3z = 1, 2x + 4y + 6z = 2, x + z = 3. ¿Tiene solución única? Describe el conjunto de soluciones y explica qué debe hacer un programa al detectar esta situación.",
    solucion: `<p><strong>Diagnóstico.</strong> La segunda fila es el doble de la primera, así que la matriz es singular: det(A) = 0. Eso descarta una solución única.</p>
      <p><strong>Consistencia.</strong> Las dos primeras ecuaciones son la misma (multiplicada por 2) y son compatibles con la tercera, así que el sistema tiene infinitas soluciones.</p>
      <p><strong>Conjunto de soluciones.</strong> Despejando x = 3 − z y sustituyendo en la primera: y = −1 − z. Por tanto (x, y, z) = (3 − z, −1 − z, z) para cualquier z. Por ejemplo, z = 0 da (3, −1, 0).</p>
      <p><strong>Qué debe hacer el programa.</strong> Detectar el pivote nulo, informar que no hay solución única y no devolver un resultado falso por división entre cero. El módulo lo indica con el estado «singular».</p>`,
  },
];

if (typeof module !== "undefined") module.exports = { EJERCICIOS_2_MAS };
