const User = require("../models/User");
const Item = require("../models/Item");
const async = require("async");

const { body, validationResult } = require("express-validator");

// Display User create form on GET.
exports.user_create_get = (req, res, next) => {
  // Get all pets, which we can use for adding to our hero.
  async.parallel(
    {},
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("user_form", {
        title: "Create User",
      });
    }
  );
};

// Handle Hero create on POST.
exports.hero_create_post = [
  (req, res, next) => {},

  // Validate and sanitize fields.
  body("id", "ID must not be empty. ")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a User object with escaped and trimmed data.
    const user = new User({
      id: req.body.id,
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all pets for form.
      async.parallel(
        {},
        (err, results) => {
          if (err) {
            return next(err);
          }

          res.render("user_form", {
            title: "Create User",
            user,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Data from form is valid. Save book.
    user.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new book record.
      res.redirect(user.url);
    });
  },
];

// Display list of all Users json
exports.users_list = async (req, res) => {

  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  
    for (let i = 0; i < user.lists.length; i++) {
      obj ={id: user.lists[i].id, name: user.lists[i].name, values: []}
      for (let j = 0; j < user.lists[i].values.length; j++) {
        const query = Item.where('_id', user.lists[i].values[j]);
        const one = await query.findOne();
        obj.values.push(one);
      }
      result.push(obj)
    }
  res.send(result);
}
  
// Display library of all Users json
exports.library_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  for (let i = 0; i < user.library.length; i++) {
    const query = Item.where('_id', user.library[i]);
    const one = await query.findOne();
    result.push(one)
  }
  res.send(result);
  }

// Display followers of all Users json
exports.followers_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  for (let i = 0; i < user.followers.length; i++) {
    const query = User.where('_id', user.followers[i]);
    const one = await query.findOne();
    result.push(one)
  }
  res.send(result);
  }

// Display following of all Users json
exports.following_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  result = []
  for (let i = 0; i < user.following.length; i++) {
    const query = User.where('_id', user.following[i]);
    const one = await query.findOne();
    result.push(one)
  }
  res.send(result);
  }

// Display one User json
exports.find_User =  async (req, res) => {
    const query = User.where('id', req.params.id);
    const result = await query.findOne();
    res.send(result);
  };