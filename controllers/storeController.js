const mongoose = require("mongoose");
const Store = mongoose.model('Store');


exports.homePage = (req, res) => {
  console.log(req.name)
  res.render('index')
}

exports.addStore = (req, res) => {
  res.render('editStore', { title: '💩 Add store' })
}

exports.createStore = async (req, res) => {
  // console.log(req.body)
  // res.json(req.body)
  const store = new Store(req.body);
  await store.save(); // wait for the store to be saved
  res.redirect('/');
};
