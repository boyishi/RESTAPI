const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();

const port = 8000;
const url = "mongodb+srv://adrian:wordpass@cluster0.x5p4r.mongodb.net/notable?retryWrites=true&w=majority";
app.use(bodyParser.urlencoded({ extended: true })); // middleware

MongoClient.connect(url, (err, db) => {
  if (err) return console.log(err);
  require("./routes")(app, db);
  app.listen(port, () => {
    console.log("We are live on the " + port);
  });
});
