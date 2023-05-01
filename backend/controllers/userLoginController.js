const User = require("../models/User");

  exports.userlogin_create_post = (req, res, next) => {
  
      // Create a User object with data.
      const user = new User({
        id: req.params.id,
        name: req.params.name,
        password: req.params.password,
      });
  
      // Save user.
      user.save((err) => {
        if (err) {
          return next(err);
        }
      });

      res.send(null)
  };