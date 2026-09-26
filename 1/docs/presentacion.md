# Diapositivas para la Defensa Final · Módulo 1 (ITERA)

**Tiempo Total:** 12 minutos (3 minutos por integrante/rol)  
**Proyecto:** Ecuaciones No Lineales y Errores (Bisección y Newton-Raphson)  
**Curso:** Laboratorio de Métodos Numéricos — UNSA 2026-B  

---

## Diapositiva 1 · Portada y Presentación del Equipo (General - 1 min)
- **Título:** Módulo 1: Ecuaciones No Lineales y Errores
- **Plataforma:** ITERA — Métodos Numéricos para Ingeniería de Sistemas
- **Integrantes y Roles:**
  - Condori Idme Raul Wilfredo (Validación y Coordinación - V)
  - Quispe Rupaylla Fabrizio Alonso (Matemática y Modelación - M)
  - Suarez Huamani Marco Antonio (Diseño Didáctico y Web - D)
  - Chura Monroy Daniel Wilston (Programación Numérica - P)
- **Objetivo:** Determinar el parámetro óptimo de calibración de un servidor a partir de una ecuación no lineal y explicar cuándo y por qué cada método converge.

---

## Diapositiva 2 · Formulación del Problema y Caso Aplicado (M - 1.5 min)
- **Problema de Ingeniería de Sistemas:** Calibración de capacidad en un cluster de servidores donde la respuesta normalizada es $g(x) = x^3 - x$.
- **Objetivo de Rendimiento:** $g(x) = 2 \implies f(x) = x^3 - x - 2 = 0$.
- **Espacio de Búsqueda:** Intervalo $[1, 2]$ donde $f(1) = -2 < 0$ y $f(2) = +4 > 0$.
- **Raíces Teóricas (Teorema Fundamental del Álgebra):**
  - Raíz real única: $r \approx 1.5213797068$.
  - Par complejo conjugado: $-0.76069 \pm 0.85782i$.

---

## Diapositiva 3 · Fundamento Matemático y Criterios de Convergencia (M - 1.5 min)
- **Bisección (Cerrado):**
  - Teorema de Bolzano $\implies$ Convergencia global garantizada ($p=1$).
  - Cota determinista: $|c_n - r| \le \frac{b-a}{2^n} \implies 20$ iteraciones para $\text{tol} = 10^{-6}$.
- **Newton-Raphson (Abierto):**
  - Expansión de Taylor: $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$.
  - Convergencia cuadrática local ($p=2$) $\implies$ Las cifras correctas se duplican por iteración.
  - Riesgo: Falla si $f'(x_n) \approx 0$ o si $x_0$ está lejos del radio de atracción.

---

## Diapositiva 4 · Implementación Algorítmica y Control Numérico (P - 1.5 min)
- **Desarrollo en JavaScript Vanilla y Scripts Científicos (Python/Octave):**
  - Control riguroso de excepciones para evitar divisiones entre cero y desbordamientos.
  - Criterios de parada duales: residuo $|f(x)| \le \text{tol}$ o cota/paso $E_n \le \text{tol}$.
  - Manejo de punto flotante de 64 bits (IEEE 754) y prevención de cancelaciones catastróficas.

---

## Diapositiva 5 · Demostración en Vivo de las Calculadoras (P - 1.5 min)
- **Bisección en Vivo:**
  - Demostración con $[1, 2] \implies 20$ iteraciones, raíz $1.52138042$, error $9.54 \times 10^{-7}$.
- **Newton en Vivo:**
  - Demostración desde $x_0 = 1.5 \implies$ ¡Convergió en solo 2 iteraciones! Raíz $1.52137981$, residuo $5.89 \times 10^{-7}$.
- **Exportación de Datos:** Descarga instantánea de la traza completa de iteraciones en CSV.

---

## Diapositiva 6 · Experiencia Didáctica, Accesibilidad y Usabilidad (D - 1.5 min)
- **Diseño Centrado en el Estudiante de Sistemas:**
  - Wizard interactivo paso a paso con navegación por teclado (`Flechas`).
  - **Valores numéricos en todos los diagramas:** Coordenadas exactas en las etiquetas de Bisección y en las rectas tangentes de Newton.
  - Visualizaciones responsivas y componentes accesibles (WCAG).

---

## Diapositiva 7 · Banco de Ejercicios y Autoevaluación Interactiva (D - 1.5 min)
- **Consolidación del Aprendizaje:**
  - 4 Ejercicios contextualizados en problemas reales (delivery, funciones caja negra, picos de tráfico y raíces dobles).
  - Sistema de autoevaluación interactiva de 6 preguntas con puntaje y retroalimentación explicativa inmediata.

---

## Diapositiva 8 · Matriz de Pruebas y Validación con Usuarios (V - 1.5 min)
- **Batería de 8 Pruebas Formaleas (100% de Aprobación):**
  - 4 Normales (exactitud verificada contra Python y Octave).
  - 2 Frontera (detección de derivada nula en $x^3-1$ con $x_0=0$, rechazo de $[2,3]$ sin cambio de signo).
  - 2 Inválidas (rechazo de parámetros incoherentes).
- **Pruebas con Usuarios Externos:** 2 estudiantes de Sistemas completaron las 3 tareas sin requerir ayuda técnica.

---

## Diapositiva 9 · Síntesis Comparativa y Criterios de Decisión (V - 1.5 min)
- **Comparativa de Desempeño:**
  - *Velocidad:* Newton (2 iteraciones) supera ampliamente a Bisección (20 iteraciones).
  - *Robustez:* Bisección nunca diverge, mientras que Newton es sensible a la derivada y a $x_0$.
- **Recomendación para Ingeniería de Sistemas:**
  - Usar Bisección en etapas exploratorias ("caja negra" o sin derivada disponible).
  - Usar Newton-Raphson para cómputo de alto rendimiento y convergencia ultrarrápida cuando la derivada es confiable.

---

## Diapositiva 10 · Conclusiones Finales y Preguntas (General - 1 min)
- **Conclusiones:** Módulo 1 completado al 100%, validado numéricamente y desplegado en GitHub Pages.
- **Acceso:** `https://rwciana.github.io/LAB-MN/1/`
- **Agradecimiento y Espacio para Preguntas del Jurado.**
