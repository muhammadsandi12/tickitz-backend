const db = require("../helper/db_connections")

module.exports = {
    getAllPremiere: () => {
        return new Promise((resolve, reject) => {
            const sql = ` SELECT  id_premiere, premiere_name, logo_premiere, address, id_location FROM premiere`

            db.query(sql, (err, results) => {
                if (err) {
                    reject(err)
                }

                resolve(results)
            })
        })
    },
    addPremiere: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO premiere SET ?`, data, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT  premiere_name, logo_premiere, address, id_location, where id_premiere = ${id} `
            db.query(sql, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })

    }, 
    update: (setData, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE premiere SET ? WHERE id_premiere  `, [setData, id], (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    },
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM premiere  WHERE id_premiere =?  `, id, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    },
}