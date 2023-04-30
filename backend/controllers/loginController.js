const User = require("../models/User");

exports.try_login =  async (req, res) => {
    const query = User.where('name', req.params.name);
    const result = await query.findOne();
    if (result.password == req.params.password) {
        res.send(result);
        return;
    }
    res.send(null);
  };
