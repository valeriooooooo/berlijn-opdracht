/* ==========================================================
   Berlins Best! – Computerspielemuseum
   Team: Berlijnse Tovernaars (Valerio & Jop)
   - Slideshow: zelf geprogrammeerd (geen library)
   - Kaart: Google Maps (iframe in de HTML)
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

/* ---------- Header: actieve sectie in het menu ---------- */

function initHeader() {
  const header = document.querySelector(".site-header");
  const links = Array.from(document.querySelectorAll(".page-nav a"));

  // Schaduw onder de header zodra je naar beneden scrolt
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!("IntersectionObserver" in window)) {
    return;
  }

  // Markeer de link van de sectie die nu in beeld is
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      links.forEach(function (link) {
        const active = link.getAttribute("href") === "#" + entry.target.id;
        link.classList.toggle("is-active", active);
        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  links.forEach(function (link) {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) {
      observer.observe(section);
    }
  });
}

/* ---------- Start ---------- */

document.addEventListener("DOMContentLoaded", function () {
  initSlideshow(document.getElementById("slideshow"));
  initHeader();
});
