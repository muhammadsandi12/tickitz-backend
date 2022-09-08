const db = require("../helper/db_connections")

module.exports = {
    getAllPLocation: () => {
        return new Promise((resolve, reject) => {
            const sql = ` SELECT  location_name FROM location`
            db.query(sql, (err, results) => {
                if (err) {s
                    reject(err)
                }

                resolve(results)
            })
        })
    },
    addLocation: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO location SET ?`, data, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT location_name where id_location = ${id} `
            db.query(sql, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }, 
    update: (setData, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE location SET ? WHERE id_locattion  `, [setData, id], (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    },
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM location  WHERE id_location =?  `, id, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    },
}