<script>
(function () {

  /* ===== STYLE (PARLAMA YOK) ===== */
  const style = document.createElement("style");
  style.textContent = `
    .snowflake {
      position: fixed;
      top: -30px;
      left: 0;
      color: #fff;
      font-family: Arial, sans-serif;
      user-select: none;
      pointer-events: none;
      z-index: 999999;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  /* ===== AYARLAR ===== */
  const MAX_FLAKES = 150;      // aynı anda max kar
  const SPAWN_RATE = 40;      // küçült = daha hızlı yağış
  const MIN_SPEED = 4;        // düşme hızı
  const MAX_SPEED = 8;

  const flakes = [];
  let wind = 0;
  let lastX = window.innerWidth / 2;

  /* ===== MOUSE (BARİZ ETKİ) ===== */
  document.addEventListener("mousemove", e => {
    const diff = e.clientX - lastX;
    wind = Math.max(Math.min(diff * 0.25, 12), -12); // ← ETKİYİ ARTIRDIK
    lastX = e.clientX;
  });

  /* ===== KAR OLUŞTUR ===== */
  function spawnFlake() {
    if (flakes.length >= MAX_FLAKES) return;

    const el = document.createElement("div");
    el.className = "snowflake";
    el.textContent = ["❄","❅","❆"][Math.floor(Math.random()*3)];

    const size = Math.random() * 12 + 10;
    const x = Math.random() * window.innerWidth;
    const speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;

    el.style.fontSize = size + "px";
    el.style.transform = `translate(${x}px, -30px)`;
    el.style.opacity = Math.random() * 0.5 + 0.5;

    document.body.appendChild(el);

    flakes.push({
      el,
      x,
      y: -30,
      speed
    });
  }

  /* ===== ANA LOOP ===== */
  function update() {
    for (let i = flakes.length - 1; i >= 0; i--) {
      const f = flakes[i];
      f.y += f.speed;
      f.x += wind;

      f.el.style.transform = `translate(${f.x}px, ${f.y}px)`;

      // ⬇️ EN ALT KENARA KADAR
      if (f.y > window.innerHeight + 50) {
        f.el.remove();
        flakes.splice(i, 1);
      }
    }
    requestAnimationFrame(update);
  }

  /* ===== START ===== */
  setInterval(spawnFlake, SPAWN_RATE);
  update();

})();
</script>
