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
  savedNotes.push(writeNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  console.log("Note has been created!");
  res.json(savedNotes);
});

app.delete("/api/notes/:id", (req, res) => {
  const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const noteDelete = req.params.id;

  const deletedNotes = savedNotes.filter((value) => value.id !== noteDelete);
  console.log("Deleting note");

  fs.writeFileSync("./db/db.json", JSON.stringify(deletedNotes));
  res.json(deletedNotes);
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
