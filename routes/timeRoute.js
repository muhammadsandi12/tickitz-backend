const express = require('express')
const router = express.Router()
const timeController = require('../controller/timeController')

router.get('/:id', timeController.getTime)
router.get('/schedule/:id', timeController.getTimeBySchedule)


module.exports =router
