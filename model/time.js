const db = require('../helper/db_connections')

module.exports ={
    getTimeByid : (id) =>{
        return new Promise((resolve, reject) =>{
            db.query(`SELECT time from time where id =${id} `, (err,result) =>{
                if(err) reject(err)
                resolve(result)
            })

        }) 
    },
    getTimeBySchedule : (id) =>{
        return new Promise((resolve, reject) =>{
            const sql = `SELECT time.id, time.time FROM schedule_time JOIN time ON schedule_time.id_time = time.id WHERE schedule_time.id_schedule =${id}`
            db.query(sql, (err,result) =>{
                console.log(sql)
                if(err) reject(err)
                if(!result.length){
                    resolve([])
                }
                resolve(result)
            })

        })

    }
    
}