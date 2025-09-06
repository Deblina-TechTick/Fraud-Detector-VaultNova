// Access webcam
const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Camera access error:", err);
    document.getElementById('face-result').innerText = "❌ Unable to access webcam.";
  });

// Fake Face Verification Logic
function verifyFace() {
  const result = document.getElementById("face-result");

  // Simulate verification
  result.innerText = "🔍 Scanning face...";
  result.style.color = "#ffa726";

  setTimeout(() => {
    const verified = Math.random() > 0.4; // Simulate random match
    if (verified) {
      result.innerText = "✅ Face Verified Successfully!";
      result.style.color = "#00e676";
    } else {
      result.innerText = "❌ Face not recognized. Try again.";
      result.style.color = "#ff5252";
    }
  }, 2000);
}
