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

## Registro de evidencia

| ID | Salida observada (llenar al ejecutar) | ¿Cumple? | Fecha |
|----|----------------------------------------|----------|-------|
| T-01 | | | |
| T-02 | | | |
| T-03 | | | |
| T-04 | | | |

> Registrar la salida real obtenida; no copiar el valor esperado como observado.
