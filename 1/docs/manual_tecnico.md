# Manual Técnico de Arquitectura y Mantenimiento

**Módulo 1:** Ecuaciones No Lineales y Errores  
**Tecnologías:** HTML5 Semántico, CSS3, JavaScript (ES6+), Chart.js v4, Font Awesome v6  
**Entorno de Ejecución:** Navegadores web modernos (Client-side)  

---

## 1. Estructura de Archivos y Responsabilidades

```
1/
├── index.html                  # Estructura del DOM, vistas SPA, contenedores semánticos
├── css/
│   └── styles.css              # Variables CSS (:root), layouts Flexbox/Grid, animaciones y temas
├── js/
│   └── app.js                  # Lógica algorítmica, validación de inputs, control de eventos y Chart.js
├── docs/                       # Documentación académica, bitácoras de pruebas e informes
└── scripts/                    # Implementaciones independientes de referencia (Python y Octave)
```

---

## 2. Descripción de Componentes en `js/app.js`

### 2.1. Funciones Matemáticas Fundamentales
- `f(x)`: Evalúa la función objetivo $f(x) = x^3 - x - 2$.
- `df(x)`: Evalúa la derivada analítica $f'(x) = 3x^2 - 1$.

### 2.2. Algoritmos Numéricos
- `solveBisection(a, b, tolerance, maxIterations)`:
  - Valida $a < b$, $\text{tol} > 0$, $\text{maxit} \ge 1$ y $f(a) \cdot f(b) < 0$.
  - Genera objetos de fila con `{ iteration, a, b, x, fx, error }`.
  - Criterio de parada dual: $|f(c)| \le \text{tol}$ o $\frac{b-a}{2} \le \text{tol}$.
- `solveNewton(x0, tolerance, maxIterations)`:
  - Valida $|f'(x)| > 10^{-12}$ para prevenir división por cero.
  - Genera objetos `{ iteration, x, fx, derivative, next, error }`.
  - Criterio de parada dual: $|f(x_{n+1})| \le \text{tol}$ o $|x_{n+1} - x_n| \le \text{tol}$.

### 2.3. Motor de Gráficos (Chart.js v4)
- `state.heroChart`: Dibuja la curva continua de $f(x)$ y resalta la raíz con un marcador verde.
- `state.chart`: Renderiza la gráfica de error en escala logarítmica para la calculadora activa.
- `state.comparisonChart`: Renderiza simultáneamente las trayectorias de convergencia de Bisección (lineal) y Newton (cuadrática).

---

## 3. Scripts de Referencia Independiente

Para verificar los resultados fuera del entorno del navegador:
- `scripts/biseccion.py`: Ejecutable con `python 1/scripts/biseccion.py`.
- `scripts/newton.py`: Ejecutable con `python 1/scripts/newton.py`.
- `scripts/biseccion_reference.oct`: Ejecutable en GNU Octave con `octave 1/scripts/biseccion_reference.oct`.
- `scripts/newton_reference.oct`: Ejecutable en GNU Octave con `octave 1/scripts/newton_reference.oct`.

---

## 4. Guía para Modificar o Extender el Módulo

### A. Para Cambiar la Función Objetivo:
1. En `js/app.js`, edita las funciones `f(x)` y `df(x)`.
2. En `1/index.html`, actualiza el texto mostrado en el campo `funcDisplay`.
3. Actualiza las funciones equivalentes en `scripts/biseccion.py` y `scripts/newton.py`.

### B. Para Añadir Nuevas Preguntas de Autoevaluación:
1. En `1/index.html`, añade un elemento `<article class="quiz-card" data-type="..." data-answer="..." data-explain="...">`.
2. En `js/app.js`, la lógica enlazará automáticamente el nuevo elemento y actualizará el puntaje máximo disponible.
