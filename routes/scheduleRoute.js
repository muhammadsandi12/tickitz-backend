const express = require('express')
const scheduleController = require('../controller/scheduleController')
const router = express.Router()
const upload = require('../helper/multer')

router.get('/movies/:id', scheduleController.getScheduleByMovies)
router.get('/:id', scheduleController.getByid)

router.post('/',scheduleController.add)





module.exports =router
