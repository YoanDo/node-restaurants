const mongoose = require("mongoose");
// const User = mongoose.model('User');


exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' })
}

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' })
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name'); //comes from express-validator
  req.checkBody('name', 'You must supply a name! ').notEmpty();
  req.checkBody('email', 'That email isn\t valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  }) //normalize emails syntaxes
  req.checkBody('password', 'Password cannot be blank !').notEmpty();
  req.checkBody('password-confirm', 'Confirmed password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Ooops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { title: 'register', body: req.body, flashes: req.flash() }) // if the registration fails, we want the user to keep his previous inputs not rewriting everything
    return; //stop the function from running
  }
  next(); // there were no errors!
};
