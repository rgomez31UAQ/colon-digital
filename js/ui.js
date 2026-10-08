/* ============================================================
   COLÓN DIGITAL — ui.js (FASE 4: carga de datos de la feria)
   Carga los JSON de /data/ con fetch y renderiza las páginas.
   Sin frameworks, sin red externa: solo archivos locales.
   PIENSA • VERIFICA • PROTEGE • REPORTA
   ============================================================ */
(function () {
  "use strict";

  var CD = {};

  /* ---------- Helpers básicos ---------- */

  // Escapar HTML: todo dato que viene del JSON pasa por aquí (nunca innerHTML directo con datos crudos).
  CD.esc = function (valor) {
    return String(valor == null ? "" : valor)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  // ¿El campo sigue sin confirmar? (regla del proyecto: nada inventado)
  CD.esPendiente = function (valor) {
    return valor == null || valor === "" || String(valor).trim().toUpperCase() === "PENDIENTE";
  };

  // Chip "POR CONFIRMAR" para campos PENDIENTE
  CD.chipPendiente = function () {
    return '<span class="chip chip-gris">POR CONFIRMAR</span>';
  };

  // Valor escapado o chip si está pendiente
  CD.valor = function (v) {
    return CD.esPendiente(v) ? CD.chipPendiente() : CD.esc(v);
  };

  /* ---------- Carga de JSON ---------- */

  CD.cargarJSON = function (ruta) {
    return fetch(ruta)
      .then(function (resp) {
        if (!resp.ok) {
          throw new Error("HTTP " + resp.status + " al cargar " + ruta);
        }
        return resp.json();
      })
      .catch(function (err) {
        // Aviso claro si abren el archivo directo (file://) o el JSON falla.
        var aviso = '<div class="card card-alerta pendiente">' +
          '<h3>⚠️ No se pudo cargar la información</h3>' +
          '<p>Si abriste esta página como archivo local, ábrela con un servidor de prueba ' +
          '(por ejemplo: <code>python3 -m http.server</code>).</p>' +
          '<p>Detalle técnico: <code>' + CD.esc(err.message) + '</code></p>' +
          '</div>';
        return Promise.reject({ aviso: aviso, error: err });
      });
  };

  /* ---------- Página: eventos (estilo cartelera, agrupado por día) ---------- */
  CD.paginaEventos = function (json) {
    var cont = document.getElementById("lista-eventos");
    if (!cont) return;
    if (!json.eventos || json.eventos.length === 0) {
      cont.innerHTML = '<div class="card pendiente"><h3>🗓️ Sin eventos confirmados aún</h3>' +
        '<p>El programa oficial de la feria aún no está cargado. ' +
        'Cuando el organizador lo confirme, aparecerá aquí.</p></div>';
      return;
    }
    // IDs de nuestros eventos (taller/conferencia) para resaltarlos en verde
    var NUESTROS = { "lun12-taller-seguridad": 1, "lun12-conferencia-digital": 1 };
    // Estelares de la cartelera (fuente: póster oficial)
    var ESTELARES = { "dom11-tigres": 1, "dom11-boys": 1, "lun12-yonics": 1, "mar13-corona": 1,
      "mie13-exterminador": 1, "jue15-alacranes": 1, "vie16-players": 1,
      "sab17-kpop": 1, "sab17-amosnl": 1, "dom18-tucanes": 1 };

    // Agrupar conservando el orden del JSON (ya viene en orden de día)
    var dias = [];
    var porDia = {};
    json.eventos.forEach(function (ev) {
      if (!porDia[ev.fecha]) { porDia[ev.fecha] = []; dias.push(ev.fecha); }
      porDia[ev.fecha].push(ev);
    });

    // Índice rápido de días
    var html = '<nav class="indice-dias" aria-label="Ir a un día">';
    dias.forEach(function (d, i) {
      html += '<a href="#dia-' + i + '">' + CD.esc(d.split(" ")[0]) + '</a>';
    });
    html += '</nav>';

    dias.forEach(function (d, i) {
      var partes = d.split(" ");
      var nDia = partes[1] || d;  // "Lunes 12 de octubre" -> "12"
      html += '<section class="dia-grupo" id="dia-' + i + '" aria-labelledby="dia-t-' + i + '">' +
        '<h2 class="d" id="dia-t-' + i + '">' +
        '<span class="n" aria-hidden="true"><b>' + CD.esc(nDia) + '</b><span>' + CD.esc((partes[0] || "").slice(0,3)) + '</span></span>' +
        '<span>' + CD.esc(d) + '</span></h2>';
      porDia[d].forEach(function (ev) {
        var clase = "postal-evento";
        if (ESTELARES[ev.id]) clase += " estelar";
        if (NUESTROS[ev.id]) clase += " taller-nosotros";
        html += '<article class="' + clase + '">' +
          '<span class="hora">🕒 ' + CD.esc(CD.esPendiente(ev.hora_inicio) ? "?" : ev.hora_inicio) + '</span>' +
          '<div class="info"><strong>' + CD.esc(ev.nombre) + '</strong>' +
          '<span style="font-size:var(--fs-sm); color:var(--c-gris);">📍 ' + CD.valor(ev.lugar) + '</span>' +
          (ev.categoria && !CD.esPendiente(ev.categoria)
            ? ' <span class="chip chip-gris">' + CD.esc(ev.categoria) + '</span>' : '') +
          (ESTELARES[ev.id] ? ' <span class="chip chip-ambar">⭐ ESTELAR</span>' : '') +
          (NUESTROS[ev.id] ? ' <span class="chip chip-verde">🛡️ COLÓN DIGITAL</span>' : '') +
          '</div></article>';
      });
      html += '</section>';
    });
    cont.innerHTML = html;
  };

  /* ---------- Página: horarios ---------- */
  CD.paginaHorarios = function (json) {
    var cont = document.getElementById("tabla-horarios");
    if (!cont) return;
    if (!json.horarios || json.horarios.length === 0) {
      cont.innerHTML = '<div class="card pendiente"><h3>🕒 Sin horarios confirmados aún</h3>' +
        '<p>Los horarios de apertura, cierre y actividades se publican cuando el ' +
        'organizador oficial los confirma.</p></div>';
      return;
    }
    var html = '<table class="tabla"><thead><tr>' +
      '<th scope="col">Día</th><th scope="col">Actividad</th><th scope="col">Horario</th><th scope="col">Lugar</th>' +
      '</tr></thead><tbody>';
    json.horarios.forEach(function (h) {
      html += '<tr><td>' + CD.valor(h.dia) + '</td>' +
        '<td>' + CD.valor(h.actividad) + '</td>' +
        '<td>' + CD.valor(h.apertura) + ' – ' + CD.valor(h.cierre) + '</td>' +
        '<td>' + CD.valor(h.lugar) + '</td></tr>';
    });
    cont.innerHTML = html + '</tbody></table>';
  };

  /* ---------- Página: mapa ---------- */
  CD.paginaMapa = function (json) {
    var cont = document.getElementById("lista-puntos");
    if (!cont) return;
    var croquis = document.getElementById("croquis");
    if (croquis && !CD.esPendiente(json.croquis)) {
      croquis.src = json.croquis;
      croquis.hidden = false;
    }
    if (!json.puntos || json.puntos.length === 0) {
      cont.innerHTML = '<div class="card pendiente"><h3>🗺️ Sin puntos confirmados aún</h3></div>';
      return;
    }
    var html = "";
    json.puntos.forEach(function (p) {
      html += '<div class="card">' +
        '<h3>' + CD.esc(p.icono) + ' ' + CD.esc(p.nombre) + '</h3>' +
        '<p>📍 ' + CD.valor(p.ubicacion) + '</p>' +
        (p.detalle && !CD.esPendiente(p.detalle) ? '<p>' + CD.esc(p.detalle) + '</p>' : '') +
        '</div>';
    });
    cont.innerHTML = html;
  };

  /* ---------- Página: participantes ---------- */
  CD.paginaParticipantes = function (json) {
    var cont = document.getElementById("lista-participantes");
    if (!cont) return;
    if (!json.participantes || json.participantes.length === 0) {
      cont.innerHTML = '<div class="card pendiente"><h3>🛍️ Sin participantes confirmados aún</h3>' +
        '<p>La lista de expositores y participantes se publica cuando el organizador ' +
        'oficial la confirma.</p></div>';
      return;
    }
    var html = "";
    json.participantes.forEach(function (p) {
      var logo = (p.logo && !CD.esPendiente(p.logo))
        ? '<img src="' + CD.esc(p.logo) + '" alt="Logo de ' + CD.esc(p.nombre) + '" width="72" height="72">'
        : "";
      var redes = "";
      if (p.redes) {
        Object.keys(p.redes).forEach(function (red) {
          var url = p.redes[red];
          if (url && !CD.esPendiente(url) && /^https:\/\//i.test(url)) {
            redes += '<a href="' + CD.esc(url) + '" rel="noopener noreferrer">' + CD.esc(red) + '</a> · ';
          }
        });
      }
      if (redes) redes = redes.replace(/ · $/, "");
      html += '<div class="card">' +
        '<div style="display:flex; gap:var(--sp-3); align-items:center;">' + logo +
        '<div><h3 style="margin:0;">' + CD.esc(p.nombre) + '</h3>' +
        (p.categoria && !CD.esPendiente(p.categoria)
          ? '<span class="chip chip-ambar">' + CD.esc(p.categoria) + '</span>' : '') +
        '</div></div>' +
        '<p>' + CD.valor(p.descripcion) + '</p>' +
        '<p>📍 ' + CD.valor(p.ubicacion) + ' &nbsp; 🕒 ' + CD.valor(p.horario) + '</p>' +
        '<p>' + (p.web && !CD.esPendiente(p.web) && /^https:\/\//i.test(p.web)
          ? '<a href="' + CD.esc(p.web) + '" rel="noopener noreferrer">🌐 Sitio web</a> · ' : '') +
        redes + '</p>' +
        '</div>';
    });
    cont.innerHTML = html;
  };

  /* ---------- Arranque por página ---------- */
  var script = document.currentScript;
  if (script && script.dataset.pagina) {
    document.addEventListener("DOMContentLoaded", function () {
      CD.cargarJSON(script.dataset.json).then(function (json) {
        CD["pagina" + script.dataset.pagina.charAt(0).toUpperCase() + script.dataset.pagina.slice(1)](json);
      }).catch(function (e) {
        var zona = document.querySelector("[data-zona-carga]");
        if (zona) zona.innerHTML = e.aviso;
      });
    });
  }

  window.CD = CD;
})();
