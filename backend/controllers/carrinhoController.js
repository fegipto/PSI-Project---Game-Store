const cart = require("../models/Cart");

exports.find_cart =  async (req, res) => {
    const query = cart.where('_id', req.params.id);
    const result = await query.findOne();
    res.send(result);
  };

exports.update_cart = async (req, res) => {
  const res = await cart.where('_id', req.params.carrinho.id).findOne();

  if (res) {
    console.log('Update cart');
    return res.json("ok");
  }

  console.log('Do not update cart');
  return res.json("not_ok");
  };