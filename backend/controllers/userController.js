const User = require("../models/User");
const Item = require("../models/Item");
var path = require('path');

// Display list of all Users json
exports.users_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  res.send(user.lists);
  }
  
// Display library of all Users json
exports.library_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const result = await query.findOne();
  res.send(result.library);
  }

// Display followers of all Users json
exports.followers_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const result = await query.findOne();
  res.send(result.followers);
  }  

// Display following of all Users json
exports.following_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const result = await query.findOne();
  res.send(result.following);
} 

// Display one User json
exports.find_User =  async (req, res) => {
    const query = User.where('id', req.params.id);
    const result = await query.findOne();
    res.send(result);
  };