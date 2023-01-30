const { Router } = require('express');
const messagecontroller=require('../Controllers/message');
const auth=require('../middlewares/auth');
const express=require('express');
const router=express.Router();

// router.get('/signup',usercontroller.getusers);
router.post('/message',auth.authenticate,messagecontroller.postmessage);
// router.post('/forget-password',usercontroller.forgetpassword);
// router.post('/change-password/:password_id',usercontroller.changepassword);
// router.post('/login',usercontroller.login);
module.exports=router;