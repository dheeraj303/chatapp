const Group=require('../Models/group');
const Chatimage=require('../Models/chatimage');
const {Sequelize,Op}=require('sequelize');
const GroupUser=require('../Models/usergroup');
const Message=require('../Models/message');
const User=require('../models/user');

exports.postgroup= async (req,res)=>{
    try{
    
    const newgroup=await Group.create({groupname:req.body.group,
        groupadmin:req.user.id})


    await GroupUser.create({isadmin:1,userId:req.user.id,groupId:newgroup.id});
    // console.log(req.body.message);
    res.status(201).json({message:'Group Created',status:"1"});
    }
    catch(err){
        console.log(err);
    }

  
}

exports.getgroup= (req,res)=>{
    // var lastid=req.params.lastmsgid;
    Group.findAll({
        attributes:['groupname','id','groupadmin'], 
        include:[
          {
            model:User,
            where:{id:req.user.id}
          },
        ]
      }).then((group)=>{
        res.status(200).json({group:group,status:"1"});
    }).catch((err)=>{
        console.log(err);
        // res.status(500).json({message:'Something Went Wrong',status:"0"}); 
    })
}

exports.getallchatmessages=async(req,res,next)=>{

    // const lastmessageid=req.params.lastmsgid || 0;
    const groupid=req.query.gid;
  
    try{
    const allmessages=await Message.findAll({
      attributes:['message','id'], 
      include:[
        {
          model:User,
          attributes:['name'],
                
        }       
      ],
      where:{
        // id:{[Op.gt]:lastmessageid},
          groupId:groupid}
    });
  
    res.status(200).json({message:allmessages});
  
     }
    catch(err){
      console.log(err);
    }
  
  }

exports.joingroup=async (req,res)=>{
    const {email,gid}=req.body;
    const grp_admin=await GroupUser.findOne(
        {attributes:['isadmin'],
        where:{groupId:gid,userId:req.user.id}});
        if(grp_admin.dataValues.isadmin==1){
            const mem_id=await User.findOne(
                {
                where:{email:email}}); 
                console.log(mem_id);
                if(mem_id!=null){
                 const mem_already=await GroupUser.findOne({
                    where:{userId:mem_id.dataValues.id, groupId:gid}
                 }); 
                 if (mem_already!=null){
                  res.json({message:"User is already a member of this group",status:"0"});
              }
                if(mem_id.dataValues.id){
                  
                      await GroupUser.create({isadmin:0,userId:mem_id.dataValues.id, groupId:gid})
                      .then(()=>{
                        res.json({message:"successfully added new member",status:"1"});
                      })
                  }
                
            }
         
              else{
            res.json({message:"No such user exists to add to group", status:"0"});
            }
        }
      
        else{
            res.json({message:"You are not admin of group to add members"})
          }
  
}


exports.getgroupuser=async (req,res)=>{
    const groupid=req.params.gid;
    try{
        const Useringroup=await Group.findAll({
          
              include:User,
              where:{id:groupid},
            });

            const checkadmin=await GroupUser.findOne({where:{userId:req.user.id,groupId:groupid}})

            res.json({user:Useringroup,status:"1",isAdmin:checkadmin.isadmin});

    }
    catch(err){
        console.log(err);
    }

}

exports.deletefromgroup=async (req,res)=>{
    const user=await GroupUser.findOne(
        {
        where:{groupId:req.params.gid,userId:req.params.userId}});
        console.log(grp_admin);
        await user.destroy();
        res.status(200).json({status:"1",message:"Removed user"});
}


exports.makeadmin=async (req,res)=>{
    const grp_admin=await GroupUser.findOne(
        {
        where:{groupId:req.params.gid,userId:req.params.userId}});
        console.log(grp_admin);
        grp_admin.update({isadmin:1})
        // await grp_admin.destroy();
        res.status(200).json({status:"1",message:"The User is now Admin"});
}


exports.chatimage=async(req,res,next)=>{

  const chatmessage=req.body.picture;
  const groupid=req.body.groupid;


            await Chatimage.create(
            {picture:chatmessage,userId:req.user.id,groupId:groupid})
          .then(()=>{
          res.json({message:"Image sent successfully", status:"1"})
         })
       .catch(err=>{
       res.send(err)
        })
  }