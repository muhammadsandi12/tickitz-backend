const express = require('express')
const premiereController = require('../controller/premiereController')
const { isLogin, isAdmin } = require('../helper/auth')
const router = express.Router()
const upload = require('../helper/multer')
router.post('/',upload.single('logo_premiere'),isLogin, isAdmin,premiereController.add)

module.exports =router
