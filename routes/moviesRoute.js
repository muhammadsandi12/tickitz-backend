const express = require('express')
const moviesController = require('../controller/moviesController')
const router = express.Router()
const upload = require('../helper/multer')
const {isLogin,isAdmin} = require('../helper/auth')

router.get('/', moviesController.getAllMovies)
router.get('/:id', moviesController.getById)
router.post('/',upload.single('cover'),isAdmin ,moviesController.add)
router.patch('/:id',upload.single('cover'), isAdmin,moviesController.update)
router.delete('/:id',isLogin, isAdmin, moviesController.remove )




module.exports =router
