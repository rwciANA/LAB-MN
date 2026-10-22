/*
 * Renderizador compartido de actividades (ITERA): autoevaluación y ejercicios con solución.
 * Tipos de pregunta: "multiple", "vf" (verdadero/falso) y "numerica" (con tolerancia).
 */

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Autoevaluación con explicación completa.
// Cada pregunta puede incluir: tema, tipo ("multiple"|"vf"|"numerica"), pregunta, opciones, respuesta,
// tol, explicacion (por qué es correcta), porQue[] (por qué falla cada opción), comoDeberia,
// pasos[], errores[] y grafico(canvas) que dibuja Chart.js.
// Vuelve a procesar las fórmulas LaTeX del elemento cuando MathJax está cargado.
function typesetear(el) {
  if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([el]).catch(() => {});
}

function renderQuiz(container, preguntas, opciones = {}) {
  container.innerHTML = preguntas.map((p, i) => {
    const entrada = p.tipo === "numerica"
      ? `<label class="inline">Tu respuesta <input type="number" step="any" data-q="${i}" aria-label="Respuesta numérica ${i + 1}"></label>`
      : `<fieldset class="opciones"><legend class="sr-only">Opciones de la pregunta ${i + 1}</legend>` +
        p.opciones.map((o, k) => `<label><input type="radio" name="q${i}" value="${k}"> ${o}</label>`).join("") +
        `</fieldset>`;
    return `<article class="q" data-index="${i}">
      <p class="nivel">${escapeHtml(p.tema || "Pregunta")}</p>
      <h4>${i + 1}. ${p.pregunta}</h4>
      ${entrada}
      <div class="q-actions">
        <button type="button" class="ghost-btn" data-check="${i}">Comprobar</button>
        <button type="button" class="ghost-btn" data-full="${i}">Ver explicación completa</button>
      </div>
      <p class="feedback" data-feedback="${i}" aria-live="polite"></p>
      <div class="explica" data-explica="${i}" hidden></div>
    </article>`;
  }).join("") + `<p class="score" id="quizScore" aria-live="polite"></p>`;

  typesetear(container);
  const puntaje = opciones.puntaje ? document.querySelector(opciones.puntaje) : container.querySelector("#quizScore");
  const aciertos = new Set();
  const graficosHechos = new Set();

  const mostrarExplicacion = (i, motivo = "") => {
    const p = preguntas[i];
    const bloque = container.querySelector(`[data-explica="${i}"]`);
    let html = `<div class="explica-bloque">${motivo}`;
    if (p.tipo !== "numerica" && p.opciones) {
      html += `<h5><i class="fa-solid fa-circle-check"></i> Respuesta correcta: ${p.opciones[p.respuesta]}</h5>`;
    } else {
      html += `<h5><i class="fa-solid fa-circle-check"></i> Respuesta correcta: ${p.respuesta}${p.tol ? ` (tolerancia ±${p.tol})` : ""}</h5>`;
    }
    html += `<h5><i class="fa-solid fa-book-open"></i> ¿Por qué es la respuesta?</h5><p>${p.explicacion}</p>`;
    if (p.pasos) {
      html += `<h5><i class="fa-solid fa-list-ol"></i> Procedimiento paso a paso</h5><ol>${p.pasos.map(s => `<li>${s}</li>`).join("")}</ol>`;
    }
    if (p.opciones && p.porQue) {
      const malas = p.opciones.map((o, k) => (k === p.respuesta ? "" : `<li><strong>${o}:</strong> ${p.porQue[k]}</li>`)).join("");
      html += `<h5><i class="fa-solid fa-circle-xmark"></i> ¿Por qué las demás no?</h5><ul>${malas}</ul>`;
    }
    if (p.errores) {
      html += `<h5><i class="fa-solid fa-triangle-exclamation"></i> Errores frecuentes</h5><ul>${p.errores.map(s => `<li>${s}</li>`).join("")}</ul>`;
    }
    if (p.comoDeberia) {
      html += `<h5><i class="fa-solid fa-lightbulb"></i> ¿Cómo debería ser?</h5><p>${p.comoDeberia}</p>`;
    }
    if (p.grafico) {
      html += `<h5><i class="fa-solid fa-chart-line"></i> Gráfico</h5><div class="chart-box"><canvas id="quiz-g-${i}" aria-label="Gráfico de la pregunta ${i + 1}"></canvas></div>`;
    }
    html += `</div>`;
    bloque.innerHTML = html;
    bloque.hidden = false;
    typesetear(bloque);
    if (p.grafico && !graficosHechos.has(i) && typeof Chart !== "undefined") {
      graficosHechos.add(i);
      p.grafico(bloque.querySelector(`#quiz-g-${i}`));
    }
  };

  container.querySelectorAll("[data-full]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.full);
      const bloque = container.querySelector(`[data-explica="${i}"]`);
      if (!bloque.hidden && bloque.innerHTML) { bloque.hidden = true; btn.textContent = "Ver explicación completa"; return; }
      mostrarExplicacion(i);
      btn.textContent = "Ocultar explicación";
    });
  });

  // Explica por qué la elección del estudiante no es correcta.
  function motivoError(p, i, cont) {
    if (p.tipo === "numerica") {
      const v = Number(cont.querySelector(`[data-q="${i}"]`).value);
      const dif = (v - p.respuesta).toFixed(4);
      return `<div class="motivo-error"><h5><i class="fa-solid fa-circle-xmark"></i> Tu respuesta: ${v} · diferencia con la correcta: ${dif}</h5><p>${p.errorComun || "Revisa cada paso del cálculo: un signo, una división o una resta mal hecha cambia el resultado."}</p></div>`;
    }
    const sel = Number(cont.querySelector(`input[name="q${i}"]:checked`).value);
    const texto = p.opciones[sel];
    const porque = p.porQue && p.porQue[sel] ? p.porQue[sel] : "Esta opción no cumple la propiedad que pide la pregunta; compara con la explicación de abajo.";
    return `<div class="motivo-error"><h5><i class="fa-solid fa-circle-xmark"></i> Elegiste: "${texto}"</h5><p><strong>¿Por qué no es correcta?</strong> ${porque}</p></div>`;
  }

  container.querySelectorAll("[data-check]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.check);
      const p = preguntas[i];
      let ok = false;
      if (p.tipo === "numerica") {
        const campo = container.querySelector(`[data-q="${i}"]`);
        if (campo.value.trim() === "") { setFeedback(container, i, "Escribe un número.", "warn"); return; }
        ok = Math.abs(Number(campo.value) - p.respuesta) <= p.tol;
      } else {
        const sel = container.querySelector(`input[name="q${i}"]:checked`);
        if (!sel) { setFeedback(container, i, "Elige una opción.", "warn"); return; }
        ok = Number(sel.value) === p.respuesta;
      }
      if (ok) aciertos.add(i); else aciertos.delete(i);
      setFeedback(container, i, ok ? "¡Correcto! Revisa abajo por qué." : "Incorrecto. Revisa la explicación para entender el error.", ok ? "ok" : "error");
      let motivo = "";
      if (!ok) motivo = motivoError(p, i, container);
      mostrarExplicacion(i, motivo);
      if (puntaje) puntaje.textContent = `Aciertos: ${aciertos.size} de ${preguntas.length}`;
    });
  });
}

function setFeedback(container, i, text, tipo) {
  const el = container.querySelector(`[data-feedback="${i}"]`);
  el.textContent = text;
  el.className = `feedback ${tipo}`;
}

function renderExercises(container, ejercicios) {
  container.innerHTML = ejercicios.map((e, i) => `
    <article class="ejercicio">
      <p class="nivel">${escapeHtml(e.nivel)}</p>
      <h4>Ejercicio ${i + 1}</h4>
      <p>${e.enunciado}</p>
      <button type="button" class="ghost" data-solve="${i}" aria-expanded="false">Mostrar solución</button>
      <div class="solucion" data-solution="${i}" hidden>${e.solucion}</div>
    </article>`).join("");

  container.querySelectorAll("[data-solve]").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = container.querySelector(`[data-solution="${btn.dataset.solve}"]`);
      panel.hidden = !panel.hidden;
      btn.textContent = panel.hidden ? "Mostrar solución" : "Ocultar solución";
      btn.setAttribute("aria-expanded", String(!panel.hidden));
    });
  });
}

/*
 * Ejercicios con solución paso a paso.
 * lista: ejercicios con { nivel, enunciado, solucion, tipo, datos }.
 * opciones.generar(ej) -> { html, chart? }   chart(canvas) dibuja el gráfico.
 * opciones.resolver(ej)  carga el ejercicio en la calculadora del módulo.
 */
function renderSolvedExercises(container, lista, opciones) {
  container.innerHTML = lista.map((ej, i) => `
    <article class="ejercicio">
      <p class="nivel">${escapeHtml(ej.nivel)}</p>
      <h4>Ejercicio ${i + 1}</h4>
      <p>${ej.enunciado}</p>
      <div class="ej-actions">
        <button type="button" class="ghost-btn" data-solve="${i}" aria-expanded="false"><i class="fa-solid fa-list-check" aria-hidden="true"></i> <span>Ver solución paso a paso</span></button>
        <button type="button" class="ghost-btn" data-load="${i}"><i class="fa-solid fa-calculator" aria-hidden="true"></i> Resolver en la calculadora</button>
      </div>
      <div class="solucion" data-solution="${i}" hidden></div>
    </article>`).join("");

  container.querySelectorAll("[data-solve]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.solve);
      const panel = container.querySelector(`[data-solution="${i}"]`);
      if (!panel.dataset.ready) {
        const ej = lista[i];
        const sol = opciones.generar(ej);
        const graficos = sol.charts || (sol.chart ? [sol.chart] : []);
        panel.innerHTML = `<h4>Solución de referencia</h4>${ej.solucion}${sol.html}` +
          graficos.map((_, k) => `<h4>Gráfico ${k + 1}</h4><div class="chart-box"><canvas id="ej-chart-${i}-${k}" aria-label="Gráfico ${k + 1} del ejercicio ${i + 1}"></canvas></div>`).join("");
        panel.dataset.ready = "1";
        if (typeof Chart !== "undefined") graficos.forEach((dibuja, k) => dibuja(panel.querySelector(`#ej-chart-${i}-${k}`)));
      }
      panel.hidden = !panel.hidden;
      btn.setAttribute("aria-expanded", String(!panel.hidden));
      btn.querySelector("span").textContent = panel.hidden ? "Ver solución paso a paso" : "Ocultar solución";
    });
  });

  container.querySelectorAll("[data-load]").forEach(btn => {
    btn.addEventListener("click", () => opciones.resolver(lista[Number(btn.dataset.load)]));
  });
}
