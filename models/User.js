const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "You need to provide a username!",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "You need to provide an email address!",
      match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [ThoughtSchema],
    friends: [UserSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
});
