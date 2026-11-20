// A handful of small, tasteful interactions. No frameworks.

/* ---------- reveal on scroll (blur -> focus, see styles.css) ---------- */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

/* ---------- live Harare clock ---------- */
const clockEl = document.getElementById("clock");
if (clockEl) {
  const tick = () => {
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Africa/Harare" })
    );
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    clockEl.textContent = `Harare · ${h}:${m}`;
  };
  tick();
  setInterval(tick, 15000);
}

/* ---------- light / dark toggle ---------- */
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (next === "dark") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

/* ---------- FMCG dashboard tab-switcher ---------- */
const fmcgFrame = document.getElementById("fmcgFrame");
if (fmcgFrame) {
  const tabs = document.querySelectorAll(".tab-row .tab-btn");
  const imgs = fmcgFrame.querySelectorAll("img");
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const i = btn.dataset.img;
      imgs.forEach((img) => img.classList.toggle("active", img.dataset.i === i));
    });
  });
}

/* ---------- "run it" pipeline terminal demo ---------- */
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
      }, i * 450);
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

/* ---------- custom cursor dot (desktop only, respects reduced motion) ---------- */
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
