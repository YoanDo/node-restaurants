const mongoose = require('mongoose');
const Schema = mongoose.schema;
mongoose.Promise = global.Promise;

const md5 = require('md5');
const validator = require('validator'); //validation package
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose'); //middleware that helps with logging stuff passportjs.io

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true, //removes space before and after
    validate: [validator.isEmail, 'Invalid Email Address'],
    require: 'Please supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  }
});

userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.plugin(mongodbErrorHandler); //gives to the user nice error message

module.exports = mongoose.model('User', userSchema);
