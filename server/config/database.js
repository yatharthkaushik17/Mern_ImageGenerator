const mongoose = require("mongoose");
require('dotenv').config()
exports.connect = ()=>{

    mongoose.connect(process.env.MONGO_DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Db connected Sucessfully");
    }).catch((error)=>{
        console.log("Db not connected");
        console.log(error.message);
        process.exit(1);
    })
}