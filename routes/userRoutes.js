const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .get(verifyJWT, usersController.getAllUsers)
    .post(usersController.createNewUser)

module.exports = router