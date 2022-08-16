require('dotenv').config()
const bcrypt = require("bcrypt")
const Auth = require('../model/auth')
const jwt = require('jsonwebtoken')

module.exports ={
    register: async (req,res) =>{
        try{
            const {firstname, lastname, phone_number, email, password} = req.body
            if(password.length < 8) {
                return res.status(400).json({success: false, message: "Error : pasword must be more than 8 charactera"})
            }
            const imageDefault = 'default.png'
            let hashedPassword = bcrypt.hashSync(password, 10)
            setData = {
                ...req.body,
                password : hashedPassword,
                profile_image: imageDefault
            }
            const results = await Auth.register(setData)
            return res.status(201).json({success: true, message: 'register success', data: results})

            
        }catch(err){
            if(err.code === 'ER_DUP_ENTRY'){
            return res.status(500).json({ success: false, message: `EMAIL HAS BEEN REGISTERED` })
            }
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    },
    login: async (req,res) =>{
        try{
            const {email,password} =req.body
            if(!email || !password){
                return res.status(400).json({success: false, message: "Error: fields must be filled"})
            }
            const results = await Auth.login(email)
            if(!results.length){
                return res.status(400).json({success: false, message: "Error: wrong email / password"})
            }
            if (password.length < 8) {
                return res.status(404).json({ success: false, message: 'Error: Password must be more than 8 characters' })
            }
            const compare =bcrypt.compareSync(password, results[0].password)
            if(compare === false){
                return res.status(404).json({ success: false, message: 'Error: Wrong Email / Password' })
            }
            const token = jwt.sign({user_id: results[0].id, role: results[0].role}, process.env.JWT_SECRET_KEY, {
                expiresIn: '300s'
            })
           return res.status(200).json({success: true, message: "Login Success", token: token})

        }catch(err){

        }

    }
}