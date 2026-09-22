// ---------- (фон — CSS-аврора, canvas удалён) ----------

// ---------- typing effect ----------
const lines = [
  "pip install telethon && python bot.py",
  "50к сообщений в сутки. Молча.",
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
