/* Contenido didáctico del módulo 3: autoevaluación, ejercicios con solución y ejemplos adicionales. */

const AUTOEVALUACION_3 = [
  {
    tipo: "multiple",
    pregunta: "Un polinomio de Lagrange con n nodos tiene grado:",
    opciones: ["n", "n − 1", "n + 1"],
    respuesta: 1,
    explicacion: "n puntos determinan un único polinomio de grado a lo sumo n − 1.",
  },
  {
    tipo: "vf",
    pregunta: "Lagrange rechaza una entrada con dos valores de y para la misma abscisa, en lugar de eliminar un nodo en silencio.",
    opciones: ["Verdadero", "Falso"],
    respuesta: 0,
    explicacion: "Un punto x no puede tener dos imágenes en una función; el módulo informa el error y no calcula.",
  },
  {
    tipo: "numerica",
    pregunta: "Con los nodos (1, 1), (2, 3), (3, 2), evalúa el polinomio de Lagrange en x = 2.5 (tolerancia 0.001).",
    respuesta: 2.875,
    tol: 0.001,
    explicacion: "P(2.5) = 1·(−0.125) + 3·(0.75) + 2·(0.375) = 2.875.",
  },
  {
    tipo: "multiple",
    pregunta: "La regresión lineal por mínimos cuadrados necesita:",
    opciones: [
      "Que la recta pase por todos los datos.",
      "Al menos dos abscisas distintas.",
      "Seis datos como mínimo.",
    ],
    respuesta: 1,
    explicacion: "Si todas las x son iguales, la pendiente Sxy/Sxx tiene denominador cero. Pasar por los datos no es un requisito: es lo que distingue a la regresión de la interpolación.",
  },
  {
    tipo: "vf",
    pregunta: "Si la consulta está fuera del intervalo de los datos, el valor interpolado es tan confiable como dentro del intervalo.",
    opciones: ["Verdadero", "Falso"],
    respuesta: 1,
    explicacion: "Fuera del intervalo el polinomio puede divergir rápidamente. Por eso el módulo muestra un aviso de extrapolación.",
  },
  {
    tipo: "numerica",
    pregunta: "Pendiente de la recta de mínimos cuadrados para los datos (1, 1), (2, 3), (3, 2), (4, 5) (tolerancia 0.01).",
    respuesta: 1.1,
    tol: 0.01,
    explicacion: "Sxy = 5.5 y Sxx = 5, así que b = 1.1 (el intercepto resulta 0).",
  },
];

const EJERCICIOS_3 = [
  {
    nivel: "Intermedio",
    enunciado: "Para los nodos (0, 1), (1, 2), (2, 2), (3, 4), calcula la base L₀(x) y su valor en x = 1.5.",
    solucion: `<p>L₀(x) = (x − 1)(x − 2)(x − 3) / [(0 − 1)(0 − 2)(0 − 3)] = (x − 1)(x − 2)(x − 3) / (−6).</p>
      <p>En x = 1.5: (0.5)(−0.5)(−1.5) / (−6) = 0.375 / (−6) = <strong>−0.0625</strong>.</p>
      <p>Esta es la contribución negativa del primer nodo: las bases pueden ser negativas aunque los datos sean positivos.</p>`,
  },
  {
    nivel: "Intermedio",
    enunciado: "Ajusta por mínimos cuadrados los datos (1, 1), (2, 3), (3, 2), (4, 5). Calcula pendiente, intercepto, SCR y el valor ajustado en x = 5.",
    solucion: `<p>x̄ = 2.5, ȳ = 2.75. Sxy = 5.5, Sxx = 5.</p>
      <p>Pendiente b = 1.1; intercepto a = 2.75 − 1.1·2.5 = 0. Recta: y = 1.1x.</p>
      <p>Residuos: −0.1, 0.8, −1.3, 0.6 → SCR = 0.01 + 0.64 + 1.69 + 0.36 = <strong>2.7</strong>.</p>
      <p>Predicción en x = 5: 5.5.</p>`,
  },
  {
    nivel: "Avanzado",
    enunciado: "Demuestra que la interpolación de Lagrange reproduce exactamente un polinomio de grado ≤ n − 1. Aplícalo a (0, 0), (1, 1), (2, 4), que siguen y = x², y calcula P(3).",
    solucion: `<p>Si f es un polinomio de grado ≤ n − 1, el polinomio interpolador P de los n nodos cumple P(xᵢ) = f(xᵢ). Ambos tienen grado ≤ n − 1 y coinciden en n puntos distintos; la diferencia tiene n raíces y grado ≤ n − 1, así que es idénticamente cero.</p>
      <p>Por eso P(x) = x² para estos tres nodos, y <strong>P(3) = 9</strong>, aunque x = 3 no sea un nodo.</p>`,
  },
  {
    nivel: "Avanzado",
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
