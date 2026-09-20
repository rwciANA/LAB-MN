# Recorrido del estudiante · Tema 1

Flujo de aprendizaje desde la teoría hasta la autoevaluación.

```mermaid
flowchart TD
    I[Inicio: caso base f(x) = x³ − x − 2] --> T[Teoría: Bisección y Newton]
    T --> C1[Calculadora Bisección]
    T --> C2[Calculadora Newton]
    C1 --> R[Resultado, tabla de iteraciones y gráfico]
    C2 --> R
    R --> P[Práctica: 4 ejercicios con retroalimentación]
    P --> V[Validación: el estudiante explica por qué converge]
    style I fill:#185e73,color:#fff
    style C1 fill:#ef6c45,color:#fff
    style C2 fill:#ef6c45,color:#fff
    style V fill:#327c62,color:#fff
```

## Boceto de tres pantallas

### Pantalla 1 — Inicio
- Título del módulo y promesa de aprendizaje.
- Chip con el caso base: `f(x) = x³ − x − 2` en `[1, 2]`.
- Gráfica hero de la función con la raíz marcada (≈ 1.5214).
- Botones: "Probar calculadoras" y "Comenzar por la teoría".

### Pantalla 2 — Calculadoras
- Pestañas Bisección / Newton.
- Formulario: extremos a y b (o x₀), tolerancia, máximo de iteraciones.
- Panel de resultado: raíz, iteraciones, error final, residuo |f(x)|.
- Tabla de iteraciones (a, b, c, f(c), error) o (xₙ, f(xₙ), f'(xₙ), xₙ₊₁, error).
- Gráfico de convergencia y botón de descarga CSV.

### Pantalla 3 — Práctica
- Cuatro ejercicios (2 intermedios, 2 avanzados) con botón "Revisar respuesta".
- Retroalimentación explicativa inmediata bajo cada ejercicio.
- Cierre: el estudiante debe poder explicar por qué el método converge o falla.
