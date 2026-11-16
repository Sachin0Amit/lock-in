/* ==========================================================================
   Aurelia University — Shared Department JavaScript
   Used by every department page and the home page:
   navbar scroll state, hamburger menu, animated stat counters,
   scroll-reveal, auto year, back-to-top.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Navbar: scrolled state ---------------------------------- */
  var navbar = document.querySelector(".navbar");
  var toTop = document.querySelector(".back-to-top");

  function onScroll() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
    if (toTop) toTop.classList.toggle("visible", window.scrollY > 620);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Hamburger menu -------------------------------------------- */
  var hamburger = document.querySelector(".hamburger");
  var navLinks = document.querySelector(".nav-links");

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    if (hamburger) {
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
    if (navbar) navbar.classList.remove("menu-open");
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      hamburger.classList.toggle("active", open);
      if (navbar) navbar.classList.toggle("menu-open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Animated stat counters ------------------------------------ */
  function formatNumber(value, suffix) {
    return Math.round(value).toLocaleString("en-IN") + (suffix || "");
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = formatNumber(target, suffix); return; }
    var duration = 1600;
    var start = null;
    function step(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
      el.textContent = formatNumber(target * eased, suffix);
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll(".stat-number[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(counters, function (el) { counterIO.observe(el); });
  }

  /* ---------- Scroll reveal --------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length && !reduceMotion) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    Array.prototype.forEach.call(revealEls, function (el) { revealIO.observe(el); });
  } else {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add("revealed"); });
  }

  /* ---------- Footer year ------------------------------------------------ */
  var yearEls = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  Array.prototype.forEach.call(yearEls, function (el) { el.textContent = year; });
})();
