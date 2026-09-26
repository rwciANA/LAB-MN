"""Método 2 (Newton-Raphson) implementado fuera de la interfaz - Referencia Python.

Resuelve f(x) = x^3 - x - 2 = 0 mediante iteración de punto fijo tangente.
Incluye validación de derivada nula, cálculo de errores y salidas tabuladas.
Uso: python newton.py
"""

import math

def f(x):
    """Función objetivo del caso base: calibración de servidor."""
    return x**3 - x - 2.0

def df(x):
    """Derivada analítica de la función objetivo: f'(x) = 3x^2 - 1."""
    return 3.0 * (x**2) - 1.0

def newton_raphson(x0, tol=1e-6, maxit=100, func=f, dfunc=df):
    """Ejecuta el método de Newton-Raphson.

    Retorna:
        rows: Lista de tuplas (iter, x_n, f(x_n), f'(x_n), x_next, error)
        estado: 'CONVERGIO' | 'DERIVADA NULA' | 'LIMITE ALCANZADO'
    """
    rows = []
    x = float(x0)
    for i in range(1, maxit + 1):
        fx = func(x)
        dfx = dfunc(x)
        
        if abs(dfx) < 1e-12:
            return rows, "ERROR: La derivada se anuló o es menor a 1e-12"
            
        x_next = x - (fx / dfx)
        err = abs(x_next - x)
        
        rows.append((i, x, fx, dfx, x_next, err))
        
        # Criterio de parada dual: residuo pequeño o cambio de paso pequeño
        if abs(func(x_next)) <= tol or err <= tol:
            return rows, "CONVERGIO"
            
        x = x_next
        
    return rows, "LIMITE ALCANZADO"

def show_table(rows):
    """Muestra la tabla formateada de iteraciones."""
    print(f"{'i':>3} {'x_n':>14} {'f(x_n)':>14} {'f\'(x_n)':>14} {'x_{n+1}':>14} {'Error':>12}")
    print("-" * 75)
    for r in rows:
        print(f"{r[0]:>3} {r[1]:>14.8f} {r[2]:>14.6e} {r[3]:>14.6f} {r[4]:>14.8f} {r[5]:>12.4e}")

if __name__ == "__main__":
    print("==================================================================")
    print("  CASO BASE: Newton-Raphson f(x)=x^3-x-2, x0=1.5, tol=1e-6")
    print("==================================================================")
    rows, estado = newton_raphson(1.5, tol=1e-6)
    show_table(rows)
    last = rows[-1]
    print(f"\nEstado: {estado}")
    print(f"Raíz obtenida: {last[4]:.10f}")
    print(f"Residuo |f(r)|: {abs(f(last[4])):.4e}")
    print(f"Iteraciones totales: {len(rows)}")

    print("\n==================================================================")
    print("  CASO DE FALLO: Derivada nula con f(x)=x^3-1, x0=0")
    print("==================================================================")
    f_fallo = lambda x: x**3 - 1.0
    df_fallo = lambda x: 3.0 * x**2
    rows_f, estado_f = newton_raphson(0.0, tol=1e-6, func=f_fallo, dfunc=df_fallo)
    print(f"Estado observado: {estado_f}")
    print(f"Iteraciones ejecutadas: {len(rows_f)}")
