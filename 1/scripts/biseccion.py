"""Método 1 (Bisección) implementado fuera de la interfaz - Semana 3.

Ejecuta el caso base, las cuatro pruebas diseñadas y un caso adicional.
Uso: python biseccion.py
"""

def f(x):
    return x ** 3 - x - 2

def biseccion(a, b, tol=1e-6, maxit=100, func=f):
    if func(a) * func(b) >= 0:
        return [], "ERROR: los extremos deben tener signos opuestos"
    rows = []
    for i in range(1, maxit + 1):
        c = (a + b) / 2
        fc = func(c)
        err = abs(b - a) / 2
        rows.append((i, a, b, c, fc, err))
        if abs(fc) <= tol or err <= tol:
            return rows, "CONVERGIO"
        if func(a) * fc < 0:
            b = c
        else:
            a = c
    return rows, "LIMITE ALCANZADO"

def show(rows, head=5):
    print(f"{'i':>3} {'a':>10} {'b':>10} {'c':>12} {'f(c)':>12} {'error':>10}")
    shown = rows if len(rows) <= head + 1 else rows[:head] + [rows[-1]]
    for i, a, b, c, fc, err in shown:
        print(f"{i:>3} {a:>10.6f} {b:>10.6f} {c:>12.8f} {fc:>12.6f} {err:>10.2e}")

def g(x):
    return x ** 3 - x - 3

if __name__ == "__main__":
    print("== CASO BASE: f(x)=x^3-x-2 en [1,2], tol=1e-6 ==")
    rows, estado = biseccion(1, 2)
    show(rows)
    print(f"Estado: {estado} | iteraciones: {len(rows)} | raiz: {rows[-1][3]:.10f} | error: {rows[-1][5]:.2e}")

    print("\n== T-01 (normal, tol=1e-6) ==")
    r1, e1 = biseccion(1, 2, 1e-6)
    print(f"{e1} | {len(r1)} iter | raiz {r1[-1][3]:.10f}")
    print("== T-02 (normal, tol=1e-8) ==")
    r2, e2 = biseccion(1, 2, 1e-8)
    print(f"{e2} | {len(r2)} iter | raiz {r2[-1][3]:.10f}")
    print("== T-03 (frontera, [2,3]) ==")
    r3, e3 = biseccion(2, 3, 1e-6)
    print(f"{e3} | filas: {len(r3)}")
    print("== T-04 (invalida, a=b=1) ==")
    r4, e4 = biseccion(1, 1, 1e-6)
    print(f"{e4} | filas: {len(r4)}")

    print("\n== CASO ADICIONAL (M): f(x)=x^3-x-3 en [1,2], tol=1e-6 ==")
    rows_g, estado_g = biseccion(1, 2, 1e-6, 100, g)
    show(rows_g)
    print(f"Estado: {estado_g} | iteraciones: {len(rows_g)} | raiz: {rows_g[-1][3]:.10f}")
    c = rows_g[-1][3]
    print(f"Residuo |f(c)| = {abs(g(c)):.2e} | cota de error = {rows_g[-1][5]:.2e}")
