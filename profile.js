// Simulated Access Logs
const logs = [
  { user: "Deblina", timestamp: "2025-07-25 14:20", ip: "192.168.1.14" },
  { user: "Sayan", timestamp: "2025-07-25 14:45", ip: "192.168.1.34" },
  { user: "Anuska", timestamp: "2025-07-26 09:00", ip: "172.16.0.1" },       // Suspicious
  { user: "Agniswar", timestamp: "2025-07-26 09:22", ip: "10.0.0.6" },       // Suspicious
  { user: "Chandreyee", timestamp: "2025-07-26 09:55", ip: "192.168.10.12" },
  { user: "Rachita", timestamp: "2025-07-26 09:55", ip: "190.172.11.18" },   // Suspicious
  { user: "Sneha", timestamp: "2025-07-26 09:55", ip: "188.170.0.17" },
  { user: "Agnik", timestamp: "2025-07-26 09:55", ip: "185.168.1.22" }       // Suspicious
];

// Render function
function renderLogs(filteredLogs) {
  const table = document.getElementById("logs-table");
  table.innerHTML = ""; // Clear old content

  filteredLogs.forEach(log => {
    const row = document.createElement("tr");

    // Suspicious IP logic
    const isSuspicious =
      log.ip.startsWith("172.") ||
      log.ip.startsWith("10.") ||
      log.ip.startsWith("190.") ||
      log.ip.startsWith("185.") ||
      log.ip.startsWith("188.");

    row.className = isSuspicious ? "suspicious-ip" : "";

    row.innerHTML = `
      <td>${log.user}</td>
      <td>${log.timestamp}</td>
      <td>${log.ip}</td>
    `;
    table.appendChild(row);
  });
}

// Initial + search logic
window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  renderLogs(logs); // Initial render

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = logs.filter(log =>
      log.user.toLowerCase().includes(query) ||
      log.timestamp.toLowerCase().includes(query) ||
      log.ip.includes(query)
    );
    renderLogs(filtered);
  });
});
