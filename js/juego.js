/* ============================================================
   COLÓN DIGITAL — juego.js (FASE 6: motor común de actividades)
   Estados: INTRO → JUEGO → FEEDBACK → RESULTADO (spec del taller).
   Reglas: sin "reprobado", feedback = la SEÑAL, resultado privado,
   nada se envía, todo corre en el navegador.
   PIENSA • VERIFICA • PROTEGE • REPORTA
   ============================================================ */
(function () {
  "use strict";

  var J = {};

  J.esc = function (v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  // Cargar JSON de un juego
  J.cargar = function (ruta) {
    return fetch(ruta).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status + " en " + ruta);
      return r.json();
    });
  };

  /* ---------- Insignia descargable (FASE 10: gamificación) ---------- */
  // Genera una imagen con canvas: solo el nivel + lema. Cero datos personales.
  J.insignia = function (emoji, nombre) {
    var c = document.createElement("canvas");
    c.width = 800; c.height = 450;
    var ctx = c.getContext("2d");
    // fondo
    ctx.fillStyle = "#0D1B2A";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = "#FFA500";
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, c.width - 40, c.height - 40);
    // emoji del nivel
    ctx.font = "130px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, c.width / 2, 160);
    // nombre del nivel
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 44px system-ui, sans-serif";
    ctx.fillText(nombre, c.width / 2, 290);
    // lema
    ctx.fillStyle = "#5FA8D3";
    ctx.font = "bold 22px system-ui, sans-serif";
    ctx.fillText("PIENSA • VERIFICA • PROTEGE • REPORTA", c.width / 2, 350);
    ctx.fillStyle = "#55606A";
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillText("COLÓN DIGITAL — Taller de Seguridad Digital", c.width / 2, 392);
    return c.toDataURL("image/png");
  };

  /* ---------- Pantallas ---------- */

  J.intro = function (zona, cfg) {
    zona.innerHTML =
      '<div class="card" style="text-align:center;">' +
      '<h3>' + J.esc(cfg.titulo) + '</h3>' +
      '<p>' + J.esc(cfg.proposito) + '</p>' +
      '<p><span class="chip chip-ambar">⏱ ~' + J.esc(cfg.duracion) + '</span> ' +
      '<span class="chip chip-gris">Resultado privado</span></p>' +
      '<button class="btn btn-primary" id="j-comenzar">COMENZAR</button>' +
      '</div>';
    zona.querySelector("#j-comenzar").addEventListener("click", cfg.alComenzar);
  };

  J.resultado = function (zona, res) {
    // res: {puntos, max, nivel:{emoji,nombre,mensaje}, recomendaciones:[{texto,href}]}
    var html = '<div class="card card-ok" style="text-align:center;">' +
      '<p style="font-size:var(--fs-xl); margin:0;">' + J.esc(res.nivel.emoji) + '</p>' +
      '<h3 style="margin:var(--sp-1) 0 0;">' + J.esc(res.nivel.nombre) + '</h3>' +
      (res.max ? '<p style="color:var(--c-gris);">' + res.puntos + ' de ' + res.max + '</p>' : '') +
      '<p>' + J.esc(res.nivel.mensaje) + '</p>';
    if (res.recomendaciones && res.recomendaciones.length) {
      html += '<div style="text-align:left;">';
      res.recomendaciones.forEach(function (r) {
        html += '<p>👉 <a href="' + J.esc(r.href) + '">' + J.esc(r.texto) + '</a></p>';
      });
      html += '</div>';
    }
    if (res.insignia) {
      html += '<p><button class="btn btn-secundario" id="j-insignia">⬇️ Descargar mi insignia</button>' +
        '<span style="display:block; font-size:var(--fs-xs); color:var(--c-gris); margin-top:2px;">' +
        'Imagen sin datos personales: solo tu nivel y el lema.</span></p>';
    }
    html += '<button class="btn btn-secundario" id="j-repetir">↻ Repetir</button>' +
      '<p style="font-size:var(--fs-xs); color:var(--c-gris); margin-top:var(--sp-2);">' +
      'Tu resultado se queda solo en tu celular. No enviamos nada.</p></div>';
    zona.innerHTML = html;
    zona.querySelector("#j-repetir").addEventListener("click", res.alRepetir);
    if (res.insignia) {
      zona.querySelector("#j-insignia").addEventListener("click", function () {
        var a = document.createElement("a");
        a.href = J.insignia(res.insignia.emoji, res.insignia.nombre);
        a.download = "insignia-colon-digital.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
    }
  };

  /* ---------- Runner genérico de rondas ---------- */
  // rondas: [{pregunta, opciones:[{texto, ok, feedback}], info?}]
  // alTerminar(puntos, max)
  J.rondas = function (zona, rondas, alTerminar) {
    var i = 0, puntos = 0;
    function pintar() {
      var r = rondas[i];
      var html = '<div class="card">' +
        '<p style="color:var(--c-gris); font-size:var(--fs-xs); font-weight:700;">PREGUNTA ' + (i + 1) + ' DE ' + rondas.length + '</p>' +
        '<h3>' + J.esc(r.pregunta) + '</h3>';
      if (r.contexto) html += '<div class="card card-alerta" style="margin:var(--sp-2) 0;">' + r.contexto + '</div>';
      html += '<div id="j-ops">';
      r.opciones.forEach(function (op, k) {
        html += '<button class="btn btn-primary" data-k="' + k + '" style="display:block; width:100%; margin:var(--sp-2) 0; text-align:left;">' + J.esc(op.texto) + '</button>';
      });
      html += '</div><div id="j-fb"></div></div>';
      zona.innerHTML = html;
      zona.querySelectorAll("#j-ops button").forEach(function (b) {
        b.addEventListener("click", function () {
          var op = r.opciones[+b.dataset.k];
          if (op.ok) puntos++;
          zona.querySelectorAll("#j-ops button").forEach(function (x) { x.disabled = true; });
          zona.querySelector("#j-fb").innerHTML =
            '<p class="' + (op.ok ? 'card card-ok' : 'card') + '" style="padding:var(--sp-2) var(--sp-3); margin:var(--sp-2) 0;">' +
            J.esc(op.feedback) + '</p>' +
            '<button class="btn btn-primary" id="j-sig">' + (i + 1 < rondas.length ? 'Siguiente →' : 'Ver mi resultado') + '</button>';
          zona.querySelector("#j-sig").addEventListener("click", function () {
            i++;
            if (i < rondas.length) pintar(); else alTerminar(puntos, rondas.length);
          });
        });
      });
    }
    pintar();
  };

  /* ---------- Niveles del Reto Final (spec del taller, literales) ---------- */
  J.nivelReto = function (puntos) {
    if (puntos >= 9) return { emoji: "🏆", nombre: "DEFENSOR DIGITAL",
      mensaje: "Impecable. Ahora enséñale a dos personas más: la defensa de la feria se multiplica." };
    if (puntos >= 7) return { emoji: "🛡️", nombre: "USUARIO PREVENTIVO",
      mensaje: "Muy bien. Revisa las 1–2 preguntas que fueron más duras y cierra esa puerta." };
    if (puntos >= 4) return { emoji: "🟡", nombre: "NECESITAS REFORZAR",
      mensaje: "Buen comienzo. Con las 5 Preguntas de Oro te va a ir mejor: esta es la ruta rápida." };
    return { emoji: "🔴", nombre: "REVISA TU SEGURIDAD",
      mensaje: "Hoy era el día para esto: mejor descubrirlo aquí que con el estafador enfrente." };
  };

  window.Juego = J;
})();
