let jwt= require('jsonwebtoken')
let orders= require('../models/orders')
let users= require('../models/users')
let mongoose= require('mongoose')

let order= (req,resp)=>{
    let token= req.header("Authtoken")
    let items= req.body.items.products
    let total= req.body.items.total
    console.log(req.body)
    if(!token || token.lenght== 0){
        resp.status(300).send("Token not sent")
        console.log(token)
    }else{
        try{
            let decoded_token= jwt.verify(token, "securepassword")
            let user_info= decoded_token.id
            let orderid= mongoose.Types.ObjectId()
            let doc = new orders({
                _id: orderid,
                client:user_info,
                products:items,
                total:total,
                date: Date(),
            
            })
            doc.save()
            users.findOneAndUpdate({ _id: user_info}, {last_access: Date.now()})
            resp.status(200).json({status: "Success", orderid: orderid})
        }catch(e){
            console.log(e)
            resp.status(400).json({status: e})
        }
    }
    
}

module.exports=order