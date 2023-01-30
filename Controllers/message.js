const Message=require('../Models/message');


exports.postmessage=(req,res)=>{
    const message=req.body.message;
    console.log(req.body.message);
    Message.create({
        message:message,
        userId:req.user.id
    }).then(()=>{
        res.status(403).json({message:'Message Sent',status:"1"});
    })
}