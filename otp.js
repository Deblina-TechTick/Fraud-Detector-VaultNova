// Save this as js/otp.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("otp-form");
  const otpSection = document.getElementById("otp-section");
  const otpInput = document.getElementById("otp");
  const verifyBtn = document.getElementById("verify-btn");
  const message = document.getElementById("otp-message");

  let generatedOTP = "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const mobile = document.getElementById("mobile").value.trim();
    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", generatedOTP); // In real app, send via SMS API
    otpSection.style.display = "block";
    message.textContent = "OTP sent successfully!";
    message.style.color = "#0f0";
  });

  verifyBtn.addEventListener("click", () => {
    if (otpInput.value === generatedOTP) {
      message.textContent = "✅ OTP Verified Successfully!";
      message.style.color = "#00ff00";
    } else {
      message.textContent = "❌ Incorrect OTP. Try again.";
      message.style.color = "red";
    }
  });
});
