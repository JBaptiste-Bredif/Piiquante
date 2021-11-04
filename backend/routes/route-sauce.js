const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config')
const sauceCtrl = require('../controllers/controller-sauce')

// router.post('/', (req, res, next) => {
//     console.log(req)
//     next()
// }, sauceCtrl.createSauce)
router.post('/', multer, sauceCtrl.createSauce)
router.get('/', sauceCtrl.getAllSauces)
router.get('/:id', sauceCtrl.getOneSauce)

module.exports = router