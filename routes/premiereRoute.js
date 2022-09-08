const express = require('express')
const premiereController = require('../controller/premiereController')
const router = express.Router()
const upload = require('../helper/multer')

// router.get('/', moviesController.getAllMovies)
router.post('/',upload.single('logo_premiere'),premiereController.add)

module.exports =router
