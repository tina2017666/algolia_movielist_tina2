const express = require("express");
//const bodyParser=require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes/api");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  "mongodb://localhost:27017/movie",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// parse the request body
app.use(bodyParser.json());

// initialize the routes
app.use("/api", routes);
// error handling
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// connect to mongoDB

app.listen(port, () => {
  console.log("hello i am listening!");
});
//hahha
