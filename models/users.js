var mongoose= require('mongoose')

let users=mongoose.model('user',{
    firstName:String,
    lastName:String,
    email:String,
    phoneNumber:Number,
    password:String,
    userName:String,
    last_access:Date
})

module.exports= users