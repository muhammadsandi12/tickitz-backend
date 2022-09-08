const express = require("express")
const bookingController = require("../controller/bookingController")
const router = express.Router()
const {isLogin} = require('../helper/auth')

router.post('/',isLogin, bookingController.addBooking)

module.exports = router