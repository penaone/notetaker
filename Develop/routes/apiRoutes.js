const { json } = require("express");
const fs = require("fs");
// npm id package (uuid) require setup
const {v4: uuidv4} = require('uuid');
//const db = require("..db/db.json")


// get fresh notes each time get request sent
module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    var db= fs.readFile("../db/db.json");
    db= JSON.parse(db)

    res.send(db);
  });
// Set notes routes
  app.post("/api/notes", function (req, res) {
    var newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text
    };
    //read 
    var db= fs.readFile("../db/db.json");
    //parse
   db= JSON.parse(db)
    //push
    db.push(newNote);
    //write
    fs.writeFile("..db/db.json",JSON.stringify(db))
    res.send(newNote);
  });
// delete function

  app.delete("/api/notes/:id", function (req, res) {

    var noteID = req.params.id
    for (var i = 0; i < db.length; i++) {
      if (db[i].id === noteID) {
        let objIndex = db.indexOf(db);
        db.splice(objIndex, 1);
      }
      res.send(db);
    }
  });
};