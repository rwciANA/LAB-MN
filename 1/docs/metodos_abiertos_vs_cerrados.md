# División Fundamental: Métodos Cerrados vs. Métodos Abiertos

**Curso:** Métodos Numéricos — Ingeniería de Sistemas (UNSA)  
**Módulo 1:** Ecuaciones No Lineales y Errores  
**Autores:** Equipo 1 (Condori, Quispe, Suarez, Chura)  

---

## 1. Introducción al Paradigma de Resolución de Ecuaciones No Lineales

En el análisis numérico, la resolución de ecuaciones no lineales $f(x) = 0$ se divide en dos grandes familias o paradigmas algorítmicos según la información requerida para iniciar y la garantía matemática de convergencia:

```mermaid
flowchart TD
    NL[Ecuaciones No Lineales: f(x) = 0] --> C[MÉTODOS CERRADOS<br/>Bracketing / Intervalares]
    NL --> A[MÉTODOS ABIERTOS<br/>Open / Punto Fijo]

    C --> Biseccion[Método de Bisección]
    C --> RegulaFalsi[Regla Falsa]

    A --> Newton[Método de Newton-Raphson]
    A --> Secante[Método de la Secante]
    A --> PuntoFijo[Iteración de Punto Fijo]

    style C fill:#185e73,color:#fff
    style A fill:#ef6c45,color:#fff
    style Biseccion fill:#bcd6ea,color:#16283c
    style Newton fill:#fdeae0,color:#16283c
```

---

## 2. Métodos Cerrados (Intervalares / Bracketing)

### 2.1. Filosofía
Requieren **encerrar** la raíz dentro de un intervalo acotado $[a, b]$ donde la función cambia de signo. Se basan directamente en propiedades topológicas de funciones continuas.

### 2.2. Teorema de Soporte: Teorema de Bolzano (Valor Intermedio)
Si $f: [a, b] \to \mathbb{R}$ es una función continua y $f(a) \cdot f(b) < 0$, entonces existe al menos un punto $r \in (a, b)$ tal que $f(r) = 0$.

### 2.3. Características en Bisección:
- **Fórmula:** $c = \frac{a + b}{2}$.
- **Convergencia:** Global y estrictamente lineal ($p = 1$, $\mu = 0.5$).
- **Cota Teórica Determinista:**
  $$ |c_n - r| \le \frac{b_0 - a_0}{2^n} \le \text{tol} \implies n \ge \log_2\left(\frac{b_0 - a_0}{\text{tol}}\right) $$
- **Ventaja Principal:** **100% de confiabilidad**. Es matemáticamente imposible que diverja mientras $f$ sea continua y exista cambio de signo.
- **Limitación Principal / Punto Ciego:** Incapaz de hallar raíces de multiplicidad par (ej. $f(x) = (x-2)^2 = 0$) donde la curva toca el eje pero no lo cruza ($f(a)\cdot f(b) \ge 0$).

---

## 3. Métodos Abiertos (Iterativos / Open Methods)

### 3.1. Filosofía
Parten de uno o varios valores iniciales (semillas $x_0$) **sin necesidad de que encierren la raíz ni de que exista cambio de signo**. Utilizan aproximaciones polinomiales locales (como la recta tangente o secante).

### 3.2. Teorema de Soporte: Serie de Taylor y Punto Fijo
Expandiendo $f(x)$ alrededor del punto actual $x_n$:
$$ f(x) \approx f(x_n) + f'(x_n)(x - x_n) = 0 \implies x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} $$

### 3.3. Características en Newton-Raphson:
- **Convergencia:** Local y **cuadrática ($p = 2$)** para raíces simples ($f'(r) \neq 0$).
  $$ e_{n+1} \approx \left| \frac{f''(r)}{2 f'(r)} \right| e_n^2 $$
  *Las cifras decimales correctas se duplican en cada iteración.*
- **Ventaja Principal:** **Velocidad de cómputo extrema** (2 a 5 iteraciones típicamente).
- **Limitaciones y Riesgos de Fallo:**
  1. *Derivada nula ($f'(x_n) = 0$):* Genera indeterminación por división entre cero.
  2. *Sensibilidad a $x_0$:* Si la semilla está fuera del radio de atracción, puede divergir a $\pm\infty$ o saltar a otra raíz lejana.
  3. *Raíces Múltiples ($k > 1$):* La tasa de convergencia se degrada a lineal con factor $1 - 1/k$.

---

## 4. Matriz Comparativa Exhaustiva

| Criterio | Método Cerrado (Bisección) | Método Abierto (Newton-Raphson) |
|---|---|---|
| **Requerimiento de Entrada** | Intervalo $[a, b]$ con $f(a)\cdot f(b) < 0$ | Semilla inicial $x_0$ |
| **Información de la Función** | Solo evalúa $f(x)$ | Evalúa $f(x)$ y su derivada $f'(x)$ |
| **Garantía de Convergencia** | **Global (100% segura)** | **Local (condicionada a $x_0$)** |
| **Orden de Convergencia ($p$)** | Lineal ($p = 1$) | Cuadrático ($p = 2$) |
| **Comportamiento en Caso Base** | 20 iteraciones ($\text{tol}=10^{-6}$) | 2 iteraciones ($\text{tol}=10^{-6}$) |
| **Cota de Error** | Conocida a priori: $\frac{b-a}{2^n}$ | Estimada a posteriori: $|x_{n+1} - x_n|$ |
| **Raíces de Multiplicidad Par** | Falla totalmente (no inicia) | Funciona (con orden degradado a lineal) |
| **Sensibilidad a Pendiente** | Inmune | Crítica si $|f'(x)| < 10^{-12}$ |

---

## 5. Criterios de Selección para Ingeniería de Sistemas

- **Usar Métodos Cerrados (Bisección) cuando:**
  - Se calibran sistemas donde la estabilidad y la ausencia de fallos es crítica.
  - La función es una "caja negra" (código ofuscado, pruebas de rendimiento de software, APIs de terceros).
  - El costo de evaluar $f(x)$ es bajo y se prioriza la garantía de convergencia.
- **Usar Métodos Abiertos (Newton-Raphson) cuando:**
  - Se requiere respuesta en tiempo real (milisegundos) en motores de bases de datos o simulación de redes.
  - Se dispone de la derivada analítica exacta o diferenciación automática confiable.
  - Se cuenta con una buena estimación inicial $x_0$ proveniente de telemetría previa.
