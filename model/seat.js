const db = require('../helper/db_connections')
module.exports ={
    getAllSeat: () => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT id_seat, row, GROUP_CONCAT(row, number_seat) AS number_seat FROM seat GROUP BY id_seat `, (err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
            })
        })
    },
    checkSeat: (idSchedule, idTime) => {
        return new Promise((resolve, reject) =>{
            db.query(`SELECT seat.id_seat, seat.row, GROUP_CONCAT(seat.row, seat.number_seat) AS number_seat, seat_booked.status FROM seat_booked JOIN seat ON seat_booked.id_seat = seat.id_seat WHERE seat_booked.id_schedule =${idSchedule} AND seat_booked.id_time=${idTime} GROUP BY id_seat; `, (err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
            })
        })
    },

}