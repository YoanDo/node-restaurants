const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()) //determines which data of the user object should be stored in the session
passport.deserializeUser(User.deserializeUser())
