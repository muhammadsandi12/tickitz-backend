const schedule = require("../model/schedule")
const fs = require('fs')
const moment = require("moment")
const movies = require("../model/movies")

module.exports = {
    getScheduleByMovies: async(req,res) =>{
        try{      
           const {id} = req.params
           const {location} = req.query
           const results = await schedule.getScheduleByMovies(id, location)
            return res.status(200).json({ success: true, message: "success show all users", data: {results } })
        }catch(err){
            return res.status(500).json({success: false, message: err})
        }

    },
    add: async (req,res) =>{
        try{
            const data = {
                ...req.body,
            }
            const results = await schedule.addSchedule(data)
            return res.status(200).json({ success: true, message: "add schedule success", data: { results } })
        }catch(err){
            return res.status(500).json({success: false, message: err})
        }
    },
    update: async(req,res) =>{
        try{
            const {id} = req.params
            const checkData = await movies.getById(id)
            let cover = req.file ? req.file.filename : checkData[0].cover
            let setData = {
                ...req.body,
                cover: cover
            }
            const results = await movies.update(setData,id)
            if (req.file) {
                if (checkData[0].cover != '') {
                    fs.unlink(`./uploads/${checkData[0].cover}`, function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            }
            return res.status(200).json({ success: true, message: "update schedule success", data: { results } })
        }catch(err){
            return res.status(500).json({success: false, message: err})
        }
    },
    remove: async(req,res) =>{
        try{
            const {id} = req.params
            const checkData = await movies.getById(id)
            if(!checkData[0].length){
                return res.status(404).json({
                    success: false, message: `Error: Data by schedule ${id} not found!`, data: []
                })
            }
            const results = await movies.remove(id)
            if (checkData[0].cover != '') {
                fs.unlink(`./uploads/${checkData[0].cover}`, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            }
            return res.status(200).json({ success: true, message: "delete schedule success", data: { results } })
        }catch(err){
            return res.status(500).json({success: false, message: err})
        }
    },
    getByid: async (req,res)=>{
        try{
            const id_schedule = req.params.id
            const results = await movies.getById(id_schedule)
            return res.status(200).json({ success: true, message: "get movies by id success", data: { results } })

        }catch(err){
            return res.status(500).json({success: false, message: err})
        }
    }

}