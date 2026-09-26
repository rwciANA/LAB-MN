# Informe de Avance · Hito 1 (Semanas 1 a 3)

**Curso:** Métodos Numéricos  
**Escuela:** Escuela Profesional de Ingeniería de Sistemas — UNSA  
**Módulo:** Módulo 1 · Ecuaciones No Lineales y Errores (Método de Bisección)  
**Equipo:** Equipo 1  
**Fecha:** Semana 3  

---

## 1. Información General y Asignación de Roles (Bloque 1)

| Letra | Integrante | Rol Asignado | Responsabilidades Principales |
|---|---|---|---|
| **A** | Condori Idme Raul Wilfredo | **Validación y Coordinación (V)** | Coordinación de reuniones, diseño y ejecución de la matriz de 4 pruebas iniciales, verificación de tolerancias. |
| **B** | Quispe Rupaylla Fabrizio Alonso | **Matemática y Modelación (M)** | Formulación del problema de calibración de servidor, fundamentación de Bolzano, cota teórica $(b-a)/2^n$. |
| **C** | Suarez Huamani Marco Antonio | **Diseño Didáctico y Web (D)** | Arquitectura de información, maquetación visual responsive, gráficos con valores numéricos y wizard teórico. |
| **D** | Chura Monroy Daniel Wilston | **Programación Numérica (P)** | Implementación del algoritmo de Bisección en JavaScript (`js/app.js`) y script independiente Python (`scripts/biseccion.py`). |

---

## 2. Formulación del Caso Base y Alcance

Se planteó el problema aplicado de calibración de un parámetro de configuración en un servidor web/cloud. La respuesta normalizada está gobernada por $g(x) = x^3 - x$. Para alcanzar una respuesta objetivo de 2 unidades, se formula la ecuación no lineal:
$$ f(x) = x^3 - x - 2 = 0 $$
- **Dominio y Rango:** Se delimitó el intervalo inicial $[a, b] = [1, 2]$ donde $f(1) = -2 < 0$ y $f(2) = +4 > 0$.
- **Existencia de Raíz:** El Teorema de Bolzano garantiza la existencia de al menos una raíz en $(1, 2)$.
- **Referencia Analítica:** $r \approx 1.521379706804...$
- **Tolerancia de Parada:** $\text{tol} = 10^{-6}$, máximo de iteraciones 100.

---

## 3. Estado de Avance del Producto y Entregables del Hito 1

1. **Interfaz Web y Portada (1/index.html):**
   - Portada con título del módulo, objetivo pedagógico, datos de integrantes y delimitación explícita para estudiantes de Ingeniería de Sistemas.
   - Navegación SPA fluida con enlace de retorno al portal común.
2. **Fundamentación Teórica y Didáctica:**
   - Panel interactivo de Bisección con algoritmo paso a paso (7 pasos), análisis de cota de error y diagrama vectorial con valores numéricos ($a=1.0, b=2.0, c_1=1.5, f(c_1)=-0.125, \text{error}=0.5$).
   - Ficha común de errores ($E_a, E_r, E_p$, residuo vs error).
3. **Calculadora Interactiva de Bisección:**
   - Validación robusta de entradas ($a < b$, $f(a)\cdot f(b) < 0$, $\text{tol} > 0$).
   - Tabla de iteraciones con columnas completas y gráfico de convergencia en escala logarítmica.
4. **Scripts de Referencia Independiente:**
   - `scripts/biseccion.py` y `scripts/biseccion_reference.oct` operativos y contrastados.

---

## 4. Matriz de Pruebas Iniciales (Hito 1) y Contraste Numérico

Se ejecutaron 4 pruebas diseñadas a priori:

| ID | Tipo | Entrada | Referencia | Salida Observada (Web y Script) | Resultado |
|---|---|---|---|---|---|
| **T-01** | Normal | $[1, 2], \text{tol}=10^{-6}$ | $1.5213797068$ | Raíz: `1.5213804245` (20 iter, error $9.54 \times 10^{-7}$) | **APROBADO** |
| **T-02** | Normal | $[1, 2], \text{tol}=10^{-8}$ | $1.5213797068$ | Raíz: `1.5213797018` (27 iter, error $7.45 \times 10^{-9}$) | **APROBADO** |
| **T-03** | Frontera | $[2, 3], \text{tol}=10^{-6}$ | Sin cambio signo | Mensaje: `"Los extremos deben tener signos opuestos"` | **APROBADO** |
| **T-04** | Inválida | $[1, 1], \text{tol}=10^{-6}$ | Intervalo degenerado | Mensaje: `"Los extremos deben tener signos opuestos"` | **APROBADO** |

---

## 5. Correcciones Realizadas y Plan para el Hito 2

- **Corrección 1:** Se clarificó visual y conceptualmente la diferencia entre **residuo** $|f(c)| = 4.40 \times 10^{-6}$ y **cota de error** $(b-a)/2 = 9.54 \times 10^{-7}$.
- **Corrección 2:** Se ajustó la validación para impedir la ejecución con intervalos degenerados o valores no numéricos.
- **Plan para Hito 2:**
  1. Implementación del método de Newton-Raphson (método abierto) con derivación analítica.
  2. Construcción de la sección comparativa Bisección vs. Newton con gráficas combinadas de convergencia.
  3. Exportación de tablas a formato CSV.
  4. Ampliación de la matriz a 8 pruebas formales.
  5. Rotación de roles programada (Semanas 4 a 6).
