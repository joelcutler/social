const { User, Thought } = require("../models");
const router = require("express").Router();

// BONUS: Remove a user's associated thoughts when deleted.

// create new user
router.post("/create", ({ body }, res) => {
  User.create(body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
});

// get all users
router.get("/all", (req, res) => {
  User.find({})
    .populate({
      path: "thoughts",
      select: "-__v",
    })
    .select("-__v")
    .sort({ _id: -1 })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get one user by id
router.get("/:id", ({ params }, res) => {
  User.findOne({ _id: params.id })
    .populate({
      path: "thoughts",
      select: "-__v",
    })
    .select("-__v")
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
});

// update user by id
router.put("/update/:id", ({ params, body }, res) => {
  User.findOneAndUpdate({ _id: params.id }, body, {
    new: true,
    runValidators: true,
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
});

// delete user by id
router.delete("/delete/:id", ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id!" });
    }
    Thought.deleteMany({ userId: params.id })
      .then((dbUserData) => {
        res.json(dbUserData);
        return;
      })
      .catch((err) => res.status(400).json(err));
  });
});

// create new friend
router.post("/:userId/friends/:friendId", ({ params }, res) => {
  // console.log(params.friendId, "somestring");
  User.findOneAndUpdate(
    { _id: params.userId },
    { $push: { friends: params.friendId } },
    { new: true }
  )
    .then((dbFriendData) => res.json(dbFriendData))
    .catch((err) => res.status(400).json(err));
});

// delete one friend by id
router.delete("/:userId/friends/:friendId", ({ params }, res) => {
  User.findOneAndUpdate(
    { _id: params.userId },
    { $pull: { friends: params.friendId } },
    { new: true }
  )
    .then((dbFriendData) => {
      if (!dbFriendData) {
        res.status(404).json({ message: "No friend found with this id!" });
        return;
      }
      res.json(dbFriendData);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
