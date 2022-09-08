const express = require('express')
const router = express.Router()
const timeController = require('../controller/timeController')

router.get('/:id', timeController.getTime)



module.exports =router
