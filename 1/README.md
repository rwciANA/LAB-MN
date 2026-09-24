# Tema 1 · Ecuaciones no lineales y errores

Módulo interactivo del Laboratorio de Métodos Numéricos. Implementa Bisección y Newton para resolver `f(x) = 0`.

## Caso base
`f(x) = x^3 - x - 2` en `[1, 2]`. Raíz de referencia: `1.5213797068`.

## Archivos
- `index.html`: Interfaz web (7 vistas: inicio, teoría, ejemplos, calculadoras, práctica, referencias, equipo).
- `css/styles.css`: Diseño responsive y menú lateral móvil.
- `js/app.js`: Bisección, Newton, validaciones, testFunction(), wizard de teoría, soluciones y autoevaluación.
- `docs/ejemplo_manual_biseccion.md`: Cálculo manual y pseudocódigo del método 1 (semana 2).
- `docs/pruebas_iniciales.md`: Cuatro pruebas con entrada, salida esperada y tolerancia (semana 2).
- `docs/ficha_de_errores.md`: Error absoluto, relativo y las 3 tolerancias (entregable transversal).
- `docs/raices_de_polinomios.md`: Multiplicidad, teorema fundamental del álgebra y el caso completo.
- `docs/ejercicios_resueltos.md`: Claves verificadas de los 4 ejercicios y 6 preguntas.
