# Ficha del Proyecto · Módulo 1 (Versión Final)

## 1. Información General

| Campo | Valor |
|---|---|
| **Universidad** | Universidad Nacional de San Agustín (UNSA) |
| **Escuela** | Ingeniería de Sistemas |
| **Curso** | Laboratorio de Métodos Numéricos |
| **Módulo** | Módulo 1 · Ecuaciones No Lineales y Errores (Bisección y Newton-Raphson) |
| **Equipo** | Equipo 1 |
| **Semestre** | 2026-B |
| **Versión** | 1.0.0 (Entrega Final) |

---

## 2. Integrantes y Asignación de Roles

| Letra | Nombre | Rol H1 (Sem 1-3) | Rol H2 (Sem 4-6) | Rol H3 (Sem 7-12) |
|---|---|---|---|---|
| **A** | Condori Idme Raul Wilfredo | Validación y coordinación (V) | Matemática y modelación (M) | Validación y coordinación (V) |
| **B** | Quispe Rupaylla Fabrizio Alonso | Matemática y modelación (M) | Diseño didáctico y web (D) | Matemática y modelación (M) |
| **C** | Suarez Huamani Marco Antonio | Diseño didáctico y web (D) | Programación numérica (P) | Diseño didáctico y web (D) |
| **D** | Chura Monroy Daniel Wilston | Programación numérica (P) | Validación y coordinación (V) | Programación numérica (P) |

---

## 3. Formulación del Caso Base y Aplicado

En la calibración de parámetros para servidores cloud de alta concurrencia, la curva de respuesta normalizada del sistema está modelada por $g(x) = x^3 - x$. Para alcanzar un rendimiento objetivo de 2 unidades, se debe encontrar $x > 0$ tal que:
$$ f(x) = x^3 - x - 2 = 0 $$
- **Intervalo inicial de Bisección:** $[1, 2]$ ($f(1) = -2 < 0$, $f(2) = 4 > 0$).
- **Semilla inicial de Newton:** $x_0 = 1.5$.
- **Raíz de referencia teórica:** $r \approx 1.5213797068045376...$

### Variables y Supuestos
- $x$: Parámetro de capacidad de servidor (adimensional, positivo).
- $f(x)$: Residuo de la ecuación de calibración (adimensional).
- Supuesto 1: $f(x)$ es continua en todo su dominio.
- Supuesto 2: $f'(x) = 3x^2 - 1$ es diferenciable y evaluable en todo punto de iteración.
- Tolerancia por defecto: $\text{tol} = 10^{-6}$; máximo de iteraciones: 100.

---

## 4. Fichas Matemáticas de los Métodos

### Método 1: Bisección (Método Cerrado)
- **Idea:** Reducción a la mitad del intervalo $[a, b]$ que encierra la raíz.
- **Precondición:** $f(a) \cdot f(b) < 0$ (Teorema de Bolzano).
- **Criterio de parada:** $|f(c)| \le \text{tol}$ o $\frac{b-a}{2} \le \text{tol}$.
- **Convergencia:** Global y lineal ($p=1$), con cota $|c_n - r| \le \frac{b-a}{2^n}$.
- **Iteraciones para $10^{-6}$ en $[1, 2]$:** 20 iteraciones ($c_{20} = 1.52138042$, error $9.54 \times 10^{-7}$).

### Método 2: Newton-Raphson (Método Abierto)
- **Idea:** Búsqueda mediante la recta tangente $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$.
- **Precondición:** $f'(x_n) \neq 0$ y $x_0$ cercano a la raíz.
- **Criterio de parada:** $|f(x_{n+1})| \le \text{tol}$ o $|x_{n+1} - x_n| \le \text{tol}$.
- **Convergencia:** Local y cuadrática ($p=2$) para raíces simples.
- **Iteraciones para $10^{-6}$ desde $x_0=1.5$:** 2 iteraciones ($x_2 = 1.52137981$, residuo $5.89 \times 10^{-7}$).

---

## 5. Criterios de Evaluación y Aceptación
- **Rigor Matemático:** Exactitud en $10^{-6}$ contrastada contra Python y Octave.
- **Funcionamiento y Robustez:** Manejo controlado de derivadas nulas e intervalos inválidos sin excepciones no capturadas.
- **Valor Didáctico:** Gráficos vectoriales con valores numéricos explícitos, retroalimentación inmediata en autoevaluaciones y enfoque práctico para Ingeniería de Sistemas.
