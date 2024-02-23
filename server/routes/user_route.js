const express = require('express');
const UserController = require('../controller/UserController');
const LoginController = require('../controller/LoginController');
const tokenHandler = require('../handller/handlers')

const router = express.Router();

// Define your routes here
router.post('/loginUser', LoginController.loginUser);
router.post('/updatepassword', LoginController.updatePassword);
router.post('/createUser', UserController.insertUser);
router.post('/createBoard', UserController.insertBoard);
router.post('/createCard', UserController.createCard);
router.post('/createtask', UserController.insertTask);
router.get('/boardDetails/:usiKey', UserController.getBoardDetails);
router.post('/cardDetails', UserController.getCardDetails);
router.post('/taskDetails', UserController.getTaskDetails);
router.post('/deletecard', UserController.deleteCard);
router.put('/updatecard', UserController.editCard);
router.post('/deleteboard', UserController.deleteBoard);
router.post(
    '/verify-token',
    LoginController.verifyToken
  )

module.exports = router;
