const Message=require('../Models/message');
const {Sequelize,Op}=require('sequelize');
const User=require('../models/user');
const {gt, lte, ne, in: opIn} = Sequelize.Op;

exports.postmessage=(req,res)=>{
    const message=req.body.message;
    // console.log(req.body.message);
    const groupid=req.query.gid;
    Message.create({
        message:message,
        userId:req.user.id,
        groupId:groupid
    }).then(()=>{
        res.status(201).json({message:'Message Sent',status:"1"});
    })
}

exports.getmessage=(req,res)=>{
    var lastid=req.params.lastmsgid;
    // var groupid=req.query.gid;
    if(lastid=="undefined"){
        lastid=0;
    }
    // if(groupid=="undefined"){
    //     groupid=NULL;
    // }
    // console.log(lastid==="undefined");
    Message.findAll({
        attributes:['message','id'], 
        include:[
          {
            model:User,
            attributes:['name'],
                  
          }       
        ],
        where:{id:{[Op.gt]:lastid}, 
        //  groupId:groupid
        }
      }).then((message)=>{
        // console.log(message);
        if(message.length===0){
            res.status(200).json({message:"No Data Found",status:"0"});
        }else{
        res.status(200).json({message:message,status:"1"});
        }
    }).catch((err)=>{
        console.log(err);
        // res.status(500).json({message:'Something Went Wrong',status:"0"}); 
    })
}