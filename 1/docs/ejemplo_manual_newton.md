# Ejemplo manual · Método 2: Newton-Raphson

**Responsable:** B (M) Quispe · **Revisor:** D (P) Chura

## Problema

Hallar la raíz positiva de la ecuación de calibración $f(x) = x^3 - x - 2 = 0$ a partir del valor inicial $x_0 = 1.5$ con tolerancia $\text{tol} = 10^{-6}$.

## Condiciones de uso

1. Función derivable: $f(x) = x^3 - x - 2 \implies f'(x) = 3x^2 - 1$.
2. Derivada no nula en la trayectoria de iteración: $|f'(x_n)| > 10^{-12}$.
3. Valor inicial $x_0$ suficientemente cercano a la raíz para garantizar convergencia cuadrática.

## Fórmula de recurrencia

$$ x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} $$

---

## Cálculo manual paso a paso

### Iteración 1 ($n=0 \to n=1$):
- **Punto actual:** $x_0 = 1.5$
- **Evaluación de $f$:** $f(1.5) = (1.5)^3 - 1.5 - 2 = 3.375 - 3.500 = -0.125$
- **Evaluación de $f'$:** $f'(1.5) = 3(1.5)^2 - 1 = 3(2.25) - 1 = 6.75 - 1 = 5.75$
- **Cálculo del siguiente punto:**
  $$ x_1 = 1.5 - \frac{-0.125}{5.75} = 1.5 + 0.0217391304 = 1.5217391304 $$
- **Error / Cambio de paso:** $|x_1 - x_0| = |1.5217391304 - 1.5| = 0.0217391304 = 2.174 \times 10^{-2}$
- **Residuo:** $f(x_1) = (1.5217391304)^3 - 1.5217391304 - 2 \approx 2.1369 \times 10^{-3} > 10^{-6}$ (continúa).

### Iteración 2 ($n=1 \to n=2$):
- **Punto actual:** $x_1 = 1.5217391304$
- **Evaluación de $f$:** $f(x_1) \approx 0.002136928$
- **Evaluación de $f'$:** $f'(x_1) = 3(1.5217391304)^2 - 1 \approx 5.947070$
- **Cálculo del siguiente punto:**
  $$ x_2 = 1.5217391304 - \frac{0.002136928}{5.947070} = 1.5213798060 $$
- **Error / Cambio de paso:** $|x_2 - x_1| = |1.5213798060 - 1.5217391304| = 3.5932 \times 10^{-4}$
- **Residuo:** $|f(x_2)| = |(1.5213798060)^3 - 1.5213798060 - 2| \approx 5.8939 \times 10^{-7} \le 10^{-6}$ **¡CRITERIO DE PARADA ALCANZADO!**

---

## Tabla resumen de iteraciones

| $i$ | $x_n$ | $f(x_n)$ | $f'(x_n)$ | $x_{n+1}$ | Cambio $\|x_{n+1} - x_n\|$ | Residuo $\|f(x_{n+1})\|$ |
|---|---|---|---|---|---|---|
| 1 | $1.50000000$ | $-1.250000 \times 10^{-1}$ | $5.750000$ | $1.52173913$ | $2.1739 \times 10^{-2}$ | $2.1369 \times 10^{-3}$ |
| 2 | $1.52173913$ | $2.136928 \times 10^{-3}$ | $5.947070$ | $1.52137981$ | $3.5932 \times 10^{-4}$ | $5.8939 \times 10^{-7} \le 10^{-6}$ |

---

## Comparación con la referencia teórica

- **Referencia teórica independiente:** $r \approx 1.5213797068$
- **Aproximación obtenida:** $x_2 = 1.5213798060$
- **Error absoluto real:** $|x_2 - r| = |1.5213798060 - 1.5213797068| = 9.92 \times 10^{-8} < 10^{-6}$
- **Velocidad de convergencia:** Newton requirió únicamente **2 iteraciones**, demostrando la duplicación aproximada de cifras significativas por paso (convergencia cuadrática $O(e_n^2)$), frente a las 20 iteraciones requeridas por el método de Bisección.

---

## Ejemplo de fallo controlado (Derivada nula)

Si se evalúa la función $f(x) = x^3 - 1$ con punto inicial $x_0 = 0$:
- $f'(0) = 3(0)^2 = 0$.
- La fórmula $x_1 = 0 - (-1)/0$ genera una indeterminación / división entre cero.
- **Detección en el módulo:** El algoritmo detecta $|f'(x_n)| < 10^{-12}$, aborta la iteración de manera segura y emite el mensaje `"ERROR: La derivada se anuló o es menor a 1e-12"`.
