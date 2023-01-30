const Message=require('../Models/message');


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
    Message.findAll().then((message)=>{
        res.status(200).json({message:message,status:"1"});
    }).catch((err)=>{
        res.status(500).json({message:'Something Went Wrong',status:"0"}); 
    })
}