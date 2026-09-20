# Contraste numérico · Semana 3 (Método 1: Bisección)

**Responsable:** C (M) Suarez · **Revisores:** D (P) Chura, A (V) Condori

Se ejecutó el método 1 **fuera de la interfaz** (`scripts/biseccion.py`) y se comparó con el cálculo manual y con la calculadora web. Las tres fuentes deben coincidir dentro de la tolerancia declarada.

## Comparación de las tres implementaciones

| Fuente | Raíz | Iteraciones | Estado |
|--------|------|-------------|--------|
| Cálculo manual (docs/ejemplo_manual_biseccion.md) | 1.52137971 | 21 (estimación log₂) | — |
| Script Python (biseccion.py) | 1.5213804245 | 20 | CONVERGIÓ |
| Referencia Octave (biseccion_reference.oct) | 1.5213804245 | 20 | CONVIÓ |
| Valor de referencia | 1.5213797068 | — | — |

Diferencia script vs referencia: |1.5213804245 − 1.5213797068| = **7.18 × 10⁻⁷ ≤ 10⁻⁶** → cumple.

> Nota: el cálculo manual estimó 21 iteraciones por la cota log₂((b−a)/tol); el algoritmo real paró en 20 porque el residuo y la cota se evalúan tras guardar cada fila. La estimación es una cota superior, no un valor exacto.

## Error vs residuo (aclaración clave del tema)

| Magnitud | Fórmula | Caso base (última iteración) |
|----------|---------|------------------------------|
| Cota del error de la raíz | (b − a)/2 | 9.54 × 10⁻⁷ |
| Residuo | \|f(c)\| | 4.40 × 10⁻⁶ |

El residuo es ~4.6 veces mayor que la cota de error y **aun así** converge: el criterio que detiene el algoritmo es la cota de error (b−a)/2 ≤ tol, no el residuo. Confundir residuo con error de la raíz llevaría a rechazar una aproximación válida. Por eso el módulo muestra ambos por separado.

## Caso adicional (variación de la respuesta objetivo)

Se cambió la ecuación a g(x) = x³ − x − 3 (respuesta objetivo 3 en lugar de 2), mismo intervalo [1, 2]:

- Raíz: **1.6717004776** en 20 iteraciones.
- Cota de error final: 9.54 × 10⁻⁷ ≤ tol → CONVERGIÓ.
- Residuo |f(c)|: 4.40 × 10⁻⁶.

Al aumentar la constante, la raíz se desplaza a la derecha (mayor x para alcanzar la respuesta objetivo), pero el número de iteraciones se mantiene porque el intervalo inicial tiene el mismo ancho.

## Conclusión del contraste

El método 1 es reproducible: script, Octave y web coinciden dentro de 10⁻⁶. La traza paso a paso se puede verificar a mano. No se afirma convergencia al agotar el máximo: el estado lo distingue.
