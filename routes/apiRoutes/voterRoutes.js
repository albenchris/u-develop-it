const express = require("express");
const router = express.Router();
const db = require("../../db/database");
const inputCheck = require("../../utils/inputCheck");

// ========== VOTERS START ==========================================================

// GET all voters
router.get("/voters", (req, res) => {
    const sql = `SELECT * FROM voters ORDER BY last_name`;
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

// GET a specific voter
router.get("/voter/:id", (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
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

// CREATE a voter
router.post("/voter", ({ body }, res) => {
    const errors = inputCheck(body, "first_name", "last_name", "email");
    if (errors) {
        res.sendStatus(400).json({ error: errors });
        return;
    }
    
    const sql = `INSERT INTO voters (first_name, last_name, email)
                    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];

    db.run(sql, params, function(err, data) {
        if (err) {
            res.sendStatus(400).json({ error: message });
            return;
        }

        res.json({
            message: "success",
            data: body,
            id: this.lastID
        });
    });
});

// UPDATE a voter


// DELETE a voter


// ========== VOTERS END ============================================================


module.exports = router;