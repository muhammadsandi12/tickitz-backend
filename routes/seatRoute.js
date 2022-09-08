const express = require('express')
const router = express.Router()
const seatController = require('../controller/seatController')
const {isLogin} = require('../helper/auth')

router.get('/', isLogin, seatController.getAllSeat)



module.exports =router
