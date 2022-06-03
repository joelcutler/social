const { Thought } = require("../models");
const router = require("express").Router();

// create new thought
router.post("/create", ({ body }, res) => {
  Thought.create(body)
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(400).json(err));
});

// get all thoughts
router.get("/all", (req, res) => {
  Thought.find({})
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get one thought by id
router.get("/:id", ({ params }, res) => {
  Thought.findOne({ _id: params.id })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.status(400).json(err));
});

// update thought by id
router.put("/update/:id", ({ params, body }, res) => {
  Thought.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
  })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.status(400).json(err));
});

// delete thought by id
router.delete("/delete/:id", ({ params }, res) => {
  Thought.findOneAndDelete({ _id: params.id })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No Thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
