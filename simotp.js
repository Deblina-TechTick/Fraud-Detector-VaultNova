// simotp.js

function detectSIM() {
  const simInfo = {
    operator: "Jio",
    simSlot: "SIM 1",
    isDualSIM: true,
    deviceId: "ABC123XYZ789"
  };

  const resultBox = document.getElementById("sim-result");
  resultBox.innerHTML = `
    <p><strong>Operator:</strong> ${simInfo.operator}</p>
    <p><strong>SIM Slot:</strong> ${simInfo.simSlot}</p>
    <p><strong>Dual SIM:</strong> ${simInfo.isDualSIM ? 'Yes' : 'No'}</p>
    <p><strong>Device ID:</strong> ${simInfo.deviceId}</p>
  `;
}

function verifyOTP() {
  const otp = document.getElementById("otp-input").value;
  const status = document.getElementById("otp-status");

  if (otp === "123456") {
    status.textContent = "✅ OTP Verified Successfully!";
    status.style.color = "#00ff99";
  } else {
    status.textContent = "❌ Invalid OTP. Try again.";
    status.style.color = "#ff4040";
  }
}

function checkLocation() {
  const locationStatus = document.getElementById("location-status");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        locationStatus.innerHTML = `
          <p>Latitude: ${position.coords.latitude.toFixed(4)}</p>
          <p>Longitude: ${position.coords.longitude.toFixed(4)}</p>
        `;
      },
      () => {
        locationStatus.textContent = "⚠️ Location access denied.";
      }
    );
  } else {
    locationStatus.textContent = "❌ Geolocation not supported.";
  }
}
