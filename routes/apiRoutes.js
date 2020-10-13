const router = require("express").Router();
const util = require("util")
const fs = require("fs");
// npm id package (uuid) require request
const {v4: uuidv4} = require('uuid');

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

function readTheFile(){
  return readFileAsync("db/db.json", "utf-8")
}

function writeTheFile(data){
  return writeFileAsync("db/db.json", JSON.stringify(data))
}
// get fresh notes each time get request sent

router.get("/notes", function (req, res) {
  readTheFile()
    .then(notes => {
      const newNotes = JSON.parse(notes) || []
      res.json(newNotes)
    })
    .catch(err => console.log(err))
});

// Set notes routes
router.post("/notes", function (req, res) {
  var newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  };

  readTheFile()
    .then(notes => {
      notes = JSON.parse(notes)
      notes.push(newNote)
      writeTheFile(notes)
        .then(() =>  res.json(notes))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
});
// delete function

router.delete("/notes/:id", function (req, res) {
  var noteID = req.params.id
  readTheFile()
    .then(notes => {
      const parsedNotes = JSON.parse(notes)
      const newNotes = parsedNotes.filter(note => note.id !== noteID)
      writeTheFile(newNotes)
        .then(() => res.json({ok: true}))
        .catch(err => console.log(err))
    })



  // for (var i = 0; i < db.length; i++) {
  //   if (db[i].id === noteID) {
  //     let objIndex = db.indexOf(db);
  //     db.splice(objIndex, 1);
  //   }
  //   res.send(db);
  // }
});

module.exports = router