<script>
(function () {

  /* ===== CSS (PARLAMA YOK) ===== */
  const style = document.createElement("style");
  style.textContent = `
    .snowflake {
      position: fixed;
      top: -20px;
      color: #fff;
      font-family: Arial, sans-serif;
      user-select: none;
      pointer-events: none;
      z-index: 999999;
    }
  `;
  document.head.appendChild(style);

  /* ===== CONFIG ===== */
  const config = {
    chars: ['❄', '❅', '❆'],
    maxFlakes: 120,
    spawnInterval: 60,     // küçült = daha hızlı
    minSize: 10,
    maxSize: 20,
    minSpeed: 2.5,        // GERÇEK HIZ
    maxSpeed: 5.5
  };

  const flakes = [];
  let wind = 0;
  let lastMouseX = window.innerWidth / 2;

  /* ===== CONTAINER ===== */
  const container = document.createElement("div");
  document.body.appendChild(container);

  /* ===== MOUSE CONTROL (GERÇEK) ===== */
  document.addEventListener("mousemove", (e) => {
    const delta = e.clientX - lastMouseX;
    wind = Math.max(Math.min(delta * 0.15, 6), -6);
    lastMouseX = e.clientX;
  });

  /* ===== CREATE FLAKE ===== */
  function createFlake() {
    if (flakes.length >= config.maxFlakes) return;

    const el = document.createElement("div");
    el.className = "snowflake";
    el.textContent = config.chars[Math.floor(Math.random() * config.chars.length)];

    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const x = Math.random() * window.innerWidth;
    const speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;

    el.style.left = x + "px";
    el.style.fontSize = size + "px";
    el.style.opacity = Math.random() * 0.5 + 0.5;

    container.appendChild(el);

    flakes.push({
      el,
      x,
      y: -20,
      speed
    });
  }

  /* ===== UPDATE LOOP ===== */
  function update() {
    for (let i = flakes.length - 1; i >= 0; i--) {
      const f = flakes[i];
      f.y += f.speed;
      f.x += wind;

      f.el.style.top = f.y + "px";
      f.el.style.left = f.x + "px";

      // ✔️ EN ALT KENARA KADAR DÜŞER
      if (f.y > window.innerHeight + 40) {
        f.el.remove();
        flakes.splice(i, 1);
      }
    }
    requestAnimationFrame(update);
  }

  /* ===== START ===== */
  setInterval(createFlake, config.spawnInterval);
  update();

})();
</script>
