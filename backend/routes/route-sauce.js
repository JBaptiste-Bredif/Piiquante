const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const sauceCtrl = require('../controllers/controller-sauce')
const validator = require('../middleware/validator-ID')

router.post('/', auth, multer, sauceCtrl.createSauce)
router.get('/', auth, sauceCtrl.getAllSauces)
router.get('/:id', auth, validator.checkParam, sauceCtrl.getOneSauce)
router.put('/:id', auth, validator.checkParam, multer, sauceCtrl.modifySauce)
router.delete('/:id', auth, validator.checkParam, sauceCtrl.deleteSauce)
router.post('/:id/like', auth, validator.checkParam, sauceCtrl.likeDislikeSauce)

module.exports = router