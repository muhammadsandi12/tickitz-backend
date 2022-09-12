const Users = require('../model/users')
const fs = require('fs')


module.exports ={
    getUserId: async (req,res) =>{
        try{
            const userId = req.decodeToken.user_id
            const result = await Users.getUserByid(userId) 
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            return res.status(200).json({
                success: true, message: `Success get data!`, data: result
            })

        }catch(err){
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }

    },
    update: async (req,res) =>{
        try{
            const userId = req.decodeToken.user_id
            console.log(req.body, 'ini req body 123')
            console.log(req.file, 'ini req file oi')
            const checkData = await Users.getUserByid(userId)
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            if(req.decodeToken.user_id !== checkData[0].id_users){
                return res.status(404).json({
                    success: false, message: `Error: Sorry, access is not allowed!`, data: []
                })
            }
           
            let profile_image = req.file ? req.file.filename : checkData[0].profile_image
           let setData ={
            ...req.body,
            profile_image
           }

           const results = await Users.update(userId, setData);
           if (req.file) {
               if (checkData[0].userImage !== 'default-profile.jpg') {
                   fs.unlink(`./uploads/${checkData[0].profile_image}`, function (err) {
                       if (err) {
                           console.log(err)
                       }
                   })
               }
           }
           return res.status(200).json({ success: true, message: 'Success update data', data: results })
        }catch(err){
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }

    },

}