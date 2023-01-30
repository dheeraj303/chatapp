const { Router } = require('express');
const messagecontroller=require('../Controllers/message');
const auth=require('../middlewares/auth');
const express=require('express');
const router=express.Router();

router.post('/message',auth.authenticate,messagecontroller.postmessage);
router.get('/message',auth.authenticate,messagecontroller.getmessage);

module.exports=router;