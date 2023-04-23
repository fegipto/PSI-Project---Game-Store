const User = require("../models/User");
var path = require('path');

// Display list of all Users json
exports.Users_list = async (req, res) => {
    const Users = await User.find()
    res.send(Users);
   }

// Display one User json
exports.find_User =  async (req, res) => {
    const query = User.where({id:{id:req.params.id}});
    const result = await query.findOne();
    res.send(result);
  };

// cria User and return json with id
exports.create_User = (req, res) => {
    res.send("NOT IMPLEMENTED: ");
  };

// update
exports.update_User = (req, res) => {
    res.send("NOT IMPLEMENTED: ");
  };

exports.delete_User = (req, res) => {
  User.deleteOne({id:req.params.id}).then(function(){
    console.log("User deleted"); // Success
}).catch(function(error){
    console.log("ERRO"); // Failure
});
}