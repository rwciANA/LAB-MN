# Banco de ejercicios y autoevaluación resuelto · Tema 1

**Claves verificadas** contra `scripts/biseccion.py` y la calculadora del módulo.

## Ejercicios (4)

| # | Nivel | Problema real | Ecuación derivada | Solución | Método |
|---|-------|---------------|-------------------|----------|--------|
| E1 | Intermedio | Delivery: T(x)=x³−x debe dar 2 min | x³−x−2=0 | x* ≈ 1.5214 | Bisección, 20 iter |
| E2 | Intermedio | Juego: función oculta, sin derivada, tol 10⁻⁶ | f(x)=0 en [1,2] | 20 iteraciones (~21 consultas) | Bisección |
| E3 | Avanzado | Delivery con pico: objetivo sube a 3 | x³−x−3=0 | x* ≈ 1.6717 | Newton desde 1.6: x₁=1.6754491, x₂=1.6717094, x₃=1.6716999 (3 iter) |
| E4 | Avanzado | Control: pérdida (x−2)²=0 | x²−4x+4=0 | x=2 (doble) | Bisección FALLA (sin cambio de signo); Newton converge lineal: 3→2.5→2.25→2.125… |

## Autoevaluación (6) con clave y explicación

| # | Formato | Clave | Tolerancia | Justificación |
|---|---------|-------|------------|----------------|
| Q1 | Opción múltiple | b) f(a)·f(b) < 0 | — | Teorema de Bolzano |
| Q2 | V/F | Falso | — | Ea ≈ \|residuo\|/\|f′(r)\|; son magnitudes distintas |
| Q3 | Numérica | −0.125 | 0.001 | f(1.5) = 3.375 − 3.5 |
| Q4 | Opción múltiple | a) 1.5217391 | — | x₁ = 1.5 + 0.125/5.75 |
| Q5 | V/F | Falso | — | Grado 3 ⇒ 3 raíces en ℂ; el par complejo es conjugado: −0.7607 ± 0.8578i |
| Q6 | Numérica | 20 | 0 | n ≥ log₂(10⁶) ≈ 19.93 |

## Verificación de las claves numéricas

```bash
python 1/scripts/biseccion.py        # E1: raíz y 20 iteraciones; E3: cambiar función a x³-x-3
```

- Q3 y Q4: aparecen en la vista Ejemplos del módulo.
- Q6: la cota tras 20 iteraciones es 9.54×10⁻⁷ ≤ 10⁻⁶ (salida real del script).
- E4: la sucesión (xₙ+2)/2 da error 0.5ⁿ; para 10⁻⁶ se requieren 20 pasos.

## Cobertura de la guía (sección 3)

- ✅ Cuatro ejercicios: dos intermedios, dos avanzados
- ✅ Soluciones verificadas accesibles mediante botón ("Ver solución completa")
- ✅ Seis preguntas de autoevaluación: opción múltiple (2), V/F (2), numérica con tolerancia (2)
- ✅ Problemas de la vida real de los que se **deriva** la ecuación (delivery, gaming, control)
- ✅ Puntuación interactiva 0/6 con reinicio
