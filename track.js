let typingPattern = "";
let lastKeyTime = Date.now();
let mouseMovements = [];

document.getElementById("username").addEventListener("keydown", (e) => {
  const now = Date.now();
  const delay = now - lastKeyTime;
  lastKeyTime = now;
  typingPattern += `${e.key}(${delay}ms), `;
});

document.addEventListener("mousemove", (e) => {
  if (mouseMovements.length > 100) return;
  mouseMovements.push({
    x: e.clientX,
    y: e.clientY,
    time: new Date().toLocaleTimeString()
  });
});

function showBehavior() {
  document.getElementById("typing").innerText = typingPattern;

  const formattedMouse = mouseMovements.map((m, i) => {
    return `${i + 1}. X: ${m.x}, Y: ${m.y} at ${m.time}`;
  }).join("\n");

  document.getElementById("mouse").innerText = formattedMouse;
}
