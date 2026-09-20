# Ejemplo manual · Método 1: Bisección (Semana 2)

**Responsable:** C (M) Suarez · **Revisor:** A (V) Condori

## Problema

Hallar la raíz positiva de f(x) = x³ − x − 2 en [1, 2] con tolerancia 10⁻⁶.

## Condiciones de uso

- f continua en [a, b] (es un polinomio, se cumple).
- f(a) · f(b) < 0 (cambio de signo).

## Cálculo manual (primeras iteraciones)

| i | a | b | c = (a+b)/2 | f(c) | Signo | Intervalo siguiente | Cota (b−a)/2 |
|---|-----|-----|------------|----------|-------|---------------------|--------------|
| 1 | 1.0 | 2.0 | 1.5 | −0.125 | − | [1.5, 2.0] | 0.5 |
| 2 | 1.5 | 2.0 | 1.75 | 1.609375 | + | [1.5, 1.75] | 0.25 |
| 3 | 1.5 | 1.75 | 1.625 | 0.666016 | + | [1.5, 1.625] | 0.125 |
| 4 | 1.5 | 1.625 | 1.5625 | 0.252197 | + | [1.5, 1.5625] | 0.0625 |
| 5 | 1.5 | 1.5625 | 1.53125 | 0.059113 | + | [1.5, 1.53125] | 0.03125 |

Regla: si f(a)·f(c) < 0 la raíz está en [a, c]; si no, en [c, b].

## Detalle del paso 1

- f(1.5) = 1.5³ − 1.5 − 2 = 3.375 − 3.5 = **−0.125**
- f(1.5)·f(2) = (−0.125)(4) < 0 → nueva raíz en [1.5, 2]

## Criterio de parada

Detener cuando (b − a)/2 ≤ 10⁻⁶. Con a₀ = 1, b₀ = 2 se necesitan n ≥ log₂(1/10⁻⁶) ≈ 20 iteraciones; el código converge en 21.

## Resultado manual de referencia

c₂₁ ≈ **1.52137971** (raíz real ≈ 1.5213797068).

## Pseudocódigo del método 1

```
INICIO biseccion(f, a, b, tol, maxit):
    SI f(a)·f(b) ≥ 0 ENTONCES devolver ERROR("sin cambio de signo")
    PARA i = 1 HASTA maxit:
        c ← (a + b) / 2
        error ← (b − a) / 2
        GUARDAR fila (i, a, b, c, f(c), error)
        SI |f(c)| ≤ tol O error ≤ tol ENTONCES devolver c, i
        SI f(a)·f(c) < 0 ENTONCES b ← c SINO a ← c
    FIN PARA
    devolver c, maxit, estado = "LÍMITE ALCANZADO"
FIN
```
