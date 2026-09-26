# Bitácora de Validación con Usuarios Externos (Hito 3)

**Responsable:** A (V) Condori Idme · **Revisores:** B (M) Quispe Rupaylla, C (D) Suarez Huamani, D (P) Chura Monroy  
**Fecha de Ejecución:** Semana 11 · 2026  
**Población Evaluada:** Estudiantes del 5.° ciclo de Ingeniería de Sistemas — UNSA  

---

## 1. Protocolo de Evaluación de Usabilidad y Comprensión

Se seleccionaron dos usuarios externos que no formaron parte del equipo de desarrollo para interactuar con la versión candidata a lanzamiento del módulo. A cada participante se le asignaron 3 tareas estandarizadas sin intervención previa del equipo:

- **Tarea 1 (Navegación y Comprensión Teórica):** Localizar en la sección de teoría la condición matemática que exige Bisección para poder iniciar y explicar por qué el método falla con raíces de multiplicidad par.
- **Tarea 2 (Operación Numérica en Calculadora):** Ejecutar el método de Newton-Raphson para el caso base, descargar la tabla de iteraciones en CSV y contrastar la raíz obtenida frente al valor de referencia.
- **Tarea 3 (Resolución y Autoevaluación):** Resolver el Ejercicio 1 (Delivery/Servidores) y responder las 6 preguntas del test interactivo, alcanzando una puntuación de al menos 5/6.

---

## 2. Registro de Resultados por Usuario

### Usuario 1: Juan Carlos Mendoza (Estudiante de 5.° ciclo, Ing. de Sistemas UNSA)

| Tarea | Tiempo Empleado | ¿Completada con Éxito? | ¿Requirió Ayuda? | Observaciones y Comentarios del Usuario |
|---|---|---|---|---|
| **Tarea 1** | 1 min 45 s | **Sí (Éxito total)** | No | El usuario navegó mediante las pestañas de teoría y localizó el Teorema de Bolzano y la gráfica de multiplicidad par sin dificultad. Mencionó: *"El diagrama vectorial con los valores numéricos de a, b y c ayuda mucho a entender por qué se descarta la mitad del intervalo"*. |
| **Tarea 2** | 1 min 20 s | **Sí (Éxito total)** | No | Cambió a la pestaña de Newton, presionó 'Ejecutar', observó la convergencia en 2 iteraciones y descargó el archivo CSV. Comprobó el residuo $5.89 \times 10^{-7}$. |
| **Tarea 3** | 3 min 10 s | **Sí (Éxito total)** | No | Resolvió el ejercicio y obtuvo 6/6 en la autoevaluación interactiva. Destacó la retroalimentación inmediata en cada pregunta. |

---

### Usuario 2: Andrea Sofía Flores (Estudiante de 4.° ciclo, Ing. de Sistemas UNSA)

| Tarea | Tiempo Empleado | ¿Completada con Éxito? | ¿Requirió Ayuda? | Observaciones y Comentarios del Usuario |
|---|---|---|---|---|
| **Tarea 1** | 2 min 15 s | **Sí (Éxito total)** | No | Utilizó la navegación por teclado (flechas) para recorrer el wizard teórico. Encontró la explicación de por qué $f'(x_n) \approx 0$ invalida Newton. |
| **Tarea 2** | 1 min 50 s | **Sí (Éxito total)** | No | Probó deliberadamente un intervalo inválido $[2, 3]$ en Bisección y confirmó que la interfaz emitió el mensaje de advertencia adecuado antes de iterar. Luego ejecutó el caso base y exportó el CSV. |
| **Tarea 3** | 3 min 40 s | **Sí (Éxito total)** | No | Obtuvo 5/6 en el primer intento (falló inicialmente en la pregunta sobre la relación entre residuo y error); leyó la retroalimentación ("Ea ≈ |residuo|/|f'(r)|") y corrigió su comprensión. |

---

## 3. Síntesis y Mejoras Derivadas de las Pruebas con Usuarios

1. **Facilidad de Uso:** El 100% de las tareas se completaron exitosamente sin requerir intervención ni asistencia técnica del equipo.
2. **Claridad Conceptual:** Ambos usuarios destacaron positivamente la inclusión de **valores numéricos explícitos** en los diagramas y gráficos, así como la separación clara entre la magnitud del **residuo** y el **error de la raíz**.
3. **Ajuste Menor Implementado:** Se incrementó el contraste del botón de exportación CSV y se añadió un botón de reinicio rápido `"Caso base"` en la calculadora para restaurar los valores iniciales tras experimentar con parámetros personalizados.
