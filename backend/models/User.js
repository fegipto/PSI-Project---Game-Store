const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = require("../models/Item");

const UserSchema = new Schema({
  id: { type: Number, maxLength: 100 },
  name: { type: String, unique: true, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  lists:  {type: [{name: String, values:{type: [Schema.Types.ObjectId],ref: 'Item'}}]},
  library:   {type: [Schema.Types.ObjectId],ref: 'Item'},
  followers: {type: [Schema.Types.ObjectId],ref: 'User'},
  following: {type: [Schema.Types.ObjectId],ref: 'User'},
  imagens: {type: [{ data: Buffer, contentType: String }],},  
  imagens_profile: {type: String},  
  cart: {type: [Schema.Types.ObjectId],ref: 'Cart'},
});

module.exports = mongoose.model("User", UserSchema);