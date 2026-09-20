# Pruebas iniciales · Semana 2 (Método 1: Bisección)

**Responsable:** A (V) Condori · **Revisor:** C (M) Suarez

Cuatro pruebas diseñadas antes de implementar; cada una declara entrada, salida esperada y tolerancia de comparación.

| ID | Tipo | Entrada | Salida esperada | Tolerancia |
|----|------|---------|-----------------|------------|
| T-01 | Normal | a=1, b=2, tol=1e-6, max=100 | raíz ≈ 1.5213797068, estado "CONVERGIÓ" | abs(raíz − ref) ≤ 1e-6 |
| T-02 | Normal | a=1, b=2, tol=1e-8, max=100 | raíz ≈ 1.5213797068, más iteraciones que T-01 | abs(raíz − ref) ≤ 1e-8 |
| T-03 | Frontera | a=2, b=3, tol=1e-6, max=100 | Rechazo: "Los extremos deben tener signos opuestos" | — |
| T-04 | Inválida | a=1, b=1, tol=1e-6, max=100 | Rechazo: f(a)·f(b) ≥ 0 (intervalo degenerado) | — |

## Referencia independiente

Valor de referencia calculado fuera del módulo (Octave/Python):

```octave
pkg load symbolic; syms x;
vpa(solve(x^3 - x - 2 == 0, x, 'Real'), 12)   % 1.52137970680...
```

## Registro de evidencia (ejecutado en semana 3 con scripts/biseccion.py)

| ID | Salida observada | ¿Cumple? | Fecha |
|----|------------------|----------|-------|
| T-01 | raíz 1.5213804245, 20 iteraciones, estado CONVERGIÓ | Sí (|1.5213804245 − 1.5213797068| = 7.18e-7 ≤ 1e-6) | Semana 3 |
| T-02 | raíz 1.5213797018, 27 iteraciones, estado CONVERGIÓ | Sí (diferencia 5.0e-9 ≤ 1e-8) | Semana 3 |
| T-03 | "ERROR: los extremos deben tener signos opuestos", 0 filas | Sí | Semana 3 |
| T-04 | "ERROR: los extremos deben tener signos opuestos", 0 filas | Sí | Semana 3 |

> Salida observada registrada al ejecutar el script; coincide con la calculadora web del módulo.
