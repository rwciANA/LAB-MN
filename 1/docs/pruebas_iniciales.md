# Matriz Completa de Pruebas de Software Numérico (Hitos 1, 2 y 3)

**Responsable:** A (V) Condori Idme · **Revisores:** B (M) Quispe Rupaylla, D (P) Chura Monroy, C (D) Suarez Huamani

Esta matriz contiene el protocolo y registro formal de pruebas de validación funcional, numérica y de frontera para los métodos de Bisección y Newton-Raphson.

---

## 1. Matriz de Diseño de Pruebas (8 Casos de Prueba)

| ID | Método | Tipo | Entrada | Referencia Independiente | Tolerancia | Criterio de Aceptación |
|---|---|---|---|---|---|---|
| **E1-P01** | Bisección | Normal | $f(x)=x^3-x-2$, $[1, 2]$, $\text{tol}=10^{-6}$, $\text{maxit}=100$ | $r = 1.5213797068$ | $10^{-6}$ | $\|\text{raíz} - \text{ref}\| \le 10^{-6}$, estado "Convergió" |
| **E1-P02** | Bisección | Normal | $f(x)=x^3-x-2$, $[1, 2]$, $\text{tol}=10^{-8}$, $\text{maxit}=100$ | $r = 1.5213797068$ | $10^{-8}$ | $\|\text{raíz} - \text{ref}\| \le 10^{-8}$, mayor número de iteraciones |
| **E1-P03** | Bisección | Frontera | $f(x)=x^3-x-2$, $[2, 3]$, $\text{tol}=10^{-6}$, $\text{maxit}=100$ | No existe raíz en rango | — | Rechazo por falta de cambio de signo ($f(a) \cdot f(b) \ge 0$) |
| **E1-P04** | Bisección | Inválida | $f(x)=x^3-x-2$, $[1, 1]$, $\text{tol}=10^{-6}$, $\text{maxit}=100$ | Intervalo degenerado | — | Rechazo inmediato de intervalo |
| **E2-P05** | Newton | Normal | $f(x)=x^3-x-2$, $x_0=1.5$, $\text{tol}=10^{-6}$, $\text{maxit}=100$ | $r = 1.5213797068$ | $10^{-6}$ | $\|\text{raíz} - \text{ref}\| \le 10^{-6}$, convergencia en $\le 5$ iter |
| **E2-P06** | Newton | Normal | $f(x)=x^3-x-2$, $x_0=2.0$, $\text{tol}=10^{-6}$, $\text{maxit}=100$ | $r = 1.5213797068$ | $10^{-6}$ | $\|\text{raíz} - \text{ref}\| \le 10^{-6}$, convergencia desde extremo superior |
| **E2-P07** | Newton | Frontera | $f(x)=x^3-1$, $x_0=0.0$, $\text{tol}=10^{-6}$, $\text{maxit}=100$ | $f'(0)=0$ (derivada nula) | — | Detección de derivada nula ($\|f'(x)\| < 10^{-12}$), mensaje de error seguro |
| **E2-P08** | Newton | Inválida | $f(x)=x^3-x-2$, $x_0=\text{NaN} / \infty$, $\text{tol}=-1$, $\text{maxit}=0$ | Parámetros fuera de rango | — | Validación de formulario impide ejecución con entradas no numéricas o negativas |

---

## 2. Registro Formal de Evidencias y Salidas Observadas

Las pruebas fueron ejecutadas tanto en la interfaz web interactiva (`js/app.js`) como en los scripts de referencia (`scripts/biseccion.py` y `scripts/newton.py`).

| ID | Salida Observada (Web / Script) | Iteraciones | Error Final | Residuo Final | Resultado | Evidencia / Observaciones | Responsable / Revisor |
|---|---|---|---|---|---|---|---|
| **E1-P01** | Raíz: `1.5213804245` · Estado: `Convergió` | 20 | $9.54 \times 10^{-7}$ | $4.40 \times 10^{-6}$ | **APROBADO (PASS)** | Diferencia $|1.5213804245 - 1.5213797068| = 7.18 \times 10^{-7} \le 10^{-6}$. Traza completa generada. | Condori (V) / Quispe (M) |
| **E1-P02** | Raíz: `1.5213797018` · Estado: `Convergió` | 27 | $7.45 \times 10^{-9}$ | $2.97 \times 10^{-8}$ | **APROBADO (PASS)** | Diferencia $= 5.0 \times 10^{-9} \le 10^{-8}$. Se comprueba aumento monotónico de iteraciones. | Condori (V) / Chura (P) |
| **E1-P03** | Mensaje: `"Los extremos deben tener signos opuestos (f(a) * f(b) < 0)."` | 0 | — | — | **APROBADO (PASS)** | $f(2)=4, f(3)=22 \implies f(2)\cdot f(3)=88 > 0$. Bloqueo correcto antes de iterar. | Condori (V) / Suarez (D) |
| **E1-P04** | Mensaje: `"Los extremos deben tener signos opuestos (f(a) * f(b) < 0)."` | 0 | — | — | **APROBADO (PASS)** | $f(1)\cdot f(1) = 4 > 0$. Intervalo sin amplitud rechazado. | Condori (V) / Suarez (D) |
| **E2-P05** | Raíz: `1.5213798060` · Estado: `Convergió` | 2 | $3.59 \times 10^{-4}$ | $5.89 \times 10^{-7}$ | **APROBADO (PASS)** | Diferencia $= 9.92 \times 10^{-8} \le 10^{-6}$. Convergencia cuadrática verificada en 2 pasos. | Condori (V) / Quispe (M) |
| **E2-P06** | Raíz: `1.5213797068` · Estado: `Convergió` | 4 | $4.62 \times 10^{-6}$ | $1.21 \times 10^{-11}$ | **APROBADO (PASS)** | Convergió en 4 pasos desde $x_0=2.0$ a la raíz teórica con error $< 10^{-10}$. | Condori (V) / Chura (P) |
| **E2-P07** | Mensaje: `"La derivada se anuló o es demasiado pequeña; prueba otro valor inicial."` | 0 | — | — | **APROBADO (PASS)** | Se evita la división por cero $f'(0)=0$. Manejo de excepción controlado. | Condori (V) / Quispe (M) |
| **E2-P08** | Interfaz no permite envío o emite mensaje de validación de entradas. | 0 | — | — | **APROBADO (PASS)** | Validaciones HTML5 + control JS impiden parámetros incoherentes. | Condori (V) / Suarez (D) |

---

## 3. Dictamen de Validación y Conformidad

- **Tasa de Aprobación:** 8 / 8 pruebas superadas (100%).
- **Comportamiento ante anomalías:** No se registraron bloqueos de script, desbordamientos de pila, ni bucles infinitos.
- **Conformidad Numérica:** Las diferencias con la referencia analítica se mantienen estrictamente por debajo de las tolerancias fijadas.
