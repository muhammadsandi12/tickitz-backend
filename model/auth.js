const db = require("../helper/db_connections")
module.exports = {
    register: (setData) =>{
        return new Promise((resolve, reject) =>{
            db.query(`INSERT INTO users SET ?`, setData, (err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
            })
        })
    },
    login: (email) =>{
        return new Promise((resolve, reject) =>{
            db.query(`SELECT id, password, role  FROM users WHERE email = '${email.toLowerCase()}' `, (err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
                
            })

        })
    }
}