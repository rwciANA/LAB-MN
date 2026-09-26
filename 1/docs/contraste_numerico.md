# Contraste Numérico e Implementación Independiente

**Responsable:** A (V) Condori Idme · **Revisores:** B (M) Quispe Rupaylla, D (P) Chura Monroy, C (D) Suarez Huamani

Este informe documenta el contraste riguroso entre la implementación web en JavaScript (`js/app.js`) y las implementaciones independientes fuera de la interfaz en Python (`scripts/biseccion.py`, `scripts/newton.py`) y GNU Octave (`scripts/biseccion_reference.oct`, `scripts/newton_reference.oct`).

---

## 1. Síntesis Comparativa del Caso Base ($f(x) = x^3 - x - 2 = 0$)

- **Referencia analítica/simbólica independiente:** $r = 1.5213797068045376...$
- **Tolerancia configurada:** $\text{tol} = 10^{-6}$

| Método | Entorno de Ejecución | Raíz Obtenida | Iteraciones | Residuo final $\|f(x)\|$ | Cota de Error / Cambio | Estado | Diferencia con Referencia |
|---|---|---|---|---|---|---|---|
| **Bisección** | Cálculo Manual | $1.52138042$ | 20 | $4.40 \times 10^{-6}$ | $9.54 \times 10^{-7}$ | CONVERGIÓ | $7.18 \times 10^{-7} \le 10^{-6}$ |
| **Bisección** | Script Python (`biseccion.py`) | $1.5213804245$ | 20 | $4.40 \times 10^{-6}$ | $9.54 \times 10^{-7}$ | CONVERGIO | $7.18 \times 10^{-7} \le 10^{-6}$ |
| **Bisección** | Script Octave (`biseccion_reference.oct`) | $1.5213804245$ | 20 | $4.40 \times 10^{-6}$ | $9.54 \times 10^{-7}$ | CONVERGIO | $7.18 \times 10^{-7} \le 10^{-6}$ |
| **Bisección** | Aplicación Web (`js/app.js`) | $1.52138042$ | 20 | $4.40 \times 10^{-6}$ | $9.54 \times 10^{-7}$ | Convergió | $7.18 \times 10^{-7} \le 10^{-6}$ |
| **Newton-Raphson** | Cálculo Manual | $1.52137981$ | 2 | $5.89 \times 10^{-7}$ | $3.59 \times 10^{-4}$ | CONVERGIÓ | $9.92 \times 10^{-8} \le 10^{-6}$ |
| **Newton-Raphson** | Script Python (`newton.py`) | $1.5213798060$ | 2 | $5.89 \times 10^{-7}$ | $3.59 \times 10^{-4}$ | CONVERGIO | $9.92 \times 10^{-8} \le 10^{-6}$ |
| **Newton-Raphson** | Script Octave (`newton_reference.oct`) | $1.5213798060$ | 2 | $5.89 \times 10^{-7}$ | $3.59 \times 10^{-4}$ | CONVERGIO | $9.92 \times 10^{-8} \le 10^{-6}$ |
| **Newton-Raphson** | Aplicación Web (`js/app.js`) | $1.52137981$ | 2 | $5.89 \times 10^{-7}$ | $3.59 \times 10^{-4}$ | Convergió | $9.92 \times 10^{-8} \le 10^{-6}$ |

---

## 2. Análisis del Contraste y Eficiencia Computacional

1. **Exactitud y Concordancia:**
   - La discrepancia entre JavaScript (web), Python y Octave es **$0.00000000$** en todas las cifras evaluadas dentro de la precisión de punto flotante de 64 bits (IEEE 754).
   - Ambos métodos convergen a la misma raíz teórica dentro de la tolerancia de $10^{-6}$.
2. **Comparativa de Rendimiento:**
   - **Bisección:** Requiere 20 evaluaciones de función. Su velocidad de reducción de error es estrictamente geométrica: $\frac{b-a}{2^n}$.
   - **Newton-Raphson:** Requiere únicamente 2 iteraciones (4 evaluaciones: 2 de $f$ y 2 de $f'$). Alcanza un residuo final de $5.89 \times 10^{-7}$ con un orden de convergencia cuadrático.
3. **Residuo frente a Error:**
   - En Bisección, el criterio de parada se activó por la cota de error $(b-a)/2 = 9.54 \times 10^{-7} \le 10^{-6}$, aun cuando el residuo era $4.40 \times 10^{-6}$.
   - En Newton-Raphson, el criterio de parada se activó por el residuo $|f(x_2)| = 5.89 \times 10^{-7} \le 10^{-6}$.

---

## 3. Conclusión de Validación

Se certifica la validez matemática y numérica del software educativo. Las trazas paso a paso, los mensajes de estado y los criterios de parada son 100% reproducibles en entornos científicos estándar.
