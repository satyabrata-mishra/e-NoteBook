const mongoose=require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.mongouri,()=>{
    console.log("Database Connected!!!");
})

module.exports=mongoose;