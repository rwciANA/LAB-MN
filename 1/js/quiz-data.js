/* Autoevaluación del módulo 1: métodos cerrados, abiertos, errores y residuos. */

const F1 = x => x * x * x - x - 2;   // f(x) = x³ − x − 2
const DF1 = x => 3 * x * x - 1;      // f′(x)

const AUTOEVALUACION_1 = [
  {
    tema: "Método cerrado",
    tipo: "multiple",
    pregunta: "¿Qué condición indispensable exige el método de bisección?",
    opciones: [
      "$f'(x) \\neq 0$ en todo el intervalo.",
      "Un intervalo $[a, b]$ con $f(a)\\cdot f(b) < 0$.",
      "Una semilla $x_0$ cercana a la raíz.",
    ],
    respuesta: 1,
    explicacion: "Por el teorema de Bolzano, si $f$ es continua y cambia de signo en $[a, b]$, hay al menos una raíz dentro. La bisección conserva en cada paso la mitad donde el cambio de signo persiste.",
    porQue: [
      "La derivada no interviene en la bisección. Exigir $f'\\neq 0$ es un requisito del método de Newton, no de los métodos cerrados.",
      "",
      "Una semilla $x_0$ es el punto de partida de los métodos abiertos (Newton). La bisección no la usa: necesita un intervalo que encierre la raíz.",
    ],
    pasos: [
      "Evaluar $f(a)$ y $f(b)$.",
      "Si $f(a)\\cdot f(b) < 0$, iniciar. Si no, avisar y no calcular.",
      "En cada paso, quedarse con la mitad donde el signo sigue cambiando.",
    ],
    comoDeberia: "Verificar el cambio de signo antes de iterar y mostrar un mensaje si no se cumple; nunca devolver un valor sin esa comprobación.",
    grafico: canvas => {
      const xs = [], ys = [];
      for (let x = 0.5; x <= 2.5; x += 0.02) { xs.push(x); ys.push(F1(x)); }
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { type: "line", label: "f(x) = x³ − x − 2", data: xs.map((x, i) => ({ x, y: ys[i] })), borderColor: "#185e73", pointRadius: 0 },
          { label: "f(1) < 0", data: [{ x: 1, y: F1(1) }], backgroundColor: "#ef6c45", pointRadius: 7 },
          { label: "f(2) > 0", data: [{ x: 2, y: F1(2) }], backgroundColor: "#327c62", pointRadius: 7 },
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" } } },
      });
    },
  },
  {
    tema: "Errores y residuos",
    tipo: "vf",
    pregunta: "Si el residuo $|f(x_{\\text{aprox}})|$ es menor que $10^{-6}$, entonces el error $|x_{\\text{aprox}} - r|$ siempre es menor que $10^{-6}$.",
    opciones: ["Verdadero", "Falso"],
    respuesta: 1,
    explicacion: "Residuo y error son magnitudes distintas: el error ≈ residuo / |f′(r)|. Si $f'(r)$ es muy pequeña (raíz casi doble), un residuo pequeño puede corresponder a un error grande.",
    porQue: [
      "Falso en general. Con $f(x) = (x-2)^2$, en $x = 2.001$ el residuo es $10^{-6}$ pero el error es $10^{-3}$: mil veces mayor.",
      "Correcto: la relación depende de $|f'(r)|$. Por eso el módulo reporta el residuo y el cambio entre iteraciones, no solo uno de ellos.",
    ],
    pasos: [
      "Calcular el residuo $|f(x_{\\text{aprox}})|$.",
      "Estimar $|f'(r)|$ cerca de la raíz.",
      "Error aproximado: $|x_{\\text{aprox}} - r| \\approx |f(x_{\\text{aprox}})| / |f'(r)|$.",
    ],
    comoDeberia: "Reportar el residuo y el error estimado juntos, y advertir cuando $|f'(r)|$ es pequeña.",
    grafico: canvas => {
      const xs = [], ys = [];
      for (let x = 1.9; x <= 2.1; x += 0.002) { xs.push(x); ys.push((x - 2) ** 2); }
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { type: "line", label: "f(x) = (x − 2)²", data: xs.map((x, i) => ({ x, y: ys[i] })), borderColor: "#185e73", pointRadius: 0 },
          { label: "Raíz doble en x = 2", data: [{ x: 2, y: 0 }], backgroundColor: "#14232e", pointRadius: 6 },
          { label: "x = 2.001: residuo 10⁻⁶", data: [{ x: 2.001, y: 1e-6 }], backgroundColor: "#ef6c45", pointRadius: 7 },
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" }, y: { min: -0.0005, max: 0.005 } } },
      });
    },
  },
  {
    tema: "Cálculo de bisección",
    tipo: "numerica",
    pregunta: "Para $f(x) = x^3 - x - 2$, calcula $f(1.5)$. Con ese valor, ¿en qué subintervalo queda la raíz? (Escribe $f(1.5)$; tolerancia 0.001.)",
    respuesta: -0.125,
    tol: 0.001,
    explicacion: "$f(1.5) = 1.5^3 - 1.5 - 2 = 3.375 - 3.5 = -0.125$. Como $f(1.5) < 0$ y $f(2) = 4 > 0$, la raíz está en $[1.5, 2]$.",
    pasos: [
      "$1.5^3 = 3.375$.",
      "$3.375 - 1.5 - 2 = -0.125$.",
      "Signo negativo en $1.5$ y positivo en $2$: el nuevo intervalo es $[1.5, 2]$.",
    ],
    errores: [
      "Calcular $1.5^3$ como $1.5 \\cdot 3 = 4.5$: la potencia es un producto de tres factores, $1.5\\cdot 1.5\\cdot 1.5 = 3.375$.",
      "Olvidar que la resta de $2$ también cuenta: $3.375 - 1.5 = 1.875$ y luego $1.875 - 2 = -0.125$.",
    ],
    comoDeberia: "Evaluar cada término con cuidado, y comparar el signo para decidir el nuevo intervalo.",
    grafico: canvas => {
      const xs = [], ys = [];
      for (let x = 1; x <= 2; x += 0.02) { xs.push(x); ys.push(F1(x)); }
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { type: "line", label: "f(x)", data: xs.map((x, i) => ({ x, y: ys[i] })), borderColor: "#185e73", pointRadius: 0 },
          { label: "(1.5, −0.125)", data: [{ x: 1.5, y: F1(1.5) }], backgroundColor: "#ef6c45", pointRadius: 7 },
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" } } },
      });
    },
  },
  {
    tema: "Orden de convergencia",
    tipo: "multiple",
    pregunta: "Newton, cerca de una raíz simple, converge de forma:",
    opciones: [
      "Lineal, con factor fijo $1/2$ por paso.",
      "Cuadrática: el número de cifras correctas se duplica en cada paso.",
      "Logarítmica: cada paso añade una cifra decimal.",
    ],
    respuesta: 1,
    explicacion: "En Newton, el error cumple $e_{n+1} \\approx C\\, e_n^2$. Si $e_n \\approx 10^{-3}$, entonces $e_{n+1} \\approx 10^{-6}$: las cifras correctas se duplican.",
    porQue: [
      "Eso describe la bisección, cuyo error se multiplica por $1/2$ en cada paso. Newton es más rápido cerca de la raíz.",
      "",
      "No hay una convergencia logarítmica de ese tipo: cada paso de Newton duplica las cifras correctas, no añade una.",
    ],
    pasos: [
      "Escribir $e_{n+1} \\approx C\\, e_n^2$.",
      "Si $e_n = 10^{-3}$, entonces $e_{n+1} \\approx 10^{-6}$ y luego $10^{-12}$.",
      "Concluir que el orden es $p = 2$.",
    ],
    comoDeberia: "Explicar el orden con el ejemplo de $\\sqrt{2}$: errores $10^{-1}, 10^{-3}, 10^{-6}, 10^{-12}$.",
    grafico: canvas => {
      const bis = [], newton = [0.0858, 0.00245, 2.12e-6, 1.59e-12];
      for (let n = 1; n <= 8; n += 1) bis.push(2 ** -n);
      new Chart(canvas, {
        type: "line",
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          datasets: [
            { label: "Bisección: error ≈ 1/2ⁿ (lineal)", data: bis, borderColor: "#185e73", tension: 0.2 },
            { label: "Newton: error (cuadrático)", data: [...newton, null, null, null, null], borderColor: "#ef6c45", backgroundColor: "#ef6c45", tension: 0.2 },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { type: "logarithmic", title: { display: true, text: "Error (escala log)" } }, x: { title: { display: true, text: "Iteración" } } } },
      });
    },
  },
  {
    tema: "Derivada nula",
    tipo: "multiple",
    pregunta: "En Newton, si $f'(x_n) = 0$ en una iteración, ¿qué debe ocurrir?",
    opciones: [
      "El método se detiene y avisa: no se puede dividir entre cero.",
      "El método sigue sin problema, porque la tangente horizontal también sirve.",
      "La iteración salta automáticamente al punto medio del intervalo.",
    ],
    respuesta: 0,
    explicacion: "La fórmula $x_{n+1} = x_n - f(x_n)/f'(x_n)$ requiere dividir entre $f'(x_n)$. Con $f' = 0$ la tangente es horizontal y no corta el eje: el algoritmo debe detenerse con un mensaje.",
    porQue: [
      "",
      "Una tangente horizontal no corta el eje $x$, así que la siguiente aproximación no existe. Seguir sería un error numérico, no un resultado.",
      "Newton no hace bisección: esta necesita un intervalo con cambio de signo, que Newton no garantiza ni usa.",
    ],
    pasos: [
      "Calcular $f'(x_n)$.",
      "Si $|f'(x_n)|$ es cero o muy pequeño: detener y avisar.",
      "Si no: $x_{n+1} = x_n - f(x_n)/f'(x_n)$.",
    ],
    comoDeberia: "Validar $|f'(x_n)|$ frente a un umbral antes de dividir, y cambiar de semilla o de método si se detiene.",
    grafico: canvas => {
      const xs = [], ys = [];
      for (let x = -1.5; x <= 1.5; x += 0.05) { xs.push(x); ys.push(x * x * x - 1); }
      new Chart(canvas, {
        type: "scatter",
        data: { datasets: [
          { type: "line", label: "f(x) = x³ − 1", data: xs.map((x, i) => ({ x, y: ys[i] })), borderColor: "#185e73", pointRadius: 0 },
          { type: "line", label: "Tangente en x₀ = 0 (horizontal)", data: [{ x: -1.5, y: -1 }, { x: 1.5, y: -1 }], borderColor: "#ef6c45", borderDash: [6, 4], pointRadius: 0 },
          { label: "x₀ = 0, f′(0) = 0", data: [{ x: 0, y: -1 }], backgroundColor: "#14232e", pointRadius: 7 },
        ] },
        options: { parsing: false, responsive: true, maintainAspectRatio: false, scales: { x: { type: "linear" } } },
      });
    },
  },
  {
    tema: "Criterio de parada",
    tipo: "multiple",
    pregunta: "¿Qué criterio de parada es más informativo para Newton?",
    opciones: [
      "Parar al cabo de 100 iteraciones, sin mirar nada más.",
      "Cambio entre iteraciones y residuo pequeños, con un máximo de iteraciones.",
      "Parar cuando $f(x_n)$ sea exactamente cero en el ordenador.",
    ],
    respuesta: 1,
    explicacion: "Conviene combinar tres cosas: el cambio entre iteraciones (estabilidad), el residuo $|f(x_n)|$ (qué tan cerca de cero está $f$) y un máximo de iteraciones (seguridad). Ninguno garantiza por sí solo el error de la raíz.",
    porQue: [
      "Sin mirar el resultado no sabes si convergió. Agotar el máximo no demuestra convergencia: hay que reportar «límite».",
      "",
      "En punto flotante casi nunca se obtiene exactamente cero. Se usa una tolerancia, no una igualdad.",
    ],
    pasos: [
      "Calcular $x_{n+1}$.",
      "Medir $|x_{n+1} - x_n|$ y $|f(x_{n+1})|$.",
      "Parar si ambos son menores que la tolerancia, o si se alcanza el máximo (y reportarlo como límite).",
    ],
    comoDeberia: "Definir tolerancia y máximo de iteraciones, y reportar qué criterio se cumplió.",
    grafico: canvas => {
      const filas = [];
      let x = 1.5;
      for (let k = 0; k <= 5; k += 1) { filas.push({ k, residuo: Math.abs(F1(x)) }); x = x - F1(x) / DF1(x); }
      new Chart(canvas, {
        type: "line",
        data: { labels: filas.map(f => f.k), datasets: [{ label: "Residuo |f(xₙ)| (Newton desde 1.5)", data: filas.map(f => Math.max(f.residuo, 1e-16)), borderColor: "#ef6c45", backgroundColor: "#ef6c45", tension: 0.2 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { type: "logarithmic", title: { display: true, text: "Residuo" } }, x: { title: { display: true, text: "Iteración n" } } } },
      });
    },
  },
];
