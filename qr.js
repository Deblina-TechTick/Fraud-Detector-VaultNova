// qr.js

let generatedToken = "";

function generateQRCode() {
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = ""; // Clear old QR

  const token = Math.random().toString(36).substring(2, 12);
  generatedToken = token;

  const data = JSON.stringify({
    user: "SecureUser",
    timestamp: new Date().toISOString(),
    token: token
  });

  QRCode.toCanvas(document.createElement("canvas"), data, {
    errorCorrectionLevel: 'H',
    width: 250,
    color: {
      dark: "#00ffff",
      light: "#000000"
    }
  }, (err, canvas) => {
    if (err) {
      alert("Error generating QR Code!");
      console.error(err);
      return;
    }
    qrContainer.appendChild(canvas);
  });
}

// Scan QR Code and verify
function startScanner() {
  const scanner = new Html5Qrcode("reader");

  scanner.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 }
    },
    qrCodeMessage => {
      try {
        const parsed = JSON.parse(qrCodeMessage);
        const scannedToken = parsed.token;

        if (scannedToken === generatedToken) {
          document.getElementById("scan-result").textContent = "✅ Authenticated!";
          document.getElementById("scan-result").style.color = "#00ff00";
        } else {
          document.getElementById("scan-result").textContent = "❌ Invalid Token!";
          document.getElementById("scan-result").style.color = "#ff0033";
        }
        scanner.stop(); // Stop after first successful scan
      } catch (e) {
        console.error("Scan Error:", e);
        document.getElementById("scan-result").textContent = "⚠️ Invalid QR Code!";
        document.getElementById("scan-result").style.color = "#ff9900";
      }
    },
    errorMessage => {
      // Optional: log scanning errors
    }
  );
}

// Start scanner after page load
window.onload = startScanner;
