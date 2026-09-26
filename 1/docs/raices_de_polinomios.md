# Raíces de Polinomios y Criterios de Convergencia

**Responsable:** B (M) Quispe Rupaylla · **Revisores:** D (P) Chura Monroy, A (V) Condori Idme

Este documento profundiza en la fundamentación algebraica de las ecuaciones polinomiales no lineales, el Teorema Fundamental del Álgebra, la multiplicidad de raíces y los criterios teóricos de convergencia para métodos cerrados y abiertos.

---

## 1. Definición de Raíz y Ecuación Polinomial

Sea un polinomio de grado $n$ con coeficientes reales $a_i \in \mathbb{R}$ ($a_n \neq 0$):
$$ P(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0 = 0 $$

Un valor $r \in \mathbb{C}$ es una **raíz** de $P(x)$ si y solo si $P(r) = 0$.

### Teorema Fundamental del Álgebra
Todo polinomio no constante con coeficientes complejos tiene al menos una raíz en el cuerpo de los números complejos $\mathbb{C}$. Como corolario, un polinomio de grado $n$ tiene exactamente $n$ raíces en $\mathbb{C}$ (contando multiplicidades).
- Si los coeficientes son reales, las raíces no reales aparecen en pares complejos conjugados: $z = \alpha \pm \beta i$.

---

## 2. Análisis del Caso Base del Módulo

El caso base de calibración de configuración de servidor está modelado por:
$$ f(x) = x^3 - x - 2 = 0 $$

### Descomposición Factorial y Raíces:
Conociendo la raíz real $x_1 \approx 1.5213797068$:
$$ x^3 - x - 2 = (x - x_1)(x^2 + x_1 x + (x_1^2 - 1)) $$
Evaluando los coeficientes del factor cuadrático:
- $x_1 \approx 1.5213797$
- $x_1^2 - 1 \approx 1.314596$
- Discriminante $\Delta = x_1^2 - 4(x_1^2 - 1) = 4 - 3x_1^2 \approx 4 - 3(2.3146) = -2.9438 < 0$

Por lo tanto, las 3 raíces exactas del sistema son:
1. **Raíz Real:** $x_1 \approx 1.5213797068$ (alcanzable por Bisección y Newton en $\mathbb{R}$).
2. **Raíces Complejas Conjugadas:** $x_{2,3} \approx -0.76068985 \pm 0.85781684 i$.

---

## 3. Multiplicidad y su Impacto en Métodos Numéricos

Una raíz $r$ tiene **multiplicidad $k$** si:
$$ P(x) = (x - r)^k Q(x), \quad \text{con } Q(r) \neq 0 $$

### Comportamiento según la paridad de $k$:
- **Multiplicidad Impar ($k = 1, 3, \dots$):** La gráfica de la función **atraviesa el eje $X$**, existiendo cambio de signo a los lados de la raíz.
  - *Bisección:* **Funciona con garantía**, ya que se puede encontrar un intervalo $[a, b]$ donde $f(a) \cdot f(b) < 0$.
  - *Newton:* Conserva su tasa de convergencia cuadrática ($k=1$).
- **Multiplicidad Par ($k = 2, 4, \dots$):** La curva es **tangente al eje $X$ y rebota sin cruzarlo** ($f(x) \ge 0$ o $f(x) \le 0$ localmente).
  - *Bisección:* **Falla totalmente**, ya que $f(a) \cdot f(b) \ge 0$ en cualquier entorno de $r$. Es el punto ciego del método cerrado.
  - *Newton:* Puede converger, pero **la tasa de convergencia se degrada de cuadrática a lineal**, con factor asintótico:
    $$ \lim_{n \to \infty} \frac{|x_{n+1} - r|}{|x_n - r|} = 1 - \frac{1}{k} $$
    Para $k=2$, la reducción de error es de apenas $\frac{1}{2}$ por iteración.

---

## 4. Criterios de Convergencia: Método Cerrado vs. Método Abierto

| Aspecto | Bisección (Método Cerrado) | Newton-Raphson (Método Abierto) |
|---|---|---|
| **Requisito Inicial** | Intervalo $[a, b]$ tal que $f(a) \cdot f(b) < 0$ | Punto único $x_0$ cercano a la raíz |
| **Teorema Soporte** | Teorema del Valor Intermedio (Bolzano) | Teorema del Punto Fijo y Expansión de Taylor |
| **Tipo de Convergencia** | **Global** (garantizada si se cumple Bolzano) | **Local** (requiere $x_0 \in$ radio de atracción) |
| **Orden de Convergencia** | **Lineal ($p = 1$)**, factor asintótico $1/2$ | **Cuadrático ($p = 2$)**, local para raíces simples |
| **Cota de Error** | $|c_n - r| \le \frac{b - a}{2^n}$ (determinista a priori) | Estimación asintótica $e_{n+1} \approx \frac{|f''(r)|}{2|f'(r)|} e_n^2$ |
| **Sensibilidad a la Derivada** | Inmune (no requiere derivadas) | Crítica: falla si $|f'(x_n)| \approx 0$ |
| **Comportamiento en Fallo** | Rechazo previo de intervalo si no hay cambio de signo | Divergencia a $\pm\infty$, ciclos oscilatorios infinitos o salto a raíces lejanas |

---

## 5. Acotación de Raíces de Polinomios (Cota de Cauchy)

Para seleccionar intervalos iniciales adecuados $[a, b]$ o semillas $x_0$, se utiliza el Teorema de Cauchy:
Toda raíz compleja $z$ de $P(x) = \sum_{i=0}^n a_i x^i$ satisface:
$$ |z| \le 1 + \max_{0 \le i < n} \left| \frac{a_i}{a_n} \right| $$

Para $f(x) = x^3 - x - 2$:
$$ |z| \le 1 + \max(|-1|, |-2|) = 1 + 2 = 3 $$
Todas las raíces se encuentran dentro del disco $|x| \le 3$, lo que justifica plenamente seleccionar el intervalo $[1, 2]$ para localizar la raíz real positiva.
