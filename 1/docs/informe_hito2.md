# Informe Beta · Hito 2 (Semanas 4 a 6)

**Curso:** Métodos Numéricos  
**Escuela:** Escuela Profesional de Ingeniería de Sistemas — UNSA  
**Módulo:** Módulo 1 · Ecuaciones No Lineales y Errores (Bisección y Newton-Raphson Integrados)  
**Equipo:** Equipo 1  
**Fecha:** Semana 6  

---

## 1. Rotación de Roles (Bloque 2: Semanas 4 a 6)

Siguiendo el protocolo de trabajo colaborativo, se aplicó la rotación de roles:

| Letra | Integrante | Rol en Hito 2 | Tareas Principales Ejecutadas |
|---|---|---|---|
| **A** | Condori Idme Raul Wilfredo | **Matemática y Modelación (M)** | Modelado de la convergencia cuadrática de Newton, deducción de Taylor y análisis de fallos por derivadas nulas. |
| **B** | Quispe Rupaylla Fabrizio Alonso | **Diseño Didáctico y Web (D)** | Implementación de la vista de comparación, diagramas de convergencia combinados y banco de ejercicios aplicados. |
| **C** | Suarez Huamani Marco Antonio | **Programación Numérica (P)** | Codificación de Newton-Raphson en JS y Python, exportación a CSV y botón de reinicio al caso base. |
| **D** | Chura Monroy Daniel Wilston | **Validación y Coordinación (V)** | Expansión de la matriz de pruebas a 8 casos, validación cruzada y contrastes numéricos independientes. |

---

## 2. Desarrollo e Integración del Segundo Método: Newton-Raphson

Se implementó el método abierto de **Newton-Raphson** para resolver $f(x) = x^3 - x - 2 = 0$ con $f'(x) = 3x^2 - 1$:
- **Algoritmo:** $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$.
- **Condiciones de convergencia:** Derivada no nula ($|f'(x_n)| > 10^{-12}$) y semilla $x_0$ cercana a la raíz ($x_0 = 1.5$).
- **Convergencia cuadrática observada:**
  - Iteración 1: $x_1 = 1.5217391304$ (error: $2.17 \times 10^{-2}$)
  - Iteración 2: $x_2 = 1.5213798060$ (residuo: $5.89 \times 10^{-7} \le 10^{-6}$)
  - Alcanzó la tolerancia requerida en apenas **2 iteraciones**.

---

## 3. Sección de Comparación y Caso Aplicado

Se creó la vista dedicada `#comparacion` orientada a la toma de decisiones en Ingeniería de Sistemas:

### A. Tabla Comparativa de Desempeño:
| Criterio | Bisección (Cerrado) | Newton-Raphson (Abierto) |
|---|---|---|
| **Entrada Inicial** | $[a, b] = [1.0, 2.0]$ | $x_0 = 1.5$ |
| **Iteraciones ($\text{tol}=10^{-6}$)** | 20 iteraciones | 2 iteraciones |
| **Raíz Calculada** | `1.5213804245` | `1.5213798060` |
| **Residuo Final** | $4.40 \times 10^{-6}$ | $5.89 \times 10^{-7}$ |
| **Orden de Convergencia** | Lineal ($p = 1$) | Cuadrático ($p = 2$) |
| **Robustez** | Incondicionalmente convergente | Sensible a $x_0$ y derivadas nulas |
| **Requisito de Derivada** | No | Sí ($f'(x)$ analítica o numérica) |

### B. Curvas de Convergencia Comparativas:
Se graficaron ambas trayectorias de error en escala logarítmica, evidenciando cómo Newton reduce el error de forma cuadrática y exponencial frente a la reducción lineal constante de Bisección.

---

## 4. Banco de Ejercicios y Autoevaluación Interactiva

Se incorporaron a la aplicación:
1. **4 Ejercicios Aplicados:**
   - E1 (Intermedio): Tiempo de despacho en app de delivery ($x^3-x=2$).
   - E2 (Intermedio): Calibración con función caja negra no derivable (Bisección y 20 pasos).
   - E3 (Avanzado): Pico de demanda en servidores ($x^3-x=3$, resuelto con Newton en 3 iteraciones).
   - E4 (Avanzado): Modelo de pérdida cuadrática con raíz doble ($(x-2)^2=0$, demostrando la ceguera de Bisección y la degradación de Newton a orden lineal).
2. **6 Preguntas de Autoevaluación:**
   - 2 de opción múltiple, 2 de verdadero/falso y 2 numéricas con tolerancia y explicación detallada.

---

## 5. Matriz Completa de 8 Pruebas (Hito 2)

Se ejecutaron y registraron formalmente los 8 casos de prueba:
- **E1-P01 (Bisección Normal):** Raíz $1.5213804245$ en 20 iteraciones. **PASS**.
- **E1-P02 (Bisección Normal tol=1e-8):** Raíz $1.5213797018$ en 27 iteraciones. **PASS**.
- **E1-P03 (Bisección Frontera [2,3]):** Rechazo por falta de cambio de signo. **PASS**.
- **E1-P04 (Bisección Inválida [1,1]):** Rechazo por intervalo degenerado. **PASS**.
- **E2-P05 (Newton Normal x0=1.5):** Raíz $1.5213798060$ en 2 iteraciones. **PASS**.
- **E2-P06 (Newton Normal x0=2.0):** Raíz $1.5213797068$ en 4 iteraciones. **PASS**.
- **E2-P07 (Newton Frontera x0=0, f(x)=x³-1):** Detección de $f'(0)=0$, mensaje de error controlado. **PASS**.
- **E2-P08 (Newton Inválida tol=-1):** Bloqueo en formulario y validación. **PASS**.

**Tasa de éxito:** 8/8 (100%).

---

## 6. Plan para el Hito 3 (Entrega Final y Validación Externa)

1. Pruebas de usabilidad con 2 usuarios externos de Ingeniería de Sistemas (3 tareas por usuario).
2. Redacción del informe final exhaustivo (8-12 páginas), manual de usuario y manual técnico.
3. Preparación de la presentación de defensa final (8-10 diapositivas para 12 minutos con participación de los 4 roles).
4. Firma del acta de aceptación y etiquetado de versión final v1.0.0.
