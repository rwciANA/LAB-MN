# Ficha común de errores · Métodos Numéricos

**Responsable:** B (M) Quispe Rupaylla · **Revisores:** A (V) Condori, C (D) Suarez, D (P) Chura

Esta ficha establece el marco conceptual y formal para la cuantificación, análisis y reporte de errores en algoritmos numéricos iterativos para la resolución de ecuaciones no lineales.

---

## 1. Definiciones y Fórmulas Fundamentales

| Concepto | Notación y Fórmula | Significado y Unidades | Particularidades / Restricciones |
|---|---|---|---|
| **Error Absoluto** | $E_a = \|x_{\text{verdadero}} - x_{\text{aprox}}\|$ | Distancia directa entre el valor real y la aproximación. Mismas unidades que la variable $x$. | No pondera la magnitud del valor medido. |
| **Error Relativo** | $E_r = \frac{\|x_{\text{verdadero}} - x_{\text{aprox}}\|}{\|x_{\text{verdadero}}\|}$ | Fracción de error respecto a la magnitud verdadera. Adimensional. | **Indefinido si $x_{\text{verdadero}} = 0$**. En dicho caso se usa únicamente $E_a$. |
| **Error Porcentual** | $E_p = E_r \times 100\%$ | Porcentaje de desviación respecto al valor verdadero. | Fácilmente interpretable en ingeniería y especificaciones técnicas. |
| **Residuo** | $R(x) = \|f(x_{\text{aprox}})\|$ | Magnitud en la que la ecuación no se anula exactamente. | **Residuo $\neq$ Error**. Mide la cercanía al eje $Y$, no la distancia en el eje $X$. |

---

## 2. Relación Crítica entre Residuo y Error Absoluto

En raíces simples ($f'(r) \neq 0$), la aproximación por serie de Taylor de primer orden demuestra que:
$$ f(x_{\text{aprox}}) \approx f(r) + f'(r)(x_{\text{aprox}} - r) = f'(r)(x_{\text{aprox}} - r) $$

Tomando valores absolutos:
$$ E_a = |x_{\text{aprox}} - r| \approx \frac{|f(x_{\text{aprox}})|}{|f'(r)|} = \frac{\text{Residuo}}{|f'(r)|} $$

> **Implicación clave:**
> - Si $|f'(r)| \gg 1$ (curva empinada), el residuo será grande aun cuando el error $E_a$ sea diminuto.
> - Si $|f'(r)| \ll 1$ (curva casi plana), el residuo puede ser sumamente pequeño ($10^{-8}$) mientras que el error de posición $E_a$ sigue siendo inaceptablemente grande ($10^{-2}$).

---

## 3. Tipos de Errores Numéricos

### A. Error de Truncamiento
Surge al reemplazar un proceso matemático infinito (como un límite o una serie infinita) por una aproximación finita.
- **En Bisección:** Truncar el proceso infinito tras $n$ iteraciones deja una incertidumbre acotada por la cota teórica:
  $$ \text{Cota de Truncamiento} = \frac{b_0 - a_0}{2^n} $$
- **En Newton-Raphson:** Se desprecia el resto de Taylor de orden 2 y superior ($O(h^2)$) al linealizar la función mediante su recta tangente.

### B. Error de Redondeo
Proviene de la representación de números reales con precisión finita en la arquitectura del computador (estándar IEEE 754 de punto flotante en doble precisión de 64 bits, ~15 a 17 dígitos significativos decimales).
- Se manifiesta cuando operaciones entre números de magnitudes similares sufren de **cancelación catastrófica** (ej. restar dos valores casi idénticos).

---

## 4. Propagación de Errores en Métodos Iterativos

En un algoritmo iterativo $x_{n+1} = g(x_n)$, el error total en el paso $n+1$ se compone de:
$$ e_{n+1} = e_{\text{algorítmico}} + e_{\text{redondeo}} $$

- **Estabilidad en Bisección:** El método es **incondicionalmente estable**. Como $c_n = \frac{a_n + b_n}{2}$, el error no se amplifica; se divide exactamente por 2 en cada iteración.
- **Estabilidad en Newton-Raphson:** El método posee convergencia cuadrática ($e_{n+1} \approx C \cdot e_n^2$), pero es **sensible a la propagación si $f'(x_n) \approx 0$**, ya que dividir por una derivada muy pequeña amplifica exponencialmente los errores de redondeo de $f(x_n)$.

---

## 5. Las Tres Tolerancias de un Proyecto Numérico

1. **Tolerancia de parada ($\text{tol}_{\text{stop}}$):** Criterio algorítmico interno para detener las iteraciones (ej. $10^{-6}$ en residuo o tamaño de paso).
2. **Tolerancia de comparación ($\text{tol}_{\text{val}}$):** Criterio de aceptación frente a la referencia externa:
   $$ |\text{Resultado} - \text{Referencia}| \le \text{tol}_{\text{abs}} + \text{tol}_{\text{rel}} \cdot |\text{Referencia}| $$
3. **Cifras de visualización:** Decimales formateados en la interfaz gráfica (8 decimales) sin alterar la precisión de cálculo interna de 64 bits.

---

## 6. Ejemplos Numéricos Comparativos (Caso Base $f(x)=x^3-x-2=0$)

- **Valor de referencia exacto:** $r = 1.521379706804...$

### Ejemplo en Bisección (Paso 20):
- $c_{20} = 1.5213804245$
- **Error Absoluto:** $E_a = |1.5213804245 - 1.5213797068| = 7.177 \times 10^{-7} \le 10^{-6}$
- **Error Relativo:** $E_r = \frac{7.177 \times 10^{-7}}{1.5213797068} = 4.717 \times 10^{-7}$
- **Error Porcentual:** $E_p = 4.717 \times 10^{-5}\% = 0.00004717\%$
- **Cota Teórica:** $\frac{2 - 1}{2^{20}} = \frac{1}{1048576} \approx 9.537 \times 10^{-7}$ (se comprueba que $E_a \le \text{Cota}$).
- **Residuo:** $|f(c_{20})| = 4.398 \times 10^{-6}$

### Ejemplo en Newton-Raphson (Paso 2):
- $x_2 = 1.5213798060$
- **Error Absoluto:** $E_a = |1.5213798060 - 1.5213797068| = 9.920 \times 10^{-8} \le 10^{-6}$
- **Error Relativo:** $E_r = \frac{9.920 \times 10^{-8}}{1.5213797068} = 6.520 \times 10^{-8}$
- **Error Porcentual:** $E_p = 0.00000652\%$
- **Residuo:** $|f(x_2)| = 5.894 \times 10^{-7}$
