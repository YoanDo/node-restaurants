const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
router.get('/add',
  authController.isLoggedIn, storeController.addStore);
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));
router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);
router.post('/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore));
// .../:id/... let us pass any id we want

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

router.post('/register',
  // 1- validate the registration data
  userController.validateRegister,
  // 2 - register the user
  userController.register,
  // 3 - we need to login
  authController.login
);

router.get('/logout', authController.logout)

router.get('/account',
  authController.isLoggedIn,
  userController.account);
router.post('/account',
  catchErrors(userController.updateAccount))

module.exports = router;
