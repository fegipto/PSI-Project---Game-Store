const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true, maxLength: 100 },
  name: { type: String, required: true, maxLength: 100 },
  lists:  {type: [{name: String, values:{type: [Schema.Types.ObjectId],ref: 'Item'}}]},
  library:   {type: [Schema.Types.ObjectId],ref: 'Item'},
  followers: {type: [Schema.Types.ObjectId],ref: 'User'},
  following: {type: [Schema.Types.ObjectId],ref: 'User'},
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);