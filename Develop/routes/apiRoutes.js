const fs = require("fs");
// npm id package (uuid) require setup
const {v4: uuidv4} = require('uuid');
const db = require("..db/db.json")

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.send(db);
  });
// Set notes routes
  app.post("/api/notes", function (req, res) {
    var newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text
    };
    db.push(newNote);
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