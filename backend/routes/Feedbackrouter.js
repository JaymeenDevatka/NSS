const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/feedback", (req, res) => {
  const { event_name, rating, comments } = req.body;

  if (!event_name || !rating || !comments) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = "INSERT INTO feedback (event_name, rating, comments) VALUES (?, ?, ?)";
  db.query(sql, [event_name, rating, comments], (err, result) => {
    if (err) {
      console.error("Error inserting feedback:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(201).json({ message: "Feedback saved successfully!" });
  });
});

module.exports = router;
