const booking = require('../model/booking')
const fs = require('fs')


module.exports ={
    addBooking: async (req,res) =>{
        const userId = req.decodeToken.user_id
        // const result = await booking.addBooking() 
        // if (!result.length) {
        //     return res.status(404).json({
        //         success: false, message: `Error: Data by ${userId} not found!`, data: []
        //     })
        // }
        return res.status(200).json({
            success: true, message: `Success get data!`, data: result
        })
    }
}