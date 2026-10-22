/* Contenido didáctico del módulo 2: autoevaluación y ejercicios con solución. */

const AUTOEVALUACION_2 = [
  {
    tema: "Pivoteo parcial",
    tipo: "multiple",
    pregunta: "En la columna k, el pivoteo parcial elige como pivote:",
    opciones: [
      "La primera fila de la columna, siempre.",
      "La fila (desde k en adelante) con mayor valor absoluto en la columna k.",
      "La fila con mayor valor algebraico, aunque sea negativa.",
    ],
    respuesta: 1,
    explicacion: "Se compara |aᵢₖ| para i ≥ k y se usa el de mayor módulo como divisor. Así los multiplicadores |aᵢₖ / aₖₖ| quedan ≤ 1 y el error de redondeo no se amplifica.",
    porQue: [
      "Puede ser cero o muy pequeño: dividir entre él amplifica el error. Con [[0,2,1],[1,−1,2],[3,1,1]] la primera fila tiene 0 en la columna 1 y no sirve como pivote.",
      "",
      "El signo no decide la estabilidad: −5 es mejor pivote que 2. El valor algebraico máximo puede elegir un número pequeño positivo y dejar fuera uno grande negativo.",
    ],
    pasos: [
      "Mirar la columna k desde la fila k hacia abajo: |a₁ₖ|, |a₂ₖ|, …, |aₙₖ|.",
      "Intercambiar la fila k con la de mayor módulo.",
      "Eliminar los elementos bajo el pivote; los multiplicadores tienen módulo ≤ 1.",
    ],
    comoDeberia: "Recorrer las filas k a n, tomar el mayor |aᵢₖ|, intercambiar y luego eliminar.",
  },
  {
    tema: "Convergencia",
    tipo: "vf",
    pregunta: "La dominancia diagonal estricta es condición NECESARIA para que Gauss-Seidel converja.",
    opciones: ["Verdadero", "Falso"],
    respuesta: 1,
    explicacion: "Es suficiente, no necesaria. La matriz [[2,1,0],[1,2,1],[0,1,2]] es simétrica definida positiva: Gauss-Seidel converge aunque su fila 2 no sea estrictamente dominante (|2| = |1| + |1|).",
    porQue: [
      "Sería cierto si la dominancia fuera necesaria. Pero el gráfico muestra que el residuo baja para una matriz que no es estrictamente dominante: la condición no es necesaria.",
      "Correcto: la dominancia es una condición suficiente que garantiza la convergencia. La condición exacta es que el radio espectral de la matriz de iteración sea menor que 1.",
    ],
    pasos: [
      "Comprobar la dominancia fila por fila: |aᵢᵢ| > Σ_{j≠i} |aᵢⱼ|.",
      "Si se cumple en todas las filas: converge (condición suficiente).",
      "Si no se cumple: no se puede concluir sin más análisis (radio espectral o prueba numérica).",
    ],
    comoDeberia: "Afirmar: «la dominancia diagonal estricta garantiza la convergencia de Gauss-Seidel». Si se quiere el criterio exacto, calcular el radio espectral de T = −(D+L)⁻¹U.",
    grafico: canvas => {
      const r = gaussSeidel([[2, 1, 0], [1, 2, 1], [0, 1, 2]], [3, 4, 3], { maxIter: 25, tol: 1e-14 });
      new Chart(canvas, {
        type: "line",
        data: { labels: r.rows.map(f => f.iteracion), datasets: [{ label: "Residuo ‖b − A·x‖∞ (matriz SPD, no dominante)", data: r.rows.map(f => f.residuo), borderColor: "#185e73", backgroundColor: "#185e73", tension: 0.2 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: "Iteración" } }, y: { type: "logarithmic", title: { display: true, text: "Residuo" } } } },
      });
    },
  },
  {
    tema: "Cálculo manual",
    tipo: "numerica",
    pregunta: "Sistema A = [[4,1,1],[1,5,1],[1,1,6]], b = (9, 14, 21). Gauss-Seidel desde cero: valor de x₁ tras la primera iteración (tolerancia 0.001).",
    respuesta: 2.25,
    tol: 0.001,
    explicacion: "x₁ = (9 − 1·x₂ − 1·x₃)/4. Como partimos del vector cero, x₂ = x₃ = 0 y x₁ = 9/4 = 2.25.",
    pasos: [
      "Escribir la primera ecuación despejada: x₁ = (9 − x₂ − x₃)/4.",
      "Con x₂ = x₃ = 0 (vector inicial): x₁ = 9/4 = 2.25.",
      "Para x₂ ya se usa el valor nuevo: x₂ = (14 − 2.25 − 0)/5 = 2.35. Para x₃: (21 − 2.25 − 2.35)/6 ≈ 2.7333.",
    ],
    errores: [
      "Usar Jacobi (solo valores anteriores) cambia x₂: daría 14/5 = 2.8, no 2.35. Gauss-Seidel reutiliza x₁ = 2.25 de inmediato.",
      "Olvidar dividir entre la diagonal (4) da 9, que no tiene sentido como primera aproximación.",
    ],
    comoDeberia: "Despejar cada incógnita, restar las contribuciones de las demás con los valores más recientes y dividir entre el coeficiente de la diagonal.",
    grafico: canvas => {
      const r = gaussSeidel([[4, 1, 1], [1, 5, 1], [1, 1, 6]], [9, 14, 21], { maxIter: 4, tol: 0 });
      new Chart(canvas, {
        type: "line",
        data: {
          labels: r.rows.map(f => `k=${f.iteracion}`),
          datasets: [0, 1, 2].map(i => ({ label: `x${i + 1}`, data: r.rows.map(f => f.x[i]), borderColor: ["#ef6c45", "#185e73", "#327c62"][i], backgroundColor: ["#ef6c45", "#185e73", "#327c62"][i], tension: 0.2 })),
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { title: { display: true, text: "Valor" } } } },
      });
    },
  },
  {
    tema: "Singularidad",
    tipo: "multiple",
    pregunta: "Tras el pivoteo, un pivote es exactamente 0 y no hay fila que lo reemplace. ¿Qué indica?",
    opciones: [
      "Que la solución es única, pero hay que redondear más.",
      "Que el sistema es singular: no tiene solución única.",
      "Que Gauss-Seidel debe usarse en lugar de eliminación.",
    ],
    respuesta: 1,
    explicacion: "Si el mayor |valor| de la columna es cero, toda la columna desde ese punto es cero: det(A) = 0 y la matriz no tiene inversa. El sistema tiene infinitas soluciones o ninguna.",
    porQue: [
      "Un pivote cero no es un problema de redondeo: es una propiedad matemática de la matriz. Más decimales no lo arreglan.",
      "",
      "Gauss-Seidel también falla: necesita dividir entre los elementos de la diagonal, y si la matriz es singular esas divisiones no tienen sentido.",
    ],
    pasos: [
      "Buscar en la columna el valor de mayor módulo.",
      "Si es 0 (o menor que una tolerancia), la columna no aporta información nueva.",
      "Concluir: det(A) = 0; no hay solución única. Revisar si hay ecuaciones repetidas o contradictorias.",
    ],
    comoDeberia: "Detener el cálculo, informar «sistema singular» y, si el modelo lo permite, revisar sus ecuaciones.",
    grafico: canvas => {
      const xs = [-1, 5];
      new Chart(canvas, {
        type: "line",
        data: {
          datasets: [
            { label: "x + 2y = 3", data: xs.map(x => ({ x, y: (3 - x) / 2 })), borderColor: "#185e73", pointRadius: 0 },
            { label: "2x + 4y = 6 (la misma recta)", data: xs.map(x => ({ x, y: (6 - 2 * x) / 4 })), borderColor: "#ef6c45", borderDash: [6, 4], pointRadius: 0 },
          ],
        },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" }, y: {} } },
      });
    },
  },
  {
    tema: "Residuo y error",
    tipo: "vf",
    pregunta: "Un residuo r = b − A·x muy pequeño garantiza un error pequeño en x, sin importar la matriz.",
    opciones: ["Verdadero", "Falso"],
    respuesta: 1,
    explicacion: "El error cumple A·e = r, así que e = A⁻¹·r. Si A⁻¹ es grande (matriz mal condicionada), un residuo pequeño puede coexistir con un error grande: ‖e‖/‖x‖ ≤ κ(A)·‖r‖/‖b‖.",
    porQue: [
      "Sería cierto solo si κ(A) fuera pequeño. En matrices casi singulares, el residuo ≈ 0 puede esconder un error grande; el gráfico lo muestra.",
      "Correcto: la cota depende del número de condición κ(A). Hay que reportar residuo y, cuando se pueda, κ(A).",
    ],
    pasos: [
      "Calcular el residuo r = b − A·x.",
      "Estimar κ(A) = ‖A‖·‖A⁻¹‖.",
      "Aplicar la cota del error relativo: ‖e‖/‖x‖ ≤ κ(A)·‖r‖/‖b‖.",
    ],
    comoDeberia: "Interpretar el residuo junto con κ(A): un residuo pequeño es buena señal, pero no basta si la matriz es sensible.",
    grafico: canvas => {
      const l1 = x => x;
      const l2 = x => 0.999 * x + 0.02;
      new Chart(canvas, {
        type: "line",
        data: {
          datasets: [
            { label: "Recta 1: y = x", data: [{ x: 15, y: l1(15) }, { x: 25, y: l1(25) }], borderColor: "#185e73", pointRadius: 0 },
            { label: "Recta 2: y = 0.999x + 0.02", data: [{ x: 15, y: l2(15) }, { x: 25, y: l2(25) }], borderColor: "#327c62", pointRadius: 0 },
            { type: "scatter", label: "Solución exacta (20, 20)", data: [{ x: 20, y: 20 }], backgroundColor: "#ef6c45", pointRadius: 7 },
            { type: "scatter", label: "Aproximación (19, 19): residuo pequeño", data: [{ x: 19, y: 19 }], backgroundColor: "#14232e", pointRadius: 6 },
          ],
        },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" }, y: {} } },
      });
    },
  },
  {
    tema: "Criterio de parada",
    tipo: "multiple",
    pregunta: "Gauss-Seidel se detiene con estado correcto cuando:",
    opciones: [
      "Se alcanza el máximo de 100 iteraciones.",
      "La norma infinita del residuo es menor o igual a la tolerancia.",
      "Después de una sola iteración.",
    ],
    respuesta: 1,
    explicacion: "El criterio del módulo es ‖b − A·x‖∞ ≤ tol. Si se agotan las iteraciones sin cumplirlo, el estado es «límite»: no se afirma convergencia.",
    porQue: [
      "Agotar el máximo no demuestra convergencia: el método pudo estar divergiendo. El módulo lo marca como «límite».",
      "",
      "Una sola iteración casi nunca basta: el residuo puede seguir siendo grande. La parada depende de la tolerancia, no del número de pasos.",
    ],
    pasos: [
      "Tras cada iteración, calcular r = b − A·x.",
      "Si ‖r‖∞ ≤ tol: parar con estado correcto.",
      "Si se llega al máximo sin cumplirlo: estado «límite», sin afirmar convergencia.",
    ],
    comoDeberia: "Distinguir siempre «convergió» de «se agotó el máximo», y reportar el residuo final.",
    grafico: canvas => {
      const r = gaussSeidel([[4, 1, 1], [1, 5, 1], [1, 1, 6]], [9, 14, 21], { maxIter: 12, tol: 0 });
      new Chart(canvas, {
        type: "line",
        data: { labels: r.rows.map(f => f.iteracion), datasets: [{ label: "Residuo por iteración", data: r.rows.map(f => f.residuo), borderColor: "#ef6c45", backgroundColor: "#ef6c45", tension: 0.2 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { x: { title: { display: true, text: "Iteración" } }, y: { type: "logarithmic", title: { display: true, text: "Residuo" } } } },
      });
    },
  },
];

const EJERCICIOS_2 = [
  {
    nivel: "Intermedio",
    tipo: "gauss",
    datos: { A: [[2, 1], [1, 3]], b: [3, 5] },
    enunciado: "Resuelve por eliminación gaussiana con pivoteo parcial: 2x + y = 3, x + 3y = 5.",
    solucion: `<p>Matriz aumentada: [2 1 | 3; 1 3 | 5]. En la columna 1 el mayor |valor| es 2 (fila 1): no hay intercambio.</p>
      <p>Multiplicador 1/2: fila 2 ← fila 2 − ½·fila 1 → [0 2.5 | 3.5].</p>
      <p>Sustitución hacia atrás: y = 3.5/2.5 = 1.4; x = (3 − 1.4)/2 = 0.8.</p>
      <p><strong>Solución: (0.8, 1.4).</strong> Verificación: 2(0.8)+1.4 = 3 ✓; 0.8+3(1.4) = 5 ✓.</p>`,
  },
  {
    nivel: "Intermedio",
    tipo: "gs",
    datos: { A: [[2, 1, -1], [-3, -1, 2], [-2, 1, 2]], b: [8, -11, -3], maxIter: 3 },
    enunciado: "Calcula la primera iteración de Gauss-Seidel desde x₀ = (0, 0, 0) para A = [[2,1,−1],[−3,−1,2],[−2,1,2]], b = (8, −11, −3).",
    solucion: `<p>x₁ = (8 − 0 − 0)/2 = 4.</p>
      <p>x₂ = (−11 − (−3)(4) − 2·0)/(−1) = (−11 + 12)/(−1) = −1.</p>
      <p>x₃ = (−3 − (−2)(4) − 1·(−1))/2 = (−3 + 8 + 1)/2 = 3.</p>
      <p><strong>Primera iteración: (4, −1, 3).</strong> Observa que los valores nuevos ya se usan en la fila siguiente: esa es la diferencia con Jacobi.</p>`,
  },
  {
    nivel: "Avanzado",
    tipo: "gs",
    datos: { A: [[1, 2], [3, 1]], b: [5, 6], maxIter: 6 },
    enunciado: "Aplica Gauss-Seidel a A = [[1,2],[3,1]], b = (5, 6), desde cero. ¿Converge? Justifica con el residuo y con la dominancia diagonal.",
    solucion: `<p>La matriz no es diagonal dominante: en la fila 1, |1| &lt; |2|.</p>
      <p>Los residuos de la calculadora crecen en cada iteración (≈ 18, 108, 648, 3890, …): el método <strong>diverge</strong>.</p>
      <p>Matriz de iteración: T = [[0, −2],[0, 6]], con autovalores 0 y 6. Como 6 &gt; 1, las iteraciones no convergen.</p>
      <p>Conclusión: aquí conviene eliminación gaussiana (solución (1.4, 1.8)). Verificación: 1.4 + 3.6 = 5 ✓; 4.2 + 1.8 = 6 ✓.</p>`,
  },
  {
    nivel: "Avanzado",
    tipo: "gs",
    datos: { A: [[10, 2, 1], [1, 5, 1], [2, 3, 10]], b: [7, -8, 6] },
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
