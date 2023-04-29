const Item = require("../models/Item");

// Display list of all Users json
exports.find_match_items = async (req, res) => {
  const query = Item.where('name', req.params.name);
  const item = await query.find();
  res.send(item);
}
  
exports.find_Item =  async (req, res) => {
  const query = Item.where('id', req.params.id);
  const result = await query.findOne();
  res.send(result);
};