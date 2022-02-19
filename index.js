var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");;
var jwt = require("jsonwebtoken");
var cors = require("cors");
var login= require('./controllers/login')
var signUp= require('./controllers/signup')
let order= require('./controllers/order')
let getOrders= require('./controllers/getOrdersList')
let getOrderDetails= require('./controllers/getOrdersDetails')

var app = express();


app.use(bodyParser());
app.use(cors());

app.get('/login', login)
app.get('/signup', signUp)
app.get('/getOrders',getOrders )
app.get('/getOrderDetails',getOrderDetails)
app.post('/order', order)

mongoose
.connect(
    "mongodb+srv://Ghiles:Azerty54321@cluster0.7j48m.mongodb.net/apple_api"
)
.then((db) => {
    console.log("Database connected");
})
.catch((err) => {});

app.listen(880);
