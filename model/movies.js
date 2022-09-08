const moment = require("moment")
const db = require("../helper/db_connections")

module.exports = {
    getAllMovies : (search, sort, offset, limit, month, upcoming) =>{
        return new Promise ((resolve, reject) =>{
            const sql = ` SELECT id_movies, title, categories ,cover, release_date, director, description, casts FROM movies ${search? `WHERE title LIKE '%${search}%'`:search && month ? `WHERE title LIKE '%${search}%' AND MONTH(release_date) = MONTH('${month}')`:' WHERE release_date > CURRENT_DATE()'} ${month?`AND MONTH(release_date) = MONTH('${month}')`:''}  ${upcoming ? `AND MONTH(release_date) > MONTH("${upcoming}")`:''}  ORDER BY release_date ${sort} ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ''}` 
            db.query(sql, (err,results) =>{
                if(err){
                    reject(err)
                }    
                resolve(results)
            })
        })
    }, 
    addMovies :(data) =>{
        return new Promise((resolve, reject) =>{
            db.query(`INSERT INTO movies SET ?`,data, (err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
            })
        })
    },
    countAllUser: (search, sort) =>{
        return new Promise((resolve, reject) =>{
            const sql = `SELECT id_movies from movies ${search ? `WHERE title LIKE '%${search}%' OR categories LIKE '%${search}%'  `:''}`
            db.query(sql, (err,results) =>{
                if(!results){
                   return 0
                }

                if(err) reject(err)
                resolve(results.length)
            })
        })
    },
    getById: (idMovies) =>{
        return new Promise((resolve, reject) =>{
            const sql = `SELECT  * FROM movies where id_movies = ${idMovies} `
            db.query(sql, (err,results) =>{
                if(err) reject(err)
                resolve(results)
            })
        })

    },
    update:(setData,id) =>{
        return new Promise((resolve,reject) =>{
            db.query(`UPDATE movies SET ? WHERE id_movies  `,[setData,id],(err,results) =>{
                if(err) reject(err)
                resolve(results)
            })
        })
    },
    remove:(id) =>{
        return new Promise((resolve,reject) =>{
            db.query(`DELETE FROM movies  WHERE id_movies =?  `,id,(err,results) =>{
                if(err) reject(err)
                resolve(results)
            })
        })
    }
}