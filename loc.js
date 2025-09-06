function playSound(success) {
  const sound = document.getElementById(success ? "success-sound" : "error-sound");
  sound.play();
}

function showMap(lat, lon) {
  const map = L.map('map').setView([lat, lon], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([lat, lon]).addTo(map)
    .bindPopup('Your Location')
    .openPopup();
}

function fallbackIPCheck() {
  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      const { latitude, longitude } = data;
      displayResult(latitude, longitude);
    })
    .catch(err => {
      document.getElementById("location-result").innerHTML = "IP Geolocation failed.";
      playSound(false);
    });
}

function checkLocationRules() {
  const resultDiv = document.getElementById("location-result");
  resultDiv.textContent = "Checking location...";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        displayResult(latitude, longitude);
      },
      (error) => {
        resultDiv.innerHTML = `Geolocation error: ${error.message}<br>Using IP fallback...`;
        fallbackIPCheck();
      }
    );
  } else {
    resultDiv.innerHTML = "Geolocation not supported. Using IP fallback...";
    fallbackIPCheck();
  }
}

function displayResult(latitude, longitude) {
  const resultDiv = document.getElementById("location-result");

  const allowedLatRange = [22.50, 22.60];
  const allowedLongRange = [88.30, 88.40];

  let message = `Your location: (${latitude.toFixed(3)}, ${longitude.toFixed(3)})<br>`;

  if (
    latitude >= allowedLatRange[0] && latitude <= allowedLatRange[1] &&
    longitude >= allowedLongRange[0] && longitude <= allowedLongRange[1]
  ) {
    message += `<span style="color:#00ff00;">✅ Access Allowed</span>`;
    playSound(true);
  } else {
    message += `<span style="color:#ff4444;">❌ Access Denied</span>`;
    playSound(false);
  }

  resultDiv.innerHTML = message;
  showMap(latitude, longitude);
}
