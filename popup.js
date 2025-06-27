document.getElementById("startBtn").addEventListener("click", () => {
  const log = {
    activity: "Work Started",
    timestamp: new Date().toLocaleString()
  };

  fetch("http://localhost:3000/api/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(log)
  }).then(() => {
    alert("Time logged successfully!");
  }).catch((err) => {
    console.error("Error logging time:", err);
    alert("Failed to log time.");
  });
});
