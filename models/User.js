const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

// userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
module.exports = User;
