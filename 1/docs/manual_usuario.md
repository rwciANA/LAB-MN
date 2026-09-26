# Manual de Usuario · Módulo 1: Ecuaciones No Lineales y Errores

**Plataforma Educativa:** ITERA  
**Módulo:** 1 · Ecuaciones No Lineales (Bisección y Newton-Raphson)  
**Público:** Estudiantes de Ingeniería de Sistemas  

---

## 1. Cómo Abrir y Ejecutar el Módulo

1. **Vía Navegador Web:**
   - Abre el archivo `1/index.html` en tu navegador de preferencia (Google Chrome, Firefox, Edge).
   - O accede directamente a la versión publicada en línea: `https://rwciana.github.io/LAB-MN/1/`
2. **Requisitos:**
   - No requiere instalar ningún servidor ni dependencias de base de datos.
   - Requiere conexión a Internet para cargar las librerías CDN de fuentes, gráficos e íconos.

---

## 2. Mapa de Navegación del Módulo

En la barra superior encontrarás los enlaces directos a las 8 secciones principales:
- **Inicio:** Portada, objetivo general, caso de calibración aplicado y gráfico en vivo.
- **Teoría:** Pestañas interactivas con wizard paso a paso para Bisección, Newton, Comparativa Abiertos vs Cerrados, Ficha de Errores y Raíces de Polinomios. Puedes avanzar con los botones o con las teclas `Flecha Izquierda` y `Flecha Derecha`.
- **Ejemplos:** Trazas manuales completas del caso base y explicación de casos de fallo (derivada nula e intervalos sin cambio de signo).
- **Calculadoras:** Herramienta interactiva para experimentar con ambos métodos numéricos.
- **Comparación:** Gráfico comparativo de convergencia logarítmica y tabla de desempeño.
- **Práctica:** 4 ejercicios aplicados a la vida real con soluciones desplegables y autoevaluación interactiva de 6 preguntas con puntuación y retroalimentación instantánea.
- **Referencias:** Bibliografía y manuales técnicos consultados.
- **Equipo:** Datos de los integrantes y cronograma de rotación de roles.
- **Portal General:** Enlace de retorno al menú principal de ITERA (`../index.html`).

---

## 3. Guía de Uso de las Calculadoras Numéricas

### Paso 1: Seleccionar el Método
En la parte superior de la sección de calculadoras, haz clic en **Bisección (Cerrado)** o **Newton-Raphson (Abierto)**.

### Paso 2: Ingresar los Parámetros
- **Para Bisección:**
  - *Extremo inferior (a):* Límite izquierdo del intervalo (por defecto `1.0`).
  - *Extremo superior (b):* Límite derecho del intervalo (por defecto `2.0`).
  - Debe cumplirse $a < b$ y $f(a) \cdot f(b) < 0$.
- **Para Newton-Raphson:**
  - *Semilla inicial (x₀):* Valor inicial de estimación (por defecto `1.5`).
- **Parámetros Generales:**
  - *Tolerancia:* Precisión deseada (por defecto `0.000001` = $10^{-6}$).
  - *Máx. Iteraciones:* Límite de seguridad de ciclos (por defecto `100`).

### Paso 3: Ejecutar y Restablecer
- Haz clic en **"Ejecutar método"** para calcular la raíz y generar la tabla y gráfica.
- Si deseas volver a los valores predeterminados, haz clic en **"Caso base"**.

### Paso 4: Interpretar Resultados
- **Raíz Aproximada:** Valor numérico calculado formateado a 8 decimales.
- **Estado de Convergencia:** 
  - *Convergió (Verde):* Se alcanzó la tolerancia deseada.
  - *Límite alcanzado (Naranja):* Se agotaron las iteraciones antes de cumplir el criterio.
- **Residuo $|f(x)|$:** Cercanía a cero de la ecuación.
- **Error Final ($E_n$):** Cota teórica de error en Bisección o cambio de paso en Newton.
- **Curva de Convergencia:** Gráfica que muestra el decrecimiento del error en escala logarítmica.

### Paso 5: Exportar Traza a CSV
Haz clic en el botón **"Exportar CSV"** en la cabecera de la tabla de iteraciones para descargar un archivo `.csv` con todas las columnas numéricas para su posterior análisis en Excel, Python u Octave.
