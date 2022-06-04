const { Thought, User } = require("../models");
const router = require("express").Router();

// create new thought
router.post("/create/:userId", ({ params, body }, res) => {
  Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(400).json(err));
});

// get all thoughts
router.get("/all", (req, res) => {
  Thought.find({})
    .populate({
      path: "reactions",
      select: "-__v",
    })
    .select("-__v")
    .sort({ _id: -1 })
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
    .populate({
      path: "reactions",
      select: "-__v",
    })
    .select("-__v")
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

// create new reaction
router.post("/:thoughtId/reactions", ({ body, params }, res) => {
  console.log(body, "string");
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $push: { reactions: body } },
    { new: true }
  )
    .then((dbFriendData) => res.json(dbFriendData))
    .catch((err) => res.status(400).json(err));
});

// delete reaction by id
router.delete("/:thoughtId/reactions/:reactionId", ({ params }, res) => {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: params.reactionId } },
    { new: true }
  )
    .then((dbFriendData) => res.json(dbFriendData))
    .catch((err) => res.status(400).json(err));
});
module.exports = router;
