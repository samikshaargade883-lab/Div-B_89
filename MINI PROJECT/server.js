
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const Student = mongoose.model("Student", new mongoose.Schema({
    name: String,
    roll: { type: String, unique: true },
    branch: String,
    exam: String,
    date: String,
    hall: { type: String, default: "A101" },
    seat: Number
}));

app.post("/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({
            message: "Student registered successfully!",
            student
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get("/students", async (req, res) => {
    res.json(await Student.find());
});

app.get("/students/:roll", async (req, res) => {
    const student = await Student.findOne({ roll: req.params.roll });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
});

app.delete("/students/:roll", async (req, res) => {
    const student = await Student.findOneAndDelete({ roll: req.params.roll });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully!" });
});

app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/arrangement.html", (req, res) =>
    res.sendFile(path.join(__dirname, "arrangement.html"))
);

app.get("/register.html", (req, res) =>
    res.sendFile(path.join(__dirname, "register.html"))
);

mongoose.connect("mongodb://127.0.0.1:27017/studentExamDB")
    .then(() => {
        console.log("MongoDB connected");
        app.listen(5000, () =>
            console.log("Server running at http://localhost:5000")
        );
    })
    .catch(err => console.log("MongoDB error:", err.message));
