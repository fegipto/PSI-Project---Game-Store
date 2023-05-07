const cart = require("../models/Cart");

exports.find_cart =  async (req, res) => {
    const query = cart.where('_id', req.params.id);
    const result = await query.findOne();
    res.send(result);
  };
