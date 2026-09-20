// ---------- animated grid background ----------
const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");
let W, H, pts;

function resize() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  pts = Array.from({ length: Math.min(90, W / 16) }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
  }));
}
addEventListener("resize", resize);
resize();

(function draw() {
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(0,120,200,0.10)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 56) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 56) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  for (const p of pts) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.fillStyle = "rgba(0,212,255,0.7)";
    ctx.fillRect(p.x, p.y, 2, 2);
  }
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 130) {
        ctx.strokeStyle = `rgba(0,150,255,${(1 - d / 130) * 0.25})`;
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
})();

// ---------- typing effect ----------
const lines = [
  "pip install telethon && python bot.py",
  "бот отвечает за 0.2 сек…",
  "деплой на VPS — done ✓",
];
const typedEl = document.getElementById("typed");
let li = 0, ci = 0, del = false;
(function type() {
  const line = lines[li];
  typedEl.textContent = line.slice(0, ci);
  if (!del && ci++ === line.length) { del = true; return setTimeout(type, 1600); }
  if (del && ci-- === 0) { del = false; li = (li + 1) % lines.length; }
  setTimeout(type, del ? 28 : 55);
})();

// ---------- animated counters ----------
const counters = document.querySelectorAll("[data-count]");
const cObs = new IntersectionObserver((es) => {
  es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count;
    let cur = 0;
    const step = () => {
      cur += Math.max(1, Math.round(target / 40));
      if (cur >= target) { el.textContent = target; return; }
      el.textContent = cur;
      requestAnimationFrame(step);
    };
    step();
    cObs.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach((el) => cObs.observe(el));

// ---------- scroll reveal ----------
const rObs = new IntersectionObserver((es) => {
  es.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => rObs.observe(el));

// ---------- 3d tilt cards ----------
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

// ---------- cursor glow + scroll progress ----------
const glow = document.getElementById("glow");
addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
const progress = document.getElementById("progress");
addEventListener("scroll", () => {
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
}, { passive: true });


// ---------- (форма заменена TG-карточкой, обработчик не нужен) ----------
