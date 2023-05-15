const User = require("../models/User");
const Item = require("../models/Item");
const Cart = require('../models/Cart');
var path = require('path');

// Display list of all Users json
exports.users_list = async (req, res) => {

  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  if (user != null){
    for (let i = 0; i < user.lists.length; i++) {
      obj ={id: user.lists[i].id, name: user.lists[i].name, values: []}
      for (let j = 0; j < user.lists[i].values.length; j++) {
        const query = Item.where('_id', user.lists[i].values[j]);
        const one = await query.findOne();
        obj.values.push(one);
      }
      result.push(obj)
    }
  }
  res.send(result);
}
  
// Display library of all Users json
exports.library_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  if (user != null){
    for (let i = 0; i < user.library.length; i++) {
      const query = Item.where('_id', user.library[i]);
      const one = await query.findOne();
      result.push(one)
    }
  }
  res.send(result);
  }

// Display followers of all Users json
exports.followers_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  if (user != null){
    for (let i = 0; i < user.followers.length; i++) {
      const query = User.where('_id', user.followers[i]);
      const one = await query.findOne();
      result.push(one)
    }
  }
  res.send(result);
  }

// Display following of all Users json
exports.following_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  if (user != null){
    for (let i = 0; i < user.following.length; i++) {
      const query = User.where('_id', user.following[i]);
      const one = await query.findOne();
      result.push(one)
    }
  }
  res.send(result);
  }

// Display one User json
exports.find_User =  async (req, res) => {
    const query = User.where('id', req.params.id);
    const result = await query.findOne();
    res.send(result);
  };

exports.updateCart = async (req, res) => {
  try {
  // Find the user by ID
  const query = User.where('id', req.body.id);
  const result = await query.findOne();

  if (result) {
    await insertCart(req, result);
    res.status(200).json({ message: "Cart data was saved successfully!" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
}
}


  
  async function createCart(req, res) {
    await Promise.all([
      insertCart(req, res),
    ]);
  }


async function insertCart(req, res) {
  const cartEntries = Object.entries(req.body.cart);
  const items = [];

  for (const [itemId, quantity] of cartEntries) {
    const query = Item.where('id', itemId);
    const item = await query.findOne();
    if (item) {
      items.push({
        itemId: item._id,
        quantity: parseInt(quantity)
      });
    }
  }

  const cart = new Cart({ items });
  const savedCart = await cart.save();

  const queryUser = User.where('id', req.body.id);
  const user = await queryUser.findOne();

  if (user) {
    user.cart = savedCart._id;
    await user.save();
  }
}

  
exports.cart = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();  
  if (user != null && user.cart != null) {
    const cart = await Cart.findById(user.cart);
    const cartMap = new Map();
    if(cart){
    for (const item of cart.items) {
      cartMap.set(item.itemId.toString(), item.quantity);
    }
  }
    const cartArray = Array.from(cartMap.entries()).map(([item, quantity]) => {
      return { item: item, quantity: quantity };
    });
    res.json(cartArray);
  };

  exports.editUser = async (req, res) => {
    const query = User.where('id', req.params.id);
    const user = await query.findOne();
    if(user) {
      const updated_user = new User({
        id: user.id,
        name: req.body.name,
        password: user.password,
        lists: user.lists,
        library: user.library,
        follower: user.followers,
        following: user.following,
        imagens: req.body.image,
        cart: user.cart,
      });
      await query.deleteOne();
      await updated_user.save();
    }
    return;
  };
}

  