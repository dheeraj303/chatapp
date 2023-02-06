const express=require('express');
require('dotenv').config();
const bodyparser=require('body-parser');
const path=require('path');
const cors=require('cors');
const fs=require('fs');
// const helmet=require('helmet');
// const morgan=require('morgan');
const User= require('./Models/user');
const Message=require('./Models/message');
const Group=require('./Models/group');
const UserGroup=require('./Models/usergroup');
// const Order=require('./models/order');
// const DownloadData=require('./models/downloaddata');
// const Password=require('./models/password');
const userroutes=require('./Routes/user');
const messageroutes=require('./Routes/message');
const grouproute=require('./Routes/group');
const accesslogstream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
const errorcontroller=require('./Controllers/error');
const app=express();
app.use(cors({
    origin: '*',
    credentials: true}));
app.use(bodyparser.json());
// app.use(helmet());
// app.use(morgan('combined',{stream:accesslogstream}));
app.use(userroutes);
app.use(messageroutes);
app.use(grouproute);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`Frontend/${req.url}`));
})
app.use(errorcontroller.get404);

const sequelize = require('./Util/database');
User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

User.belongsToMany(Group,{through:UserGroup});
Group.belongsToMany(User,{through:UserGroup});
sequelize.sync().then((result)=>{
    // console.log(result);
    app.listen(process.env.PORT)
}).catch(err=>console.log(err));