/* Contenido didáctico del módulo 2: autoevaluación y ejercicios con solución. */

const AUTOEVALUACION_2 = [
  {
    tipo: "multiple",
    pregunta: "En la columna k, el pivoteo parcial elige como pivote:",
    opciones: [
      "La primera fila de la columna, siempre.",
      "La fila (desde k en adelante) con mayor valor absoluto en la columna k.",
      "La fila con mayor valor algebraico, aunque sea negativa.",
    ],
    respuesta: 1,
    explicacion: "Se compara |aᵢₖ| entre las filas k..n para reducir el error de redondeo al dividir.",
  },
  {
    tipo: "vf",
    pregunta: "La dominancia diagonal estricta es condición NECESARIA para que Gauss-Seidel converja.",
    opciones: ["Verdadero", "Falso"],
    respuesta: 1,
    explicacion: "Es suficiente, no necesaria. La matriz [[2,1,0],[1,2,1],[0,1,2]] es simétrica definida positiva: Gauss-Seidel converge aunque la fila 2 no sea estrictamente dominante (2 = 1 + 1).",
  },
  {
    tipo: "numerica",
    pregunta: "Sistema A = [[4,1,1],[1,5,1],[1,1,6]], b = (9, 14, 21). Gauss-Seidel desde cero: valor de x₁ tras la primera iteración (tolerancia 0.001).",
    respuesta: 2.25,
    tol: 0.001,
    explicacion: "x₁ = (9 − 1·0 − 1·0)/4 = 2.25.",
  },
  {
    tipo: "multiple",
    pregunta: "Tras el pivoteo, un pivote es exactamente 0 y no hay fila que lo reemplace. ¿Qué indica?",
    opciones: [
      "Que la solución es única pero hay que redondear más.",
      "Que el sistema es singular: no tiene solución única.",
      "Que Gauss-Seidel debe usarse en lugar de eliminación.",
    ],
    respuesta: 1,
    explicacion: "Sin pivote no se puede dividir: el sistema es singular (o tiene infinitas soluciones o ninguna).",
  },
  {
    tipo: "vf",
    pregunta: "Un residuo pequeño, ‖b − A·x‖∞ ≈ 0, garantiza un error pequeño en x sin importar el sistema.",
    opciones: ["Verdadero", "Falso"],
    respuesta: 1,
    explicacion: "El error depende también del número de condición de A. Un residuo pequeño con A mal condicionada puede coexistir con un error grande en x.",
  },
  {
    tipo: "multiple",
    pregunta: "Gauss-Seidel se detiene (con estado correcto) cuando:",
    opciones: [
      "Se alcanza el máximo de 100 iteraciones.",
      "La norma infinita del residuo es menor o igual a la tolerancia.",
      "Después de una sola iteración.",
    ],
    respuesta: 1,
    explicacion: "El criterio de parada es el residuo. Llegar al máximo sin cumplir la tolerancia NO implica convergencia.",
  },
];

const EJERCICIOS_2 = [
  {
    nivel: "Intermedio",
    enunciado: "Resuelve por eliminación gaussiana con pivoteo parcial: 2x + y = 3, x + 3y = 5.",
    solucion: `<p>Matriz aumentada: [2 1 | 3; 1 3 | 5]. En la columna 1 el mayor |valor| es 2 (fila 1): no hay intercambio.</p>
      <p>Multiplicador 1/2: fila 2 ← fila 2 − ½·fila 1 → [0 2.5 | 3.5].</p>
      <p>Sustitución hacia atrás: y = 3.5/2.5 = 1.4; x = (3 − 1.4)/2 = 0.8.</p>
      <p><strong>Solución: (0.8, 1.4).</strong> Verificación: 2(0.8)+1.4 = 3 ✓; 0.8+3(1.4) = 5 ✓.</p>`,
  },
  {
    nivel: "Intermedio",
    enunciado: "Calcula la primera iteración de Gauss-Seidel desde x₀ = (0, 0, 0) para A = [[2,1,−1],[−3,−1,2],[−2,1,2]], b = (8, −11, −3).",
    solucion: `<p>x₁ = (8 − 0 − 0)/2 = 4.</p>
      <p>x₂ = (−11 − (−3)(4) − 2·0)/(−1) = (−11 + 12)/(−1) = −1.</p>
      <p>x₃ = (−3 − (−2)(4) − 1·(−1))/2 = (−3 + 8 + 1)/2 = 3.</p>
      <p><strong>Primera iteración: (4, −1, 3).</strong> Observa que los valores nuevos ya se usan en la fila siguiente: esa es la diferencia con Jacobi.</p>`,
  },
  {
    nivel: "Avanzado",
    enunciado: "Aplica Gauss-Seidel a A = [[1,2],[3,1]], b = (5, 6), desde cero. ¿Converge? Justifica con el residuo y con la dominancia diagonal.",
    solucion: `<p>La matriz no es diagonal dominante: en la fila 1, |1| &lt; |2|.</p>
      <p>Los residuos de la calculadora crecen en cada iteración (≈ 18, 108, 648, 3890, …): el método <strong>diverge</strong>.</p>
      <p>Matriz de iteración: T = [[0, −2],[0, 6]], con autovalores 0 y 6. Como 6 &gt; 1, las iteraciones no convergen.</p>
      <p>Conclusión: aquí conviene eliminación gaussiana (solución (1.4, 1.8)). Verificación: 1.4 + 3.6 = 5 ✓; 4.2 + 1.8 = 6 ✓.</p>`,
  },
  {
    nivel: "Avanzado",
    enunciado: "Para A = [[10,2,1],[1,5,1],[2,3,10]], b = (7, −8, 6): (a) verifica la dominancia diagonal estricta; (b) con tolerancia 10⁻⁶ en residuo, ¿cuántas iteraciones de Gauss-Seidel necesita desde cero? (c) ¿Cuál es la solución?",
    solucion: `<p>(a) Filas: |10| &gt; 2+1; |5| &gt; 1+1; |10| &gt; 2+3. Sí es estrictamente dominante, por lo que converge.</p>
      <p>(b) Con la calculadora del módulo: 8 iteraciones hasta residuo ≤ 10⁻⁶.</p>
      <p>(c) <strong>Solución: (1, −2, 1).</strong> Verificación: 10 − 4 + 1 = 7 ✓; 1 − 10 + 1 = −8 ✓; 2 − 6 + 10 = 6 ✓.</p>`,
  },
];

const EJEMPLOS_EXTRA_2 = `
  <article class="ejemplo-extra">
    <h3>Ejemplo adicional A · Intercambio de filas (2 × 2)</h3>
    <p>Resuelve x + 2y = 5, 3x + y = 6.</p>
    <ol>
      <li><strong>Pivote:</strong> en la columna 1, |3| &gt; |1|, así que intercambiamos las filas: [3 1 | 6; 1 2 | 5].</li>
      <li><strong>Eliminación:</strong> fila 2 ← fila 2 − (1/3)·fila 1 → [0  5/3 | 3].</li>
      <li><strong>Sustitución:</strong> y = 3·(3/5) = 1.8; x = (6 − 1.8)/3 = 1.4.</li>
    </ol>
    <p><strong>Solución: (1.4, 1.8).</strong> Sin pivoteo, el primer paso dividiría entre 1 y el cálculo sería igual de válido aquí; el pivoteo importa cuando el pivote natural es muy pequeño.</p>
  </article>
  <article class="ejemplo-extra">
    <h3>Ejemplo adicional B · Cuando Gauss-Seidel diverge</h3>
    <p>Con A = [[1,2],[3,1]] y b = (5, 6), los residuos de Gauss-Seidel desde cero son aproximadamente 18, 108, 648, 3890, 23 300, 140 000 (iteraciones 1 a 6). Cada paso empeora el resultado.</p>
    <p>La causa es estructural: la fila 1 no es diagonal dominante. Esto no prueba que todo sistema no dominante diverja (la dominancia es solo suficiente), pero en este caso la iteración sí diverge. Por eso el módulo advierte en lugar de devolver un valor sin aviso.</p>
  </article>`;

if (typeof module !== "undefined") module.exports = { AUTOEVALUACION_2, EJERCICIOS_2 };
