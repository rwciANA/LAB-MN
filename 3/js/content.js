/* Contenido didáctico del módulo 3: autoevaluación, ejercicios con solución y ejemplos adicionales. */

const AUTOEVALUACION_3 = [
  {
    tema: "Grado del polinomio",
    tipo: "multiple",
    pregunta: "Un polinomio de Lagrange con n nodos tiene grado:",
    opciones: ["n", "n − 1", "n + 1"],
    respuesta: 1,
    explicacion: "Con n abscisas distintas existe un único polinomio de grado a lo sumo n − 1. Cada base Lᵢ es un producto de n − 1 factores lineales (x − xⱼ), con j ≠ i.",
    porQue: [
      "Grado n exigiría un punto más que los datos disponibles: con n puntos sobra una libertad, y el grado n − 1 ya basta para pasar por todos.",
      "",
      "Grado n + 1 también pasa por los datos, pero no es único: habría infinitos polinomios posibles. Lagrange construye el de grado mínimo.",
    ],
    pasos: [
      "Contar los nodos: n.",
      "Cada base Lᵢ tiene un factor por cada nodo distinto de i: n − 1 factores.",
      "Por tanto, el grado de P(x) = Σ yᵢ·Lᵢ(x) es n − 1.",
    ],
    comoDeberia: "Contar factores de cada base: n − 1 factores lineales dan grado n − 1.",
    grafico: canvas => {
      const xs = [0, 1, 2], ys = [1, 3, 2];
      const curva = [];
      for (let x = -0.5; x <= 2.5; x += 0.05) curva.push({ x, y: lagrange(xs, ys, x).value });
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { type: "line", label: "Polinomio de grado 2 (n = 3 nodos)", data: curva, borderColor: "#ef6c45", pointRadius: 0, tension: 0.2 },
          { label: "Nodos", data: xs.map((x, i) => ({ x, y: ys[i] })), backgroundColor: "#14232e", pointRadius: 6 },
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" } } },
      });
    },
  },
  {
    tema: "Nodos repetidos",
    tipo: "vf",
    pregunta: "Lagrange rechaza una entrada con dos valores de y para la misma abscisa, en lugar de eliminar un nodo en silencio.",
    opciones: ["Verdadero", "Falso"],
    respuesta: 0,
    explicacion: "Una abscisa no puede tener dos imágenes en una función: los datos son contradictorios. Eliminar un nodo sin avisar cambiaría el resultado sin que el usuario lo sepa.",
    porQue: [
      "Correcto: el módulo muestra «abscisa repetida» y no calcula, para que el usuario corrija los datos.",
      "Sería un error de diseño: el resultado cambiaría sin aviso y no se podría auditar qué datos se usaron.",
    ],
    pasos: [
      "Revisar que todas las abscisas sean distintas.",
      "Si hay repetidas: mostrar un error que indique cuáles.",
      "Solo entonces construir las bases de Lagrange.",
    ],
    comoDeberia: "Validar antes de calcular, y mostrar la abscisa conflictiva con sus dos valores de y.",
    grafico: canvas => {
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { label: "(1, 2)", data: [{ x: 1, y: 2 }], backgroundColor: "#185e73", pointRadius: 7 },
          { label: "(1, 5): conflicto", data: [{ x: 1, y: 5 }], backgroundColor: "#ef6c45", pointRadius: 7 },
          { label: "(2, 3)", data: [{ x: 2, y: 3 }], backgroundColor: "#14232e", pointRadius: 6 },
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear", min: 0, max: 3 }, y: { min: 0, max: 6 } } },
      });
    },
  },
  {
    tema: "Cálculo de Lagrange",
    tipo: "numerica",
    pregunta: "Con los nodos (1, 1), (2, 3), (3, 2), evalúa el polinomio de Lagrange en x = 2.5 (tolerancia 0.001).",
    respuesta: 2.875,
    tol: 0.001,
    explicacion: "P(2.5) = 1·L₁(2.5) + 3·L₂(2.5) + 2·L₃(2.5) = 1·(−0.125) + 3·(0.75) + 2·(0.375) = 2.875.",
    pasos: [
      "L₁(2.5) = (2.5−2)(2.5−3) / [(1−2)(1−3)] = (0.5)(−0.5)/2 = −0.125.",
      "L₂(2.5) = (2.5−1)(2.5−3) / [(2−1)(2−3)] = (1.5)(−0.5)/(−1) = 0.75.",
      "L₃(2.5) = (2.5−1)(2.5−2) / [(3−1)(3−2)] = (1.5)(0.5)/2 = 0.375.",
      "Comprobación: −0.125 + 0.75 + 0.375 = 1 (las bases suman 1 en cualquier x).",
      "P(2.5) = 1(−0.125) + 3(0.75) + 2(0.375) = 2.875.",
    ],
    errores: [
      "Olvidar el signo de un factor: el de L₁ es negativo porque (2.5 − 3) < 0. Ese signo es correcto y produce una contribución negativa.",
      "Confundir el orden de los nodos: cada yᵢ debe multiplicar a su propia base Lᵢ.",
    ],
    comoDeberia: "Calcular cada base por separado, verificar que suman 1 y luego sumar las contribuciones yᵢ·Lᵢ(x).",
    grafico: canvas => {
      const xs = [1, 2, 3], ys = [1, 3, 2];
      const curva = [];
      for (let x = 0.5; x <= 3.5; x += 0.05) curva.push({ x, y: lagrange(xs, ys, x).value });
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { type: "line", label: "Polinomio de Lagrange", data: curva, borderColor: "#185e73", pointRadius: 0, tension: 0.2 },
          { label: "Nodos", data: xs.map((x, i) => ({ x, y: ys[i] })), backgroundColor: "#14232e", pointRadius: 6 },
          { label: "P(2.5) = 2.875", data: [{ x: 2.5, y: 2.875 }], backgroundColor: "#ef6c45", pointRadius: 8 },
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" } } },
      });
    },
  },
  {
    tema: "Requisitos de la regresión",
    tipo: "multiple",
    pregunta: "La regresión lineal por mínimos cuadrados necesita:",
    opciones: [
      "Que la recta pase por todos los datos.",
      "Al menos dos abscisas distintas.",
      "Seis datos como mínimo.",
    ],
    respuesta: 1,
    explicacion: "La pendiente b = Sxy / Sxx necesita Sxx ≠ 0, es decir, al menos dos abscisas distintas. Pasar por todos los datos no es un requisito: es justamente lo que la regresión no busca.",
    porQue: [
      "Eso describe la interpolación. Con error de medición la recta no pasa por todos los puntos, y eso es lo esperado.",
      "",
      "No hay un mínimo de seis datos. Con dos abscisas distintas se calcula la recta, aunque con dos puntos el ajuste es exacto y no permite validar el modelo.",
    ],
    pasos: [
      "Calcular x̄ e ȳ.",
      "Sxx = Σ(xᵢ − x̄)²: si vale 0, todas las x son iguales y la pendiente no existe.",
      "Con Sxx ≠ 0: b = Sxy / Sxx y a = ȳ − b·x̄.",
    ],
    comoDeberia: "Verificar que hay variación en x antes de ajustar; con pocos datos, advertir que el ajuste no permite validar el modelo.",
    grafico: canvas => {
      const xs = [0, 1, 2, 3], ys = [1, 2, 2, 4];
      const reg = linearRegression(xs, ys);
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { type: "line", label: "Recta y = 0.9 + 0.9x", data: [{ x: -0.2, y: reg.predecir(-0.2) }, { x: 3.2, y: reg.predecir(3.2) }], borderColor: "#185e73", pointRadius: 0 },
          { label: "Datos", data: xs.map((x, i) => ({ x, y: ys[i] })), backgroundColor: "#14232e", pointRadius: 6 },
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" } } },
      });
    },
  },
  {
    tema: "Extrapolación",
    tipo: "vf",
    pregunta: "Si la consulta está fuera del intervalo de los datos, el valor interpolado es tan confiable como dentro del intervalo.",
    opciones: ["Verdadero", "Falso"],
    respuesta: 1,
    explicacion: "Fuera del intervalo el error de interpolación crece con ∏(x − xᵢ), y el polinomio puede dispararse. Con el caso de partida, P(5) = 26 mientras la recta predice 5.4.",
    porQue: [
      "Falso en la práctica: el término ∏(x − xᵢ) crece rápido al alejarse de los nodos, así que el error también.",
      "Correcto: dentro del intervalo la interpolación es razonable; fuera, debe marcarse como extrapolación.",
    ],
    pasos: [
      "Comprobar si x está entre el mínimo y el máximo de las abscisas.",
      "Si no está: marcar la predicción como extrapolación.",
      "Comparar con un modelo más estable (la regresión) antes de decidir.",
    ],
    comoDeberia: "Mostrar aviso de extrapolación y preferir un modelo de tendencia, o medir en ese rango.",
    grafico: canvas => {
      const xs = [0, 1, 2, 3], ys = [1, 2, 2, 4];
      const reg = linearRegression(xs, ys);
      const curva = [], recta = [];
      for (let x = -0.5; x <= 5.5; x += 0.1) {
        curva.push({ x, y: lagrange(xs, ys, x).value });
        recta.push({ x, y: reg.predecir(x) });
      }
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { type: "line", label: "Lagrange (se dispara fuera de [0, 3])", data: curva, borderColor: "#ef6c45", pointRadius: 0, tension: 0.2 },
          { type: "line", label: "Recta de regresión", data: recta, borderColor: "#185e73", borderDash: [6, 4], pointRadius: 0 },
          { label: "Datos", data: xs.map((x, i) => ({ x, y: ys[i] })), backgroundColor: "#14232e", pointRadius: 6 },
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" }, y: { min: -10, max: 30 } } },
      });
    },
  },
  {
    tema: "Pendiente",
    tipo: "numerica",
    pregunta: "Pendiente de la recta de mínimos cuadrados para los datos (1, 1), (2, 3), (3, 2), (4, 5) (tolerancia 0.01).",
    respuesta: 1.1,
    tol: 0.01,
    explicacion: "x̄ = 2.5, ȳ = 2.75. Sxy = Σ(xᵢ − x̄)(yᵢ − ȳ) = 5.5 y Sxx = 5, así que b = 5.5 / 5 = 1.1. El intercepto resulta 0.",
    pasos: [
      "x̄ = (1+2+3+4)/4 = 2.5; ȳ = (1+3+2+5)/4 = 2.75.",
      "Sxy = (−1.5)(−1.75) + (−0.5)(0.25) + (0.5)(−0.75) + (1.5)(2.25) = 5.5.",
      "Sxx = 2.25 + 0.25 + 0.25 + 2.25 = 5.",
      "b = 5.5 / 5 = 1.1 y a = 2.75 − 1.1·2.5 = 0.",
    ],
    errores: [
      "Dividir Sxy entre n en lugar de Sxx: da 1.375, que no es la pendiente de mínimos cuadrados.",
      "No centrar los datos: sumar xᵢyᵢ sin restar las medias no da la pendiente correcta en general.",
    ],
    comoDeberia: "Centrar con las medias, calcular Sxy y Sxx, dividir y comprobar que los residuos suman aproximadamente cero.",
    grafico: canvas => {
      const xs = [1, 2, 3, 4], ys = [1, 3, 2, 5];
      const reg = linearRegression(xs, ys);
      const segmentos = xs.map((x, i) => [{ x, y: ys[i] }, { x, y: reg.predecir(x) }]);
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { type: "line", label: "Recta y = 1.1x", data: [{ x: 0.5, y: reg.predecir(0.5) }, { x: 4.5, y: reg.predecir(4.5) }], borderColor: "#185e73", pointRadius: 0 },
          { label: "Datos", data: xs.map((x, i) => ({ x, y: ys[i] })), backgroundColor: "#14232e", pointRadius: 6 },
          ...segmentos.map((s, k) => ({ type: "line", label: k === 0 ? "Residuos" : undefined, data: s, borderColor: "#ef6c45", borderDash: [3, 3], pointRadius: 0 })),
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { filter: it => it.text } } }, scales: { x: { type: "linear" } } },
      });
    },
  },
];

const EJERCICIOS_3 = [
  {
    nivel: "Intermedio",
    tipo: "lagrange",
    datos: { xs: [0, 1, 2, 3], ys: [1, 2, 2, 4], x: 1.5 },
    enunciado: "Para los nodos (0, 1), (1, 2), (2, 2), (3, 4), calcula la base L₀(x) y su valor en x = 1.5.",
    solucion: `<p>L₀(x) = (x − 1)(x − 2)(x − 3) / [(0 − 1)(0 − 2)(0 − 3)] = (x − 1)(x − 2)(x − 3) / (−6).</p>
      <p>En x = 1.5: (0.5)(−0.5)(−1.5) / (−6) = 0.375 / (−6) = <strong>−0.0625</strong>.</p>
      <p>Esta es la contribución negativa del primer nodo: las bases pueden ser negativas aunque los datos sean positivos.</p>`,
  },
  {
    nivel: "Intermedio",
    tipo: "regresion",
    datos: { xs: [1, 2, 3, 4], ys: [1, 3, 2, 5], x: 5 },
    enunciado: "Ajusta por mínimos cuadrados los datos (1, 1), (2, 3), (3, 2), (4, 5). Calcula pendiente, intercepto, SCR y el valor ajustado en x = 5.",
    solucion: `<p>x̄ = 2.5, ȳ = 2.75. Sxy = 5.5, Sxx = 5.</p>
      <p>Pendiente b = 1.1; intercepto a = 2.75 − 1.1·2.5 = 0. Recta: y = 1.1x.</p>
      <p>Residuos: −0.1, 0.8, −1.3, 0.6 → SCR = 0.01 + 0.64 + 1.69 + 0.36 = <strong>2.7</strong>.</p>
      <p>Predicción en x = 5: 5.5.</p>`,
  },
  {
    nivel: "Avanzado",
    tipo: "lagrange",
    datos: { xs: [0, 1, 2], ys: [0, 1, 4], x: 3 },
    enunciado: "Demuestra que la interpolación de Lagrange reproduce exactamente un polinomio de grado ≤ n − 1. Aplícalo a (0, 0), (1, 1), (2, 4), que siguen y = x², y calcula P(3).",
    solucion: `<p>Si f es un polinomio de grado ≤ n − 1, el polinomio interpolador P de los n nodos cumple P(xᵢ) = f(xᵢ). Ambos tienen grado ≤ n − 1 y coinciden en n puntos distintos; la diferencia tiene n raíces y grado ≤ n − 1, así que es idénticamente cero.</p>
      <p>Por eso P(x) = x² para estos tres nodos, y <strong>P(3) = 9</strong>, aunque x = 3 no sea un nodo.</p>`,
  },
  {
    nivel: "Avanzado",
    tipo: "comparacion",
    datos: { xs: [0, 1, 2, 3], ys: [1, 2, 2, 4], x: 5 },
    enunciado: "Con el caso de partida (x = 0, 1, 2, 3; y = 1, 2, 2, 4), compara Lagrange y la recta en x = 5. ¿Cuál confiarías más y por qué?",
    solucion: `<p>Lagrange (cuatro nodos) da P(5) = 26 ms. La recta da 0.9 + 0.9·5 = 5.4 ms.</p>
      <p>La diferencia es grande porque x = 5 está fuera del intervalo de los datos (extrapolación). El polinomio de grado 3 sigue su curvatura y se dispara; la recta modela una tendencia y es más estable para predecir.</p>
      <p>Conclusión: para predecir fuera del rango conviene el ajuste; para reproducir los datos exactos dentro del rango, la interpolación. Ninguno de los dos elimina el error de medición.</p>`,
  },
];

const EJEMPLOS_EXTRA_3 = `
  <article class="ejemplo-extra">
    <h3>Ejemplo adicional A · Contribución de cada base (3 nodos)</h3>
    <p>Nodos (1, 1), (2, 3), (3, 2); consulta x = 2.5.</p>
    <ol>
      <li>L₀(2.5) = (2.5−2)(2.5−3)/[(1−2)(1−3)] = (0.5)(−0.5)/2 = −0.125 ⇒ contribución −0.125 · 1 = −0.125.</li>
      <li>L₁(2.5) = (2.5−1)(2.5−3)/[(2−1)(2−3)] = 0.75 ⇒ contribución 0.75 · 3 = 2.25.</li>
      <li>L₂(2.5) = (2.5−1)(2.5−2)/[(3−1)(3−2)] = 0.375 ⇒ contribución 0.375 · 2 = 0.75.</li>
    </ol>
    <p><strong>P(2.5) = −0.125 + 2.25 + 0.75 = 2.875.</strong> Las contribuciones se suman; una base negativa no indica error.</p>
  </article>
  <article class="ejemplo-extra">
    <h3>Ejemplo adicional B · Más nodos no siempre es mejor</h3>
    <p>Se aproxima eˣ con valores redondeados a un decimal y se evalúa en x = 2.5 (valor exacto 12.1825):</p>
    <table class="mini-table">
      <thead><tr><th>Nodos usados</th><th>n</th><th>P(2.5)</th><th>Error absoluto</th></tr></thead>
      <tbody>
        <tr><td>x = 2, 3</td><td>2</td><td>13.7500</td><td>1.5675</td></tr>
        <tr><td>x = 1, 2, 3, 4</td><td>4</td><td>11.8875</td><td>0.2950</td></tr>
        <tr><td>x = 0, 1, 2, 3, 4, 5</td><td>6</td><td>12.2684</td><td>0.0859</td></tr>
      </tbody>
    </table>
    <p>Con 6 nodos el error baja, pero no siempre pasa: el grado alto puede oscilar cerca de los extremos del intervalo. Por eso se recomienda revisar el error en cada caso y no suponer que más nodos mejoran el resultado.</p>
  </article>`;

if (typeof module !== "undefined") module.exports = { AUTOEVALUACION_3, EJERCICIOS_3 };
