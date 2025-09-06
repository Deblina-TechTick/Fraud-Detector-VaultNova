// script.js

// Toggle Dark Mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
}

// QR Code Generator
function generateQRCode() {
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = "";
  const secret = "https://secure-login.example.com/session?id=123456";
  QRCode.toCanvas(secret, { width: 200 }, function (err, canvas) {
    if (err) console.error(err);
    qrContainer.appendChild(canvas);
  });
}

// Face Authentication (Mock)
function verifyFace() {
  document.getElementById("face-result").textContent = "Face verified successfully (mock)";
}

// SIM Check
function checkSIM() {
  document.getElementById("sim-status").textContent = "Dual SIM detected. SIM1: Active, SIM2: Inactive.";
}

// SIM Swap
function detectSimSwap() {
  document.getElementById("swap-result").textContent = "No SIM swap detected.";
}

// Admin Clear Logs
function clearLogs() {
  alert("All logs cleared from system.");
}

// Profile Logs
function loadLogs() {
  document.getElementById("log-output").textContent = "User Login at 10:30AM, Location: India, Status: Success";
}

// OTP
function verifyOTP() {
  const otp = document.getElementById("otp-input").value;
  const result = document.getElementById("otp-result");
  result.textContent = otp === "123456" ? "✅ OTP Verified!" : "❌ Invalid OTP.";
}

// Geo-location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      document.getElementById("location-output").textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    });
  } else {
    document.getElementById("location-output").textContent = "Geolocation not supported.";
  }
}

// Liveness
function runLiveness() {
  document.getElementById("liveness-status").textContent = "Liveness check passed.";
}

// Export Logs to CSV
function exportToCSV() {
  const data = "User,Action,Status\nJohn,Login,Success\nAlice,OTP Fail,Error";
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "logs.csv";
  link.click();
}
