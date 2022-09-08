const express = require('express')
const moviesController = require('../controller/moviesController')
const router = express.Router()
const upload = require('../helper/multer')
const {isLogin} = require('../helper/auth')

router.get('/', moviesController.getAllMovies)
router.get('/:id', moviesController.getById)
router.post('/',upload.single('cover') ,moviesController.add)
router.patch('/:id',upload.single('cover'), moviesController.update)
router.delete('/:id', moviesController.remove )




module.exports =router
