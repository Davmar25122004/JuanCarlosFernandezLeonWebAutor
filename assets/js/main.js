/* ============================================================
   Juan Carlos Fernández León — interacciones del sitio
   ============================================================ */
(function () {
  "use strict";

  /* ---- Tema claro / oscuro (con memoria) ---- */
  var root = document.documentElement;
  var saved = localStorage.getItem("jcfl-theme");
  if (saved) root.setAttribute("data-theme", saved);

  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var now = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", now);
      localStorage.setItem("jcfl-theme", now);
    });
  }

  /* ---- Menú móvil ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---- Animación de aparición al hacer scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Newsletter / contacto: demostración sin backend ---- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector("[data-demo-msg]");
      if (msg) {
        msg.textContent = "¡Gracias! Hemos recibido tus datos (demostración).";
        msg.style.color = "var(--accent)";
      }
      form.reset();
    });
  });

  /* ---- Carrusel de libros (autoavance, bucle continuo sin retroceso) ---- */
  var carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    var track = carousel.querySelector("[data-track]");
    var dotsBox = carousel.querySelector("[data-dots]");
    var realTotal = track ? track.children.length : 0;
    var DELAY = 5000;
    var current = 0;
    var timer = null;
    var dots = [];

    if (realTotal > 1) {
      // clonar el primer libro al final: así siempre avanza hacia adelante
      var clone = track.children[0].cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);

      var setDots = function () {
        var act = current % realTotal;
        for (var j = 0; j < dots.length; j++) dots[j].classList.toggle("active", j === act);
      };
      var render = function (anim) {
        track.style.transition = anim ? "" : "none";
        track.style.transform = "translateX(-" + (current * 100) + "%)";
        setDots();
      };
      var next = function () { current++; render(true); };
      var start = function () { timer = setInterval(next, DELAY); };
      var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
      var restart = function () { stop(); start(); };

      // al terminar la animación sobre el clon, salta al original sin transición
      track.addEventListener("transitionend", function () {
        if (current >= realTotal) {
          current = 0;
          render(false);
          void track.offsetWidth; // fuerza reflujo para "anclar" la posición
          track.style.transition = "";
        }
      });

      // puntos de navegación
      for (var i = 0; i < realTotal; i++) {
        var d = document.createElement("button");
        d.setAttribute("aria-label", "Ir al libro " + (i + 1));
        (function (idx) { d.addEventListener("click", function () { current = idx; render(true); restart(); }); })(i);
        dotsBox.appendChild(d);
        dots.push(d);
      }

      // pausa al pasar el ratón
      carousel.addEventListener("mouseenter", stop);
      carousel.addEventListener("mouseleave", start);

      render(false);
      start();
    }
  }

  /* ---- Año dinámico en el footer ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
