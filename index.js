const express=require('express')
require('dotenv').config()
const router=require('./routes/router')
const cors=require('cors')
const nodemailer=require('nodemailer')
const moongose=require('mongoose')
const app=express()


app.use(express.json());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

moongose.connect('mongodb://127.0.0.1:27017/studentAttendence')

app.use('/',router)


app.listen(3001,()=>{
    console.log("App is running on port 3001")
})