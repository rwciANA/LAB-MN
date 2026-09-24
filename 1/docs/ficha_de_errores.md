# Ficha común de errores · Entregable transversal del Tema 1

**Responsable:** bloque M · **Revisores:** los demás temas del portal

Esta ficha define el vocabulario de error que **todos los módulos del portal deben usar** al comparar resultados contra una referencia.

## 1. Las tres magnitudes

| Magnitud | Fórmula | Características |
|----------|---------|-----------------|
| **Error absoluto** | Ea = \|x_verdadero − x_aproximado\| | Mismo idioma/unidades que el dato. Mide distancia. |
| **Error relativo** | Er = Ea / \|x_verdadero\| (×100 para %) | Adimensional. Permite comparar magnitudes distintas. **No definido si la referencia es 0**: usar entonces solo Ea. |
| **Residuo** | \|f(x_aproximado)\| | Mide cuánto falla la **ecuación**, no qué tan lejos está el **punto**. |

### Relación residuo ↔ error

Para una raíz simple: **Ea ≈ \|residuo\| / \|f′(r)\|**.

Caso base: residuo 4.40×10⁻⁶, f′(r) ≈ 5.944 → Ea ≈ 7.4×10⁻⁷ ✓ coincide con la diferencia real a la referencia (7.18×10⁻⁷). Un residuo "pequeño" puede ser un error "grande" si la pendiente es pequeña, y al revés. **Nunca reportar el residuo como si fuera el error.**

## 2. Las tres tolerancias se declaran por separado

1. **Tolerancia de parada** — cuándo el algoritmo se detiene (aquí 10⁻⁶ sobre cota o residuo).
2. **Tolerancia de comparación** — qué diferencia se acepta contra la referencia independiente. Para un escalar: aceptar si |salida − ref| ≤ tol_abs + tol_rel·|ref|. Declarar ambos valores y justificarlos.
3. **Cifras mostradas** — cuántos decimales se pintan (aquí 8). La precisión interna **nunca** se redondea; solo se redondea al presentar.

## 3. Verificación sin valor verdadero conocido

- Comparar contra una **implementación independiente** (Octave/Python fuera de la interfaz).
- Usar **cotas matemáticas** cuando existan: en Bisección, (b−a)/2ⁿ acota el error sin conocer r.
- Contrastar dos métodos entre sí: si coinciden dentro de tolerancia, la confianza sube.

## 4. Reglas del portal

- Registrar la salida **observada**, jamás copiar la esperada como observada.
- Toda tabla de pruebas declara su tolerancia y su referencia con origen.
- Un resultado matemático incorrecto afecta el criterio correspondiente, por buena que sea la presentación.
