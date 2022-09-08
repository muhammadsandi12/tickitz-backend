const premiere = require("../model/premiere")
const fs = require('fs')
module.exports = {

    getAllPremiere: async(req,res) =>{
        try{
            const results = await movies.getAllMovies(search, sort, offset, limit, month, upcoming)
            const totalRows = results.length
            if(page > totalPage){
                return res.status(400).json({ success: false, message: 'Error: Page not found', data: [] })
            }
          
            return res.status(200).json({ success: true, message: "success show all users", data: { totalAllData , totalRows, totalPage,results } })

        }catch(err){
            console.log(err)
            return res.status(500).json({success: false, message: err})
        }

    },
    add: async (req,res) =>{
        try{
            const data = {
                ...req.body,
                logo_premiere: req.file.filename
            }
            console.log(data)

            const results = await premiere.addPremiere(data)
            return res.status(200).json({ success: true, message: "add premiere success", data: { results } })
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
            return res.status(200).json({ success: true, message: "update movies success", data: { results } })
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
                    success: false, message: `Error: Data by movies ${id} not found!`, data: []
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
            return res.status(200).json({ success: true, message: "delete movies success", data: { results } })
        }catch(err){
            return res.status(500).json({success: false, message: err})
        }
    },

    getById: async (req,res)=>{
        try{
            const idMovies = req.params.id
            console.log(req.params, 'ini params id')
            const results = await movies.getById(idMovies)
            return res.status(200).json({ success: true, message: "get movies by id success", data: { results } })

        }catch(err){
            return res.status(500).json({success: false, message: err})
        }
    }

}