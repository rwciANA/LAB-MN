/*
 * Renderizador compartido de actividades (ITERA): autoevaluación y ejercicios con solución.
 * Tipos de pregunta: "multiple", "vf" (verdadero/falso) y "numerica" (con tolerancia).
 */

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderQuiz(container, preguntas) {
  container.innerHTML = preguntas.map((p, i) => {
    let entrada = "";
    if (p.tipo === "numerica") {
      entrada = `<label class="inline">Tu respuesta <input type="number" step="any" data-q="${i}" aria-label="Respuesta numérica ${i + 1}"></label>`;
    } else {
      entrada = `<fieldset class="opciones"><legend class="sr-only">Opciones de la pregunta ${i + 1}</legend>` +
        p.opciones.map((o, k) => `<label><input type="radio" name="q${i}" value="${k}"> ${escapeHtml(o)}</label>`).join("") +
        `</fieldset>`;
    }
    return `<article class="q" data-index="${i}">
      <h4>${i + 1}. ${escapeHtml(p.pregunta)}</h4>
      ${entrada}
      <button type="button" class="ghost" data-check="${i}">Comprobar</button>
      <p class="feedback" data-feedback="${i}" aria-live="polite"></p>
    </article>`;
  }).join("") + `<p class="score" id="quizScore" aria-live="polite"></p>`;

  const aciertos = new Set();
  container.querySelectorAll("[data-check]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.check);
      const p = preguntas[i];
      let ok = false;
      let dado = "";
      if (p.tipo === "numerica") {
        const v = Number(container.querySelector(`[data-q="${i}"]`).value);
        dado = container.querySelector(`[data-q="${i}"]`).value;
        ok = dado !== "" && Math.abs(v - p.respuesta) <= p.tol;
      } else {
        const sel = container.querySelector(`input[name="q${i}"]:checked`);
        if (!sel) { setFeedback(container, i, "Elige una opción.", "warn"); return; }
        ok = Number(sel.value) === p.respuesta;
      }
      if (dado === "" && p.tipo === "numerica") { setFeedback(container, i, "Escribe un número.", "warn"); return; }
      if (ok) aciertos.add(i); else aciertos.delete(i);
      setFeedback(container, i, `${ok ? "Correcto." : "Incorrecto."} ${p.explicacion}`, ok ? "ok" : "error");
      container.querySelector("#quizScore").textContent = `Aciertos: ${aciertos.size} de ${preguntas.length}`;
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
