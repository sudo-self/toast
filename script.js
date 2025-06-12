let selectedTheme = "arcade";
let selectedAnimation = "slide";
let toastPosition = "bottom-right";

const themeIcons = {
  arcade: "fa-gamepad",
  professional: "fa-briefcase",
  localtoast: "fa-cube",
  glass: "fa-wine-glass",
  neon: "fa-bolt-lightning",
};

document.querySelectorAll("#theme-buttons .modern-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedTheme = btn.getAttribute("data-theme");
    document
      .querySelectorAll("#theme-buttons .modern-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.querySelectorAll("#animation-buttons .modern-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedAnimation = btn.getAttribute("data-animation");
    document
      .querySelectorAll("#animation-buttons .modern-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.querySelectorAll("#position-buttons .modern-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    toastPosition = btn.getAttribute("data-position");
    document
      .querySelectorAll("#position-buttons .modern-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showToast() {
  const container = document.getElementById("toast-container");

  // 🔥 Read user-defined values
  const userMessage = document.getElementById("toast-message").value;
  const userDuration = parseInt(document.getElementById("toast-duration").value, 10) || 7000;
  const allowHtml = document.getElementById("toast-html").checked;
  const autoClose = document.getElementById("toast-auto-close").checked;

  const wrapper = document.createElement("div");
  wrapper.className = `toast-wrapper ${toastPosition}`;

  const toast = document.createElement("div");
  toast.className = `toast ${selectedTheme}`;

  const icon = document.createElement("i");
  icon.className = `fa-solid ${themeIcons[selectedTheme] || "fa-bread-slice"}`;

  const text = document.createElement("span");
  if (allowHtml) {
    text.innerHTML = userMessage || `This is a <strong>${capitalize(selectedTheme)}</strong> toast in <em>${capitalize(selectedAnimation)}</em> style.`;
  } else {
    text.textContent = userMessage || `This is a ${capitalize(selectedTheme)} toast in ${capitalize(selectedAnimation)} style.`;
  }

  const glow = document.createElement("div");
  glow.className = "toast-glow";

  if (selectedTheme === "neon") {
    glow.style.background =
      "radial-gradient(circle, rgba(210, 180, 140, 0.3), transparent 70%)";
  } else if (selectedTheme === "localtoast") {
    glow.style.background =
      "radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)";
  } else if (selectedTheme === "glass") {
    glow.style.background =
      "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)";
  }

  toast.appendChild(icon);
  toast.appendChild(text);
  toast.appendChild(glow);
  wrapper.appendChild(toast);
  container.appendChild(wrapper);

  const easing =
    selectedAnimation === "bounce"
      ? "cubic-bezier(0.25, 1.5, 0.5, 1)"
      : "ease-out";

  toast.style.animationName =
    selectedTheme === "glass" && selectedAnimation === "zoom"
      ? "zoom-glass"
      : selectedAnimation;

  toast.style.animationDuration = "0.6s";
  toast.style.animationTimingFunction = easing;
  toast.style.animationFillMode = "both";

  if (autoClose) {
    setTimeout(() => wrapper.remove(), userDuration);
  }
}


function exportToast() {
  const iconClass = themeIcons[selectedTheme] || "fa-bread-slice";

  const easing =
    selectedAnimation === "bounce"
      ? "cubic-bezier(0.25, 1.5, 0.5, 1)"
      : "ease-out";

  const animationName =
    selectedTheme === "glass" && selectedAnimation === "zoom"
      ? "zoom-glass"
      : selectedAnimation;

  const glowStyle = (() => {
    if (selectedTheme === "neon")
      return "radial-gradient(circle, rgba(210, 180, 140, 0.3), transparent 70%)";
    if (selectedTheme === "localtoast")
      return "radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)";
    if (selectedTheme === "glass")
      return "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)";
    return "transparent";
  })();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Exported Toast</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;
      background: #121212;
      color: white;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    pre {
      background: #1e1e1e;
      color: #dcdcdc;
      padding: 1rem;
      border-radius: 8px;
      max-width: 90%;
      overflow-x: auto;
      font-size: 0.85rem;
      margin-top: 2rem;
    }

    .toast-wrapper {
      position: fixed;
      z-index: 9999;
      padding: 20px;
    }
    .toast-wrapper.bottom-right {
      bottom: 20px;
      right: 20px;
    }
    .toast-wrapper.center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .toast {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 20px;
      border-radius: 8px;
      background: #222;
      color: white;
      position: relative;
      animation: ${animationName} 0.6s ${easing} both;
    }

    .toast-glow {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: -1;
      border-radius: inherit;
      background: ${glowStyle};
    }

    @keyframes slide {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes bounce {
      0% { transform: scale(0.9); opacity: 0; }
      60% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); }
    }
    @keyframes zoom {
      from { transform: scale(0.5); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes zoom-glass {
      from { transform: scale(0.5); opacity: 0.5; backdrop-filter: blur(4px); }
      to { transform: scale(1); opacity: 1; backdrop-filter: blur(10px); }
    }

    .${selectedTheme} {}
  </style>
</head>
<body>
<model-viewer
  src="https://pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev/toast.glb"
  alt="3D Toast"
  camera-controls
  auto-rotate
  interaction-prompt="click"
  style="width: 250px; height: 250px; cursor: pointer;"
></model-viewer>


  <h1>toasted-notify.vercel.app</h1>

  <pre><code>&lt;div class="toast-wrapper ${toastPosition}"&gt;
  &lt;div class="toast ${selectedTheme}"&gt;
    &lt;i class="fa-solid ${iconClass}"&gt;&lt;/i&gt;
    &lt;span&gt;This is a ${capitalize(selectedTheme)} toast in ${capitalize(selectedAnimation)} style.&lt;/span&gt;
    &lt;div class="toast-glow"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

  <div class="toast-wrapper ${toastPosition}">
    <div class="toast ${selectedTheme}">
      <i class="fa-solid ${iconClass}"></i>
      <span>This is a ${capitalize(selectedTheme)} toast in ${capitalize(selectedAnimation)} style.</span>
      <div class="toast-glow"></div>
    </div>
  </div>
</body>
</html>
`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `toast-${selectedTheme}-${selectedAnimation}.html`;
  a.click();

  URL.revokeObjectURL(url);
}


document.getElementById("export-btn").addEventListener("click", exportToast);

document.addEventListener("DOMContentLoaded", () => {
  const model = document.getElementById("export-model");
  if (model) {
    model.addEventListener("click", exportToast);
  }
});
