const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create({ body })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  let tempID = params.id;
  Workout.findByIdAndUpdate(
    tempID,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      Workout.find({})
        .then((data) => {
          let tempDuration = duration(data);
          Workout.update(
            { _id: tempID },
            { $set: { totalDuration: tempDuration } }
          )
            .then((dbWorkout) => {
              res.json(dbWorkout);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
          res.json(dbWorkout);
        })
        .catch((err) => {
          res.status(400).json(err);
        });

      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  ///////////////////////////////////////////////////////////////////////////
  // Workout.findByIdAndUpdate(
  //   params.id,
  //   { $push: { exercises: body } },
  //   { new: true, runValidators: true }
  // )
  //   .then((dbWorkout) => {
  //     res.json(dbWorkout);
  //   })
  //   .catch((err) => {
  //     res.status(400).json(err);
  //   });
  ////////////////////////////////////////////////////////////////////////////////////////////
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({ "exercises.type": "resistance" })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

function duration(data) {
  let durations = 0;
  for (i = 0; i < data[data.length - 1].exercises.length; i++) {
    durations += data[data.length - 1].exercises[i].duration;
  }
  return durations;
}

module.exports = router;
