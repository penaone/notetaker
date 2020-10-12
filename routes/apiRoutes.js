const router = require("express").Router();
const util = require("util")
const fs = require("fs");
// npm id package (uuid) require request
const {v4: uuidv4} = require('uuid');

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

function readTheFile(){
  return readFileAsync("db/db.json", "utf8")
}

function writeTheFile(data){
  return writeFileAsync("db/db.json", JSON.stringify(data))
  // writeFileAsync("db/db.json", JSON.stringify(data))
  //   .then(() => console.log("wrote to file"))
  //   .catch(err => console.log(err))
}
// get fresh notes each time get request sent

router.get("/notes", function (req, res) {
  // fs.readFile("db/db.json", "utf8", function(err, log){
  //   if(err){console.log(err)}
  //   var notes = log
  //   console.log(notes)
  //   res.json(notes)
  // })
  readTheFile()
    .then(notes => {
      console.log(notes)
      res.json(notes)
    })
    .catch(err => console.log(err))
  // readTheFile().then(notes => {
  //   var parsedNotes = [].concat(JSON.parse(notes.join("")))
  //   console.log(parsedNotes)    
  //   res.send(parsedNotes);
  // })
});
// Set notes routes
router.post("/notes", function (req, res) {
  var newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  };

  readTheFile()
    .then(notes => {
      console.log(notes)
      notes = JSON.parse(notes)
      notes.push(newNote)
      writeTheFile(notes)
      .then(() =>  res.json(notes))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  // fs.readFile("db/db.json", "utf8", function(err, log){
  //   if(err){console.log(err)}
  //   console.log(log)
  //   var notes = JSON.parse(log)
  //   console.log(notes)
  //   var newNotes = notes.push(newNote)
  //   fs.writeFileSync("db/db.json", JSON.stringify(newNotes), function(err){
  //     if(err){console.log(err)}
  //   })
  //   res.json(newNotes)
  // })
    // var notes = readTheFile()
    // var newNotes = [...notes, newNote]
    // writeTheFile(newNotes)
    // res.send(newNotes);
  
  
  //push
  
  //write
});
// delete function

router.delete("/notes/:id", function (req, res) {
  var notes=readTheFile();
  var noteID = req.params.id //[1,2,3]
  var newNotes = notes.filter(note => note.id !== noteID)
  fs.writeFile("db/db.json",JSON.stringify(newNotes))
  // for (var i = 0; i < db.length; i++) {
  //   if (db[i].id === noteID) {
  //     let objIndex = db.indexOf(db);
  //     db.splice(objIndex, 1);
  //   }
  //   res.send(db);
  // }
});

module.exports = router