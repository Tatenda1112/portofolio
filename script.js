// Portfolio interactions — vanilla JS, no frameworks.
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cssVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  /* ---------- scroll progress + sticky header shadow ---------- */
  const progress = document.getElementById("progress");
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = pct + "%";
    if (header) header.classList.toggle("stuck", h.scrollTop > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- count-up numbers ---------- */
  const fmt = (n) => n.toLocaleString("en-US");
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = fmt(target) + suffix; return; }
    const dur = 1400, start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(Math.round(target * eased)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cio.observe(c));
  } else counters.forEach(animateCount);

  /* ---------- ratio bar fills ---------- */
  const ratios = document.querySelectorAll(".ratio");
  if ("IntersectionObserver" in window && ratios.length) {
    const rio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll(".ratio-fill").forEach((f) => {
            const pct = f.dataset.fill || e.target.dataset.fill;
            f.style.width = pct + "%";
          });
          rio.unobserve(e.target);
        });
      },
      { threshold: 0.5 }
    );
    ratios.forEach((r) => rio.observe(r));
  }

  /* ---------- live Harare clock ---------- */
  const clockEl = document.getElementById("clock");
  if (clockEl) {
    const tick = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Harare" }));
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      clockEl.textContent = `Harare · ${h}:${m}`;
    };
    tick();
    setInterval(tick, 15000);
  }

  /* ---------- theme toggle ---------- */
  const themeBtn = document.getElementById("themeBtn");
  const root = document.documentElement;
  try { const s = localStorage.getItem("theme"); if (s) root.setAttribute("data-theme", s); } catch (e) {}
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      if (next === "dark") root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      if (window.__refreshPipelineColors) window.__refreshPipelineColors();
    });
  }

  /* ---------- FMCG tab switcher ---------- */
  const fmcgFrame = document.getElementById("fmcgFrame");
  if (fmcgFrame) {
    const tabs = document.querySelectorAll(".tab-row .tab-btn");
    const imgs = fmcgFrame.querySelectorAll("img");
    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        imgs.forEach((img) => img.classList.toggle("active", img.dataset.i === btn.dataset.img));
      });
    });
  }

  /* ---------- pipeline terminal demo ---------- */
  const runBtn = document.getElementById("runPipelineBtn");
  const terminal = document.getElementById("terminal");
  const terminalBody = document.getElementById("terminalBody");
  if (runBtn && terminal && terminalBody) {
    const lines = [
      `$ <span class="tag">bronze</span>.load_bronze`,
      `&gt;&gt; curated CSVs + LLM extract <span class="ok">loaded</span>`,
      `$ <span class="tag">bronze</span>.add_unreviewed_donations`,
      `&gt;&gt; 18 new rows sorted automatically`,
      `$ <span class="tag">silver</span>.load_silver`,
      `&gt;&gt; clean, standardise, derive <span class="ok">done</span>`,
      `&gt;&gt; <span class="ok">1,102 posts processed</span> · ready for Power BI`,
    ];
    let running = false;
    runBtn.addEventListener("click", () => {
      if (running) return;
      running = true;
      terminal.hidden = false;
      terminalBody.innerHTML = "";
      runBtn.textContent = "▶ Running…";
      lines.forEach((text, i) => {
        setTimeout(() => {
          const div = document.createElement("div");
          div.className = "terminal-line";
          div.innerHTML = text;
          terminalBody.appendChild(div);
          requestAnimationFrame(() => div.classList.add("show"));
          if (i === lines.length - 1) {
            const cursor = document.createElement("span");
            cursor.className = "terminal-cursor";
            div.appendChild(document.createTextNode(" "));
            div.appendChild(cursor);
            runBtn.textContent = "▶ Run it again";
            running = false;
          }
        }, i * 440);
      });
    });
  }

  /* ---------- experience tl;dr toggles ---------- */
  document.querySelectorAll(".tldr-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tldr = document.getElementById(btn.dataset.target);
      const full = document.getElementById(btn.dataset.target.replace("tldr-", "full-"));
      if (!tldr || !full) return;
      const showingTldr = tldr.style.display !== "none";
      tldr.style.display = showingTldr ? "none" : "block";
      full.classList.toggle("collapsed", !showingTldr);
      btn.textContent = showingTldr ? "💬 full version" : "💬 tl;dr";
    });
  });

  /* ---------- custom cursor dot ---------- */
  const cursorDot = document.getElementById("cursorDot");
  const fineMotion = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;
  if (cursorDot && fineMotion) {
    let shown = false;
    window.addEventListener("mousemove", (e) => {
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
      if (!shown) { cursorDot.classList.add("show"); shown = true; }
    });
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => cursorDot.classList.add("big"));
      el.addEventListener("mouseleave", () => cursorDot.classList.remove("big"));
    });
  }

  /* =========================================================
     SIGNATURE: animated medallion data pipeline on canvas
     source → bronze → silver → gold, with packets streaming.
     ========================================================= */
  const canvas = document.getElementById("pipelineCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const STAGES = ["source", "bronze", "silver", "gold"];
    let W = 0, H = 0, dpr = 1;
    let colors = {};
    const mouse = { x: -999, y: -999, inside: false };
    let packets = [];
    let pulses = STAGES.map(() => 0); // glow per stage
    let raf = null, visible = true, lastSpawn = 0;

    function refreshColors() {
      colors = {
        accent: cssVar("--accent") || "#ff6a39",
        accent2: cssVar("--accent-2") || "#ffb039",
        ink: cssVar("--ink") || "#f3efe7",
        dim: cssVar("--ink-faint") || "#6f695d",
        rule: cssVar("--rule") || "#2a2924",
        sunk: cssVar("--bg-sunk") || "#0b0a09",
      };
    }
    window.__refreshPipelineColors = refreshColors;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // stage x positions (with side padding), single vertical centre line
    function stageX(i) {
      const padX = Math.max(60, W * 0.1);
      return padX + (W - padX * 2) * (i / (STAGES.length - 1));
    }
    const trackY = () => H * 0.44;

    function spawnPacket() {
      packets.push({
        p: 0,                       // progress 0..1 across the whole track
        speed: 0.0016 + Math.random() * 0.0014,
        off: (Math.random() - 0.5) * 10, // vertical jitter
        r: 1.8 + Math.random() * 1.6,
        hue: Math.random() < 0.5 ? colors.accent : colors.accent2,
      });
    }

    function draw(ts) {
      ctx.clearRect(0, 0, W, H);
      const ty = trackY();

      // faint dotted grid
      ctx.fillStyle = colors.rule;
      const gap = 22;
      for (let x = (gap / 2); x < W; x += gap) {
        for (let y = (gap / 2); y < H; y += gap) {
          ctx.globalAlpha = 0.25;
          ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // track line
      const x0 = stageX(0), x1 = stageX(STAGES.length - 1);
      ctx.strokeStyle = colors.rule;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x0, ty); ctx.lineTo(x1, ty); ctx.stroke();

      // spawn packets
      const spawnEvery = mouse.inside ? 180 : 320;
      if (!reduceMotion && ts - lastSpawn > spawnEvery && packets.length < 70) {
        spawnPacket(); lastSpawn = ts;
      }

      // update + draw packets
      const span = x1 - x0;
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i];
        pk.p += pk.speed * (mouse.inside ? 1.8 : 1);
        if (pk.p >= 1) { packets.splice(i, 1); continue; }
        let px = x0 + span * pk.p;
        let py = ty + pk.off;
        // gentle cursor nudge
        if (mouse.inside) {
          const dx = px - mouse.x, dy = py - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 3600) {
            const f = (1 - Math.sqrt(d2) / 60) * 10;
            py += (dy / (Math.sqrt(d2) || 1)) * f;
          }
        }
        // trail
        ctx.globalAlpha = mouse.inside ? 0.9 : 0.75;
        ctx.strokeStyle = pk.hue;
        ctx.lineWidth = pk.r;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x0 + span * Math.max(0, pk.p - 0.03), py);
        ctx.stroke();
        // head
        ctx.globalAlpha = 1;
        ctx.fillStyle = pk.hue;
        ctx.beginPath(); ctx.arc(px, py, pk.r, 0, Math.PI * 2); ctx.fill();

        // pulse the stage a packet is passing
        for (let s = 0; s < STAGES.length; s++) {
          if (Math.abs(px - stageX(s)) < 6) pulses[s] = 1;
        }
      }
      ctx.globalAlpha = 1;

      // stage nodes + labels
      ctx.font = "11px 'Space Mono', monospace";
      ctx.textAlign = "center";
      for (let s = 0; s < STAGES.length; s++) {
        const x = stageX(s);
        const glow = pulses[s];
        pulses[s] = Math.max(0, pulses[s] - 0.04);
        const rad = 10 + glow * 5;
        // halo
        if (glow > 0.02) {
          ctx.globalAlpha = glow * 0.5;
          ctx.fillStyle = colors.accent;
          ctx.beginPath(); ctx.arc(x, ty, rad + 8, 0, Math.PI * 2); ctx.fill();
          ctx.globalAlpha = 1;
        }
        // node
        ctx.fillStyle = colors.sunk;
        ctx.strokeStyle = glow > 0.1 ? colors.accent : colors.dim;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, ty, rad, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        // inner dot
        ctx.fillStyle = glow > 0.1 ? colors.accent : colors.dim;
        ctx.beginPath(); ctx.arc(x, ty, 3, 0, Math.PI * 2); ctx.fill();
        // label
        ctx.fillStyle = glow > 0.1 ? colors.ink : colors.dim;
        ctx.fillText(STAGES[s], x, ty + 30);
      }

      if (!reduceMotion && visible) raf = requestAnimationFrame(draw);
    }

    // mouse interaction
    canvas.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.inside = true;
    });
    canvas.addEventListener("mouseleave", () => { mouse.inside = false; mouse.x = -999; mouse.y = -999; });

    // pause when offscreen / tab hidden
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !reduceMotion && !raf) raf = requestAnimationFrame(draw);
      }, { threshold: 0.05 }).observe(canvas);
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
      else if (!reduceMotion && visible && !raf) raf = requestAnimationFrame(draw);
    });

    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });

    refreshColors();
    resize();
    // seed a few packets so it isn't empty on load
    for (let i = 0; i < 14; i++) { spawnPacket(); packets[i].p = Math.random(); }
    if (reduceMotion) draw(0); // one static frame
    else raf = requestAnimationFrame(draw);
  }
})();
