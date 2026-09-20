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

## Objetivos
- Determinar un parámetro de configuración a partir de una ecuación no lineal.
- Explicar cuándo un método converge.
- Implementar Bisección y Newton con tolerancias de `10⁻⁶`.
