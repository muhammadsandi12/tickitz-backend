const express = require("express")
const app = express()
const authRoute = require('./authRoute')


app.use('/auth', authRoute)







module.exports = app