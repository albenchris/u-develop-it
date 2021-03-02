const express = require("express");
const router = express.Router();
const db = require("../../db/database");

// ============ PARTIES START =================================================================

// GET all parties
router.get("/parties", (req, res) => {
    const sql = `SELECT * FROM parties`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.sendStatus(500).json({ error: err.message });
            return;
        }

        res.json({
            message: "success",
            data: rows
        });
    });
});

// GET single party
router.get("/party/:id", (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.sendStatus(400).json({ error: err.message });
            return;
        }

        res.json({
            message: "success",
            data: row
        });
    });
});

// DELETE single party
router.delete("/party/:id", (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
        if (err) {
            res.sendStatus(400).json({ error: res.message });
            return;
        }

        res.json({
            message: "successfully deleted",
            changes: this.changes
        });
    });
});
// ============ PARTIES END ===================================================================

module.exports = router;