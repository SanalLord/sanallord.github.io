/**
 * Snow Theme (Mouse Controlled Version)
 * Modified by Dods
 */
(function () {

  /* ===== CSS ===== */
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .snowflake {
      position: fixed;
      top: -10px;
      color: white;
      font-size: 1em;
      font-family: Arial, sans-serif;
      cursor: default;
      user-select: none;
      pointer-events: none;
      z-index: 999999;
      text-shadow: none;
      filter: none;
      animation-timing-function: linear;
    }

    @keyframes snowfall {
      from {
        transform: translateY(-10px);
      }
      to {
        transform: translateY(110vh);
      }
    }

    #snow-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 999999;
    }
  `;
  document.head.appendChild(styleSheet);

  /* ===== CONFIG ===== */
  const config = {
    snowflakes: ['❄', '❅', '❆'],
    density: 60,
    interval: 120,
    minSize: 0.7,
    maxSize: 1.4,
    minDuration: 3,
    maxDuration: 7
  };

  /* ===== STATE ===== */
  let wind = 0;
  let lastMouseX = window.innerWidth / 2;

  /* ===== CONTAINER ===== */
  const container = document.createElement("div");
  container.id = "snow-container";
  document.body.appendChild(container);

  /* ===== MOUSE CONTROL ===== */
  document.addEventListener("mousemove", (e) => {
    const delta = e.clientX - lastMouseX;
    wind = Math.max(Math.min(delta * 0.3, 30), -30);
    lastMouseX = e.clientX;
  });

  /* ===== CREATE SNOW ===== */
  function createSnowflake() {
    if (container.children.length >= config.density) return;

    const flake = document.createElement("div");
    flake.className = "snowflake";
    flake.innerHTML = config.snowflakes[Math.floor(Math.random() * config.snowflakes.length)];

    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    let x = Math.random() * window.innerWidth;

    flake.style.left = x + "px";
    flake.style.fontSize = size + "em";
    flake.style.opacity = Math.random() * 0.5 + 0.5;
    flake.style.animation = `snowfall ${duration}s linear`;

    container.appendChild(flake);

    let y = -10;
    const fallSpeed = window.innerHeight / (duration * 60);

    function move() {
      y += fallSpeed;
      x += wind * 0.05;
      flake.style.transform = `translate(${x}px, ${y}px)`;

      if (y < window.innerHeight + 50) {
        requestAnimationFrame(move);
      } else {
        flake.remove();
      }
    }
    requestAnimationFrame(move);
  }

  /* ===== START ===== */
  setInterval(createSnowflake, config.interval);

})();
