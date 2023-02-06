const Sequelize=require('sequelize');
const sequelize=require('../Util/database');
const GroupUser=sequelize.define('groupuser',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    isadmin:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
  
})
module.exports=GroupUser;