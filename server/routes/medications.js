import express from "express";
import db from "../database/db.js";

const router = express.Router();

// READ: Get all medications
router.get("/", (req, res) => {
  const sql = "SELECT * FROM medications";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

// CREATE: Add a medication
router.post("/", (req, res) => {
  const { name, dosage, time, category, status } = req.body;

  if (!name || !dosage || !time || !category || !status) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    INSERT INTO medications (name, dosage, time, category, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, dosage, time, category, status], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      name,
      dosage,
      time,
      category,
      status,
    });
  });
});

// UPDATE: Edit a medication
router.put("/:id", (req, res) => {
  const { name, dosage, time, category, status } = req.body;
  const { id } = req.params;

  if (!name || !dosage || !time || !category || !status) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    UPDATE medications
    SET name = ?, dosage = ?, time = ?, category = ?, status = ?
    WHERE id = ?
  `;

  db.run(sql, [name, dosage, time, category, status, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Medication not found." });
    }

    res.json({
      id: Number(id),
      name,
      dosage,
      time,
      category,
      status,
    });
  });
});

// DELETE: Delete a medication
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM medications WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Medication not found." });
    }

    res.json({ message: "Medication deleted successfully." });
  });
});

export default router;