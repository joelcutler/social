const { Schema, model, Types } = require("mongoose");

// create new user
app.post("/create", ({ body }, res) => {
  User.create(body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
});

// get all users
app.get("/all", (req, res) => {
  User.find({})
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get one user by id
app.get("/:id", ({ params }, res) => {
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
app.put("/update/:id", ({ params, body }, res) => {
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
app.delete("/delete/:id", ({ params }, res) => {
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
