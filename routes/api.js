const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

//get all the movies
router.get("/1/movies", (req, res) => {
  console.log(req.url);
  Movie.find({}).then(data => {
    console.log(data);
    //since it's 倒序 stored
    //res.json(data.slice(0).reverse());
    res.json(data);
  });
});

// insert an new movie
router.post("/1/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(data => {
      // name = data.manager;
      // id = data._id;
      res.json(data);
    })
    .catch(next);
});

//delete
router.delete("/1/movies/:id", (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndRemove({ _id: id }).then(user => {
    // user 是操作的specific的数据
    res.send(user);
  });
});

module.exports = router;
