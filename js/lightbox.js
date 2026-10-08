/* ============================================================
   COLÓN DIGITAL — lightbox.js (FASE 17)
   Visor a pantalla completa para imágenes (con carrusel por galería,
   gestos táctiles y teclado) y botón de pantalla completa para videos.
   Sin dependencias, sin captura de datos, sin llamadas de red.
   PIENSA • VERIFICA • PROTEGE • REPORTA
   ============================================================ */
(function () {
  "use strict";

  function alCargar(fn) {
    if (document.readyState !== "loading") { fn(); }
    else { document.addEventListener("DOMContentLoaded", fn); }
  }

  alCargar(function () {
    /* ---------- Videos: pantalla completa nativa ---------- */
    document.querySelectorAll(".video-item video").forEach(function (v) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn-video-full";
      b.setAttribute("aria-label", "Ver el video en pantalla completa");
      b.textContent = "⛶ Pantalla completa";
      b.addEventListener("click", function () {
        if (v.requestFullscreen) {
          v.requestFullscreen().catch(function () {});
        } else if (v.webkitEnterFullscreen) {
          v.webkitEnterFullscreen(); /* iPhone Safari */
        } else if (v.webkitRequestFullscreen) {
          v.webkitRequestFullscreen();
        }
      });
      if (v.parentNode) { v.parentNode.insertBefore(b, v.nextSibling); }
    });

    /* ---------- Recopilar galerías ---------- */
    /* Cada .galeria-grid es una galería; cada .card o .qr-box con imágenes
       propias es una galería de una imagen (para verla a pantalla completa). */
    var galerias = [];
    var marcadas = new Set();

    document.querySelectorAll(".galeria-grid").forEach(function (g) {
      var imgs = [];
      g.querySelectorAll("figure img").forEach(function (img) {
        imgs.push(img); marcadas.add(img);
      });
      if (imgs.length) { galerias.push(imgs); }
    });

    document.querySelectorAll(".card, .qr-box").forEach(function (c) {
      var imgs = [];
      c.querySelectorAll("img").forEach(function (img) {
        if (!marcadas.has(img) && !img.closest(".galeria-grid")) { imgs.push(img); }
      });
      if (imgs.length) { galerias.push(imgs); }
    });

    if (!galerias.length) { return; }

    /* ---------- Visor ---------- */
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Visor de imágenes");
    lb.innerHTML =
      '<button type="button" class="lb-cerrar" aria-label="Cerrar">✕</button>' +
      '<button type="button" class="lb-prev" aria-label="Imagen anterior">‹</button>' +
      '<img class="lb-img" alt="">' +
      '<button type="button" class="lb-next" aria-label="Imagen siguiente">›</button>' +
      '<div class="lb-pie"><span class="lb-cap"></span><span class="lb-num"></span></div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector(".lb-img");
    var lbCap = lb.querySelector(".lb-cap");
    var lbNum = lb.querySelector(".lb-num");
    var lbPrev = lb.querySelector(".lb-prev");
    var lbNext = lb.querySelector(".lb-next");
    var lbCerrar = lb.querySelector(".lb-cerrar");
    var actual = null;   /* galería actual (array de <img>) */
    var indice = 0;
    var enviada = false; /* ¿se agregó estado al historial? */

    function pie(img, i) {
      var fig = img.closest("figure");
      var cap = fig ? fig.querySelector("figcaption") : null;
      lbCap.textContent = cap ? cap.textContent : img.alt;
      lbNum.textContent = galerias.length > 1 && actual.length > 1
        ? (i + 1) + " / " + actual.length : "";
    }

    function mostrar(i) {
      indice = (i + actual.length) % actual.length;
      var img = actual[indice];
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      pie(img, indice);
    }

    function abrir(galeria, img) {
      actual = galeria;
      var multiple = actual.length > 1;
      lbPrev.hidden = !multiple;
      lbNext.hidden = !multiple;
      mostrar(galeria.indexOf(img));
      lb.hidden = false;
      lb.classList.add("abierto");
      document.body.classList.add("lb-abierto");
      lbCerrar.focus();
      if (!enviada) { history.pushState({ lb: 1 }, ""); enviada = true; }
    }

    function cerrar(desdeBoton) {
      lb.classList.remove("abierto");
      lb.hidden = true;
      document.body.classList.remove("lb-abierto");
      lbImg.src = "";
      if (enviada && desdeBoton) { history.back(); }
      enviada = false;
    }

    lbCerrar.addEventListener("click", function () { cerrar(true); });
    lbPrev.addEventListener("click", function () { mostrar(indice - 1); });
    lbNext.addEventListener("click", function () { mostrar(indice + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) { cerrar(true); } });

    window.addEventListener("popstate", function () {
      if (enviada) { enviada = false; cerrar(false); }
    });

    document.addEventListener("keydown", function (e) {
      if (lb.hidden) { return; }
      if (e.key === "Escape") { cerrar(true); }
      else if (e.key === "ArrowLeft") { mostrar(indice - 1); }
      else if (e.key === "ArrowRight") { mostrar(indice + 1); }
    });

    /* Gesto: deslizar para cambiar de imagen */
    var x0 = null;
    lb.addEventListener("touchstart", function (e) {
      x0 = e.touches[0].clientX;
    }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null || actual === null || actual.length < 2) { x0 = null; return; }
      var dx = e.changedTouches[0].clientX - x0;
      if (dx > 45) { mostrar(indice - 1); }
      else if (dx < -45) { mostrar(indice + 1); }
      x0 = null;
    }, { passive: true });

    /* ---------- Activar galerías ---------- */
    galerias.forEach(function (imgs) {
      imgs.forEach(function (img) {
        img.classList.add("zoomable");
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", "Ampliar imagen: " + (img.alt || ""));
        function abrirImg() { abrir(imgs, img); }
        img.addEventListener("click", abrirImg);
        img.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirImg(); }
        });
      });
    });
  });
})();
