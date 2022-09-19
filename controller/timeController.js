const time = require('../model/time')

module.exports ={
   getTime: async  (req,res) =>{
        try{
            const {id} = req.params;
            const results = await time.getTimeByid(id)
            if(!results.length){
                return res.status(404).json({
                    success: false, message: `Error: Data seat not found!`, data: []
                })
            }

            
            return res.status(200).json({
                success: true, message: `Success get seat!`, data: results
            })
        }catch(err){
            console.log(err)
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
   },
   getTimeBySchedule: async  (req,res) =>{
    try{
        const {id} = req.params;
        console.log(req.params)
        const results = await time.getTimeBySchedule(id)    
        return res.status(200).json({
            success: true, message: `Success get time!`, data: results
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
    }
},
}