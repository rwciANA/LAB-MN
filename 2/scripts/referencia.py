"""Referencia independiente del módulo 2 (sin dependencias). Ejecutar: python referencia.py"""


def gauss_pivoteo(A, b):
    n = len(A)
    M = [row[:] + [b[i]] for i, row in enumerate(A)]
    for k in range(n - 1):
        p = max(range(k, n), key=lambda i: abs(M[i][k]))
        M[k], M[p] = M[p], M[k]
        if abs(M[k][k]) < 1e-12:
            raise ValueError("Sistema singular")
        for i in range(k + 1, n):
            f = M[i][k] / M[k][k]
            for j in range(k, n + 1):
                M[i][j] -= f * M[k][j]
    x = [0.0] * n
    for i in reversed(range(n)):
        x[i] = (M[i][n] - sum(M[i][j] * x[j] for j in range(i + 1, n))) / M[i][i]
    return x


def gauss_seidel(A, b, tol=1e-6, max_iter=100):
    n = len(A)
    x = [0.0] * n
    for it in range(1, max_iter + 1):
        for i in range(n):
            s = b[i] - sum(A[i][j] * x[j] for j in range(n) if j != i)
            x[i] = s / A[i][i]
        res = max(abs(b[i] - sum(A[i][j] * x[j] for j in range(n))) for i in range(n))
        if res <= tol:
            return x, it
    return x, None  # sin convergencia dentro del máximo


if __name__ == "__main__":
    A = [[4, 1, 1], [1, 5, 1], [1, 1, 6]]
    b = [9, 14, 21]
    print("Directo:", [round(v, 6) for v in gauss_pivoteo(A, b)])
    x, it = gauss_seidel(A, b)
    print("Gauss-Seidel:", [round(v, 6) for v in x], "iteraciones:", it)
