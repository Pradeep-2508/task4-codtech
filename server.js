const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const logs = [];

// GET logs
app.get("/api/logs", (req, res) => {
  res.json(logs);
});

// POST a new log
app.post("/api/logs", (req, res) => {
  const log = req.body;
  logs.push(log);
  res.status(201).json({ message: "Log saved!" });
});

// ✅ This is the root route for GET /
app.get("/", (req, res) => {
  res.send("✅ Time Tracker Backend Running Successfully!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
