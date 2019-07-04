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

exports.getStores = async (req, res) => {
  // 1 - query the database for a list of all stores
  const stores = await Store.find();
  // console.log(stores)
  res.render('stores', { title: 'Stores', stores });
}

exports.editStore = async (req, res) => {
  // 1 -  fin the store given the ID
  const store = await Store.findOne({ _id: req.params.id });
  //TODO  2 - confirm the actual user is the owner of the store
  // 3 - render out the edit form so the user cans update their store
  res.render('editStore', { title: `Edit ${store.name}`, store })
}

exports.updateStore = async (req, res) => {
  // set the location data to be a point
  req.body.location.type = "Point"
  // 1 - find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, //return the new store instead of the old one
    runValidators: true, //force the model to check valdation
  }).exec();
  //gives success message
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View store -></a>`);
  //redirect the user
  res.redirect(`/stores/${store._id}/edit`);

  // 2 - redirect the user to the store and tell him it worked
}
