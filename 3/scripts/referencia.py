"""Referencia independiente del módulo 3 (sin dependencias). Ejecutar: python referencia.py"""


def lagrange(xs, ys, x):
    if len(set(xs)) != len(xs):
        raise ValueError("Abscisas repetidas")
    total = 0.0
    for i, (xi, yi) in enumerate(zip(xs, ys)):
        L = 1.0
        for j, xj in enumerate(xs):
            if j != i:
                L *= (x - xj) / (xi - xj)
        total += L * yi
    return total


def regresion(xs, ys):
    n = len(xs)
    mx, my = sum(xs) / n, sum(ys) / n
    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    sxx = sum((x - mx) ** 2 for x in xs)
    b = sxy / sxx
    a = my - b * mx
    scr = sum((y - (a + b * x)) ** 2 for x, y in zip(xs, ys))
    return a, b, scr


if __name__ == "__main__":
    xs, ys = [0, 1, 2, 3], [1, 2, 2, 4]
    print("Lagrange(1.5) =", round(lagrange(xs, ys, 1.5), 6))
    a, b, scr = regresion(xs, ys)
    print("Recta: y = %.4f + %.4f x, SCR = %.4f" % (a, b, scr))
