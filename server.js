const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes:id", (req, res) => {
  const notesSaved = fs.readFileSync("./db/db.json", "utf8");
  res.json(notesSaved(req.params.id));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
