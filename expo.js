// expo.js
function exportLogsToCSV() {
  const logs = [
    { user: "Unnita", timestamp: "2025-07-25 14:20", ip: "192.168.1.14" },
    { user: "Deblina", timestamp: "2025-07-25 14:45", ip: "192.168.1.34" },
    { user: "Anuska", timestamp: "2025-07-25 15:05", ip: "192.168.1.54" }
  ];

  const headers = ["User", "Timestamp", "IP"];
  const rows = logs.map(log => [log.user, log.timestamp, log.ip]);

  let csvContent = "data:text/csv;charset=utf-8," 
                 + headers.join(",") + "\n"
                 + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "securebank_logs.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
