# Informe Final de Proyecto · Módulo 1: Ecuaciones No Lineales y Errores

---

## Portada y Datos Generales

- **Universidad:** Universidad Nacional de San Agustín de Arequipa (UNSA)
- **Facultad:** Facultad de Ingeniería de Producción y Servicios
- **Escuela Profesional:** Ingeniería de Sistemas
- **Curso:** Laboratorio de Métodos Numéricos (Semestre 2026-B)
- **Módulo Temático:** Módulo 1 · Ecuaciones No Lineales y Errores (Métodos de Bisección y Newton-Raphson)
- **Equipo de Desarrollo:** Equipo 1
- **Integrantes:**
  - **A:** Condori Idme Raul Wilfredo (Validación y Coordinación - V)
  - **B:** Quispe Rupaylla Fabrizio Alonso (Matemática y Modelación - M)
  - **C:** Suarez Huamani Marco Antonio (Diseño Didáctico y Web - D)
  - **D:** Chura Monroy Daniel Wilston (Programación Numérica - P)
- **Docentes del Curso:** Equipo Docente de Métodos Numéricos UNSA
- **Fecha de Entrega:** Semana 12 · 2026
- **Versión del Software y Documentación:** v1.0.0 (Entrega Final)

---

## 1. Resumen Ejecutivo y Objetivo

### Resumen (185 palabras)
El presente proyecto documenta la concepción, fundamentación matemática, diseño didáctico, implementación computacional y validación formal del **Módulo 1: Ecuaciones No Lineales y Errores** para la plataforma educativa ITERA. El módulo aborda la resolución numérica de ecuaciones de una variable aplicando dos paradigmas fundamentales: el método cerrado de **Bisección** (convergencia global lineal garantizada bajo el Teorema de Bolzano) y el método abierto de **Newton-Raphson** (convergencia local cuadrática mediante series de Taylor). El software fue desarrollado utilizando tecnologías web estándares (HTML5, CSS3, JavaScript Vanilla y Chart.js), operando de manera 100% estática en el cliente sin requerir servidores ni bases de datos. Los algoritmos fueron contrastados contra implementaciones independientes en Python y GNU Octave, alcanzando una concordancia absoluta dentro de una tolerancia de $10^{-6}$. Se validó el comportamiento del sistema mediante una batería de 8 casos de prueba exhaustivos y evaluaciones empíricas de usabilidad con estudiantes de Ingeniería de Sistemas, logrando una tasa de éxito del 100% y demostrando la duplicación de dígitos significativos por iteración en Newton frente a la estabilidad incondicional de Bisección.

### Objetivo General
Determinar un parámetro de configuración a partir de una ecuación no lineal aplicada a la infraestructura de servidores y explicar rigurosamente las condiciones bajo las cuales cada método numérico converge, diverge o se degrada.

---

## 2. Formulación del Caso de Estudio

### 2.1. Contexto en Ingeniería de Sistemas
En la optimización de infraestructura de servidores y microservicios, el tiempo de respuesta normalizado $g(x)$ frente a la carga de transacciones concurrentes $x$ ($x > 0$) responde a un comportamiento no lineal modelado mediante la función cúbica:
$$ g(x) = x^3 - x $$
Para satisfacer los acuerdos de nivel de servicio (SLA), se exige fijar un parámetro de calibración de capacidad de tal manera que la respuesta objetivo sea exactamente igual a $2$ unidades de rendimiento.

Planteando el problema de búsqueda de raíces:
$$ g(x) = 2 \implies f(x) = x^3 - x - 2 = 0 $$

### 2.2. Variables, Unidades y Supuestos
- **Variable de entrada ($x$):** Parámetro de configuración de capacidad del servidor (adimensional, $x \in [1, 2]$).
- **Variable de salida ($f(x)$):** Residuo de la ecuación de calibración (adimensional).
- **Supuesto 1:** La función $f(x)$ es continua en todo $\mathbb{R}$, satisfaciendo la precondición del Teorema de Bolzano en $[1, 2]$ ($f(1) = -2 < 0$, $f(2) = +4 > 0$).
- **Supuesto 2:** La derivada $f'(x) = 3x^2 - 1$ es continua y no se anula en el intervalo $[1, 2]$ ($f'(x) \ge 2 > 0$).
- **Alcance:** Obtención de la raíz positiva única en $[1, 2]$ con tolerancia $\text{tol} = 10^{-6}$.

---

## 3. Fundamento Matemático y Métodos

### 3.1. Método de Bisección (Método Cerrado)
- **Idea:** Reducción sistemática a la mitad del intervalo que encierra la raíz.
- **Fórmula de recurrencia:** $c_n = \frac{a_n + b_n}{2}$.
- **Cota de error y velocidad:** Convergencia lineal con orden $p=1$.
  $$ |c_n - r| \le \frac{b_0 - a_0}{2^n} \implies n \ge \log_2\left(\frac{b_0 - a_0}{\text{tol}}\right) $$
  Para $[1, 2]$ con $\text{tol} = 10^{-6}$, $n \ge \log_2(10^6) \approx 19.93 \implies 20 \text{ iteraciones}$.

### 3.2. Método de Newton-Raphson (Método Abierto)
- **Idea:** Aproximación mediante la intersección de la recta tangente a la curva con el eje horizontal.
- **Fórmula de recurrencia:**
  $$ x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} = x_n - \frac{x_n^3 - x_n - 2}{3x_n^2 - 1} $$
- **Velocidad de convergencia:** Convergencia cuadrática local ($p=2$) para raíces simples ($e_{n+1} \approx C e_n^2$).
- **Limitaciones:** Falla crítica si $f'(x_n) \approx 0$; puede oscilar o divergir con malas estimaciones $x_0$.

### 3.3. Cuantificación de Errores y Tolerancias
- **Error Absoluto:** $E_a = |x_{\text{verdadero}} - x_{\text{aprox}}|$.
- **Error Relativo:** $E_r = \frac{E_a}{|x_{\text{verdadero}}|}$ ($x_{\text{verdadero}} \neq 0$).
- **Relación Residuo $\leftrightarrow$ Error:** $E_a \approx \frac{|f(x_{\text{aprox}})|}{|f'(r)|}$.
- **Distinción de 3 tolerancias:** Parada ($\text{tol} = 10^{-6}$), Comparación (contraste con scripts independientes) y Visualización (8 decimales formateados).

---

## 4. Diseño del Módulo y Arquitectura Web

### 4.1. Arquitectura de Navegación (SPA)
El módulo implementa una arquitectura Single Page Application con 8 vistas semánticas conmutables por teclado y enlaces:
`Inicio` $\to$ `Teoría` $\to$ `Ejemplos` $\to$ `Calculadoras` $\to$ `Comparación` $\to$ `Práctica` $\to$ `Referencias` $\to$ `Equipo`.

### 4.2. Decisiones de Diseño Clave
1. **Valores Numéricos Explícitos en Diagramas:** Se reemplazaron esquemas puramente ilustrativos por gráficos vectoriales SVG interactivos que exhiben las coordenadas numéricas exactas de cada paso ($a=1.0, b=2.0, c_1=1.5, f(c_1)=-0.125$ en Bisección; $x_0=1.5, f(1.5)=-0.125, f'(1.5)=5.75, x_1=1.521739$ en Newton).
2. **Independencia Tecnológica Client-Side:** Ejecución 100% en JavaScript Vanilla sin dependencias pesadas de empaquetado, asegurando portabilidad total y carga instantánea.

---

## 5. Resultados Numéricos y Contraste Independiente

- **Referencia analítica teórica:** $r = 1.5213797068045376...$

| Método | Entorno | Raíz Obtenida | Iteraciones | Error Final | Residuo $|f(x)|$ | Estado |
|---|---|---|---|---|---|---|
| **Bisección** | Manual | $1.52138042$ | 20 | $9.54 \times 10^{-7}$ | $4.40 \times 10^{-6}$ | CONVERGIÓ |
| **Bisección** | Python (`biseccion.py`) | $1.5213804245$ | 20 | $9.54 \times 10^{-7}$ | $4.40 \times 10^{-6}$ | CONVERGIO |
| **Bisección** | Web (`js/app.js`) | $1.52138042$ | 20 | $9.54 \times 10^{-7}$ | $4.40 \times 10^{-6}$ | Convergió |
| **Newton** | Manual | $1.52137981$ | 2 | $3.59 \times 10^{-4}$ | $5.89 \times 10^{-7}$ | CONVERGIÓ |
| **Newton** | Python (`newton.py`) | $1.5213798060$ | 2 | $3.59 \times 10^{-4}$ | $5.89 \times 10^{-7}$ | CONVERGIO |
| **Newton** | Web (`js/app.js`) | $1.52137981$ | 2 | $3.59 \times 10^{-4}$ | $5.89 \times 10^{-7}$ | Convergió |

**Conclusión del contraste:** Las tres implementaciones coinciden con una precisión de 8 cifras decimales, satisfaciendo estrictamente la cota de tolerancia $|r_{\text{calc}} - r_{\text{ref}}| \le 10^{-6}$.

---

## 6. Validación, Pruebas y Retroalimentación de Usuarios

### 6.1. Batería de 8 Pruebas Formaleas
- 4 Pruebas normales (E1-P01, E1-P02, E2-P05, E2-P06): Aprobadas con 100% de convergencia dentro de tolerancia.
- 2 Pruebas de frontera (E1-P03 sin cambio de signo, E2-P07 derivada nula con $x_0=0$ en $x^3-1$): Aprobadas con manejo de excepción controlado sin colapsos.
- 2 Pruebas de datos inválidos (E1-P04 intervalo degenerado, E2-P08 parámetros negativos/NaN): Aprobadas con rechazo antes de la ejecución.

### 6.2. Validación con Usuarios Externos
Dos estudiantes de Ingeniería de Sistemas ejecutaron 3 tareas estandarizadas (localización teórica, ejecución de calculadora y test interactivo), logrando el 100% de cumplimiento en tiempos inferiores a 3.5 minutos sin requerir asesoría.

---

## 7. Conclusiones y Propuestas de Mejora

### 7.1. Conclusiones
1. Se cumplió satisfactoriamente el objetivo pedagógico y técnico, determinando el parámetro óptimo de calibración $x^* \approx 1.52138$ para la respuesta de servidor $g(x)=2$.
2. Se comprobó experimentalmente la superioridad en velocidad de Newton-Raphson (2 iteraciones) frente a Bisección (20 iteraciones), así como la superioridad en robustez de Bisección ante funciones no derivables o con derivadas conflictivas.

### 7.2. Mejoras Futuras Identificadas
1. **Extensión a Sistemas no Lineales Multivariables:** Implementar el método de Newton-Raphson matricial utilizando matrices Jacobianas para sistemas $F(\mathbf{x}) = \mathbf{0}$.
2. **Aceleración por Diferenciación Automática:** Incorporar un evaluador simbólico o de diferenciación automática en JavaScript para permitir funciones arbitrarias ingresadas por el usuario sin requerir la derivación manual previa.

---

## 8. Contribuciones de Integrantes y Fuentes

- **Condori Idme Raul Wilfredo (V / M):** Diseño de la matriz de pruebas, coordinación de reuniones semanales, pruebas con usuarios externos y redacción de actas.
- **Quispe Rupaylla Fabrizio Alonso (M / D):** Modelación matemática de Bolzano y Taylor, deducción de cotas de error y redacción de fichas matemáticas.
- **Suarez Huamani Marco Antonio (D / P):** Diseño de la interfaz gráfica, responsividad CSS, accesibilidad con teclado y diagramas SVG con valores numéricos.
- **Chura Monroy Daniel Wilston (P / V):** Implementación de algoritmos numéricos en JS, Python y Octave, exportación CSV y gráficos de convergencia en Chart.js.

### Declaración de Apoyos:
Se utilizaron las bibliotecas de código abierto Chart.js (CDN) y Font Awesome (CDN). El desarrollo asistido por IA se aplicó bajo supervisión académica para la estructuración y contraste cruzado de trazas numéricas, quedando debidamente registrado en el repositorio Git.
