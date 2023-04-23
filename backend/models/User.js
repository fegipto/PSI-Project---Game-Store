const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true, maxLength: 100 },
  name: { type: String, required: true, maxLength: 100 },
  list: { type: Schema.Types.ObjectId, ref: "list" },
});

module.exports = mongoose.model("User", UserSchema);