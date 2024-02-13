// const express = require('express');
// const UserController = require('../controller/UserController');
// const LoginController = require('../controller/LoginController')

// const router = express.Router();

// // Define your routes here
// router.post('/loginUser', LoginController.loginUser);
// router.post('/createUser', UserController.insertUser);
// router.post('/createBoard', UserController.insertBoard);
// router.get('/boardDetails/:usiKey',UserController.getBoardDetails)
// router.post('/createCard', UserController.createCard);
// router.get('/cardDetails/:usiKey', UserController.getCardDetails);
// // router.post('/verifyToken', LoginController.verifyToken);


// module.exports = router;

const express = require('express');
const UserController = require('../controller/UserController');
const LoginController = require('../controller/LoginController');
const tokenHandler = require('../handller/handlers')

const router = express.Router();

// Define your routes here
router.post('/loginUser', LoginController.loginUser);
router.post('/createUser', UserController.insertUser);
router.post('/createBoard', UserController.insertBoard);
router.get('/boardDetails/:usiKey', UserController.getBoardDetails);
router.post('/createCard', UserController.createCard);
router.get('/cardDetails/:usiKey', UserController.getCardDetails);
router.post(
    '/verify-token',
    LoginController.verifyToken
  )

module.exports = router;
