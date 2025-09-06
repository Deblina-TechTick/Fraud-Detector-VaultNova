const video = document.getElementById('webcam');
const result = document.getElementById('liveness-result');

async function startLivenessDetection() {
  result.innerText = "🔍 Initializing webcam...";
  result.style.color = "#00f0ff";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.play();
    result.innerText = "🎥 Webcam active. Please blink for verification...";

    simulateBlinkDetection(); // Simulated liveness test

  } catch (error) {
    console.error("Webcam error:", error);
    result.innerText = "❌ Camera access denied or not found.";
    result.style.color = "#ff4444";
  }
}

function simulateBlinkDetection() {
  result.style.color = "#00ffff";
  result.innerText = "👁️ Detecting blink...";

  // Simulate detection delay (4 seconds)
  setTimeout(() => {
    const passed = Math.random() > 0.3; // 70% chance of passing
    if (passed) {
      result.innerText = "✅ Liveness Confirmed: Blink Detected";
      result.style.color = "#00ff88";
      playSuccessSound();
    } else {
      result.innerText = "❌ Liveness Failed: No Blink Detected";
      result.style.color = "#ff4444";
      playErrorSound();
    }
  }, 4000);
}

function playSuccessSound() {
  const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');
  audio.play();
}

function playErrorSound() {
  const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
  audio.play();
}
