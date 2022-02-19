let users = require('../models/users');
let uuid = require ('uuid')
let mongoose= require('mongoose')
let jwt = require('jsonwebtoken')

let signup = async(req,res)=>{
    console.log(users);
    let firstName= req.body.firstName;
    let lastName=req.body.lastName
    let password=req.body.password;
    let email= req.body.email
    let phoneNumber=req.body.phoneNumber
    let userName= req.body.userName

    users.find({email:email},async(err,resultat)=>{
        if(err==null && resultat.length>0 ){
            console.log(resultat)
            res.status(301).json({redirect:'localhost:880/login'});
        }else {
            try {
                let regex=/^[0-9]{10}$/;
                // if(!phoneNumber.match(regex)){
                //     throw new Error("Phone number is not valid")
                // }
                let id= mongoose.Types.ObjectId()
                console.log(id)
                let last_access= Date.now()
                let doc=new users({
                    _id:id,
                    firstName:firstName,
                    lastName:lastName,
                    password:password,
                    email:email,
                    phoneNumber:phoneNumber,
                    userName: userName,
                    last_access: last_access
                });
                let tokenData={
                    id: id,
                    last_access: last_access
                }
                let token= jwt.sign(tokenData, 'securepassword')
                console.log(doc)
                await doc.save();
                res.status(200).json({token:token});
            }catch(err){
                console.log(err)
            res.status(300).json({status:err});
            }
        }
    });
};


module.exports = signup;