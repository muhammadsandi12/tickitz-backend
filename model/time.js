const db = require('../helper/db_connections')

module.exports ={
    getTimeByid : (id) =>{
        return new Promise((resolve, reject) =>{
            db.query(`SELECT time from time where id =${id} `, (err,result) =>{
                if(err) reject(err)
                resolve(result)
            })

        }) 
    }
    
}