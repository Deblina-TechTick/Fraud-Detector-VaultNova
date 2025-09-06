// admin.js

document.addEventListener("DOMContentLoaded", () => {
  const logsContainer = document.getElementById("fraud-logs");
  const accessLogContainer = document.getElementById("access-logs");
  const aiCheckBtn = document.getElementById("ai-check-btn");

  const users = {
    1021: "Sayan",
    1022: "Anuska",
    1023: "Deblina",
    1024: "Chandreyee",
    1019: "Unnita",
  };

  const transactions = [
    { userId: 1024, ip: "192.168.1.14", amount: 10000, time: "2025-07-27 10:20", location: "Kolkata" },
    { userId: 1021, ip: "192.168.1.34", amount: 90000, time: "2025-07-27 11:15", location: "Mumbai" },
    { userId: 1022, ip: "192.168.1.78", amount: 1500, time: "2025-07-27 11:45", location: "Kolkata" },
    { userId: 1023, ip: "192.168.1.56", amount: 60000, time: "2025-07-27 12:00", location: "Bangladesh" },
    { userId: 1019, ip: "192.168.1.98", amount: 99999, time: "2025-07-27 12:30", location: "Kolkata" },
    { userId: 0, ip: "10.0.0.1", amount: 500000, time: "2025-07-27 13:00", location: "Unknown" }
  ];

  const accessLogs = [
    { type: "success", userId: 1024, message: "Login success", ip: "192.168.0.10" },
    { type: "error", userId: 1021, message: "OTP failed", ip: "192.168.0.11" },
    { type: "warning", userId: 1019, message: "Suspicious SIM swap detected" },
    { type: "verified", userId: 1022, message: "Verified transaction", ip: "192.168.0.12" }
  ];

  const rules = {
    maxAmount: 50000,
    flaggedIPs: ["192.168.1.56", "10.0.0.1"],
    riskyLocations: ["Bangladesh", "Unknown"]
  };

  function isFraud(txn) {
    return txn.amount > rules.maxAmount || rules.flaggedIPs.includes(txn.ip) || rules.riskyLocations.includes(txn.location);
  }

  function renderTransactionLogs() {
    logsContainer.innerHTML = "";
    transactions.forEach((txn, index) => {
      const fraudStatus = isFraud(txn)
        ? `<span class="fraud">❌ FRAUD</span>`
        : txn.amount > 40000
        ? `<span class="suspicious">⚠️ Suspicious</span>`
        : `<span class="safe">✅ Safe</span>`;

      const userName = users[txn.userId] || "Unknown";

      logsContainer.innerHTML += `
        <div class="log-entry fade-in">
          <div><strong>User:</strong> ${userName} (${txn.userId})</div>
          <div><strong>IP:</strong> ${txn.ip}</div>
          <div><strong>Amount:</strong> ₹${txn.amount}</div>
          <div><strong>Time:</strong> ${txn.time}</div>
          <div><strong>Location:</strong> ${txn.location}</div>
          <div class="status">${fraudStatus}</div>
        </div>
      `;
    });
  }

  function renderAccessLogs() {
    accessLogContainer.innerHTML = "";
    accessLogs.forEach(log => {
      const name = users[log.userId] || "Unknown";
      const icon = {
        success: "🟠",
        error: "❌",
        warning: "⚠️",
        verified: "✅"
      }[log.type];

      const ipPart = log.ip ? ` - IP: ${log.ip}` : "";

      accessLogContainer.innerHTML += `
        <div class="log-entry fade-in">
          ${icon} <strong>${name}</strong> (${log.userId}) - ${log.message}${ipPart}
        </div>
      `;
    });
  }

  aiCheckBtn.addEventListener("click", () => {
    renderTransactionLogs();
    renderAccessLogs();
  });

  // Auto-load once on page load
  renderTransactionLogs();
  renderAccessLogs();
});
