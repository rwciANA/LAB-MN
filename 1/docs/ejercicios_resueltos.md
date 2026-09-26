# Banco de Ejercicios y Autoevaluación Resueltos · Módulo 1

**Claves verificadas** contra `scripts/biseccion.py`, `scripts/newton.py` y la calculadora interactiva del módulo.

---

## 1. Ejercicios Resueltos (4)

| # | Nivel | Paradigma | Problema Real | Ecuación Derivada | Solución Numérica | Método y Desempeño |
|---|---|---|---|---|---|---|
| **E1** | Intermedio | Método Cerrado | App de Delivery: $T(x) = x^3 - x$ debe alcanzar $2$ min | $x^3 - x - 2 = 0$ | $x^* \approx 1.52138$ | **Bisección:** 20 iteraciones en $[1, 2]$ con $\text{tol} = 10^{-6}$ |
| **E2** | Intermedio | Método Cerrado | Servicio Web "Caja Negra" (sin derivada $f'$) con $\text{tol} = 10^{-6}$ | $f(x) = 0$ en $[1, 2]$ | $x^* \approx 1.52138$ | **Bisección:** 20 iteraciones ($\sim 21$ consultas a la función) |
| **E3** | Avanzado | Método Abierto | Pico de Tráfico: Objetivo de tiempo sube a $3$ min | $x^3 - x - 3 = 0$ | $x^* \approx 1.67170$ | **Newton-Raphson:** desde $x_0 = 1.6$, converge en 3 iteraciones ($x_1 = 1.67545, x_2 = 1.67171, x_3 = 1.67170$) |
| **E4** | Avanzado | Multiplicidad Par | Control: Pérdida mínima $L(x) = (x - 2)^2 = 0$ | $x^2 - 4x + 4 = 0$ | $x^* = 2.0$ (raíz doble) | **Bisección FALLA** ($L(a)\cdot L(b) > 0$); **Newton** converge pero con orden lineal degradado ($\mu = 0.5$) |

---

## 2. Autoevaluación Interactiva (6 Preguntas con Clave y Justificación)

| # | Formato | Clave | Tolerancia | Justificación Matemática |
|---|---|---|---|---|
| **Q1** | Opción múltiple | **b) $f(a) \cdot f(b) < 0$** | — | Exigencia del **Teorema de Bolzano** para asegurar al menos una raíz en el intervalo cerrado. |
| **Q2** | Verdadero / Falso | **Falso** | — | $E_a \approx \frac{|\text{Residuo}|}{|f'(r)|}$; si la pendiente es casi horizontal, un residuo diminuto esconde un error de posición enorme. |
| **Q3** | Numérica | **$-0.125$** | $\pm 0.001$ | $f(1.5) = (1.5)^3 - 1.5 - 2 = 3.375 - 3.500 = -0.125$. |
| **Q4** | Opción múltiple | **a) $1.5217391$** | — | $x_1 = 1.5 - \frac{f(1.5)}{f'(1.5)} = 1.5 - \frac{-0.125}{5.75} = 1.5 + 0.02173913 = 1.5217391$. |
| **Q5** | Verdadero / Falso | **Falso** | — | Por el **Teorema Fundamental del Álgebra**, tiene 3 raíces en $\mathbb{C}$. $x^3 - x - 2$ tiene 1 raíz real ($1.5214$) y 2 complejas conjugadas ($-0.7607 \pm 0.8578i$). |
| **Q6** | Numérica (Entero) | **$20$** | $0$ | $n \ge \log_2\left(\frac{2-1}{10^{-6}}\right) = \log_2(10^6) \approx 19.9315 \implies 20 \text{ iteraciones}$. |

---

## 3. Comprobación Numérica

```bash
# Validar soluciones de Bisección (E1, E2, Q3, Q6)
python 1/scripts/biseccion.py

# Validar soluciones de Newton-Raphson (E3, Q4)
python 1/scripts/newton.py
```
