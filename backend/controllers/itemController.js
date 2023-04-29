const Item = require("../models/Item");

// Display list of all Users json
exports.find_match_items = async (req, res) => {
  const query = Item.where('name', req.params.name);
  const item = await query.findOne();
  result = []
  res.send(result);
}
  
// Display one Item json
exports.find_item =  async (req, res) => {
    const query = Item.where('id', req.params.id);
    const result = await query.findOne();
    res.send(result);
  };