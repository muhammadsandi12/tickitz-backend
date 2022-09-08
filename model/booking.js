const db = require("../helper/db_connections")

module.exports = {
    getBookingByUsers : (id) =>{
        return new Promise ((resolve, reject) =>{
            const sql = `SELECT  movies.title, schedule.price, premiere.premiere_name, premiere.logo_premiere, premiere.address, location.location_name, time.time FROM schedule JOIN movies ON schedule.id_movies = movies.id_movies JOIN premiere ON schedule.id_premiere = premiere.id_premiere JOIN location ON premiere.id_location = location.id_location JOIN time ON schedule.id_time = time.id WHERE movies.id_movies = ${id}` 
            db.query(sql, (err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
            })
        })
    }, 
    addBooking :(data) =>{
        return new Promise((resolve, reject) =>{
            db.query(`INSERT INTO booking SET ?`,data, (err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
            })
        })
    },
    getById: (id) =>{
        return new Promise((resolve, reject) =>{
            const sql = `SELECT  movies.title, schedule.price, premiere.premiere_name, premiere.logo_premiere, premiere.address, location.location_name, time.time FROM schedule JOIN movies ON schedule.id_movies = movies.id_movies JOIN premiere ON schedule.id_premiere = premiere.id_premiere JOIN location ON premiere.id_location = location.id_location JOIN time ON schedule.id_time = time.id WHERE schedule.id_schedule = ${id}`
            db.query(sql, (err,results) =>{
                if(err) reject(err)
                resolve(results)
            })
        })

    },
    update:(setData,id) =>{
        return new Promise((resolve,reject) =>{
            db.query(`UPDATE schedule SET ? WHERE id_schedule  `,[setData,id],(err,results) =>{
                if(err) reject(err)
                resolve(results)
            })
        })
    },
    remove:(id) =>{
        return new Promise((resolve,reject) =>{
            db.query(`DELETE FROM schedule  WHERE id_schedule =?  `,id,(err,results) =>{
                if(err) reject(err)
                resolve(results)
            })
        })
    }

}