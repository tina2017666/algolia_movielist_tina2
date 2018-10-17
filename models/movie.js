const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is Required"]
  },
  year: {
    type: Number,
    required: [true, "year is Required"]
  },
  image: {
    type: String,
    required: [true, "img is Required"]
  },
  color: {
    type: String,
    required: [true, "color is Required"]
  },
  score: {
    type: Number,
    required: [true, "score is Required"]
  },
  rating: {
    type: Number,
    required: [true, "rating is Required"]
  },
  genre: {
    type: Array,
    required: [true, "genre is Required"]
  }
});

//documents name
const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
