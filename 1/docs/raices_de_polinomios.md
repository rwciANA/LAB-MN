# Raíces de polinomios · Subtema del Tema 1

**Responsable:** bloque M · **Revisor:** bloque V

## 1. ¿Qué es una raíz?

x* es raíz de f si f(x*) = 0: el punto donde la función toca el eje X. Resolver f(x) = 0 es **buscar raíces**. En Ingeniería de Sistemas: umbrales donde una respuesta cruza un objetivo, puntos de equilibrio, calibración de parámetros.

## 2. Polinomios y el teorema fundamental del álgebra

Un polinomio de grado n:

$$p(x) = a_nx^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0, \quad a_n \ne 0$$

**Teorema fundamental del álgebra:** tiene **exactamente n raíces en los complejos** contando multiplicidad; por tanto, como máximo n raíces reales.

Con coeficientes reales, las complejas aparecen en **pares conjugados**: a ± b·i.

## 3. Multiplicidad de raíces

r es raíz de multiplicidad k si p(x) = (x − r)ᵏ · q(x) con q(r) ≠ 0.

| Multiplicidad | Comportamiento gráfico | Bisección | Newton |
|---------------|------------------------|-----------|--------|
| **Impar** (1, 3, …) | Cruza el eje X (cambia de signo) | ✅ la encuentra | ✅ cuadrática si k=1 |
| **Par** (2, 4, …) | Toca y rebota (no cambia de signo) | ❌ invisible: no hay cambio de signo | ⚠️ la encuentra pero solo lineal, factor (1 − 1/k) |

## 4. El caso base analizado completo

p(x) = x³ − x − 2 (grado 3 ⇒ 3 raíces):

- **Real:** x₁ = 1.5213797068 (la que encuentran Bisección y Newton)
- **Complejas conjugadas:** factorizando p(x) = (x − x₁)(x² + x₁x + (x₁² − 1)):

$$x_{2,3} = \frac{-x_1 \pm i\sqrt{4 - 3x_1^2}}{2} \approx -0.76069 \pm 0.85782\,i$$

Los métodos del módulo trabajan sobre la recta real: convergen a la **única raíz real**. El par complejo es inalcanzable sin aritmética compleja, pero su existencia está garantizada por el teorema.

## 5. Herramientas relacionadas

- **Deflación:** hallada una raíz r, dividir p(x)/(x − r) para buscar las restantes. Cuidado: acumula error; conviene refinar después con el polinomio original.
- **Régula falsi, secante, punto fijo:** variantes para cuando no se dispone de la derivada o se quiere evitar (fuera del alcance mínimo del tema).
- **Cota de raíces reales:** todas están en |x| ≤ 1 + max|aᵢ/a| — sirve para elegir intervalos iniciales sin probar a ciegas.

## 6. Conclusión para el usuario del portal

Antes de correr un método: (1) determina el grado y cuántas raíces reales **puede** haber, (2) grafica o tabula para ubicar cambios de signo, (3) elige Bisección si necesitas garantía o Newton si tienes buena aproximación, (4) recuerda que una raíz doble es el punto ciego clásico de Bisección.
