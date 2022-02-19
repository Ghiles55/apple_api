let jwt= require('jsonwebtoken')
let orders= require('../models/orders')
let users= require('../models/users')
let mongoose= require('mongoose')

let getOrderList= (req,resp)=>{
    let token= req.header("Authtoken")
    
    console.log(req.body)
    if(!token || token.lenght== 0){
        resp.status(300).send("Token not sent")
        console.log(token)
    }else{
        try{
            let decoded_token= jwt.verify(token, "securepassword")
            let user_info= decoded_token.id
            orders.find({ client : user_info},(err,result)=>{
                console.log(result)
                if(err==null||result.length>0){
                    let newResult= result.map((el)=>{
                        return{
                            id: el._id,
                            order_date: el.date,
                            total_price: el.total

                        }
                        
                    })
                    resp.status(200).json(newResult)
                }
                // console.log("USER")
            })
            users.findOneAndUpdate({ _id: user_info}, {last_access: Date.now()})
        }catch(e){
            console.log(e)
            resp.status(400).json({status: e})
        }
    }
}

module.exports=getOrderList