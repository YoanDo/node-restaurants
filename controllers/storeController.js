const mongoose = require("mongoose");
const Store = mongoose.model('Store');
// to deal with photo upload
const multer = require('multer');
// to resize photo
const jimp = require('jimp');
// to give a unique name to the photos
const uuid = require('uuid');


const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\t allowed' }, false);
    }
  }
}

exports.upload = multer(multerOptions).single('photo');
exports.resize = async (req, res, next) => {
  //check if there is no new file to resize
  if (!req.file) {
    next() //skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once the photo is written, keep going !
  next();
}

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

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug })
  if (!store) return next();
  res.render('store', { title: store.name, store })
};


exports.editStore = async (req, res) => {
  // 1 -  fin the store given the ID
  const store = await Store.findOne({ _id: req.params.id });
  //TODO  2 - confirm the actual user is the owner of the store
  // 3 - render out the edit form so the user cans update their store
  res.render('editStore', { title: `Edit ${store.name}`, store })
}

exports.updateStore = async (req, res) => {
  // set the location data to be a point
  req.body.location.type = 'Point';
  // find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`);
  res.redirect(`/stores/${store._id}/edit`);
  // Redriect them the store and tell them it worked
};

exports.getStoresByTag = async (req, res) => {
  const tags = await Store.getTagsList();
  const tag = req.params.tag
  res.render('tags', { title: 'Tags', tags, tag })
}
