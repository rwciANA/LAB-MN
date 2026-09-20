# Nota de transferencia de roles · Cierre semana 3

**De:** bloque semanas 1–3 → **Para:** bloque semanas 4–6 (rotación)
**Preparada por:** A (V) Condori · Versión evaluada: main @ semana 3

## Archivos entregados

| Archivo | Qué contiene |
|---------|--------------|
| `1/index.html` | 7 vistas: inicio, teoría, ejemplos, calculadoras, práctica, referencias, equipo |
| `1/js/app.js` | Bisección y Newton en JS, validaciones, `testFunction()`, CSV |
| `1/scripts/biseccion.py` | Método 1 fuera de la interfaz (ejecutable) |
| `1/scripts/biseccion_reference.oct` | Referencia independiente en Octave |
| `1/docs/ejemplo_manual_biseccion.md` | Cálculo manual + pseudocódigo |
| `1/docs/contraste_numerico.md` | Comparación manual/Python/Octave/web + error vs residuo |
| `1/docs/pruebas_iniciales.md` | T-01 a T-04 con salida observada |

## Decisiones tomadas

1. Criterio de parada de Bisección: |f(c)| ≤ tol **o** (b−a)/2 ≤ tol; al agotar el máximo se reporta "LÍMITE ALCANZADO".
2. Newton valida derivada con umbral 1e-12 y detecta valores no finitos.
3. El portal común (index.html raíz) enlaza al módulo; el módulo enlaza de vuelta ("Portal").
4. El residuo y la cota de error se muestran y explican por separado.

## Pendientes para el nuevo responsable

- Ejecutar el método 2 (Newton) fuera de la interfaz y su propio contraste.
- Completar los 4 ejercicios con soluciones verificadas accesibles (hoy la retroalimentación es breve).
- Construir las 6 preguntas de autoevaluación con clave y tolerancia.
- Matriz de pruebas ampliada a ocho con ambas calculadoras representadas.

## Ejemplo reproducible (el nuevo responsable debe ejecutarlo)

```bash
python 1/scripts/biseccion.py
# Esperado: CASO BASE → CONVERGIO, 20 iteraciones, raíz 1.5213804245
# y T-03/T-04 rechazadas con mensaje de signos opuestos.
```

Abrir `1/index.html`, pulsar "Ejecutar método" con a=1, b=2: la tabla debe coincidir con la salida del script.
