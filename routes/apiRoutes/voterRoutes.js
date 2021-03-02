const express = require("express");
const router = express.Router();
const db = require("../../db/database");
const inputCheck = require("../../utils/inputCheck");

// ========== VOTERS START ==========================================================

router.get("/voters", (req, res) => {
    const sql = `SELECT * FROM voters`;
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

module.exports = router;