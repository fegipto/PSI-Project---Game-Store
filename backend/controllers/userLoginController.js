const UserLogin = require("../models/UserLogin");
const async = require("async");

const { body, validationResult } = require("express-validator");

exports.userlogin_create_get = (req, res, next) => {
    async.parallel(
      {},
      (err, results) => {
        if (err) {
          return next(err);
        }
        res.render("userlogin_form", {
          title: "Create User",
        });
      }
    );
  };

  exports.userlogin_create_post = [
    (req, res, next) => {},
  
    // Validate and sanitize fields.
    body("name", "Name needs to have size 3.")
      .trim()
      .isLength({ min: 3 })
      .escape(),
    body("name", "Name can only use alphanumeric characters")
      .trim()
      .isAlphanumeric()
      .escape(),
    body("password", "The password should contain at least 8 characters.")
      .trim()
      .isLength({ min: 8 })
      .escape(),
    body("password", "The password should contain at least 1 Uppercased letter, 1 lowercased letter and 1 number necessary.")
      .trim()
      .isUppercase()
      .isLowercase()
      .isNumeric()
      .escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a UserLogin object with escaped and trimmed data.
      const userlogin = new UserLogin({
        name: req.body.name,
        password: req.body.password,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
  
        async.parallel(
          {},
          (err, results) => {
            if (err) {
              return next(err);
            }
  
            res.send(
              userlogin,
              errors.array(),
            )
          }
        );
        return;
      }
  
      // Data from form is valid. Save userlogin.
      userlogin.save((err) => {
        if (err) {
          return next(err);
        }
      });

      res.send("User created successfully")
    },
  ];