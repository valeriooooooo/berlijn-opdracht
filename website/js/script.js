/* ==========================================================
   Berlins Best! – Computerspielemuseum
   Team: Berlijnse Tovernaars (Valerio & Jop)
   - Slideshow: zelf geprogrammeerd (geen library)
   - Kaart: Leaflet + OpenStreetMap
   ========================================================== */

"use strict";

/* ---------- Slideshow ---------- */

function initSlideshow(root) {
  if (!root) {
    return;
  }

  const track = root.querySelector(".slides");
  const slides = Array.from(root.querySelectorAll(".slide"));
  const prevBtn = root.querySelector('[data-action="prev"]');
  const nextBtn = root.querySelector('[data-action="next"]');
  const playBtn = root.querySelector('[data-action="toggle"]');
  const currentEl = root.querySelector("[data-current]");
  const totalEl = root.querySelector("[data-total]");
  const dotsBox = root.querySelector(".slide-dots");
  const viewport = root.querySelector(".slides-viewport");

  const AUTOPLAY_MS = 5000;
  let index = 0;
  let timer = null;
  const dots = [];

  totalEl.textContent = String(slides.length);

  // Maak voor elke foto een bolletje (knop) aan
  slides.forEach(function (slide, i) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", "Foto " + (i + 1) + " van " + slides.length);
    dot.addEventListener("click", function () {
      goTo(i);
      stopAutoplay();
    });
    dotsBox.appendChild(dot);
    dots.push(dot);

    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "dia");
    slide.setAttribute("aria-label", (i + 1) + " van " + slides.length);
  });

  function goTo(newIndex) {
    // Rond af: na de laatste foto weer naar de eerste en andersom
    index = (newIndex + slides.length) % slides.length;
    track.style.transform = "translateX(" + (-index * 100) + "%)";

    slides.forEach(function (slide, i) {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
      // Zorg dat je met Tab niet in verborgen dia's terechtkomt
      slide.querySelectorAll("a, button").forEach(function (el) {
        el.tabIndex = active ? 0 : -1;
      });
    });

    dots.forEach(function (dot, i) {
      dot.setAttribute("aria-current", i === index ? "true" : "false");
    });

    currentEl.textContent = String(index + 1);
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function startAutoplay() {
    if (timer) {
      return;
    }
    timer = window.setInterval(next, AUTOPLAY_MS);
    playBtn.setAttribute("aria-pressed", "true");
    playBtn.setAttribute("aria-label", "Automatisch afspelen stoppen");
    playBtn.innerHTML = "&#10074;&#10074; Stop";
  }

  function stopAutoplay() {
    if (!timer) {
      return;
    }
    window.clearInterval(timer);
    timer = null;
    playBtn.setAttribute("aria-pressed", "false");
    playBtn.setAttribute("aria-label", "Automatisch afspelen starten");
    playBtn.innerHTML = "&#9658; Auto";
  }

  prevBtn.addEventListener("click", function () {
    prev();
    stopAutoplay();
  });

  nextBtn.addEventListener("click", function () {
    next();
    stopAutoplay();
  });

  playBtn.setAttribute("aria-pressed", "false");
  playBtn.addEventListener("click", function () {
    if (timer) {
      stopAutoplay();
    } else {
      next();
      startAutoplay();
    }
  });

  // Pijltjestoetsen als de focus in de slideshow staat
  root.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      prev();
      stopAutoplay();
    } else if (event.key === "ArrowRight") {
      next();
      stopAutoplay();
    }
  });

  // Swipen op een telefoon
  let touchStartX = null;
  viewport.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  viewport.addEventListener("touchend", function (event) {
    if (touchStartX === null) {
      return;
    }
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        next();
      } else {
        prev();
      }
      stopAutoplay();
    }
    touchStartX = null;
  }, { passive: true });

  goTo(0);

  // Alleen automatisch starten als de gebruiker geen "minder beweging" wil
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    startAutoplay();
  }
}

/* ---------- Interactieve kaart ---------- */

function initMap() {
  const mapEl = document.getElementById("kaart");
  const fallback = document.getElementById("kaart-fallback");
  if (!mapEl) {
    return;
  }

  // Als Leaflet niet geladen is (bijv. geen internet), toon dan een link
  if (typeof window.L === "undefined") {
    mapEl.hidden = true;
    fallback.hidden = false;
    return;
  }

  const L = window.L;
  const hotel = [52.5251, 13.3915];
  const museum = [52.5176, 13.4420];

  // Globale route: lopen → S-Bahn → U5 → lopen
  const route = [
    hotel,
    [52.5243, 13.3950],
    [52.5236, 13.3990],
    [52.5232, 13.4012],
    [52.5226, 13.4024], // S Hackescher Markt
    [52.5217, 13.4072],
    [52.5216, 13.4113], // S Alexanderplatz
    [52.5218, 13.4133], // U Alexanderplatz (U5)
    [52.5203, 13.4219], // U Schillingstraße
    [52.5180, 13.4325], // U Strausberger Platz
    [52.5170, 13.4426], // U Weberwiese
    museum
  ];

  const map = L.map(mapEl, {
    scrollWheelZoom: false
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bijdragers'
  }).addTo(map);

  function pin(letter, className) {
    return L.divIcon({
      className: "",
      html: '<span class="map-pin ' + className + '">' + letter + "</span>",
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -16]
    });
  }

  L.marker(hotel, { icon: pin("H", "map-pin-hotel"), title: "Hotel: Generator Berlin Mitte", alt: "Hotel" })
    .addTo(map)
    .bindPopup("<strong>Hotel</strong><br>Generator Berlin Mitte<br>Oranienburger Str. 65");

  L.marker(museum, { icon: pin("M", "map-pin-museum"), title: "Computerspielemuseum", alt: "Museum" })
    .addTo(map)
    .bindPopup("<strong>Computerspielemuseum</strong><br>Karl-Marx-Allee 93a<br>Dagelijks 10:00 – 20:00");

  const line = L.polyline(route, {
    color: "#ff5fae",
    weight: 5,
    opacity: 0.9,
    dashArray: "10 8"
  }).addTo(map);

  map.fitBounds(line.getBounds(), { padding: [30, 30] });

  // Scrollen met het muiswiel pas na klikken, zodat je niet "vast" komt te zitten
  map.on("click", function () {
    map.scrollWheelZoom.enable();
  });
  mapEl.addEventListener("mouseleave", function () {
    map.scrollWheelZoom.disable();
  });
}

/* ---------- Start ---------- */

document.addEventListener("DOMContentLoaded", function () {
  initSlideshow(document.getElementById("slideshow"));
  initMap();
});
