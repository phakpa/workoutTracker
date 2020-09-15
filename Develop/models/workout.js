const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workOutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },

  exercises: [
    {
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    },
  ],
});

const Workout = mongoose.model("workout", workOutSchema);

module.exports = Workout;

// type: {
//   type: String,
//   trim: false,
//   require: "String is Required",
// },
// name: {
//   type: String,
//   trim: false,
//   require: "String is Required",
// },
// duration: {
//   type: Number,
// },
// weight: {
//   type: Number,
// },
// reps: {
//   type: Number,
// },
// sets: {
//   type: Number,
// },
