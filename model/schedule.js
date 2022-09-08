const db = require("../helper/db_connections")

module.exports = {
    getScheduleByMovies: (id) => {
        return new Promise((resolve, reject) => {            
            const sql = `SELECT movies.title, schedule.id_schedule,premiere.logo_premiere,premiere.name_premiere,premiere_list.address, schedule.price, location.location_name,GROUP_CONCAT( time.id) AS idtime, GROUP_CONCAT( time.time) AS time FROM schedule JOIN movies ON schedule.id_movies = movies.id_movies JOIN premiere_list ON schedule.id_premiereList = premiere_list.id_premiereList JOIN premiere ON premiere_list.id_premiere = premiere.id_premiere JOIN location ON premiere_list.id_location = location.id_location JOIN schedule_time ON schedule.id_schedule = schedule_time.id_schedule LEFT JOIN time ON schedule_time.id_time = time.id WHERE schedule.id_movies =${id} GROUP BY premiere.logo_premiere`
            db.query(sql, (err, results) => {
             
                if (err) {
                    reject(err)
                }
                if (!results.length) {
                    resolve([])
                }
                else{
                    results.map((item, index) => {
                        if(item.time === null){
                            return resolve([])
                        }
                        else{
                            
                            
                            time = item.time.split(',')
                            id = item.idtime.split(',')

                            let arr = []
                            data = {id: '', item: ''}
                            
                            id.map((item) => {arr.push({id: item})})
                            x = time.map((item, index) => ({...arr[index], time: item}) )
                            resolve(
                                results,
                                results[index].idtime=id,
                                results[index].time=x
                            )
                            
                        }
                    })

                }
                
            })
        })
    },
    addSchedule: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO schedule SET ?`, data, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT  movies.title, schedule.price, premiere.premiere_name, premiere.logo_premiere, premiere.address, location.location_name, time.time FROM schedule JOIN movies ON schedule.id_movies = movies.id_movies JOIN premiere ON schedule.id_premiere = premiere.id_premiere JOIN location ON premiere.id_location = location.id_location JOIN time ON schedule.id_time = time.id WHERE schedule.id_schedule = ${id}`
            db.query(sql, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })

    },
    update: (setData, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE schedule SET ? WHERE id_schedule  `, [setData, id], (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    },
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM schedule  WHERE id_schedule =?  `, id, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })
    }
}