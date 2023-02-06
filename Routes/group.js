const { Router } = require('express');
const groupcontroller=require('../Controllers/group');
const auth=require('../middlewares/auth');
const express=require('express');
const router=express.Router();

router.post('/creategroup',auth.authenticate,groupcontroller.postgroup);
router.get('/getgroup',auth.authenticate,groupcontroller.getgroup);
router.post('/joingroup',auth.authenticate,groupcontroller.joingroup);
router.get('/getgroupmessage',auth.authenticate,groupcontroller.getallchatmessages);
router.get('/getgroupuser/:gid',auth.authenticate,groupcontroller.getgroupuser);
router.get('/removefromgroup/:userId/:gid',auth.authenticate,groupcontroller.deletefromgroup);
router.get('/makeadmin/:userId/:gid',auth.authenticate,groupcontroller.makeadmin);
router.post('/chatimage',auth.authenticate,groupcontroller.chatimage);
module.exports=router;