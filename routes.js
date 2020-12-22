var ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.db("notable")
      .collection("notes")
      .findOne(details, (err, item) => {
        if (err) {
          res.send({ error: "An error has occured" });
        } else {
          res.send(item);
        }
      });
  });

  app.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.db("notable")
      .collection("notes")
      .removeOne(details, (err, item) => {
        if (err) {
          res.send({ error: "An error has occured" });
        } else {
          res.send("Note " + id + " deleted!");
        }
      });
  });

  app.post("/notes", (req, res) => {
    const note = { text: req.body.content, title: req.body.title };
    db.db("notable")
      .collection("notes")
      .insertOne(note, (err, result) => {
        if (err) {
          res.send({ error: "An error has occured" });
        } else {
          res.send(result.ops[0]);
        }
      });
  });

  app.put("/notes/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    const note = { text: req.body.content, title: req.body.title };
    db.db("notable")
      .collection("notes")
      .update(details, note, (err, item) => {
        if (err) {
          res.send({ error: "An error has occured" });
        } else {
          res.send(item);
        }
      });
  });
};
