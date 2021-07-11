const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes", (req, res) => {
  const notesSaved = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notesSaved[Number(req.params.id)]);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", function (req, res) {
  let savedNotes = JSON.parse(
    fs.readFileSync("./db/db.json", "utf8", () => {
      if (!savedNotes) {
        savedNotes = [];
      }
    })
  );
  let writeNote = req.body;
  writeNote.id = savedNotes.length.toString();

  console.log("Note: ", writeNote);
  savedNotes.push(writeNote);
  console.log(savedNotes);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
