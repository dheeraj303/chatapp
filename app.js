const express=require('express');
require('dotenv').config();
const bodyparser=require('body-parser');
const path=require('path');
const cors=require('cors');
const fs=require('fs');
// const helmet=require('helmet');
// const morgan=require('morgan');
const User= require('./Models/user');
// const Expense=require('./models/expense');
// const Order=require('./models/order');
// const DownloadData=require('./models/downloaddata');
// const Password=require('./models/password');
const userroutes=require('./Routes/user');

const accesslogstream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
const errorcontroller=require('./Controllers/error');
const app=express();
app.use(cors());
app.use(bodyparser.json());
// app.use(helmet());
// app.use(morgan('combined',{stream:accesslogstream}));
app.use(userroutes);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`Frontend/${req.url}`));
})
app.use(errorcontroller.get404);

const sequelize = require('./Util/database');

sequelize.sync().then((result)=>{
    // console.log(result);
    app.listen(process.env.PORT)
}).catch(err=>console.log(err));