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

/* ---------- Live: is het museum nu open? (Berlijnse tijd) ---------- */

function initOpenStatus() {
  const status = document.getElementById("status");
  if (!status || !window.Intl) {
    return;
  }
  const text = status.querySelector(".status-text");

  // Openingstijden van het museum (in uren), met de uitzonderingen van de officiële site
  function hoursFor(day, month) {
    if (day === 24 && month === 12) {
      return { open: 10, close: 15 };
    }
    if (day === 1 && month === 1) {
      return { open: 12, close: 20 };
    }
    return { open: 10, close: 20 };
  }

  function berlinNow() {
    const parts = new Intl.DateTimeFormat("nl-NL", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "numeric",
      hourCycle: "h23"
    }).formatToParts(new Date());
    const get = function (type) {
      const part = parts.find(function (p) { return p.type === type; });
      return part ? Number(part.value) : 0;
    };
    return { hour: get("hour"), minute: get("minute"), day: get("day"), month: get("month") };
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function update() {
    const now = berlinNow();
    const today = hoursFor(now.day, now.month);
    const minutes = now.hour * 60 + now.minute;
    const isOpen = minutes >= today.open * 60 && minutes < today.close * 60;
    const clock = pad(now.hour) + ":" + pad(now.minute);

    let message;
    if (isOpen) {
      message = "Nu open · sluit om " + pad(today.close) + ":00";
    } else if (minutes < today.open * 60) {
      message = "Nu gesloten · opent vandaag om " + pad(today.open) + ":00";
    } else {
      const tomorrowOpen = (now.day === 31 && now.month === 12) ? 12 : 10;
      message = "Nu gesloten · opent morgen om " + pad(tomorrowOpen) + ":00";
    }

    text.textContent = message + " (Berlijn " + clock + ")";
    status.classList.toggle("is-open", isOpen);
    status.classList.toggle("is-closed", !isOpen);
  }

  update();
  window.setInterval(update, 30000);
}

/* ---------- Start ---------- */

document.addEventListener("DOMContentLoaded", function () {
  initSlideshow(document.getElementById("slideshow"));
  initHeader();
  initOpenStatus();
});
