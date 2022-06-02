const { User } = require("../models");
const router = require("express").Router();

// create new user
router.post("/create", ({ body }, res) => {
  User.create(body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
});

// get all users
router.get("/all", (req, res) => {
  User.find({})
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
  User.findOneAndDelete({ _id: params.id })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
