# Módulo 1: Ecuaciones No Lineales y Errores (Bisección y Newton-Raphson)

**Curso:** Métodos Numéricos  
**Escuela:** Ingeniería de Sistemas — Universidad Nacional de San Agustín (UNSA)  
**Semestre:** 2026-B  
**Versión:** 1.0.0 (Entrega Final Hito 3)  
**Acceso Web:** [https://rwciana.github.io/LAB-MN/1/](https://rwciana.github.io/LAB-MN/1/)

---

## 1. Equipo de Desarrollo y Asignación de Roles

| Integrante | Código / Letra | Rol Hito 1 (Sem 1-3) | Rol Hito 2 (Sem 4-6) | Rol Hito 3 (Sem 7-12) |
|---|---|---|---|---|
| **Condori Idme Raul Wilfredo** | A | Validación y Coordinación (V) | Matemática y Modelación (M) | Validación y Coordinación (V) |
| **Quispe Rupaylla Fabrizio Alonso** | B | Matemática y Modelación (M) | Diseño Didáctico y Web (D) | Matemática y Modelación (M) |
| **Suarez Huamani Marco Antonio** | C | Diseño Didáctico y Web (D) | Programación Numérica (P) | Diseño Didáctico y Web (D) |
| **Chura Monroy Daniel Wilston** | D | Programación Numérica (P) | Validación y Coordinación (V) | Programación Numérica (P) |

---

## 2. Descripción del Módulo y Caso Aplicado

Este módulo interactivo está diseñado para estudiantes de **Ingeniería de Sistemas** (4.° a 6.° ciclo). Aborda la resolución de ecuaciones no lineales mediante dos paradigmas numéricos:
- **Método Cerrado (Bisección):** Requiere un intervalo $[a, b]$ con cambio de signo ($f(a) \cdot f(b) < 0$). Convergencia lineal garantizada con cota determinista $(b-a)/2^n$.
- **Método Abierto (Newton-Raphson):** Parte de una semilla $x_0$ y utiliza la derivada analítica $f'(x)$. Convergencia cuadrática local cerca de la raíz simple.

### Caso Base / Aplicación a Servidores:
Calibración del parámetro de configuración de un servidor web/cloud. La respuesta normalizada está dada por $g(x) = x^3 - x$. Para alcanzar una respuesta objetivo de $2$ unidades de rendimiento, se debe resolver:
$$ f(x) = x^3 - x - 2 = 0 $$
- **Intervalo inicial:** $[1, 2]$
- **Valor inicial de Newton:** $x_0 = 1.5$
- **Raíz teórica exacta:** $r \approx 1.521379706804...$
- **Tolerancia por defecto:** $\text{tol} = 10^{-6}$

---

## 3. Estructura de Archivos del Módulo

```
1/
├── index.html                  # Aplicación web interactiva SPA (HTML5 semántico)
├── README.md                   # Este documento
├── css/
│   └── styles.css              # Estilos responsivos, accesibilidad, temas y componentes
├── js/
│   └── app.js                  # Algoritmos numéricos, renderizado de gráficos y control
├── docs/                       # Documentación técnica, académica y actas
│   ├── acta_de_roles.md
│   ├── acta_de_aceptacion.md
│   ├── bitacora_validacion_usuarios.md
│   ├── contraste_numerico.md
│   ├── ejemplo_manual_biseccion.md
│   ├── ejemplo_manual_newton.md
│   ├── ejercicios_resueltos.md
│   ├── ficha_del_proyecto.md
│   ├── ficha_de_errores.md
│   ├── informe_hito1.md
│   ├── informe_hito2.md
│   ├── informe_final.md
│   ├── manual_tecnico.md
│   ├── manual_usuario.md
│   ├── nota_transferencia.md
│   ├── presentacion.md
│   ├── pruebas_iniciales.md
│   ├── raices_de_polinomios.md
│   ├── recorrido_del_estudiante.md
│   └── riesgos_iniciales.md
└── scripts/                    # Scripts de referencia independiente (Python y GNU Octave)
    ├── biseccion.py
    ├── biseccion_reference.oct
    ├── newton.py
    └── newton_reference.oct
```

---

## 4. Instrucciones de Ejecución

### A. Ejecución en Navegador (Directo):
Abra `index.html` en cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Edge, Safari). Se requiere conexión a Internet únicamente para las fuentes y librerías CDN (Chart.js y Font Awesome).

### B. Ejecución con Servidor Local:
```bash
# Desde la raíz del repositorio
python -m http.server 8000
# Abrir en el navegador: http://localhost:8000/1/
```

### C. Ejecución de Scripts de Referencia:
```bash
# Validar algoritmo de Bisección
python 1/scripts/biseccion.py

# Validar algoritmo de Newton-Raphson
python 1/scripts/newton.py

# En GNU Octave
octave 1/scripts/biseccion_reference.oct
octave 1/scripts/newton_reference.oct
```
