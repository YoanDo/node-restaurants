const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/add', storeController.addStore);
router.post('/add', catchErrors(storeController.createStore));
// .../:id/... let us pass any id we want
router.get('/stores/:id/edit', catchErrors(storeController.editStore))

module.exports = router;
