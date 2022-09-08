const seat = require('../model/seat')

module.exports ={
   getAllSeat: async  (req,res) =>{
        try{
            console.log(req.query, 'ini req query')
            const {id_schedule, id_time} = req.query
            const results = await seat.getAllSeat()
            console.log(id_schedule, 'ini id schedule')
            const checkSeat = await seat.checkSeat(id_schedule, id_time)
            
            if(!results.length){
                return res.status(404).json({
                    success: false, message: `Error: Data seat not found!`, data: []
                })
            }
            dataSeat =[
                ...results,
                ...checkSeat
            ]
            return res.status(200).json({
                success: true, message: `Success get seat!`, data: dataSeat
            })
        }catch(err){
            console.log(err, 'ini error')
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
   },
   
}