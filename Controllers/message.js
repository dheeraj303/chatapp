const Message=require('../Models/message');
const Sequelize=require('sequelize');
const {gt, lte, ne, in: opIn} = Sequelize.Op;

exports.postmessage=(req,res)=>{
    const message=req.body.message;
    // console.log(req.body.message);
    Message.create({
        message:message,
        userId:req.user.id
    }).then(()=>{
        res.status(201).json({message:'Message Sent',status:"1"});
    })
}

exports.getmessage=(req,res)=>{
    var lastid=req.params.lastmsgid;
    if(lastid=="undefined"){
        lastid=1;
    }
    console.log(lastid==="undefined");
    Message.findAll({ where: {
        id:
        {
            [gt]: lastid
        }
      }
    }).then((message)=>{
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