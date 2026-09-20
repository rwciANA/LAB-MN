# Ficha del Proyecto · Tema 1

## Información general

| Campo | Valor |
|-------|-------|
| **Universidad** | Universidad Nacional de San Agustín (UNSA) |
| **Escuela** | Ingeniería de Sistemas |
| **Curso** | Laboratorio de Métodos Numéricos |
| **Módulo** | Ecuaciones no lineales y errores |
| **Equipo** | 1 |
| **Semana** | 1 |

## Integrantes y Roles

| Letra | Nombre | Rol |
|-------|--------|-----|
| A | Condori Idme Raul Wilfredo | Validación y coordinación (V) |
| B | Quispe Rupaylla Fabrizio Alonso | Diseño didáctico y web (D) |
| C | Suarez Huamani Marco Antonio | Matemática y modelación (M) |
| D | Chura Monroy Daniel Wilston | Programación numérica (P) |

## Caso base

Se estudia la función:
$$ f(x) = x^3 - x - 2 $$
con intervalo inicial `[1, 2]`. Como `f(1) = -2` y `f(2) = 4`, existe un cambio de signo y Bisección puede aplicarse. La raíz de referencia es aproximadamente `1.5213797068`.

### Variables, unidades y supuestos

| Variable | Descripción | Unidad | Rango declarado |
|----------|-------------|--------|-----------------|
| x | Parámetro de configuración (respuesta normalizada) | Adimensional | [1, 2] en el caso base |
| f(x) | Residuo de la ecuación de calibración | Adimensional | Según intervalo |

Supuestos:
- El modelo `f(x) = x³ − x − 2` es sintético y representa una respuesta normalizada de calibración.
- La función es continua en el intervalo declarado, condición necesaria para Bisección.
- La derivada `f'(x) = 3x² − 1` existe y es evaluable en todo punto usado por Newton.

### Límites de entrada acordados
- Tolerancia mínima aceptada: `1e-9`; valor por defecto `1e-6`.
- Máximo de iteraciones: entre 1 y 500; valor por defecto 100.
- Bisección exige `f(a) · f(b) < 0`; Newton exige derivada no nula ni demasiado pequeña.

## Resultados de aprendizaje

1. Formular un problema aplicado de ecuaciones no lineales, identificando variables, unidades, supuestos y restricciones, y justificar la elección del método.
2. Implementar Bisección y Newton con criterios de parada definidos, analizar el error y contrastar los resultados con una referencia independiente.
3. Explicar el procedimiento mediante teoría breve, ejemplos resueltos, tablas, gráficos y ejercicios con retroalimentación.

## Ficha matemática del método 1 · Bisección (Semana 2)

- **Idea:** dividir por la mitad un intervalo [a, b] donde f cambia de signo; el punto medio c = (a+b)/2 aproxima la raíz y la cota de error es (b−a)/2.
- **Condición de uso:** f continua en [a, b] y f(a)·f(b) < 0.
- **Criterio de parada:** |f(c)| ≤ tol o (b−a)/2 ≤ tol; máximo 100 iteraciones.
- **Convergencia:** lineal, garantizada bajo las condiciones anteriores.
- **Referencia manual:** raíz ≈ 1.5213797068; primer paso c = 1.5, f(1.5) = −0.125, intervalo [1.5, 2]. Ver `ejemplo_manual_biseccion.md`.
- **Limitaciones:** lento comparado con Newton; no sirve si la raíz no cambia de signo (doble).

## Objetivos
- Determinar un parámetro de configuración a partir de una ecuación no lineal.
- Explicar cuándo un método converge.
- Implementar Bisección y Newton con tolerancias de `10⁻⁶`.
