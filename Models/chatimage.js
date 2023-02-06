// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');

// const Chatimage=sequelize.define('chatimage',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
    
//     image:{
//         type:Sequelize.BLOB,
        
//     }
    
// });
const Sequelize=require('sequelize');
const sequelize=require('../Util/database');
const Chatimage=sequelize.define('chatimage',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    image:{
                type:Sequelize.BLOB,
                
            }
})
// module.exports=Group;

module.exports=Chatimage;