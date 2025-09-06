function detectSimSwap() {
  const statusBox = document.getElementById('sim-swap-status');
  const alertSound = document.getElementById('alert-sound');
  const successSound = document.getElementById('success-sound');

  statusBox.innerHTML = '⏳ Running AI-based SIM check...';
  statusBox.style.color = '#ffc107';
  statusBox.style.boxShadow = 'none';

  setTimeout(() => {
    const isSwapped = Math.random() < 0.4; // Simulate AI detection

    if (isSwapped) {
      statusBox.innerHTML = '⚠️ Alert: Possible SIM Swap Detected! Please verify your identity.';
      statusBox.style.color = '#ff4b5c';
      statusBox.style.boxShadow = '0 0 15px #ff4b5c';

      alertSound.play();
      sendAlertEmail("SIM Swap detected", "Suspicious SIM change activity found on your account.");
    } else {
      statusBox.innerHTML = '✅ No SIM swap threat detected. Device is secure.';
      statusBox.style.color = '#00ffbf';
      statusBox.style.boxShadow = '0 0 15px #00ffbf';

      successSound.play();
      sendAlertEmail("SIM Check Passed", "Your SIM status is safe and secure.");
    }
  }, 2000);
}

function sendAlertEmail(subject, body) {
  // Simulated email trigger (in real app, you'd use backend like Node.js + nodemailer or SendGrid)
  console.log(`📧 EMAIL SENT — Subject: ${subject} | Body: ${body}`);
  // You can replace this console with an API POST to your server if you connect backend
}
