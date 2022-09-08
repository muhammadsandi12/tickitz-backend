const express = require("express")
const app = express()
const authRoute = require('./authRoute')
const moviesRoute = require('./moviesRoute')
const premiereRoute = require('./premiereRoute')
const scheduleRoute = require('./scheduleRoute')
const usersRoute = require('./usersRoute')
const bookingRoute = require('./booking')
const seatRoute = require('./seatRoute')
const timeRoute = require('./timeRoute')


app.use('/auth', authRoute)
app.use('/movies', moviesRoute)
app.use('/premiere', premiereRoute)
app.use('/schedule', scheduleRoute)
app.use('/users', usersRoute)
app.use('/booking', bookingRoute)
app.use('/seat', seatRoute)
app.use('/time', timeRoute)

module.exports = app