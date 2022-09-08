const db = require('../helper/db_connections')

module.exports={
    getUserByid: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id_users, firstname, lastname, phone_number, email, profile_image FROM users WHERE id_users= ?`, userId, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    },
    update: (userId, setData) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET  ? WHERE id_users = ? `, [setData, userId], (err, results) => {
                if (err) reject(err)
                resolve({
                    userId,
                    results
                })
            })
        })
    },
}