const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const LOG_FILE = "./logs/app.log";

app.get("/logs", (req, res) => {
    fs.readFile(LOG_FILE, "utf8", (err, data) => {
        if (err) return res.status(500).send("Error reading logs");

        let status = data.includes("ERROR") ? "Failed ❌" : "Running ✅";

        res.json({
            logs: data,
            status: status
        });
    });
});

app.post("/restart", (req, res) => {
    exec("docker restart myapp_container", (err) => {
        if (err) return res.status(500).send("Restart Failed");
        res.send("Restarted Successfully");
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));