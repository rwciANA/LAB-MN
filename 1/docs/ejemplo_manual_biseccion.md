# Ejemplo Manual · Método 1: Bisección (Método Cerrado)

**Responsable:** C (D) Suarez Huamani · **Revisor:** A (V) Condori Idme

## 1. Planteamiento del Problema

Hallar la raíz positiva de la ecuación no lineal $f(x) = x^3 - x - 2 = 0$ en el intervalo cerrado $[1, 2]$ con una tolerancia $\text{tol} = 10^{-6}$.

## 2. Condiciones de Uso y Precondiciones

1. **Continuidad:** $f(x)$ es continua en todo el intervalo $[a, b] = [1, 2]$.
2. **Teorema de Bolzano:** $f(1) = 1^3 - 1 - 2 = -2 < 0$ y $f(2) = 2^3 - 2 - 2 = +4 > 0$. Como $f(1) \cdot f(2) = -8 < 0$, existe al menos una raíz real $r \in (1, 2)$.

---

## 3. Cálculo Manual Paso a Paso (Primeras Iteraciones)

| $i$ | $a$ | $b$ | $c = \frac{a+b}{2}$ | $f(c)$ | Signo de $f(c)$ | Nuevo Intervalo | Cota $\frac{b-a}{2}$ |
|---|---|---|---|---|---|---|---|
| 1 | $1.000000$ | $2.000000$ | $1.50000000$ | $-0.125000$ | $-$ | $[1.500000, 2.000000]$ | $0.500000$ |
| 2 | $1.500000$ | $2.000000$ | $1.75000000$ | $+1.609375$ | $+$ | $[1.500000, 1.750000]$ | $0.250000$ |
| 3 | $1.500000$ | $1.750000$ | $1.62500000$ | $+0.666016$ | $+$ | $[1.500000, 1.625000]$ | $0.125000$ |
| 4 | $1.500000$ | $1.625000$ | $1.56250000$ | $+0.252197$ | $+$ | $[1.500000, 1.562500]$ | $0.062500$ |
| 5 | $1.500000$ | $1.562500$ | $1.53125000$ | $+0.059113$ | $+$ | $[1.500000, 1.531250]$ | $0.031250$ |
| 20 | $1.521379$ | $1.521381$ | $1.52138042$ | $+4.40 \times 10^{-6}$ | $+$ | — | $9.54 \times 10^{-7} \le 10^{-6}$ ✓ |

---

## 4. Detalle de Evaluación en la Iteración 1

- **Punto medio:** $c_1 = \frac{1.0 + 2.0}{2} = 1.5$
- **Evaluación:** $f(1.5) = (1.5)^3 - 1.5 - 2 = 3.375 - 3.500 = -0.125$
- **Comprobación de signo:** $f(1.0) \cdot f(1.5) = (-2.0) \cdot (-0.125) = +0.250 > 0$, mientras que $f(1.5) \cdot f(2.0) = (-0.125) \cdot (+4.0) = -0.500 < 0$.
- **Nuevo intervalo:** Se descarta $[1.0, 1.5]$ y se conserva $[1.5, 2.0]$.

---

## 5. Criterio de Parada y Cota Teórica

Se detiene cuando $\frac{b_n - a_n}{2} \le 10^{-6}$ o cuando $|f(c_n)| \le 10^{-6}$.
$$ n \ge \log_2\left(\frac{b_0 - a_0}{\text{tol}}\right) = \log_2\left(\frac{2 - 1}{10^{-6}}\right) = \log_2(10^6) \approx 19.9315 \implies \mathbf{20 \text{ iteraciones}} $$

- **Aproximación final:** $c_{20} = 1.5213804245$
- **Referencia independiente:** $r = 1.5213797068$
- **Error absoluto real:** $|c_{20} - r| = 7.18 \times 10^{-7} \le 10^{-6}$
