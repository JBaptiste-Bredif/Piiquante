const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/controller-user')
const limit = require('../middleware/limit-connection')

router.post('/signup', userCtrl.signup)
router.post('/login', limit.connection(5), userCtrl.login)

module.exports = router