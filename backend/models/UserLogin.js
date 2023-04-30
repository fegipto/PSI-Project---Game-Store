const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserLoginSchema = new Schema({
  name: { type: String, required: true, unique: true, minLength: 3 },
  password:  {type: String, required: true, minLength: 8, },
});

module.exports = mongoose.model("UserLogin", UserLoginSchema);