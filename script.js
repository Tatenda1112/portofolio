// editorial portfolio — vanilla JS, calm interactions.
(function () {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* sticky nav hairline */
  const nav = document.getElementById("nav");
  const onScroll = () => { if (nav) nav.classList.toggle("stuck", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* reveal on scroll */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => el.classList.add("in"));

  /* live Harare clock with "ahead of you" offset */
  const clockEl = document.getElementById("clock");
  const aheadEl = document.getElementById("ahead");
  if (clockEl) {
    const tick = () => {
      const now = new Date();
      const harare = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Harare" }));
      let h = harare.getHours();
      const m = String(harare.getMinutes()).padStart(2, "0");
      const ap = h >= 12 ? "pm" : "am";
      const h12 = ((h + 11) % 12) + 1;
      const day = harare.toLocaleDateString("en-US", { timeZone: "Africa/Harare", weekday: "long" }).toLowerCase();
      clockEl.textContent = `${h12}:${m} ${ap} · ${day}`;
      if (aheadEl) {
        const diffMin = Math.round((harare - new Date(now.toLocaleString("en-US"))) / 60000);
        const sign = diffMin === 0 ? "" : diffMin > 0 ? "ahead" : "behind";
        const abs = Math.abs(diffMin);
        if (abs >= 30) { const hh = Math.round(abs / 60 * 10) / 10; aheadEl.textContent = `// ${hh}h ${sign}`; }
        else aheadEl.textContent = "";
      }
    };
    tick(); setInterval(tick, 20000);
  }

  /* theme toggle */
  const themeBtn = document.getElementById("themeBtn");
  const root = document.documentElement;
  const applyGlyph = () => { if (themeBtn) themeBtn.textContent = root.getAttribute("data-theme") === "dark" ? "☀" : "☾"; };
  try { const s = localStorage.getItem("theme"); if (s) root.setAttribute("data-theme", s); } catch (e) {}
  applyGlyph();
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (next === "light") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", "dark");
      try { localStorage.setItem("theme", next); } catch (e) {}
      applyGlyph();
    });
  }

  /* count-up numbers */
  const fmt = (n) => n.toLocaleString("en-US");
  function animateCount(el) {
    const target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = fmt(target) + suffix; return; }
    const dur = 1500, start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(Math.round(target * eased)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });
    counters.forEach((c) => cio.observe(c));
  } else counters.forEach(animateCount);

  /* tl;dr toggles */
  document.querySelectorAll(".tldr-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tldr = document.getElementById("tldr-" + btn.dataset.target);
      const full = document.getElementById("full-" + btn.dataset.target);
      if (!tldr || !full) return;
      const showing = tldr.style.display !== "none";
      tldr.style.display = showing ? "none" : "block";
      full.classList.toggle("collapsed", !showing);
      btn.textContent = showing ? "▸ full version" : "▸ tl;dr";
    });
  });

  /* UZ tabbed preview */
  const uzFrame = document.getElementById("uzFrame");
  if (uzFrame) {
    const tabs = document.querySelectorAll(".uz-tabs .uztab");
    const imgs = uzFrame.querySelectorAll("img");
    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        imgs.forEach((img) => img.classList.toggle("active", img.dataset.i === btn.dataset.i));
      });
    });
  }

  /* draggable dashboards gallery */
  const gallery = document.getElementById("gallery");
  if (gallery) {
    let down = false, startX = 0, startScroll = 0, moved = false;
    gallery.addEventListener("pointerdown", (e) => {
      down = true; moved = false; startX = e.clientX; startScroll = gallery.scrollLeft;
      gallery.classList.add("dragging"); gallery.setPointerCapture(e.pointerId);
    });
    gallery.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      gallery.scrollLeft = startScroll - dx;
    });
    const end = () => { down = false; gallery.classList.remove("dragging"); };
    gallery.addEventListener("pointerup", end);
    gallery.addEventListener("pointercancel", end);
    gallery.addEventListener("pointerleave", end);
  }

  /* custom cursor dot */
  const cursorDot = document.getElementById("cursorDot");
  const fineMotion = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
  if (cursorDot && fineMotion) {
    let shown = false;
    window.addEventListener("mousemove", (e) => {
      cursorDot.style.left = e.clientX + "px"; cursorDot.style.top = e.clientY + "px";
      if (!shown) { cursorDot.classList.add("show"); shown = true; }
    });
    document.querySelectorAll("a, button, .shot").forEach((el) => {
      el.addEventListener("mouseenter", () => cursorDot.classList.add("big"));
      el.addEventListener("mouseleave", () => cursorDot.classList.remove("big"));
    });
  }
})();
