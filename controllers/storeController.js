const mongoose = require("mongoose");
const Store = mongoose.model('Store');


exports.homePage = (req, res) => {
  console.log(req.name)
  res.render('index')
}

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add store' })
}

exports.createStore = async (req, res) => {
  // res.json(req.body)
  const store = await (new Store(req.body)).save(); // wait for the store to be saved
  req.flash('success', `Successfully created ${store.name}. Care to leave a review ?`) // flash infos
  res.redirect(`/store/${store.slug}`);
};
