# Guion de demostración · Evaluación intermedia 1 (Semana 4)

**Versión evaluada:** tag `E1-semana4` · Turno: 6 min demo + 4 min preguntas individuales + 4 min retroalimentación.

## Demostración (6 min)

| Tiempo | Quién | Qué hace |
|--------|-------|----------|
| 0:00–1:30 | M (Condori) | Presenta la formulación: f(x)=x³−x−2, cambio de signo f(1)=−2/f(2)=4, supuestos (continuidad) y justifica el criterio de parada \|f(c)\|≤10⁻⁶ o (b−a)/2≤10⁻⁶. |
| 1:30–3:30 | P (Quispe) | Ejecuta en vivo: (a) caso base a=1,b=2 → raíz 1.52138042 en 20 iteraciones; (b) entrada inválida a=2,b=3 → mensaje de signos opuestos. Ubica en `app.js` la validación `f(a)*f(b) >= 0` y el umbral de derivada. |
| 3:30–5:00 | D (Suarez) | Conduce el recorrido: Inicio → Teoría → Ejemplos (muestra la tabla paso a paso y la explica) → Práctica. Explica una decisión de organización: por qué Ejemplos va antes de Calculadoras (el estudiante ve el método antes de operarlo). |
| 5:00–6:00 | V (Chura) | Entrega la matriz de pruebas (T-01 a T-04 con salida observada real) y el contraste manual/Python/Octave/web. Anota observaciones con responsable y plazo. |

## Preguntas individuales probables (4 min, una por integrante)

- **A (M):** ¿Por qué Bisección converge garantizado y Newton no? ¿Qué ocurre con una raíz doble?
- **B (P):** ¿Qué pasa si en Newton la derivada es pequeña pero no cero? ¿Qué umbral usan y por qué?
- **C (D):** ¿Cómo verificarías que la página es usable solo con teclado y en móvil?
- **D (V):** ¿Por qué una captura sin datos ni procedimiento no acredita validación? ¿Qué evidencia usarías?

## Checklist previo a la sesión

- [ ] Congelar versión e identificar (tag + VERSION)
- [ ] `python 1/scripts/biseccion.py` funciona en el equipo de demo
- [ ] Copia local del módulo sin depender de internet (Plan B por CDN)
- [ ] Cada integrante explica su parte en 1 minuto sin leer
- [ ] Pruebas T-01 a T-04 con salida observada impresa

## Después de la evaluación (antes de sesión 5)

Registrar en `registro_correcciones_e1.md`: qué se corrigió, qué falta y cómo se verificó. Iniciar el método 2 (Newton fuera de la interfaz y su teoría completa).
